import { getMatches, getUserByID, getUsersWithNoConnection } from '@/db/neo4j.action';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { redirect } from 'next/navigation';
import { FC } from 'react'

interface Neo4JUser {
  applicationId: string;
  firstname: string;
  lastname?: string;
  email: string;
}

const Page: FC = async () => {
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

  const matches: Neo4JUser[] = await getMatches(user.id);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="w-full max-w-3xl mx-auto p-4">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Your Matches
        </h1>

        {matches.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {matches.map((match) => (
              <div
                key={match.applicationId}
                className="bg-white shadow-md rounded-lg p-6 text-center"
              >
                <h2 className="text-xl font-semibold text-gray-700">
                  {match.firstname} {match.lastname}
                </h2>
                <p className="text-gray-500">{match.email}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">No matches found.</p>
        )}
      </div>
    </div>
  );
}

export default Page;
