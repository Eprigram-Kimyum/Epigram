'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Modal from '@/components/common/Modal';
import Dropdown from '@/components/common/Dropdown';
import { deleteEpigramApi, likeEpigramApi, unlikeEpigramApi } from '@/app/apis/epigram/epigram';
import { EpigramDetail } from '@/app/apis/epigram/type';
import toast from 'react-hot-toast';

interface EpigramDetailContainerProps {
  epigram: EpigramDetail;
  currentUserId: number | null;
}

export default function EpigramDetailContainer({
  epigram,
  currentUserId,
}: EpigramDetailContainerProps) {
  const router = useRouter();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [isLikedState, setIsLikedState] = useState<boolean>(epigram.isLiked);
  const [likeCountState, setLikeCountState] = useState<number>(epigram.likeCount);

  const isMyEpigram = currentUserId === epigram.writerId;

  const handleShareClick = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast('URL이 복사되었습니다.');
    } catch (error) {
      console.error('URL 복사 실패:', error);
    }
  };

  const handleLikeClick = async () => {
    const previousIsLiked = isLikedState;
    const previousLikeCount = likeCountState;

    setIsLikedState(!previousIsLiked);
    setLikeCountState((prev) => (previousIsLiked ? prev - 1 : prev + 1));

    try {
      if (previousIsLiked) {
        await unlikeEpigramApi(epigram.id);
      } else {
        await likeEpigramApi(epigram.id);
      }
    } catch (error) {
      console.error('좋아요 처리 실패:', error);
      setIsLikedState(previousIsLiked);
      setLikeCountState(previousLikeCount);
      toast('좋아요 처리에 실패했습니다. 다시 시도해 주세요.');
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteEpigramApi(String(epigram.id));
      setIsDeleteModalOpen(false);
      router.push('/');
    } catch (error) {
      console.error('에피그램 삭제 중 오류 발생:', error);
    }
  };

  const dropdownItems = [
    {
      label: '수정',
      onClick: () => {
        router.push(`/epigrams/${epigram.id}/edit`);
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
    <section>
      {isMyEpigram && (
        <Dropdown trigger={<button type="button">...</button>} items={dropdownItems} />
      )}

      <div>
        <button type="button" onClick={handleShareClick}>
          공유하기
        </button>
        <button
          type="button"
          onClick={handleLikeClick}
          aria-label={isLikedState ? '좋아요 취소' : '좋아요'}
        >
          {isLikedState ? '❤️' : '🤍'} <span>{likeCountState}</span>
        </button>
      </div>

      <figure>
        <blockquote>
          <p>"{epigram.content}"</p>
        </blockquote>
        <figcaption>
          — <cite>{epigram.author || '익명'}</cite>
        </figcaption>
      </figure>

      <div>
        {epigram.referenceTitle && (
          <div>
            <span>출처: {epigram.referenceTitle}</span>
            {epigram.referenceUrl && (
              <a href={epigram.referenceUrl} target="_blank" rel="noopener noreferrer">
                출처 바로가기 (새 창)
              </a>
            )}
          </div>
        )}

        {epigram.tags.length > 0 && (
          <ul>
            {epigram.tags.map((tag) => (
              <li key={tag.id}>#{tag.name}</li>
            ))}
          </ul>
        )}
      </div>

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="에피그램 삭제"
        footer={
          <>
            <button type="button" onClick={() => setIsDeleteModalOpen(false)}>
              취소
            </button>
            <button type="button" onClick={handleDeleteConfirm}>
              삭제
            </button>
          </>
        }
      >
        <p>정말 삭제하시겠습니까?</p>
      </Modal>
    </section>
  );
}
