import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';
import LandingLayout from '../layouts/LandingLayout';
import api from '../service/api'
import useSWR from 'swr';

import styles from '../styles/pages/Leaderboard.module.css';
import LeaderboardUser from '../components/LeaderboardUser';

export type User = {
  _id: string;
  name: string;
  email: string;
  image: string;
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

interface LeaderboardProps {
  usersList: User[]
}

export default function LeaderBoard({ usersList }: LeaderboardProps) {
  const { data, error } = useSWR('api/users', (args) => api.get(args).then(response => response.data))
  
  const [users, setUsers] = useState<User[]>(data)

  useEffect(() => {
    setUsers(data)
  }, [data])

  return (
    <div className={styles.container}>
      <h1>Leaderboard</h1>
      <div className={styles.usersList}>
        {users?.map((user, index) => {
          return <LeaderboardUser key={user._id} user={user} index={index}/>
        })}
      </div>
    </div>
  )
}
 
LeaderBoard.Layout = LandingLayout