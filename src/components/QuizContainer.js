import Question from "./Question"
import Button from "./Button"

function QuizContainer(props) {
    return (
        <div>
            {props.quiz.map((item) => (
              <Question
                key={item.id}
                id={item.id}
                question={item.question}
                answers={item.answers}
                handleSelected={props.handleSelected}
                scored={item.scored}
                displayResult={props.displayResult}
              />
            ))}
            <Button score={props.score} displayResult={props.displayResult} handleRestart={props.handleRestart} handleSubmit={props.handleSubmit}/>
          </div>
    )
}

export default QuizContainer