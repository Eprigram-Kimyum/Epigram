import React, { useState, KeyboardEvent } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from './Input';
import { TextArea } from './TextArea';

interface EpigramFormData {
  content: string;
  authorType: '직접 입력' | '알 수 없음' | '본인';
  authorName: string;
  sourceTitle: string;
  sourceUrl: string;
  tags: string[];
}

export function PostForm() {
  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors, isValid },
  } = useForm<EpigramFormData>({
    mode: 'onBlur',
    defaultValues: {
      content: '',
      authorType: '직접 입력',
      authorName: '',
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

  // 저장 버튼 클릭 시 실행되는 함수
  const onSubmit = (data: EpigramFormData) => {
    const submissionData = {
      ...data,
      authorName: data.authorType === '직접 입력' ? data.authorName : data.authorType,
      tags,
    };
    console.log('서버로 보낼 데이터:', submissionData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextArea
        label="내용"
        placeholder="500자 이내로 입력해주세요."
        error={errors.content?.message}
        {...register('content', {
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
          error={errors.authorName?.message}
          {...register('authorName', {
            required: currentAuthorType === '직접 입력' ? '저자를 입력해주세요.' : false,
          })}
        />
      )}

      <fieldset>
        <legend>출처</legend>
        <Input
          aria-label="출처 제목"
          placeholder="출처 제목 입력"
          error={errors.sourceTitle?.message}
          {...register('sourceTitle')}
        />
      </fieldset>
      <Input
        aria-label="출처 관련 URL"
        type="url"
        placeholder="URL (ex. https://www.website.com)"
        error={errors.sourceUrl?.message}
        {...register('sourceUrl', {
          pattern: {
            value: /^https?:\/\/.+/,
            message: '올바른 URL 형식을 입력해 주세요.',
          },
        })}
      />

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
              #{tag}
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
