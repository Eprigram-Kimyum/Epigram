import React, { useState, KeyboardEvent } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from './Input';
import { TextArea } from './TextArea';
import { createEpigram } from '../../apis/epigram/epigram';
import { CreateEpigramRequest, ApiErrorResponse } from '../../apis/epigram/type';

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
    trigger,
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

  const handleTagKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === '#' || e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();

      const trimmedTag = tagInput.trim().replace('#', '');

      if (!trimmedTag) return;

      if (tags.length >= 3) {
        setTags(tags);
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

  const removeTag = (indexToRemove: number) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
    setTagError('');
  };

  const onSubmit = async (data: EpigramFormData) => {
    const submissionData: CreateEpigramRequest = {
      content: data.content,
      author: data.authorType === '직접 입력' ? data.author : data.authorType,
      referenceTitle: data.referenceTitle || undefined,
      referenceUrl: data.referenceUrl || undefined,
      tags,
    };

    try {
      const result = await createEpigram(submissionData);
      console.log('서버 응답 결과:', result);
      alert('에피그램이 성공적으로 등록되었습니다!');
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        const errorData = error.response.data as ApiErrorResponse;
        alert(`인증 오류: ${errorData.message || '로그인이 필요한 서비스입니다.'}`);
      } else {
        console.error('에피그램 등록 실패:', error);
        alert('에피그램 등록 중 오류가 발생했습니다.');
      }
    }
  };

  const onInvalid = async () => {
    await trigger();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
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
