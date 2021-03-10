import styles from "../styles/components/CountDown.module.css";
import { useContext, useEffect, useState } from 'react';
import { ChallengesContext } from "../contexts/ChallengesContext";
import { CountDownContext } from "../contexts/CountdownContext";

export function CountDown() {

   const { hasFinished, isActive, minutes, resetCountDown, segunds, startCountDown } = useContext(CountDownContext);

   const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
   const [segundsLeft, segundsRight] = String(segunds).padStart(2, '0').split('');


   return (
      <div>
         <div className={styles.CountDownContainer}>
            <div>
               <span>{minuteLeft}</span>
               <span>{minuteRight}</span>
            </div>
            <span>:</span>
            <div>
               <span>{segundsLeft}</span>
               <span>{segundsRight}</span>
            </div>
         </div>
         {hasFinished ? (
            <button
               disabled
               className={`${styles.countDownButton}`}
            >
               Ciclo encerrado
            </button>
         ) : (
            <>
               {
                  isActive ? (
                     <button onClick={resetCountDown} className={`${styles.countDownButton} ${styles.countDownButtonActive}`} type="button">
                        Abandonar ciclo
                     </button>
                  ) : (
                     <button onClick={startCountDown} className={styles.countDownButton} type="button">
                        Iniciar um ciclo
                     </button>
                  )
               }
            </>)
         }




      </div >
   )
}