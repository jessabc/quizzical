function Question({question, selected}) {

  return (
    <div className="question-container">
        <h3>{question.question}</h3>
        <div id={question.question} className='multiple-choice-container'>
            {question.answers.map((answer, index) => <p key={index} id={answer} onClick={(e) => selected(e, answer)}>{answer}</p>)}
        </div>
    </div>
  )
}

export default Question
