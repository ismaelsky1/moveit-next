import styles from "../styles/components/CompletedChallenges.module.css";
import { useContext } from 'react';
import { ChallengesContext } from "../contexts/ChallengesContext";
export function CompletedChallenges (){

const { challengeCompleted } =  useContext(ChallengesContext);

   return (
      <div className={styles.CompletedChallengesContainer}>
        <span>Desafios completos</span>
        <span>{challengeCompleted}</span>
      </div>
   )
}