'use client';

import { useState, useEffect } from 'react';
import Modal from '@/components/common/Modal';
import Dropdown from '@/components/common/Dropdown';
import { deleteCommentApi } from '@/app/apis/comment/comment';
import { CommentItemType } from '@/app/apis/comment/type';
import { formatCommentDate } from '@/utils/date';

interface CommentItemProps {
  comment: CommentItemType;
  currentUserId: number | null;
  onStartEdit: (commentId: number, currentContent: string) => void;
  onDeleteSuccess: (commentId: number) => void;
}

export default function CommentItem({
  comment,
  currentUserId,
  onStartEdit,
  onDeleteSuccess,
}: CommentItemProps) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);

  const [formattedDate, setFormattedDate] = useState<string>('');

  const isMyComment = currentUserId === comment.writer.id;

  useEffect(() => {
    setFormattedDate(formatCommentDate(comment.createdAt));
  }, [comment.createdAt]);

  const handleDeleteConfirm = async () => {
    try {
      await deleteCommentApi(comment.id);
      setIsDeleteModalOpen(false);
      onDeleteSuccess(comment.id);
    } catch (error) {
      console.error('댓글 삭제 중 오류 발생:', error);
    }
  };

  const dropdownItems = [
    {
      label: '수정',
      onClick: () => {
        onStartEdit(comment.id, comment.content);
      },
    },
    {
      label: '삭제',
      onClick: () => {
        setIsDeleteModalOpen(true);
      },
    },
  ];

  return (
    <div>
      <button
        type="button"
        onClick={() => setIsProfileModalOpen(true)}
        style={{
          background: 'none',
          border: 'none',
          padding: 0,
          cursor: 'pointer',
          textAlign: 'left',
        }}
      >
        {comment.writer.image ? (
          <img src={comment.writer.image} alt={`${comment.writer.nickname} 프로필 사진`} />
        ) : (
          <div>{comment.writer.nickname[0]}</div>
        )}
        <strong>{comment.writer.nickname}</strong>
      </button>

      <div>
        <p>{comment.content}</p>
        <span>{formattedDate}</span>
      </div>

      {isMyComment && (
        <Dropdown trigger={<button type="button">...</button>} items={dropdownItems} />
      )}

      <Modal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        title="프로필 정보"
      >
        <div>
          {comment.writer.image && (
            <img src={comment.writer.image} alt={`${comment.writer.nickname} 프로필 사진 상세`} />
          )}
          <h3>{comment.writer.nickname}</h3>
          <p>유저 ID: {comment.writer.id}</p>
        </div>
      </Modal>

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="댓글 삭제"
        footer={
          <>
            <button type="button" onClick={() => setIsDeleteModalOpen(false)}>
              취소
            </button>
            <button type="button" onClick={handleDeleteConfirm}>
              확인
            </button>
          </>
        }
      >
        <p>삭제하시겠습니까?</p>
      </Modal>
    </div>
  );
}
