import { DataFromAPI } from "../interfaces";

 // this function manipulates the data to make it easier to use, set it to quizData state, and stops the loader 
 export function manipulateQuizData(apiData: {results: DataFromAPI[]}) {
    const {results} = apiData

    const sortedAPIData = results.map((item: DataFromAPI, index) => {
        const {correct_answer, incorrect_answers, question} = item
        const shuffledChoices = [...incorrect_answers, correct_answer].sort(() => Math.random() - 0.5)
        return {
            id: index,
            question: question,
            multipleChoice: shuffledChoices,
            correctAnswer: correct_answer,
            selectedAnswer: ''
        }
    })
    return sortedAPIData
    
}