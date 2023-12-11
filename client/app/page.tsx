import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { options } from './api/auth/[...nextauth]/options';

export default async function Home() {
  const session = await getServerSession(options);
  if (!session) {
    redirect('/login');
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>
        Welcome, {session.user.first_name} {session.user.last_name}!
      </h1>
    </main>
  );
}
