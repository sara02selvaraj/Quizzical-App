import { nanoid } from "nanoid"
import { useState} from "react"
import Confetti from "react-confetti"
import he from 'he'
import StartQuiz from "./components/StartQuiz"
import QuizContainer from "./components/QuizContainer"
import {category} from './category'
import "./App.css"

function App() {
  const [quiz, setQuiz] = useState([])
  const [score, setScore] = useState(0)
  const [displayResult, setDisplayResult] = useState(false)

  const handleQuiz =(form) => {
    renderQuiz(form)
  }

  const renderQuiz = (form) => {
    const selectedCategory = category.filter(item  => item.type === form.category).map(item => item.id)
  
    const dataURL = `https://opentdb.com/api.php?amount=5&category=${selectedCategory}&difficulty=${form.range}&type=multiple`

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

  const handleRestart = () => {
    setQuiz([])
    setDisplayResult(false)
    setScore(0)
  }
  const shuffle = (arr) => {
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

  const handleSelected = (quesId, selectedAnsId) => {
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

  const handleSubmit = () => {
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

  const generateCategoryTypeForDropDown = () => {
    return category.map(item => item.type)
  }

  return (
    <main>
      {score >= 4 && <Confetti width={650} height={600}/> }
      <div className="container">
        {quiz.length ? (
          <QuizContainer quiz={quiz} handleSelected={handleSelected}
          displayResult={displayResult} score={score} handleRestart={handleRestart} handleSubmit={handleSubmit}/>
        ) : (
          <StartQuiz handleQuiz={handleQuiz} types = {generateCategoryTypeForDropDown()}/>
        )}
      </div>
    </main>
  )
}

export default App
