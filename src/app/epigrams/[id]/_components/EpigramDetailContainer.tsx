'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Modal from '@/components/common/Modal';
import Dropdown from '@/components/common/Dropdown';
import { deleteEpigramApi } from '@/apis/epigram/epigram';
import { EpigramDetail } from '@/apis/epigram/type';

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
      alert('URL이 복사되었습니다.');
    } catch (error) {
      console.error('URL 복사 실패:', error);
    }
  };

  const handleLikeClick = () => {
    if (isLikedState) {
      setIsLikedState(false);
      setLikeCountState((prev) => prev - 1);
    } else {
      setIsLikedState(true);
      setLikeCountState((prev) => prev + 1);
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
        <button type="button" onClick={handleLikeClick}>
          {isLikedState ? '❤️' : '🤍'} {likeCountState}
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
                새창으로 열기
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
