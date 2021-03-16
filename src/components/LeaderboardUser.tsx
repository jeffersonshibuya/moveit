import React from 'react';
import User from '../models/User';

import styles from '../styles/components/LeaderboardUser.module.css';

const LeaderboardUser: React.FC<User> = (props) => {

  return (
    <div className={styles.container}>
    <div className={styles.position}>
      <strong> {props.index + 1} </strong>
    </div>
    <div className={styles.user}>
      <div className={styles.profileContainer}>
        <img src={props.user.image} alt={props.user.name}/>
        <div>
          <strong>{props.user.name}</strong>
          <p>
            <img src="icons/level.svg" alt="level"/>
            Level {props.user.level}
          </p>
        </div>
      </div>
      <span>
        <strong>{props.user.challengesCompleted}</strong>
        completados
      </span>
      <span>
        <strong>{props.user.currentExperience}</strong>
        xp
      </span>
    </div>
    </div>
  )
}

export default LeaderboardUser;