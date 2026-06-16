'use client';

import toast from 'react-hot-toast';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { LoginRequest } from '@/apis/auth/type';
import { loginUser } from '@/apis/auth/auth';
import { Input } from '@/components/common/Input';
import Button from '@/components/common/Button';
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
      await loginUser(data);

      toast.success('로그인에 성공했습니다.');

      router.push('/');
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
    <main>
      <h1>Epigram</h1>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Input
          id="email"
          label="이메일"
          type="email"
          placeholder="이메일을 입력해 주세요"
          error={errors.email?.message}
          aria-invalid={!!errors.email}
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
          aria-invalid={!!errors.password}
          {...register('password', {
            required: '비밀번호는 필수 입력 항목입니다.',
          })}
        />

        <Button type="submit" disabled={isSubmitting} aria-busy={isSubmitting} aria-live="polite">
          {isSubmitting ? '로그인 중...' : '로그인'}
        </Button>
      </form>
    </main>
  );
}
