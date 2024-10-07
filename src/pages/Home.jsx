import axios from 'axios';
import { useEffect, useState } from 'react';

const Home = () => {
  const [triviaQuestion, setTriviaQuestion] = useState({});
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [allPossibleAnswers, setAllPossibleAnswers] = useState([]);
  const [currentPoints, setCurrentPoints] = useState(0);
  const [loading, setLoading] = useState(true);

  // Fetch trivia data from API
  const fetchTriviaData = async () => {
    setLoading(true);

    try {
      const response = await axios.get("https://opentdb.com/api.php?amount=1");
      const triviaData = response.data.results[0];
      setTriviaQuestion(triviaData);
      setCorrectAnswer(triviaData.correct_answer);
      setAllPossibleAnswers(shuffleAnswers([...triviaData.incorrect_answers, triviaData.correct_answer]));
    } catch (error) {
      console.error("Error fetching trivia data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Shuffle all answers (correct + incorrect) to randomize them
  const shuffleAnswers = (answers) => {
    return answers.sort(() => Math.random() - 0.5);
  };

  // Verify if the selected answer is correct
  const verifyAnswer = (selectedAnswer) => {
    if (selectedAnswer === correctAnswer) {
      setCurrentPoints(prevPoints => prevPoints + 1);
    } else {
      setCurrentPoints(prevPoints => prevPoints - 1);
    }
    fetchTriviaData(); // Load the next question
  };

  // Convert HTML entities to readable characters
  const formatText = (text) => {
    return text
      .replace(/&quot;/g, '"')
      .replace(/&#039;/g, "'")
      .replace(/&amp;/g, '&');
  };

  // Fetch trivia data when component mounts
  useEffect(() => {
    fetchTriviaData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {loading ? (
          <p>Trivia Question Loading...</p>
        ) : (
          <div>
            <div>Current Points: {currentPoints}</div>
            <br />
            <div>{formatText(triviaQuestion.question)}</div>
            <br />
            <div>
              {allPossibleAnswers.map((answer, idx) => (
                <button key={idx} onClick={() => verifyAnswer(answer)}>
                  {formatText(answer)}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>
    </div>
  );
}

export default Home;
