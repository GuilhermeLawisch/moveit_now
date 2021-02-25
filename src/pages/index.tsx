import { ExperienceBar } from '../components/ExperienceBar';
import { Profile } from '../components/Profile';
import { CompletedChallenges } from '../components/CompletedChallenges';
import { CountDown } from '../components/CountDown';
import { ChallengeBox } from '../components/ChallengeBox';
import { CountDownProvider } from '../contexts/CountDownContext'
 
import Head from 'next/head';

import styles from '../styles/components/Home.module.css';

export default function Home() {
  return (
    <div className={ styles.container }>
      <Head>
        <title>Início | Move.It</title>
      </Head>

      <ExperienceBar />

      <CountDownProvider>
        <section>
          <div>
            <Profile />
            <CompletedChallenges />
            <CountDown />
          </div>
          <div>
            <ChallengeBox />
          </div>
        </section>  
      </CountDownProvider> 
    </div>
  );
}
