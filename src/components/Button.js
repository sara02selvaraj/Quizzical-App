function Button(props) {
    return (
        <>
        {props.displayResult ? (
            <div className="footer">
              <p>You scored {props.score}/5 correct answers</p>
              <button onClick={props.handleRestart} className="btn btn-secondary">
                Play Again
              </button>
            </div>
          ) : (
            <button onClick={props.handleSubmit} className="btn btn-secondary">
              Check answers
            </button>
          )}
        </>
    )
}

export default Button