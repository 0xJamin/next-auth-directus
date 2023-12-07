
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import RegistrationForm from "./form"

export default async function RegisterPage() {
  const session = await getServerSession()
  console.log(session)
  if (session) {
    console.log({session})
    redirect("/")
  }
  return (
    <div className="flex h-full flex-col justify-center min-h-screen items-center md:p-24 p-5">
      <RegistrationForm />
    </div>
  )
}