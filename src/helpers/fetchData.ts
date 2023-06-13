import { FormData } from "../interfaces";
import axios from "axios";
import  { AxiosError } from 'axios';

// this function fetches data from the api, and then calls the manipulateQuizData function with this data
export async function fetchData(inputData: FormData) {
    const {numQuestions, category, difficulty} = inputData as FormData
    const url = `https://opentdb.com/api.php?amount=${numQuestions}&category=${category}&difficulty=${difficulty}&type=multiple`

    try {
        const response = await axios.get(url);
        return response.data
    } catch (error) {
        // https://stackoverflow.com/questions/69264472/axios-error-typescript-annotation-must-be-any-or-unknown-if
        const err = error as AxiosError
        alert(err.message);
    }
 
}


