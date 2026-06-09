import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { registerUser } from '../apis/auth/auth';
import { SignUpRequest } from '../apis/auth/type';

export default function SignUpPage() {
  const { 
    register,         // input 요소를 등록하는 함수
    handleSubmit,     // 유효성 검사 통과 시 전송을 처리하는 함수
    watch,
    formState: { errors, isSubmitting }, // 에러 상태와 제출 중 상태를 가져옵니다.
  } = useForm<SignUpRequest>();

  // 유효성 검사가 모두 통과했을 때 실행되는 실제 제출 함수입니다.
  const onSubmit: SubmitHandler<SignUpRequest> = async (data) => {
    try {
      const response = await registerUser(data);
      alert(`${response.nickname}님, 가입을 환영합니다!`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>이메일</label>
        {/* register 함수를 스프레드 연산자(...)로 input에 주입합니다. */}
        <input
          type="email"
          {...register('email', {
            required: '이메일은 필수 입력 항목입니다.',
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: '올바른 이메일 형식이 아닙니다.',
            },
          })}
        />
        {/* 유효성 검사에 걸리면 에러 메시지를 보여줍니다. */}
        {errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}
      </div>

      <div>
        <label>비밀번호</label>
        <input
          type="password"
          {...register('password', {
            required: '비밀번호는 필수 입력 항목입니다.',
            minLength: {
              value: 8,
              message: '비밀번호는 최소 8자 이상이어야 합니다.',
            },
          })}
        />
        {errors.password && <p style={{ color: 'red' }}>{errors.password.message}</p>}
      </div>

      <div>
        <label>비밀번호 확인</label>
        <input
          type="password"
          {...register('passwordConfirmation', {
            required: '비밀번호 확인은 필수 입력 항목입니다.',
            validate: (value) =>
              value === watch('password') || '비밀번호가 일치하지 않습니다.',
          })}
        />
        {errors.passwordConfirmation && <p style={{ color: 'red' }}>{errors.passwordConfirmation.message}</p>}
      </div>
        
        <label>닉네임</label>
        <input
          type="text"
          {...register('nickname', { required: '닉네임은 필수 입력 항목입니다.' })}
        />
        {errors.nickname && <p style={{ color: 'red' }}>{errors.nickname.message}</p>}
      </div>

      {/* isSubmitting을 활용해 중복 클릭을 방지합니다. */}
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? '가입 중...' : '회원가입'}
      </button>
    </form>
  );
}