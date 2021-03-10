import styles from "../styles/components/ExperienceBar.module.css";
import { ChallengesContext  } from "../contexts/ChallengesContext";
import { useContext } from 'react';

export function ExperienceBar() {
   const { currentExperience, experinceToNextLevel } = useContext(ChallengesContext);

   const percenteToNextLevel = Math.round(currentExperience * 100) / experinceToNextLevel

   return (
      <header className={styles.experienceBar}>
         <span>0 px</span>
         <div>
            <div style={{ width: `${percenteToNextLevel}%` }}>
               <span className={styles.currentExpirence} style={{ left: `${percenteToNextLevel}%` }}>
               { currentExperience } px
               </span>
            </div>
         </div>
         <span>{experinceToNextLevel} px</span>
      </header>
   )
}