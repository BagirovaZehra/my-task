import React, { useState } from 'react';
import timercss from './Timer.module.css';

const Timer = () => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [remainingTime, setRemainingTime] = useState(null);
  const [intervalNum, setIntervalNum] = useState(null);

  const writeHours = (e) => {
    resetTimer();
    setHours(Number(e.target.value));
  };

  const writeMinutes = (e) => {
    resetTimer();
    setMinutes(Number(e.target.value));
  };

  const writeSeconds = (e) => {
    resetTimer();
    setSeconds(Number(e.target.value));
  };

  const resetTimer = () => {
    if (intervalNum) {
      clearInterval(intervalNum);
      setIntervalNum(null);
    }
    setRemainingTime(null);
  };

  const startTimer = () => {
    if (intervalNum) return; 

    const totalSeconds = (remainingTime !== null) ? remainingTime : hours * 3600 + minutes * 60 + seconds;

    setRemainingTime(totalSeconds);

    const interval = setInterval(() => {
      setRemainingTime((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIntervalNum(null);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    setIntervalNum(interval);
  };

  const pauseTimer = () => {
    if (intervalNum) {
      clearInterval(intervalNum);
      setIntervalNum(null);
      alert(formatTime(remainingTime))
    }
  };

  const formatTime = (time) => {
    if (time === null) return `${hours}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;

    const hrs = Math.floor(time / 3600);
    const mins = Math.floor((time % 3600) / 60);
    const secs = time % 60;
    return `${hrs}:${mins < 10 ? `0${mins}` : mins}:${secs < 10 ? `0${secs}` : secs}`;
  };

  return (
    <div className={timercss.timer}>
      <div>
        <input
          placeholder="Saatı daxil edin"
          className={timercss.input}
          value={hours || ''}
          onChange={writeHours}
          type="number"
        />
        <input
          placeholder="Dəqiqəni daxil edin"
          className={timercss.input}
          value={minutes || ''}
          onChange={writeMinutes}
          type="number"
        />
        <input
          placeholder="Saniyəni daxil edin"
          className={timercss.input}
          value={seconds || ''}
          onChange={writeSeconds}
          type="number"
        />
      </div>
      <button className={timercss.button} onClick={startTimer}>Start</button>
      <button className={timercss.button} onClick={pauseTimer}>Pauza</button>
      <h1>{formatTime(remainingTime)}</h1>
    </div>
  );
};

export default Timer;