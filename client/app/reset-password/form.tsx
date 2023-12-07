'use client';

import Link from 'next/link';
import { FormEvent, useState } from 'react';
import { passwordReset } from '@directus/sdk';
import directus from '@/lib/directus';
import { redirect, useRouter } from 'next/navigation'

export default function RequestResetForm({token}: {token: string}) {
  const [newPassword, setNewPassword] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const reset_token = token;
  const router = useRouter();


  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await directus.request(
        passwordReset(reset_token, newPassword)
      );
      setSuccess('Password successfully reset, redirecting you to login page...')
      setTimeout(() => router.push('/login'), 1000);
    } catch (e: any) {
      console.log(e)
      const code = e.errors[0].extensions.code
      if (code === 'FORBIDDEN') {
        setError('The reset password token is invalid, please request for a new password reset link!')
      }
    }
  };
  return (
    <form onSubmit={handleFormSubmit} className=" md:w-[500px] w-full">
      <h1 className="capitalize text-lg font-medium my-4">
        Provide a new password for your account
      </h1>
      {success &&
        <p className='text-green-600 bg-green-50 p-2 rounded-md'>
          {success}
        </p>}
      {error &&
        <p className='text-red-600 bg-red-50 p-2 rounded-md'>
          {error}
        </p>}
      <p>
       Enter your new password for your account
      </p>
      <input
        type="password"
        placeholder="Enter your new password"
        name="password"
        required
        onChange={(e) => setNewPassword(e.target.value)}
        autoComplete='new-password'
        className="py-2 px-4 border border-indigo-500 rounded-md w-full my-5"
      />
      <button className="bg-indigo-600 text-white py-3 px-6 w-full rounded-md">
        Create new password
      </button>
    </form>
  );
}
