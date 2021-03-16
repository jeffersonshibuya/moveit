import { useSession } from 'next-auth/client'
import { useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengesContext'
import { CountdownContext } from '../contexts/CountdownContext'
import styles from '../styles/components/ChallengeBox.module.css'

const ChallengeBox: React.FC = () => {
  const { activeChallenge, resetChallenge, completeChallenge } = useContext(ChallengesContext)
  const { resetCountdown } = useContext(CountdownContext)
  const [session] = useSession()

  function handleChallengeSucceeded(id: string) {
    completeChallenge(id);
    resetCountdown()
  }

  function haldeChallengeFailed() {
    resetChallenge();
    resetCountdown()
  }

  return (
    <div className={styles.challengeboxContainer}>
      {activeChallenge 
        ? (
          <div className={styles.challengeActive}>
            <header>Ganhe {activeChallenge.amount} xp</header>

            <main>
              <img src={`icons/${activeChallenge.type}.svg`} alt=""/>
              <strong>Novo desafio</strong>

              <p>{activeChallenge.description}</p>
            </main>

            <footer>
              <button type="button" 
                onClick={haldeChallengeFailed} 
                className={styles.challengeFailButton}>
                Falhei
              </button>
              <button type="button" 
                onClick={() => handleChallengeSucceeded(session._id)} 
                className={styles.challengeSucceededButton}>
                Completei
              </button>
            </footer>
          </div>
        )
        : (
          <div className={styles.challengeNotActive}>
            <strong>Finalize um ciclo para receber um desafio</strong>
            <p>
              <img src="icons/level-up.svg" alt="Level Up"/>
              Avance de level complentando desafios.
            </p>
          </div>
        )
      }
    </div>
  )
}

export default ChallengeBox;