export default function Quiz(props) {
//    function handleBg() {
//     if(props.displayResult) {
//         if(item.score) {
//             backgroundColor: "green"
//         } else{
//             if(item.isSelected){
//                 backgroundColor: "red"
//             }
            
//         }
//     }else{
//         if(item.isSelected){
//             backgroundColor: "#D6DBF5"
//         }
//     }
//    }

    return (
        <div className="quiz--container">
            <h2 className="quiz--question">{props.question}</h2>
            <div className="quiz--answers">
               {
                    props.answers.map(item => <p key={item.id} onClick={() => props.handleSelected(props.id,item.id)} 
                    className={`answers-item ${!props.displayResult && item.isSelected ? 'bg-class' : ''}`}
                    style={{backgroundColor: props.displayResult && props.scored && item.isSelected  ?  "#94D7A2" : item.isSelected && !props.scored && props.displayResult ? '#F8BCBC' : ""  }}>{item.answer}</p>)
                }
            </div>
            
        </div>
    )
}