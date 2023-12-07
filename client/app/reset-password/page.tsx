import { redirect } from 'next/navigation';
import ResetPasswordForm from './form';


export default async function ResetPasswordPage({ searchParams }: { searchParams: { token: string } }) {
  const { token } = searchParams
  if (!token)
    redirect('/login')
  return (
    <div className="flex h-full justify-center flex-col min-h-screen items-center md:p-24 p-5">
      <ResetPasswordForm  token={token} />
    </div>
  );
}
