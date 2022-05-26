import { nanoid } from "nanoid"
import { useState } from "react"
import blob from './assets/img/blob.png'
import blob1 from './assets/img/blob1.png'
import StartQuiz from "./components/StartQuiz"
import QuizContainer from "./components/QuizContainer"
import "./App.css"
import he from 'he'


function App() {
  const [quiz, setQuiz] = useState([])
  const [score, setScore] = useState(0)
  const [displayResult, setDisplayResult] = useState(false)

  function handleQuiz(range) {
    renderQuiz(range)
  }

  function renderQuiz(range) {
    const dataURL = `https://opentdb.com/api.php?amount=5&category=9&difficulty=${range}&type=multiple`
    console.log(dataURL)
    fetch(dataURL)
      .then((res) => res.json())
      .then((data) => {
        setQuiz(
          data.results.map((item) => {
            return {
              id: nanoid(),
              question: he.decode(item.question),
              answers: shuffle([
                ...item.incorrect_answers,
                item.correct_answer,
              ]),
              correctAnswer: he.decode(item.correct_answer),
              scored: false,
              isAttempted: false
            }
          })
        )
      })
  }

  function handleRestart() {
    setQuiz([])
    setDisplayResult(false)
    setScore(0)
  }

  function shuffle(arr) {
    let array = arr.map((ans) => {
      return {
        id: nanoid(),
        answer: he.decode(ans),
        isSelected: false,
      }
    })
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1))
      let temp = array[i]
      array[i] = array[j]
      array[j] = temp
    }
    return array
  }

  function handleSelected(quesId, selectedAnsId) {
    if(!displayResult) {
      setQuiz((prevState) =>
      prevState.map((item) => {
        if (item.id === quesId) {
          return {
            ...item,
            answers: item.answers.map((ans) => {
              return ans.id === selectedAnsId
                ? { ...ans, isSelected: !ans.isSelected }
                : { ...ans, isSelected: false };
            }),
            scored:item.correctAnswer === item.answers.find((ans) => ans.id === selectedAnsId).answer,
            isAttempted : !item.isAttempted
          }
        } else {
          return item
        }
      })
    )
    }
  }

  function handleSubmit() {
    const allSelectionArray = quiz.map(item => item.answers.some(ans => ans.isSelected))
    const allQuestionAttempted = allSelectionArray.every(item => item)
    if(allQuestionAttempted) {
      let count = quiz.filter((item) => item.scored)
        setScore(count.length)
        setDisplayResult(true)
    }else {
      alert('Please attempt all questions')
    }
  }

  return (
    <main>
      <div className="container">
        <img className="img blob-yellow" src={blob} alt=''/>
        {quiz.length ? (
          <QuizContainer quiz={quiz} handleSelected={handleSelected}
          displayResult={displayResult} score={score} handleRestart={handleRestart} handleSubmit={handleSubmit}/>
        ) : (
          <StartQuiz handleQuiz={handleQuiz}/>
        )}
        <img className="img blob-blue" src={blob1} alt=''/>
      </div>
    </main>
  )
}

export default App
