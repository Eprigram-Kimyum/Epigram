'use client';

import React from 'react';
import toast from 'react-hot-toast';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { LoginRequest } from '../apis/auth/type';
import { loginUser } from '../apis/auth/auth';
import { Input } from '../components/common/input';
import Button from '../components/common/button';
import { setAuthCookies } from '../utils/authCookie';
import axios from 'axios';

export default function LoginPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginRequest>({
    mode: 'onBlur',
  });

  const onSubmit: SubmitHandler<LoginRequest> = async (data) => {
    try {
      const { accessToken, refreshToken } = await loginUser(data);

      setAuthCookies(accessToken, refreshToken);

      router.push('/');
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const serverMessage = error.response.data?.message || '';

        if (serverMessage.includes('이메일')) {
          setError('email', { type: 'server', message: serverMessage });
        } else if (serverMessage.includes('비밀번호')) {
          setError('password', { type: 'server', message: serverMessage });
        } else {
          toast.error(serverMessage || '로그인 중 오류가 발생했습니다.');
        }
      } else {
        toast.error('네트워크 연결이 원활하지 않습니다.');
      }
    }
  };

  return (
    <main>
      <h2>Epigram 로그인</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          id="email"
          label="이메일"
          type="email"
          placeholder="이메일"
          error={errors.email?.message}
          {...register('email', {
            required: '이메일은 필수 입력 항목입니다.',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: '올바른 이메일 형식이 아닙니다.',
            },
          })}
        />

        <Input
          id="password"
          label="비밀번호"
          type="password"
          placeholder="비밀번호"
          error={errors.password?.message}
          {...register('password', {
            required: '비밀번호는 필수 입력 항목입니다.',
          })}
        />

        <Button type="submit" isLoading={isSubmitting}>
          로그인
        </Button>
      </form>
    </main>
  );
}
