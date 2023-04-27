export interface DataFromAPI {
    category: string,
    correct_answer: string,
    difficulty: string,
    incorrect_answers: string[],
    question: string,
    type: string
}

export interface QuizData {
    id: number,
    question: string,
    multipleChoice: string[],
    correctAnswer: string,
    selectedAnswer: string
}

export interface FormData {
    numQuestions: number,
    category: string,
    difficulty: string
}