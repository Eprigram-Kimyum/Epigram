import React, { useState, KeyboardEvent } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { Input } from './Input';
import { TextArea } from './TextArea';
import { createEpigram } from '@/apis/epigram/epigram';
import { CreateEpigramRequest, ApiErrorResponse } from '@/apis/epigram/type';

interface EpigramFormData {
  content: string;
  authorType: '직접 입력' | '알 수 없음' | '본인';
  author: string;
  referenceTitle: string;
  referenceUrl: string;
}

export function PostForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<EpigramFormData>({
    mode: 'onBlur',
    defaultValues: {
      content: '',
      authorType: '직접 입력',
      author: '',
      referenceTitle: '',
      referenceUrl: '',
    },
  });

  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [tagError, setTagError] = useState('');

  const currentAuthorType = watch('authorType');

  // 1. 태그 입력 핸들러
  const handleTagKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === '#' || e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();

      const trimmedTag = tagInput.trim().replace('#', '');

      if (!trimmedTag) return;

      if (tags.length >= 3) {
        setTagError('태그는 최대 3개까지만 등록할 수 있습니다.');
        return;
      }
      if (trimmedTag.length > 10) {
        setTagError('한 태그당 최대 10자까지만 입력 가능합니다.');
        return;
      }
      if (tags.includes(trimmedTag)) {
        setTagError('이미 등록된 태그입니다.');
        return;
      }
      setTags([...tags, trimmedTag]);
      setTagInput('');
      setTagError('');
    }
  };

  // 2. 태그 삭제 핸들러
  const removeTag = (indexToRemove: number) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
    setTagError('');
  };

  // 3. 비동기 데이터 제출 핸들러 (괄호 범위 정상화)
  const onSubmit = async (data: EpigramFormData) => {
    // 백엔드가 명확히 인지할 수 있는 형태로 저자(author) 데이터를 정제합니다.
    let resolvedAuthor = '';

    if (data.authorType === '직접 입력') {
      resolvedAuthor = data.author.trim();
    } else if (data.authorType === '본인') {
      resolvedAuthor = '본인'; // 백엔드 명세에 따라 사용자 이름 또는 '본인' 지정
    } else {
      resolvedAuthor = '알 수 없음';
    }

    // 데이터 공백 검증 및 안전장치
    if (!resolvedAuthor) {
      console.warn('저자 정보가 올바르지 않습니다.');
      return;
    }

    const submissionData: CreateEpigramRequest = {
      content: data.content,
      author: resolvedAuthor, // 정제된 저자 이름 전달 ("직접 입력" 문자열 전송 방지)
      referenceTitle: data.referenceTitle?.trim() || undefined,
      referenceUrl: data.referenceUrl?.trim() || undefined,
      tags,
    };

    try {
      const result = await createEpigram(submissionData);
      console.log('서버 응답 결과:', result);
      alert('에피그램이 성공적으로 등록되었습니다!');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('에피그램 등록 실패 (서버 에러):', error.response?.data || error.message);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextArea
        label="내용"
        placeholder="500자 이내로 입력해주세요."
        error={errors.content?.message}
        {...register('content', {
          required: '내용은 필수 항목입니다.',
          maxLength: {
            value: 500,
            message: '500자 이내로 입력해주세요.',
          },
        })}
      />

      <div>
        <label>저자</label>
        <div>
          <label>
            <input type="radio" value="직접 입력" {...register('authorType')} />
            직접 입력
          </label>
          <label>
            <input type="radio" value="알 수 없음" {...register('authorType')} />알 수 없음
          </label>
          <label>
            <input type="radio" value="본인" {...register('authorType')} />
            본인
          </label>
        </div>
      </div>

      {currentAuthorType === '직접 입력' && (
        <Input
          aria-label="직접 저자 입력"
          placeholder="저자 입력"
          error={errors.author?.message}
          {...register('author', {
            required: currentAuthorType === '직접 입력' ? '저자를 입력해주세요.' : false,
          })}
        />
      )}

      <fieldset style={{ border: 'none', padding: 0, margin: 0 }}>
        <legend>출처</legend>
        <Input
          aria-label="출처 제목"
          placeholder="출처 제목 입력"
          error={errors.referenceTitle?.message}
          {...register('referenceTitle')}
        />
        <Input
          aria-label="출처 관련 URL"
          type="url"
          placeholder="URL (ex. https://www.website.com)"
          error={errors.referenceUrl?.message}
          {...register('referenceUrl', {
            pattern: {
              value: /^https?:\/\/.+/,
              message: '올바른 URL 형식을 입력해 주세요.',
            },
          })}
        />
      </fieldset>

      <fieldset>
        <legend>태그</legend>
        <div>
          {tags.map((tag, index) => (
            <button
              type="button"
              key={index}
              onClick={() => removeTag(index)}
              style={{ cursor: 'pointer' }}
              aria-label={`${tag} 태그 삭제`}
            >
              #{tag} <span aria-hidden="true">&times;</span>
            </button>
          ))}
        </div>
        <Input
          placeholder="입력하여 태그 작성 (최대 10자)"
          aria-label="태그 입력"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyDown={handleTagKeyDown}
          error={tagError}
        />
      </fieldset>

      <button type="submit">작성 완료</button>
    </form>
  );
}
