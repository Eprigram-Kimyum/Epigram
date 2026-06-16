'use client';

import { useState, useEffect, useRef, useCallback, ChangeEvent } from 'react';
import { TextArea } from '@/components/common/TextArea';
import Button from '@/components/common/Button';
import { getCommentsApi, createCommentApi, updateCommentApi } from '@/apis/comment/comment';
import { CommentItemType } from '@/apis/comment/type';
import CommentItem from './CommentItem';

interface CommentSectionProps {
  epigramId: string;
  currentUserId: number | null;
}

export default function CommentSection({ epigramId, currentUserId }: CommentSectionProps) {
  const numericEpigramId = Number(epigramId);

  const [comments, setComments] = useState<CommentItemType[]>([]);
  const [nextCursor, setNextCursor] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [mainCommentContent, setMainCommentContent] = useState<string>('');
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editCommentContent, setEditCommentContent] = useState<string>('');

  const observerRef = useRef<IntersectionObserver | null>(null);
  const stateRef = useRef({ nextCursor, isLoading });
  stateRef.current = { nextCursor, isLoading };

  const fetchComments = async (cursorValue: number | null, isRefresh = false) => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const data = await getCommentsApi(numericEpigramId, cursorValue, 5);
      if (isRefresh) {
        setComments(data.list);
      } else {
        setComments((prev) => [...prev, ...data.list]);
      }
      setNextCursor(data.nextCursor);
    } catch (error) {
      console.error('댓글을 불러오는 중 오류 발생:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchComments(null, true);
  }, [epigramId]);

  const bottomTriggerRef = useCallback((node: HTMLDivElement | null) => {
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }

    if (node) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          const { nextCursor: latestCursor, isLoading: latestLoading } = stateRef.current;
          if (entries[0].isIntersecting && !latestLoading && latestCursor !== null) {
            fetchComments(latestCursor);
          }
        },
        { threshold: 0.1 },
      );
      observerRef.current.observe(node);
    }
  }, []);

  const handleCreateSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!mainCommentContent.trim() || mainCommentContent.length > 100) return;

    try {
      const newComment = await createCommentApi({
        epigramId: numericEpigramId,
        content: mainCommentContent,
        isPrivate: false,
      });

      setComments((prev) => [newComment, ...prev]);
      setMainCommentContent('');
    } catch (error) {
      console.error('댓글 등록 실패:', error);
    }
  };

  const handleStartEdit = (commentId: number, currentContent: string) => {
    setEditingCommentId(commentId);
    setEditCommentContent(currentContent);
  };

  const handleUpdateSubmit = async (event: React.FormEvent, commentId: number) => {
    event.preventDefault();
    if (!editCommentContent.trim() || editCommentContent.length > 100) return;

    try {
      const updatedComment = await updateCommentApi(commentId, {
        content: editCommentContent,
        isPrivate: false,
      });

      setComments((prev) => prev.map((c) => (c.id === commentId ? updatedComment : c)));
      setEditingCommentId(null);
      setEditCommentContent('');
    } catch (error) {
      console.error('댓글 수정 실패:', error);
    }
  };

  const handleDeleteSuccess = (deletedCommentId: number) => {
    setComments((prev) => prev.filter((c) => c.id !== deletedCommentId));
  };

  return (
    <section>
      {!editingCommentId && (
        <form onSubmit={handleCreateSubmit}>
          <TextArea
            value={mainCommentContent}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              setMainCommentContent(e.target.value)
            }
            placeholder="댓글을 입력해 주세요"
          />
          {mainCommentContent.length > 100 && <p>100자를 초과했습니다.</p>}

          {mainCommentContent.length > 0 && (
            <Button type="submit" disabled={mainCommentContent.length > 100}>
              등록
            </Button>
          )}
        </form>
      )}

      <div>
        {comments.map((comment) => (
          <div key={comment.id}>
            {editingCommentId === comment.id ? (
              <form onSubmit={(e) => handleUpdateSubmit(e, comment.id)}>
                <TextArea
                  value={editCommentContent}
                  onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                    setEditCommentContent(e.target.value)
                  }
                />
                {editCommentContent.length > 100 && <p>100자를 초과했습니다.</p>}
                <div>
                  <Button type="button" onClick={() => setEditingCommentId(null)}>
                    취소
                  </Button>
                  <Button type="submit" disabled={editCommentContent.length > 100}>
                    수정 완료
                  </Button>
                </div>
              </form>
            ) : (
              <CommentItem
                comment={comment}
                currentUserId={currentUserId}
                onStartEdit={handleStartEdit}
                onDeleteSuccess={handleDeleteSuccess}
              />
            )}
          </div>
        ))}
      </div>

      {nextCursor !== null && (
        <div ref={bottomTriggerRef}>{isLoading && <p>댓글 로딩 중...</p>}</div>
      )}
    </section>
  );
}
