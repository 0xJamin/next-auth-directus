// import { useSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { options } from "./api/auth/[...nextauth]/options";
// import { useState, useEffect } from "react";

// async function getUserData(token: string) {
//   try {
//     const user = await directus.request(
//       withToken(
//         token,
//         readMe({
//           fields: ["first_name", "last_name"],
//         })
//       )
//     );
//     return user;
//   } catch (e: any) {
//     signOut();
//   }
// }

export default async function Home() {
  const session = await getServerSession(options);
  // const { status, data: session } = useSession({
  //   required: true,
  //   onUnauthenticated() {
  //     // The user is not authenticated, handle it here.
  //     redirect("/login");
  //   },
  // });

  // State to hold user data
  // const [userData, setUserData] = useState();

  // const fetchData = async () => {
  //   try {
  //     // Call getUserData and await the result
  //     const user = await getUserData(session?.user.accessToken);
  //     // setUserData(user);

  //     // Do something with user data
  //   } catch (error) {
  //     // Handle errors here
  //     console.error(error);
  //   }
  // };

  // // Use useEffect to fetch data only when the component mounts
  // useEffect(() => {
  //   if (status === "authenticated") {
  //     fetchData();
  //   }
  // }, [status, session]); // Only re-run the effect if status or session changes

  // if (status !== "authenticated") return null;

  // return (
  //   <main className="flex min-h-screen flex-col items-center justify-between p-24">
  //     {userData ? (
  //       <p>Welcome, {userData.first_name}!</p>
  //     ) : (
  //       <p>Loading user data...</p>
  //     )}
  //   </main>
  // );
  if (!session) {
    redirect("/login?callbackUrl=/");
  }
  console.log("....................................");
  console.log(session);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Welcome, {session.user.first_name}!</h1>
    </main>
  );
}
