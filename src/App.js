import { useState } from 'react';
import './App.css';
import Quiz from './components/Quiz';

function App() {
  const [quiz, setQuiz] = useState([])
  function handleQuiz() {
    const dataURL = `https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple`
    fetch(dataURL).then(res => res.json())
    .then(data => {
      console.log(data.results)
      setQuiz(data.results)
    }
    )
  }
  return (
    <main>
      <div className="container">
        {
          quiz.length > 0 ? quiz.map(item => <Quiz question={item.question}/>)
           : 
            <div>
              <h1>Quizzical</h1>
              <p>Quizzical app to test your knowledge</p>
              <button onClick={handleQuiz} className='btn-primary'>Start Quiz</button>
            </div>
        }
      </div>
    </main>
    
  )
}

export default App;
