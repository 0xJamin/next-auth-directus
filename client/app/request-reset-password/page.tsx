import RequestResetPasswordForm from './form';

export default async function RequestPasswordResetPage() {
  return (
    <div className="flex h-full justify-center flex-col min-h-screen items-center md:p-24 p-5">
      <RequestResetPasswordForm />
    </div>
  );
}
