function StartQuiz(props) {
    return (
        <div>
            <h1 className="title">Quizzical</h1>
            <p>Quizzical app to test your general knowledge</p>
            <button onClick={props.handleQuiz} className="btn btn-primary">
              Start Quiz
            </button>
        </div>
    )
}

export default StartQuiz