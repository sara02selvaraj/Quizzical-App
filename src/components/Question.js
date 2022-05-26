function Question(props) {
    let bgColor 
    if(props.displayResult){
        if(props.item.scored){
            bgColor = '#94D7A2'
    }
        else{
            bgColor ='#F8BCBC'
        }
    }
    else {
        bgColor = '#8a9bee'
    }
    

    return (
        <div className="question--container">
            <h2 className="question--text">{props.item.question}</h2>
            <div className="question--answers">
               {
                    props.item.answers.map(ans => <p key={ans.id} 
                        onClick={() => props.handleSelected(props.item.id,ans.id)} 
                    className={`answers-item ${props.displayResult && ans.answer === props.item.correctAnswer ? 'bg-class' : ''}`}
                    style={{backgroundColor: ans.isSelected && bgColor }}>{ans.answer}</p>)
                }
            </div>
            
        </div>
    )
}

export default Question