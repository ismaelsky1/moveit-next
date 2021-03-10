import { createContext, useState, ReactNode, useEffect } from "react";
import challenges from "../../challenges.json";

import Cookies from "js-cookie";
import { LevelUpModal } from "../components/LevelUpModal";

export const ChallengesContext = createContext({} as ChallengeContextData);

interface Challenge {
   "type": 'body' | 'eye',
   "description": string,
   "amount": number
}

interface ChallengeContextData {
   level: number,
   currentExperience: number,
   experinceToNextLevel: number,
   challengeCompleted: number,
   activeChallenge: Challenge,
   startNewChallenge: () => void,
   levelUp: () => void,
   resetChallenge: () => void,
   completedChallenge: () => void,
   closeModal: () => void   
}

interface ChallengesProviderProps {
   children: ReactNode;
   level: number,
   currentExperience: number,
   challengeCompleted: number
}

export function ChallengesProvider({ children, ...rest }: ChallengesProviderProps) {

   const [level, setLevel] = useState(rest.level ?? 1);
   const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
   const [challengeCompleted, setChallengeCompleted] = useState(rest.challengeCompleted ?? 0);

   const [activeChallenge, setAtiveChallenge] = useState(null);
   const [isLevelUpMOdalOpen,setIsLevelUpMOdalOpen] = useState(false);

   const experinceToNextLevel = Math.pow((level + 1) * 4, 2);

   useEffect(() => {
      Notification.requestPermission();
   }, [])

   useEffect(() => {
      Cookies.set('level', String(level));
      Cookies.set('currentExperience', String(currentExperience));
      Cookies.set('challengeCompleted', String(challengeCompleted));
   }, [level, currentExperience, challengeCompleted])

   function levelUp() {
      setLevel(level + 1);
      setIsLevelUpMOdalOpen(true)
   }

   function startNewChallenge() {
      const radom = Math.floor(Math.random() * challenges.length);
      const challenge = challenges[radom];
      setAtiveChallenge(challenge);

      new Audio('notification.mp3').play();

      if (Notification.permission === 'granted') {
         new Notification('Novo desafil 🛴', {
            body: `Valendo ${challenge.amount}`,
            data: 'I like peas.'
         })
      }
   }

   function resetChallenge() {
      setAtiveChallenge(null)
   }

   function completedChallenge() {
      if (!activeChallenge) {
         return;
      }

      const { amount } = activeChallenge;

      let finalExpirence = currentExperience + amount;

      if (finalExpirence >= experinceToNextLevel) {
         finalExpirence = finalExpirence - experinceToNextLevel;
         levelUp();
      }

      setCurrentExperience(finalExpirence);
      setAtiveChallenge(null)
      setChallengeCompleted(challengeCompleted + 1)
   }

   function closeModal(){
      setIsLevelUpMOdalOpen(false);
   }

   return (
      <ChallengesContext.Provider value={{
         level,
         currentExperience,
         experinceToNextLevel,
         challengeCompleted,  
         activeChallenge,
         startNewChallenge,
         levelUp,
         resetChallenge,
         completedChallenge,
         closeModal
      }}>
         {children}

         {isLevelUpMOdalOpen && <LevelUpModal />}
      </ChallengesContext.Provider>
   );
}