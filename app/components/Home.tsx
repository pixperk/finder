'use client'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { neo4jSwipe } from '@/db/neo4j.action'
import { Neo4JUser } from '@/types'
import * as React from 'react'
import { FC } from 'react'
import TinderCard from 'react-tinder-card'

interface HomeProps {
  currentUser: Neo4JUser;
  users: Neo4JUser[];
}

const Home: FC<HomeProps> = ({ currentUser, users }) => {

    const handleSwipe = async(direction : string, userId : string) => {
        const isMatch = await neo4jSwipe(currentUser.applicationId, direction,userId)
        if(isMatch) alert(`Congrats, It's a match!`)
    }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600 text-white py-10">
      <div className="w-full max-w-2xl mx-auto text-center space-y-8">
        <h1 className="text-4xl font-bold tracking-tight">
          Hello, <span className="underline decoration-pink-500">{currentUser.firstname}</span>
        </h1>
        <div className="relative w-full h-[400px]">
          {users.map((user, index) => (
            <TinderCard 
                onSwipe={(direction)=>handleSwipe(direction,user.applicationId)}
              key={user.applicationId} 
              className={`absolute w-full transition-transform hover:scale-105`}
             
            >
              <Card className="bg-white text-gray-800 shadow-2xl rounded-lg">
                <CardHeader className="border-b border-gray-200 p-4">
                  <CardTitle className="text-xl font-semibold text-gray-900">
                    {user.firstname} {user.lastname}
                  </CardTitle>
                  <CardDescription className="text-gray-600">{user.email}</CardDescription>
                </CardHeader>
                <CardContent className="p-4">
                  <p className="text-gray-700">Card Content</p>
                </CardContent>
                <CardFooter className="border-t border-gray-200 p-4">
                  <p className="text-gray-500">Card Footer</p>
                </CardFooter>
              </Card>
            </TinderCard>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
