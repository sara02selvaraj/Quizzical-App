import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import StartQuiz from "./components/StartQuiz";
import QuizContainer from "./components/QuizContainer";
import "./App.css";
import he from 'he'


function App() {
  const [quiz, setQuiz] = useState([])
  const [score, setScore] = useState(0)
  const [displayResult, setDisplayResult] = useState(false)

  function handleQuiz() {
    renderQuiz()
  }

  function renderQuiz() {
    const dataURL = `https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple`
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
console.log(quiz)
  function handleSelected(quesId, selectedAnsId) {
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
        {quiz.length ? (
          <QuizContainer quiz={quiz} handleSelected={handleSelected}
          displayResult={displayResult} score={score} handleRestart={handleRestart} handleSubmit={handleSubmit}/>
        ) : (
          <StartQuiz handleQuiz={handleQuiz}/>
        )}
      </div>
    </main>
  )
}

export default App
