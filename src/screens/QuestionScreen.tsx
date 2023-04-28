import { useState } from 'react'
import Card from '../components/Card'
import { QuizData } from '../interfaces'
import blob3 from '../assets/blob-3.png'
import blob4 from '../assets/blob-4.png'
import Button from '../components/Button'


interface QuestionScreenProps {
    quizData: QuizData[],
    setQuizData: React.Dispatch<React.SetStateAction<QuizData[] | null>>
} 

export default function QuestionScreen({quizData, setQuizData}: QuestionScreenProps) {

    const [isCheckAnswers, setIsCheckAnswers] = useState(false)
   
    // this function fires when the user clicks an answer; it highlights that answer blue and updates the quizData state with the selected answer
    function handleChange(event: React.ChangeEvent<HTMLInputElement>, index: number) {
       
        const userSelectedAnswer = (event.target as HTMLInputElement).value

        setQuizData(prev => {
            return prev!.map((quizItem) => (
            quizItem.id === index? {...quizItem, selectedAnswer: userSelectedAnswer} : quizItem
            ))
        })
    }

    // this function fires when the check answers button is clicked; it sets the checkAnswers state to true, which in turn colors the incorrect answers red and the correct answers green, and calls the getStats function
    function checkAnswers() {
        setIsCheckAnswers(true)
    }

    // this function fires when the checkAnswers state is true; it loops through the quiz data to see how many questions were answered, and how many were correctly answered, returning a string to render
    function getStats() {
        let numQuestionsAnswered = 0
        let numCorrectAnswers = 0

        quizData.forEach(quizItem => {
            quizItem.selectedAnswer ? numQuestionsAnswered += 1 : numQuestionsAnswered
            quizItem.selectedAnswer === quizItem.correctAnswer ? numCorrectAnswers += 1 : numCorrectAnswers
        })

        return `${numCorrectAnswers} / ${numQuestionsAnswered}`
    }

    // this function fires when the play again button is clicked, it resets the states and thus returns the user to the intro screen
    function resetGame() {
        setQuizData(null)
        setIsCheckAnswers(false)
    }
   
    return  (
        <div className='question-screen-container'>

            <img src={blob3} alt='' className='question-blob3'/>    
            <img src={blob4} alt='' className='question-blob4'/>         

            <div className='questions-container'>
                {quizData.map((quizItem, index) => (
                    <Card 
                        key={index} 
                        quizItem={quizItem} 
                        handleChange={(event)=>handleChange(event, index)} 
                        isCheckAnswers={isCheckAnswers}
                    />
                ))}
            </div>

            {!isCheckAnswers ? 
            <Button className='check-answers-btn' onClick={checkAnswers}>
                Check answers
            </Button>
            :
            <div className='score-container'>
                <p className='score'>{`You answered ${getStats()} questions correctly`}</p>
                <Button className='reset-btn' onClick={resetGame}>
                    Play again
                </Button>
            </div>
            }

        </div>  
    ) 
}