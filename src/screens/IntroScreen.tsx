import { useForm } from "react-hook-form";
import { DataFromAPI, FormData, QuizData } from "../interfaces";
import blob1 from '../assets/blob-1.png'
import blob2 from '../assets/blob-2.png'
import Button from "../components/Button";


interface IntroScreenProps {
    setQuizData: React.Dispatch<React.SetStateAction<QuizData[] | null>>
    setIsLoading:  React.Dispatch<React.SetStateAction<boolean>>;
}

export default function IntroScreen({setQuizData, setIsLoading}: IntroScreenProps) {

    const { register, handleSubmit} = useForm<FormData>()

    const onSubmit =  handleSubmit((data) => {
        // so a loader appears until data is fetched from api 
        setIsLoading(true)
        // calls the fetchData function
        fetchData(data)
    })

    // this async function fetches data from the api, and then calls the manipulateQuizData function with this data
    async function fetchData(data: FormData) {
        const {numQuestions, category, difficulty} = data 
        const url = `https://opentdb.com/api.php?amount=${numQuestions}&category=${category}&difficulty=${difficulty}&type=multiple`
        
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error((response.status).toString())
            }
            const apiData = await response.json();
            manipulateQuizData(apiData)  
        }
        catch (error) {
            alert(error);
        }
    }

    // this function manipulates the data to make it easier to use, set it to quizData state, and stops the loader 
    function manipulateQuizData(apiData: {results: DataFromAPI[]}) {
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
        setQuizData(sortedAPIData)
        setIsLoading(false)
    }
   

    return (
        <div className="intro-container">

            <img src={blob1} alt="" className="intro-blob1"/>
            <img src={blob2} alt="" className="intro-blob2"/>

            <h1>Quizzical</h1>

            <form onSubmit={onSubmit}>
                <label>Number of questions (1-10)</label>
                <input 
                    type='number' 
                    {...register("numQuestions")} 
                    min="1" 
                    max="10" 
                    defaultValue={1}
                />

                <label>Select Category</label> 
                <select {...register("category")}>
                    <option value="9">General Knowledge</option>
                    <option value="17">Science & Nature</option>
                    <option value="20">Mythology</option>
                    <option value="21">Sports</option>
                    <option value="22">Geography</option>
                    <option value="23">History</option>
                    <option value="27">Animals</option>
                    <option value="">Suprise me!</option>
                </select>

                <label>Select Difficulty</label> 
                <select {...register("difficulty")}>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>
                
                <Button className="start-btn"> 
                    Start Quiz
                </Button>
            </form>
        </div>
    )
}