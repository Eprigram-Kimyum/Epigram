'use client';

import toast from 'react-hot-toast';
import { useForm, SubmitHandler } from 'react-hook-form';
import { LoginRequest } from '../apis/auth/type';
import { loginUser } from '../apis/auth/auth';
import { setAuthCookiesAndRedirect } from '../apis/auth/actions';
import { Input } from '../components/common/input';
import Button from '../components/common/button';
import axios from 'axios';

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginRequest>({
    mode: 'onBlur',
  });

  const onSubmit: SubmitHandler<LoginRequest> = async (data) => {
    try {
      const { accessToken, refreshToken } = await loginUser(data);
      await setAuthCookiesAndRedirect(accessToken, refreshToken);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const serverMessage = error.response.data?.message || '';
        toast.error(serverMessage || '로그인에 실패했습니다.');
      } else {
        toast.error('알 수 없는 오류가 발생했습니다.');
      }
    }
  };

  return (
    <main>
      <h1>Epigram</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          id="email"
          label="이메일"
          type="email"
          placeholder="이메일을 입력해 주세요"
          error={errors.email?.message}
          {...register('email', {
            required: '이메일은 필수 입력 항목입니다.',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: '잘못된 이메일 형식입니다.',
            },
          })}
        />

        <Input
          id="password"
          label="비밀번호"
          type="password"
          placeholder="비밀번호를 입력해 주세요"
          error={errors.password?.message}
          {...register('password', {
            required: '비밀번호는 필수 입력 항목입니다.',
          })}
        />

        <Button
          type="submit"
          disabled={isSubmitting}
          aria-busy={isSubmitting}
          aria-live="polite"
        >
          {isSubmitting ? '로그인 중...' : '로그인'}
        </Button>
      </form>
    </main>
  );
}
