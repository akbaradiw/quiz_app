import React, { useEffect } from "react";
import { quizStore } from "../stores/quizStore";
const Quiz = () => {
  const {
    questions,
    currentQuestion,
    score,
    showScore,
    timeLeft,
    fetchQuestions,
    handleClick,
    resetQuiz
  } = quizStore();

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  useEffect(() => {
    if (questions.length > 0) {
      quizStore.getState().startTimer(); // Mulai timer saat pertanyaan pertama tersedia
    }
  }, [questions]);

  return (
    <div className="container bg-zinc-800 border shadow-md  rounded-md p-4 text-center">
      <div className="min-h-screen flex flex-col justify-center">
        {questions.length > 0 ? (
          showScore ? (
            <div style={{backgroundColor:"#1d1d1e"}} className="border  shadow-lg mx-52 rounded-lg p-4">
              <h2 className="text-xl text-white underline decoration-white decoration-double underline-offset-4 font-semibold mb-4">
                Total Score 
              </h2>
              <h2 className="text-xl text-white font-semibold mb-4">
                 {score} / {questions.length}
              </h2>
              <button
                className="bg-yellow-500 text-black font-semibold py-2 px-4 rounded-md hover:bg-red-500"
                onClick={resetQuiz}
              >
                Restart Quiz
              </button>
            </div>
          ) : (
            
            <div style={{backgroundColor:"#1d1d1e"}}  className="border  shadow-lg mx-52 rounded-lg p-4">
               <p className="text-red-500 text-start text-lg font-bold">
                Time left: {timeLeft} seconds
              </p>
              <h2 className="text-xl text-white underline decoration-white decoration-double underline-offset-4 font-semibold mb-4">
                Question {currentQuestion + 1} / {questions.length}
              </h2>
              <p className="text-lg mb-4 text-white font-semibold">
                {questions[currentQuestion].question}
              </p>
              
              {/* Tampilkan waktu tersisa */}
             
              
              <div className="grid grid-cols-1 gap-4 mx-44">
                {questions[currentQuestion].incorrect_answers.map(
                  (option, index) => (
                    <button
                      className="bg-green-500 text-white py-2 px-2 rounded-xl hover:bg-yellow-500"
                      key={index}
                      onClick={() => handleClick(option)}
                    >
                      {option}
                    </button>
                  )
                )}
                <button
                  className="bg-green-500 text-white py-2 px-2 rounded-xl hover:bg-yellow-500"
                  onClick={() =>
                    handleClick(questions[currentQuestion].correct_answer)
                  }
                >
                  {questions[currentQuestion].correct_answer}
                </button>
              </div>
            </div>
          )
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Quiz;
