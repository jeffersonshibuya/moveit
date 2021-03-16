import { useContext, useEffect } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import { Session } from 'next-auth/client'

import styles from '../styles/components/Profile.module.css';
import { User } from 'next-auth';


const Profile = ({email, image, name}: User) => {
  const { level } = useContext(ChallengesContext)

  return (
    <div className={styles.profileContainer}>
      <img src={image} alt={name}/>
      <div>
        <strong>{name}</strong>
        <p>
          <img src="icons/level.svg" alt="level"/>
          Level {level}
        </p>
      </div>
    </div>
  )
}

export default Profile;