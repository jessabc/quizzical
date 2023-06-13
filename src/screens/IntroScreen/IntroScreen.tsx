import { useForm } from "react-hook-form";
import { FormData, QuizData } from "../../interfaces";
import blob1 from '../../assets/blob-1.png'
import blob2 from '../../assets/blob-2.png'
import Button from "../../components/Button/Button";
import './IntroScreen.css'
import { fetchData } from "../../helpers/fetchData";
import { manipulateQuizData } from "../../helpers/manipulateQuizData";


interface IntroScreenProps {
    setQuizData: React.Dispatch<React.SetStateAction<QuizData[] | null>>
    setIsLoading:  React.Dispatch<React.SetStateAction<boolean>>;
}

export default function IntroScreen({setQuizData, setIsLoading}: IntroScreenProps) {

    const { register, handleSubmit} = useForm<FormData>()

    const onSubmit =  handleSubmit (async (inputData) => {
        
        // a loader appears until data is fetched from api 
        setIsLoading(true)

        // calls the fetchData function
        const APIData = await fetchData(inputData)

        // call the manipulateQuizData function
        const sortedAPIData =  manipulateQuizData(APIData)
        setQuizData(sortedAPIData)
        setIsLoading(false)
    }) 

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