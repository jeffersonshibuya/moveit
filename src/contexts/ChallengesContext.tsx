import { createContext, useState, ReactNode, useEffect } from 'react'
import challenges from '../../challenges.json'
import Cookies from 'js-cookie';
import { LevelUpModal } from '../components/LevelUpModal';
import api from '../service/api'

interface IChallenge {
  type: 'body' | 'eye',
  description: string;
  amount: number;
}

interface ChallengesContextData {
  level: number;
  currentExperience: number; 
  challengesCompleted: number; 
  experienceToNextLevel: number;
  activeChallenge: IChallenge,
  levelUp:  () => void;
  startNewChallenge: () => void;
  resetChallenge: () => void;
  completeChallenge: (id: string) => void;
  closeLevelModal: () => void;
}

interface ChallengesProviderProps {
  children: ReactNode;
  level: number 
  currentExperience: number
  challengesCompleted: number
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({ children, ...rest }: ChallengesProviderProps) {
  const [level, setLevel] = useState(rest.level ?? 1);
  const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
  const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0);

  const [activeChallenge, setActiveChallenge] = useState<IChallenge>(null);
  const [isLevelModalOpen, setIsLevelModalOpen] = useState(false)

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

  useEffect(() => {
    Notification.requestPermission();
  }, [])

  useEffect(() => {
    Cookies.set('level', String(level))
    Cookies.set('currentExperience', String(currentExperience))
    Cookies.set('challengesCompleted', String(challengesCompleted))
  }, [level, currentExperience, challengesCompleted])

  function levelUp() {
    setLevel(level + 1);
    setIsLevelModalOpen(true);
  }

  function closeLevelModal() {
    setIsLevelModalOpen(false)
  }

  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length)

    const challenge = challenges[randomChallengeIndex]
    setActiveChallenge(challenge as IChallenge);

    new Audio('/notification.mp3').play();

    if(Notification.permission === 'granted') {
      new Notification('Novo desafio 🎉', {
        body: `Valendo ${challenge.amount}xp!`,
        silent: true
      })
    }
  }

  function resetChallenge() {
    setActiveChallenge(null);
  }

  async function completeChallenge(id: string) {
    if(!activeChallenge) {
      return;
    }

    let newLevel = level;
    const { amount } = activeChallenge;

    let finalExperience = currentExperience + amount;

    if(finalExperience >= experienceToNextLevel) {
      finalExperience = finalExperience - experienceToNextLevel;
      levelUp();
      newLevel = level + 1;
    }
    setCurrentExperience(finalExperience);
    setActiveChallenge(null);
    setChallengesCompleted(challengesCompleted + 1);
    
    await api.put('api/users', {
      id,
      level: newLevel, 
      currentExperience: finalExperience, 
      challengesCompleted: challengesCompleted + 1
    })
  }

  return (
    <ChallengesContext.Provider 
      value={{  
        level, 
        currentExperience, 
        challengesCompleted,
        experienceToNextLevel,
        activeChallenge, 
        levelUp, 
        startNewChallenge,
        resetChallenge,
        completeChallenge,
        closeLevelModal
      }}>
      {children}

      {isLevelModalOpen && <LevelUpModal /> }
    </ChallengesContext.Provider>
  )
}

