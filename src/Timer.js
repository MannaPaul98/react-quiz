import React, { useEffect } from 'react';

export default function({secondsRemaining,dispatch}) {
  const min=Math.floor(secondsRemaining / 60);
  const seconds=secondsRemaining % 60;
  useEffect(function(){
    const id=setInterval(function(){
      dispatch({type:'tick'})
    },1000);
    return () =>clearInterval(id);
  },[dispatch])

  return (
    <div className='timer'>{min<10?'0'+min:min}:{seconds<10?"0"+seconds:seconds}</div>
  );
}
