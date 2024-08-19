import { getUsersWithNoConnection, getUserByID } from "@/db/neo4j.action";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import Home from "./components/Home";

const page = async () => {
  const { isAuthenticated, getUser } = getKindeServerSession();

  if (!(await isAuthenticated())) {
    return redirect(
      `api/auth/login?post_login_redirect_url=http://localhost:3000/callback`
    );
  }

  const user = await getUser();

  if (!user) {
    return redirect(
      `api/auth/login?post_login_redirect_url=http://localhost:3000/callback`
    );
  }

  const usersWithNoConnection = await getUsersWithNoConnection(user.id);
  const currentUser = await getUserByID(user.id);

  return (
    <main>
    
      {currentUser && (
        <Home currentUser={currentUser} users={usersWithNoConnection} />
      )}
    </main>
  );
};

export default page;
