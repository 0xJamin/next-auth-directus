'use client';

import Link from 'next/link';
import { FormEvent, useState } from 'react';
import { passwordRequest } from '@directus/sdk';
import directus from '@/lib/directus';

export default function RequestResetPasswordForm() {
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const reset_url = `${process.env.NEXT_PUBLIC_URL}/reset-password`;

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await directus.request(
        passwordRequest(email, reset_url)
      );
      setSuccess(
        'An email with a password reset link has been sent to your email!'
      );
    } catch (e: any) {
      console.log(e);
      if (e) {
        setError('An error occurred, please try again!');
      }
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className=" md:w-[500px] w-full">
      <h1 className="capitalize text-lg font-medium my-4">
        Reset your password
      </h1>
      {success && (
        <p className="text-green-600 bg-green-50 p-2 rounded-md">{success}</p>
      )}
      {error && (
        <p className="text-red-600 bg-red-50 p-2 rounded-md">{error}</p>
      )}
      <p>
        Enter your registered email and a reset password link will be sent to
        you
      </p>
      <input
        type="email"
        placeholder="Email Address"
        name="email"
        required
        onChange={(e) => setEmail(e.target.value)}
        className="py-2 px-4 border border-indigo-500 rounded-md w-full my-5"
      />
      <button className="bg-indigo-600 text-white py-3 px-6 w-full rounded-md">
        Send Reset Link
      </button>
      <Link className="text-indigo-500 underline  mt-4 block" href="/login">
        Login page
      </Link>
    </form>
  );
}
