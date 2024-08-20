import db from "@/shared/config/database";
import getSession from "@/shared/config/session";
import { Button } from "@nextui-org/react";
import { redirect } from "next/navigation";

const getUser = async () => {
  console.log("clicked");
  const session = await getSession();
  const user = await db.user.findUnique({
    where: {
      id: session.id,
    },
  });
  return user;
};

const ProfilePage = async () => {
  //   const user = await getUser();
  //   console.log(user?.username);

  const logout = async () => {
    "use server";
    const session = await getSession();
    await session.destroy();
    redirect("/");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      ProfilePage
      <form action={logout}>
        <Button type="submit">Logout</Button>
      </form>
    </div>
  );
};

export default ProfilePage;
