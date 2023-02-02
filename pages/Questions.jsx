import { useEffect } from 'react'
import { useState } from 'react'
import Question from './Question'

function Questions({formData, setStartGame, setFormData}) {
    const [triviaQuestions, setTriviaQuestions] = useState([])
    const [questionsAnswered, setQuestionsAnswered] = useState(0)
    const [answeredCorrectly, setAnsweredCorrectly] = useState(0)
    const [gameOver, setGameOver] = useState(false)
    console.log(triviaQuestions)
 
    useEffect(() => {
        fetch(`https://opentdb.com/api.php?amount=${formData.numQuestions}&category=${formData.catergory}&difficulty=${formData.difficulty}&type=multiple&encode=base64`)
            .then(res => res.json())
            .then(data => {

                const questionsArray = data.results.map(item => {
       
                    return {
                        question: atob(item.question),
                        correctAnswer: atob(item.correct_answer),
                        incorrectAnswers: [...item.incorrect_answers].map(item => atob(item)),
                        answers: [...item.incorrect_answers, item.correct_answer].sort(() => Math.random() - 0.5).map(item => atob(item)),
                        answerSelected: ''
                    }
        
                })

               setTriviaQuestions(questionsArray)

            })
    },[])

    function selected(e, answer) {
        const targetQuestion = e.target.parentElement.id
        const selectedAnswer = answer

        setTriviaQuestions(prevTriviaQuestions => prevTriviaQuestions.map(question => (
            question.question === targetQuestion ? {...question, answerSelected: selectedAnswer} : question

        )))

        const answersArray = Array.from(e.target.parentElement.children)
        answersArray.forEach(item => item.classList.remove('selected'))
        document.getElementById(selectedAnswer).classList.toggle('selected')
    }
   
    function checkAnswers() {
        for(let question of triviaQuestions) {
            if(question.correctAnswer == question.answerSelected) {
                setAnsweredCorrectly(prevCount => prevCount + 1)
            }

            if(question.answerSelected) {
                setQuestionsAnswered(prevCount => prevCount + 1)
                if (question.correctAnswer != question.answerSelected ){
                    document.getElementById(question.answerSelected).classList.add('mark-incorrect')
                }
            }

            document.getElementById(question.correctAnswer).classList.add('mark-correct')
        }
        
        setGameOver(true)
    }

    function playAgain() {
        setStartGame(false)
        setGameOver(false)
        setTriviaQuestions([])
        setQuestionsAnswered(0)
        setAnsweredCorrectly(0)
        setFormData({
            numQuestions: '',
            catergory: '',
            difficulty: ''
          })
    }

    const questionElements = triviaQuestions.map((question, index) => 
        <Question 
            key={index} 
            question={question} 
            selected={selected}/>)

  return (
        <div className='questions-container'>
            {questionElements}

            {!gameOver && <button className='check-answers-btn' onClick={checkAnswers}>check answers</button>}

            <div className='flex'>
            {gameOver && <p className='score'>You got {answeredCorrectly} / {questionsAnswered} right!</p>}

            {gameOver && <button onClick={playAgain} className='play-again-btn'>Play again</button>}

            </div>
        </div>
    )
}

export default Questions
