'use client';

import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation'; // 핵심포인트 1: Next.js App Router용 라우터 임포트
import { SignUpRequest } from '../apis/auth/type';
import { registerUser } from '../apis/auth/auth';
import { Input } from '../components/common/input';
import axios from 'axios';

interface SignUpFormInput extends SignUpRequest {
  passwordConfirm: string;
}

export default function SignUpPage() {
  const router = useRouter(); // 핵심포인트 2: 라우터 인스턴스 초기화

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
      // 모든 유효성 검사가 통과하고 실제 서버 API 요청이 성공했을 때만 이 블록이 실행됩니다.
      await registerUser(payload);

      // 핵심포인트 3: 회원가입 성공 시 홈 화면('/')으로 페이지를 리다이렉트합니다.
      router.push('/');
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

      {/* handleSubmit이 감싸고 있으므로 가입하기 클릭 및 입력창 내 엔터키 작동이 보장됩니다. */}
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
                /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}[\]:;<>|./?~-]).{12,}$/,
              message:
                '비밀번호는 영어, 숫자, 특수문자를 포함하여 12자 이상이어야 합니다.',
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
