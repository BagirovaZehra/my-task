import React from 'react'
import secondscss from './Seconds.module.css'
import { useState } from 'react'
const Seconds = () => {
  const [seconds,setSeconds]=useState(0);
  const [isTrue,setIsTrue]=useState(false);
  const [timeSecond,setTimeSecond]=useState(null)
  const startSeconds = ()=>{
    setIsTrue(true)
    const newInterval = setInterval(()=>{
      setSeconds((i)=> i+1)
    },1000)
    setTimeSecond(newInterval)
  }
  const pauzaSeconds = ()=>{
    if(isTrue){
      clearInterval(timeSecond);
      setIsTrue(false)
   }
  }

  const resetSeconds = ()=>{
    alert(formatTime(seconds))
    clearInterval(timeSecond)
    setSeconds(0)
  }
 
  const formatTime = (time)=>{
    const mins = Math.floor(time/60);
    const secs = time%60;
    return `${mins < 10 ? `0${mins}` : mins}:${secs < 10 ? `0${secs}` : secs}`;
  }
  
  return (
    <div className={secondscss.second}>
      <div>
      <button className={secondscss.seconds} onClick={startSeconds}>Start</button>
      <button className={secondscss.seconds} onClick={pauzaSeconds}>Pauza</button>
      <button className={secondscss.seconds} onClick={resetSeconds}>Sıfırla</button>
      </div>
        <h1>{formatTime(seconds)}</h1>
    </div>
  )
}

export default Seconds