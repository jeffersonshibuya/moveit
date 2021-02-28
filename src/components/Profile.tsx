import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/Profile.module.css';

const Profile: React.FC = () => {
  const { level } = useContext(ChallengesContext)

  return (
    <div className={styles.profileContainer}>
      <img src="https://avatars.githubusercontent.com/u/10772632?s=400&u=6ab642f0e98e843d7ed1faeaed71c21c9ac2a819&v=4" alt="Jefferson Shibuya"/>
      <div>
        <strong>Jefferson Shibuya</strong>
        <p>
          <img src="icons/level.svg" alt="level"/>
          Level {level}
        </p>
      </div>
    </div>
  )
}

export default Profile;