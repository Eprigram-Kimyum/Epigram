import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { registerUser } from '../apis/auth/auth';
import { SignUpRequest } from '../apis/auth/type';

export default function SignUpPage() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<SignUpRequest>({
    mode: 'onTouched',
  });

  const onSubmit: SubmitHandler<SignUpRequest> = async (data) => {
    try {
      const response = await registerUser(data);
      alert(`${response.user.nickname}님, 가입을 환영합니다!`);
    } catch (error) {
      console.error(error);
      alert('회원가입 중 오류가 발생했습니다. 다시 시도해 주세요.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="email">이메일</label>
        <input
          id="email"
          type="email"
          aria-invalid={errors.email ? 'true' : 'false'}
          aria-describedby={errors.email ? 'email-error' : undefined}
          {...register('email', {
            required: '이메일은 필수 입력 항목입니다.',
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: '올바른 이메일 형식이 아닙니다.',
            },
          })}
        />
        {errors.email && (
          <p id="email-error" style={{ color: 'red' }}>
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="password">비밀번호</label>
        <input
          id="password"
          type="password"
          aria-invalid={errors.password ? 'true' : 'false'}
          aria-describedby={errors.password ? 'password-error' : undefined}
          {...register('password', {
            required: '비밀번호는 필수 입력 항목입니다.',
            minLength: {
              value: 8,
              message: '비밀번호는 최소 8자 이상이어야 합니다.',
            },
          })}
        />
        {errors.password && (
          <p id="password-error" style={{ color: 'red' }}>
            {errors.password.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="passwordConfirmation">비밀번호 확인</label>
        <input
          id="passwordConfirmation"
          type="password"
          aria-invalid={errors.passwordConfirmation ? 'true' : 'false'}
          aria-describedby={
            errors.passwordConfirmation
              ? 'passwordConfirmation-error'
              : undefined
          }
          {...register('passwordConfirmation', {
            required: '비밀번호 확인은 필수 입력 항목입니다.',
            validate: (value) =>
              value === getValues('password') ||
              '비밀번호가 일치하지 않습니다.',
          })}
        />
        {errors.passwordConfirmation && (
          <p id="passwordConfirmation-error" style={{ color: 'red' }}>
            {errors.passwordConfirmation.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="nickname">닉네임</label>
        <input
          id="nickname"
          type="text"
          aria-invalid={errors.nickname ? 'true' : 'false'}
          aria-describedby={errors.nickname ? 'nickname-error' : undefined}
          {...register('nickname', {
            required: '닉네임은 필수 입력 항목입니다.',
          })}
        />
        {errors.nickname && (
          <p id="nickname-error" style={{ color: 'red' }}>
            {errors.nickname.message}
          </p>
        )}
      </div>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? '가입 중...' : '회원가입'}
      </button>
    </form>
  );
}
