import React from 'react'

export default function Progress({index,point,numQuestions,maxPossiblePoints}) {
  return (
    <header className='progress'>
        <progress max={numQuestions} value={index} />
        <p>
            Questions<strong>{index+1}</strong>/{numQuestions}
        </p>
        <p>
            Points<strong>{point}</strong>/{maxPossiblePoints}
        </p>
    </header>
  );
}
