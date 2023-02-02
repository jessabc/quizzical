function Intro({formData, setFormData, startGame, setStartGame}) {

    function handleChange(e) {
        const {name, value} = e.target
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name] : value
            }
        })
    }
  
    function startGame(e) {
        e.preventDefault()
        setStartGame(true)
        
    }

  return (
    <div className="container">
        <h1>Quizzical</h1>

        <form onSubmit={startGame}>

            <label 
                htmlFor="numQuestions">Select number of questions:</label>
                <input 
                    type="number" 
                    id='numQuestions' 
                    name='numQuestions' 
                    min='1' 
                    max='5' 
                    value={formData.numQuestions}
                    onChange={handleChange}
                />

            <label htmlFor="catergory">Select catergory:</label>
            <select 
                name="catergory" 
                id="catergory" 
                value={formData.catergory}
                onChange={handleChange}>
                <option value="">---Choose---</option>
                <option value="9">General Knowledge</option>
                <option value="17">Science & Nature</option>
                <option value="23">History</option>
                <option value="27">Animals</option>
                <option value="20">Mythology</option>
                <option value="22">Geography</option>
            </select>

            <label htmlFor="difficulty">Select difficulty:</label>
            <select 
                name="difficulty" 
                id="difficulty" 
                value={formData.difficulty}
                onChange={handleChange}>
                <option value="">---Choose---</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
            </select>

            <button>Start quiz</button>

        </form>
    </div>
    
  )
}

export default Intro
