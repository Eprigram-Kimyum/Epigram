'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { LoginRequest } from '@/app/apis/auth/type';
import { loginUser } from '@/app/apis/auth/auth';
import { Input } from '@/components/common/Input';
import Button from '@/components/common/Button';
import { Icons } from '@/components/common/Icons';
import axios from 'axios';

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting, isValid },
  } = useForm<LoginRequest>({
    mode: 'onTouched',
  });

  const onSubmit: SubmitHandler<LoginRequest> = async (data) => {
    try {
      await loginUser(data);
      toast.success('로그인에 성공했습니다.');
      router.push('/epigrams');
      router.refresh();
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const serverMessage = error.response.data?.error || error.response.data?.message || '';
        if (serverMessage.includes('이메일')) {
          setError('email', { type: 'server', message: serverMessage });
        } else if (serverMessage.includes('비밀번호')) {
          setError('password', { type: 'server', message: serverMessage });
        } else {
          toast.error(serverMessage || '로그인에 실패했습니다.');
        }
      } else {
        toast.error('네트워크 연결이 원활하지 않습니다.');
      }
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-160 rounded-2xl p-8 md:p-10">
        <div className="mb-15 flex justify-center">
          <Icons name="logo" className="w-43 h-12" />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
          <Input
            id="email"
            type="email"
            placeholder="이메일"
            error={errors.email?.message}
            aria-invalid={!!errors.email}
            {...register('email', {
              required: '이메일은 필수 입력 항목입니다.',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: '잘못된 이메일 형식입니다.',
              },
            })}
            className="bg-blue-200"
          />

          <div className="relative">
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="비밀번호"
              aria-invalid={!!errors.password}
              error={errors.password?.message}
              className="bg-blue-200 border-none"
              suffix={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-blue-400 hover:text-blue-600 transition-colors"
                  aria-label={showPassword ? '비밀번호 숨기기' : '비밀번호 표시'}
                >
                  <Icons
                    name={showPassword ? 'visibility-on' : 'visibility-off'}
                    className="w-6 h-6"
                  />
                </button>
              }
              {...register('password', {
                required: '비밀번호는 필수 입력 항목입니다.',
              })}
            />
          </div>

          <Button
            variant="wide"
            type="submit"
            disabled={!isValid || isSubmitting}
            aria-busy={isSubmitting}
          >
            {isSubmitting ? '로그인 중...' : '로그인'}
          </Button>
        </form>

        <div className="mt-2.5 text-right text-main-xl-medium text-blue-400">
          <span>회원이 아니신가요?</span>{' '}
          <Link
            href="/signup"
            className="underline font-medium text-[20px] leading-6.5 text-black-500"
          >
            가입하기
          </Link>
        </div>
      </div>
    </main>
  );
}
