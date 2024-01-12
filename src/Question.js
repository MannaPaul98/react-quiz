import React from 'react';
import Options from './Options.js';

export default function Question({ question,answer,dispatch }) {
  return (
    <div>
      <h4>{question.question}</h4>
      <Options question={question} dispatch={dispatch}answer={answer} />
    </div>

  );
}
