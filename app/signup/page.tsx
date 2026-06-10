'use client';

import React from 'react';
import toast from 'react-hot-toast';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { SignUpRequest } from '../apis/auth/type';
import { registerUser } from '../apis/auth/auth';
import { Input } from '../components/common/input';
import axios from 'axios';

interface SignUpFormInput extends SignUpRequest {
  passwordConfirm: string;
}

export default function SignUpPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    getValues,
    setError,
    formState: { errors },
  } = useForm<SignUpFormInput>({
    mode: 'onBlur',
  });

  const onSubmit: SubmitHandler<SignUpFormInput> = async (data) => {
    const payload: SignUpRequest = {
      email: data.email,
      nickname: data.nickname,
      password: data.password,
      passwordConfirmation: data.passwordConfirm,
    };

    try {
      await registerUser(payload);

      router.push('/');
      toast.success('회원가입이 완료되었습니다.');
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const serverMessage = error.response.data?.message || '';

        if (serverMessage.includes('이메일')) {
          setError('email', { type: 'server', message: serverMessage });
        } else if (serverMessage.includes('닉네임')) {
          setError('nickname', { type: 'server', message: serverMessage });
        } else {
          alert(serverMessage || '회원가입 중 오류가 발생했습니다.');
        }
      }
    }
  };

  return (
    <main style={{ padding: '40px' }}>
      <h2>Epigram 회원가입</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* 이메일 입력창 */}
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

        {/* 비밀번호 입력창 */}
        <Input
          id="password"
          label="비밀번호"
          type="password"
          placeholder="비밀번호"
          error={errors.password?.message}
          {...register('password', {
            required: '비밀번호는 필수 입력 항목입니다.',
            pattern: {
              value:
                /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}[\]:;<>|./?~-]).{8,}$/,
              message:
                '비밀번호는 영어, 숫자, 특수문자를 포함하여 8자 이상이어야 합니다.',
            },
            deps: ['passwordConfirm'],
          })}
        />

        {/* 비밀번호 확인 입력란 */}
        <Input
          id="passwordConfirm"
          type="password"
          placeholder="비밀번호 확인"
          error={errors.passwordConfirm?.message}
          {...register('passwordConfirm', {
            required: '비밀번호 확인은 필수 입력 항목입니다.',
            validate: (value) =>
              value === getValues('password') ||
              '비밀번호가 일치하지 않습니다.',
          })}
        />

        {/* 닉네임 입력창 */}
        <Input
          id="nickname"
          label="닉네임"
          type="text"
          placeholder="닉네임"
          error={errors.nickname?.message}
          {...register('nickname', {
            required: '닉네임은 필수 입력 항목입니다.',
            maxLength: {
              value: 20,
              message: '닉네임은 최대 20자까지 가능합니다.',
            },
          })}
        />

        <button
          type="submit"
          style={{ padding: '10px 20px', marginTop: '10px' }}
        >
          가입하기
        </button>
      </form>
    </main>
  );
}
