import { QuizData } from "../interfaces"
import he from 'he'


interface CardProps {
    quizItem: QuizData,
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    isCheckAnswers: boolean
}

export default function Card({quizItem, handleChange, isCheckAnswers}: CardProps) {

    return (
        <>
            <p className="question">{he.decode(quizItem.question)}</p>

            <div className="choices-container">
                {quizItem.multipleChoice.map(choice => (
                <div 
                    key={choice} 
                    // checks if the user wants to check answers, if so, then if their 'selected' answer was 'incorrect' it turns red, all 'corrects' answers turn green, all other 'unselected' answers turn lighter with opacity css; if check answers is false then answer will turn blue on hover
                    className={`choice-container  ${isCheckAnswers ? choice === quizItem.correctAnswer ? 'correct' : choice === quizItem.selectedAnswer ? 'incorrect' : 'unselected' : choice === quizItem.selectedAnswer ? 'selected': 'blue-hover'}`}
                    >
                        <label 
                            htmlFor={choice} 
                            className="choice-label">
                        <input 
                            type="radio" 
                            id={choice} 
                            name={quizItem.question} 
                            value={choice} 
                            onChange={handleChange} 
                            disabled={isCheckAnswers ? true : false}
                        />
                            {he.decode(choice)}
                        </label>
                </div>
                ))} 
            </div>
           
        </>
    )
}