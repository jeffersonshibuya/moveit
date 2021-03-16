import { GetServerSideProps} from 'next'

import CompleteChallenges from "../components/CompleteChallenges";
import Countdown from "../components/Countdown";
import ExperienceBar from "../components/ExperienceBar";
import Profile from "../components/Profile";

import styles from '../styles/pages/Home.module.css';
import ChallengeBox from "../components/ChallengeBox";
import { CountdownProvider } from "../contexts/CountdownContext";
import { ChallengesProvider } from '../contexts/ChallengesContext';
import LandingLayout from '../layouts/LandingLayout';
import { getSession } from 'next-auth/client';

interface HomeProps {
  level: number 
  currentExperience: number
  challengesCompleted: number,
  // user: User
  email: string;
  name: string;
  image: string;
}

export default function Home(props: HomeProps) {
  



  return (
    <ChallengesProvider 
      level={props.level} 
      currentExperience={props.currentExperience}
      challengesCompleted={props.challengesCompleted}
    >
      <div className={styles.container}>

        <ExperienceBar />

        <CountdownProvider>
          <section>
            <div >
              <Profile 
                email={props.email} 
                image={props.image}
                name={props.name}
              />
              <CompleteChallenges />
              <Countdown />
            </div>
            <div>
              <ChallengeBox />
            </div>
          </section>
        </CountdownProvider>
      </div>
    </ChallengesProvider>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // const { level, currentExperience, challengesCompleted } = ctx.req.cookies;

  const session = await getSession(ctx);
  const { level, currentExperience, challengesCompleted } = session;

  if(!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }

  return {
    props: {
      level: Number(level), 
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted),
      // user: session.user
      email: session.email, 
      image: session.image, 
      name: session.name
    }
  }
}
 
Home.Layout = LandingLayout