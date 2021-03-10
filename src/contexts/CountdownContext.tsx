import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ChallengesContext } from "./ChallengesContext";
let countdownTimeout: NodeJS.Timeout;

interface CountDownContext {
   minutes: number;
   segunds: number;
   hasFinished: boolean;
   isActive: boolean;
   startCountDown: () => void;
   resetCountDown: () => void;
}

interface CountDownProviderProps {
   children: ReactNode;
}

export const CountDownContext = createContext({} as CountDownContext);

export function CountdownProvider({ children }: CountDownProviderProps) {

   const { startNewChallenge } = useContext(ChallengesContext);


   const [time, setTime] = useState(25 * 60);
   const [isActive, setIsActive] = useState(false);
   const [hasFinished, setHasFinished] = useState(false);

   const minutes = Math.floor(time / 60);
   const segunds = time % 60;

   function startCountDown() {
      setIsActive(true);
   }

   function resetCountDown() {
      clearTimeout(countdownTimeout);
      setIsActive(false);
      setTime(25 * 60);
      setHasFinished(false);
   }

   useEffect(() => {
      if (isActive && time > 0) {
         countdownTimeout = setTimeout(() => {
            setTime(time - 1)
         }, 1000)
      } else if (isActive && time === 0) {
         setHasFinished(true);
         setIsActive(false);
         startNewChallenge();
      }
   }, [isActive, time])

   return (
      <CountDownContext.Provider value={{
         minutes,
         segunds,
         hasFinished,
         isActive,
         startCountDown,
         resetCountDown
      }}>
         {children}
      </CountDownContext.Provider>
   )
}