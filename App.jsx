import { useState } from 'react'
import Intro from './pages/Intro'
import Questions from './pages/Questions'

function App() {
  const [startGame, setStartGame] = useState(false)
  const [formData, setFormData] = useState({
    numQuestions: '',
    catergory: '',
    difficulty: ''
  })

  return (
    <>
      {!startGame && 
      <Intro 
        formData={formData} 
        setFormData={setFormData} 
        startGame={startGame} 
        setStartGame={setStartGame}
      />}

      {startGame && 
      <Questions 
        formData={formData} 
        setFormData={setFormData}
        setStartGame={setStartGame}
      />}
      
    </>
    
  )
}

export default App
