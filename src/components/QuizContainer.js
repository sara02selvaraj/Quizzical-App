import Question from "./Question"
import Button from "./Button"

function QuizContainer(props) {
    return (
        <div>
            {props.quiz.map((item) => (
              <Question
                key={item.id}
                item={item}
                handleSelected={props.handleSelected}
                displayResult={props.displayResult}
              />
            ))}
            <Button score={props.score} displayResult={props.displayResult} handleRestart={props.handleRestart} handleSubmit={props.handleSubmit}/>
          </div>
    )
}

export default QuizContainer