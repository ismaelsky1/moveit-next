import { useContext } from "react";
import { ChallengesContext } from "../contexts/ChallengesContext";
import { CountDownContext } from "../contexts/CountdownContext";
import styles from "../styles/components/ChallengeBox.module.css";
export function ChallengeBox() {

   const { activeChallenge, resetChallenge, completedChallenge } = useContext(ChallengesContext);
   const { resetCountDown } = useContext(CountDownContext);

   function handleChallengeSucceeded() {
      completedChallenge();
      resetCountDown();

   }
   function handleChallengeFailed() {
      resetChallenge();
      resetCountDown();
      
   }

   return (
      <div className={styles.challengesBoxContainer}>
         { activeChallenge ? (
            <div className={styles.challengeActive}>
               <header>Ganhe {activeChallenge.amount} xp</header>
               <main>
                  <img src={`icons/${activeChallenge.type}.svg`} />
                  <strong>Nove desafio</strong>
                  <p>
                     {activeChallenge.description}
                  </p>
               </main>
               <footer>
                  <button onClick={handleChallengeFailed} type='button' className={styles.challengeFailedButton}>Falhei</button>
                  <button onClick={handleChallengeSucceeded} type='button' className={styles.challengeSucceededButton}>Completei</button>
               </footer>
            </div>
         ) : (
            <div className={styles.challengesNotActive}>
               <strong>
                  Finalize um ciclo para receber um desafil
             </strong>
               <p>
                  <img src="icons/level.svg" />
               avançe de level completando desafios.
            </p>
            </div>
         )}
      </div>
   )
}