import { useState, useEffect, useContext,createContext, ReactNode } from 'react';
import { NodeJS } from 'node';
import { ChallengesContext } from './ChallengesContext';

interface CountDownContextData {
  isActive: boolean;
  hasFinished: boolean;
  minutes: number;
  seconds: number;
  startCountDown: () => void;
  resetCountDown: () => void;
}

interface CountDownProviderProps {
  children: ReactNode;
}

let countdownTimeout: NodeJS, Timeout;

export const CountDownContext = createContext({} as CountDownContextData)

export function CountDownProvider({ children }:CountDownProviderProps) {
  const { startNewChallenge } = useContext(ChallengesContext);

  const [time, setTime] = useState(30 * 60);
	const [isActive, setIsActive] = useState(false);
	const [hasFinished, setHasFinished] = useState(false);

	const minutes = Math.floor(time / 60);
	const seconds = time % 60;
  
  function startCountDown() {
		setIsActive(true);
	}

	function resetCountDown() {
		clearTimeout(countdownTimeout);
		setIsActive(false);
    setHasFinished(false);
		setTime(30 * 60);
	}
 
	useEffect(() => {
		if (isActive && time > 0) {
			countdownTimeout = setTimeout(() => {
				setTime(time - 1);
			}, 1000)
		} else if (isActive && time === 0) {
			setHasFinished(true);
			setIsActive(false);
			startNewChallenge();
		}
	}, [isActive, time])

  return(
    <CountDownContext.Provider
      value={{
        isActive,
        hasFinished,
        minutes,
        seconds,
        startCountDown,
        resetCountDown,
      }}
    >
      {children}
    </CountDownContext.Provider>
  ) 
}

