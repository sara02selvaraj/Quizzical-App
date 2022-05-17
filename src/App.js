import { nanoid } from 'nanoid';
import { useEffect, useState } from 'react';
import './App.css';
import Quiz from './components/Quiz';

function App() {
  const [quiz, setQuiz] = useState([])
  const [score, setScore] = useState(0)
  const [displayResult, setDisplayResult] = useState(false)

  function handleQuiz() {
    const dataURL = `https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple`
    fetch(dataURL).then(res => res.json())
    .then(data => {
      setQuiz(data.results.map(item => {
        return {
          id: nanoid(),
          question: item.question,
          answers: shuffle([...item.incorrect_answers, item.correct_answer]),
          correctAnswer : item.correct_answer,
          scored: false
          
        }
      }))
    }
    )
  }


  function shuffle(arr) {
   let array = arr.map(ans => {
      return {
        id: nanoid(),
        answer: ans,
        isSelected: false
        
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

  function handleSelected(quesId,selectedAnsId) {
    setQuiz(prevState => prevState.map(item => {
      if (item.id === quesId) {
        return {
          ...item, 
        answers: item.answers.map(ans => {
          return ans.id === selectedAnsId ? {...ans, isSelected: !ans.isSelected} : {...ans, isSelected: false}
        } ),
        scored: item.correctAnswer == item.answers.find(ans => ans.id === selectedAnsId).answer ? true : false
        }
      }
        else{
          return item
        }
      // return {
      //   ...item, 
      //   answers: item.answers.map(ans => {
      //     return ans.id === ansId ? {...ans, isSelected: !ans.isSelected} : ans
      //   })
      // }
    })
    )
  }

  console.log(quiz)

  function handleSubmit() {
    let count = quiz.filter(item => item.scored)
    setScore(count.length)
    setDisplayResult(true)
  }

  return (
    <main>
      <div className="container">
        {
          quiz.length > 0 ? <div>
          {
            quiz.map(item => <Quiz key={item.id} id={item.id} question={item.question}
              answers= {item.answers} handleSelected={handleSelected} scored={item.scored} displayResult={displayResult}/> 
            )
          } 
          {
            score > 0 && <p>You scored {score}/5 correct answers</p>
          }
          <button onClick={handleSubmit} className='btn-primary'>Check answers</button>
          </div>
           : 
            <div>
              <h1 className='title'>Quizzical</h1>
              <p>Quizzical app to test your knowledge</p>
              <button onClick={handleQuiz} className='btn-primary'>Start Quiz</button>
            </div>
        }
      </div>
    </main>
    
  )
}

export default App;
