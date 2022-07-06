import React,{useState} from "react"

function StartQuiz(props) {
  const [form, setForm] = useState({
    range :'',
    category: ''
  })

  const handlechange = (e) => {
   setForm(prevStat => {
    return {
      ...prevStat,
      [e.target.name] : e.target.value
    }
   })
  }
    return (
        <div className="content">
            <h1 className="title">Quizzical</h1>
            <p>Quizzical app to flex your brain</p>
            <select className="select-control" name="range"
            value={form.range} onChange={handlechange} >
                <option value="">Select Difficulty</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
            </select>
            <select className="select-control" name="category"
            value={form.category} onChange={handlechange} >
                <option value="">Select Category</option>
                {props.types.map((type) => (
                  <option value={type} key={type}>{type}</option>
                ))}
            </select>
            <button onClick={()=>props.handleQuiz(form)} className="btn btn-primary">
              Start Quiz
            </button>
        </div>
    )
}

export default StartQuiz