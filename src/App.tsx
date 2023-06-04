import {useState} from 'react'
import IntroScreen from './screens/IntroScreen'
import QuestionScreen from './screens/QuestionScreen'
import { QuizData } from './interfaces'
import './styles/main.css'


function App() {
  
  const [quizData, setQuizData] = useState<QuizData[] | null>(null)

  const [isLoading, setIsLoading] = useState(false)
  
  return ( 
      <div className='app-container'>

        {(!quizData && !isLoading) && 
        <IntroScreen 
          setQuizData={setQuizData} 
          setIsLoading={setIsLoading}
        />}

        {isLoading && 
        <div className='loader-container'>
          <div className='loader'></div>
        </div>}
        
        {quizData && 
        <QuestionScreen 
          quizData={quizData} 
          setQuizData={setQuizData}
        />}
       
      </div>
  )
}

export default App
