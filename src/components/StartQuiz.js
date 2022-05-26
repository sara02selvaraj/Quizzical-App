import React,{useState} from "react"

function StartQuiz(props) {
  const [selectedRange, setSelectedRange] = useState('')
    return (
        <div className="content">
            <h1 className="title">Quizzical</h1>
            <p>Quizzical app to test your general knowledge</p>
            <select className="select-control"
            value={selectedRange} onChange={(e) => setSelectedRange(e.target.value)} >
                <option value="">Select Difficulty</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
            </select>
            <button onClick={()=>props.handleQuiz(selectedRange)} className="btn btn-primary">
              Start Quiz
            </button>
        </div>
    )
}

export default StartQuiz