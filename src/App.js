import { useEffect, useReducer } from 'react';
import Header from './Header.js';
import Loader from './Loader.js';
import Error from './Error.js';
import StartScreen from './StartScreen.js';
import Question from './Question';
import Main from './Main.js';
import Progress from './Progress.js';
import FinishScreen from './FinishScreen.js';
import NextButton from './NextButton.js';
import Footer from './Footer.js';
import Timer from './Timer';
const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  point: 0,
  secondsRemaining:null
};

function reducer(state, action) {
  switch (action.type) {
    case 'dataReceived':
      return {
        ...state,
        questions: action.payload,
        status: "ready"
      };
    case 'dataFailed':
      return {
        ...state,
        status: 'error'
      };
    case 'start':
      return {
        ...state,
        status: 'active',
        secondsRemaining:state.questions.length * 30
      };
    case 'newAnswer':
      const question = state.questions.at(state.index);

      return {
        ...state,
        answer: action.payload,
        point: action.payload === question.correctOption
          ? state.point + question.points : state.point
      };
    case 'NextQuestion':
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      }
    case 'Finish':
      return {
        ...state,
        status: 'finished'
      }
    case 'Restart':
      return {
        ...initialState,
        questions: state.questions,
        status: 'ready'
      }
    case 'tick':
      return{
        ...state,
        secondsRemaining:state.secondsRemaining-1,
        status:state.secondsRemaining===0?'finished':state.status,
      };
    default:
      throw new Error('Action unknown..');
  }
}
export default function App() {
  const [{ questions, status, index, answer, point,secondsRemaining }, dispatch] = useReducer(reducer, initialState);
  // const {questions,status}=state;
  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce((prev, curr) =>
    prev + curr.points, 0);
  useEffect(function () {
    fetch("http://localhost:9000/questions")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        return dispatch({ type: 'dataReceived', payload: data })
      })
      .catch(err => dispatch({ type: 'dataFailed' }));
  }, []);
  return (
    <div className='app'>
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <StartScreen
          numQuestions={numQuestions}
          dispatch={dispatch}
        />}
        {status === 'active' &&
          <>
            <Progress index={index}
              point={point}
              numQuestions={numQuestions}
              maxPossiblePoints={maxPossiblePoints}
            />
            <Question question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer>
              <Timer secondsRemaining={secondsRemaining} dispatch={dispatch}/>
              <NextButton answer={answer}
                dispatch={dispatch}
                index={index}
                numQuestions={numQuestions}
              />
            </Footer>

          </>
        }

        {status === "finished" && <FinishScreen point={point} maxPossiblePoints={maxPossiblePoints} dispatch={dispatch} />}
      </Main>
    </div>

  );
}