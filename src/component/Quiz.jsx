import React, { useEffect } from "react";
import { quizStore } from "../stores/quizStore";
import Logout from "../component/Logout";
import { TiStopwatch } from "react-icons/ti";

const Quiz = () => {
  const {
    questions,
    currentQuestion,
    score,
    showScore,
    timeLeft,
    fetchQuestions,
    handleClick,
    resetQuiz,
  } = quizStore();

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  useEffect(() => {
    if (questions.length > 0) {
      quizStore.getState().startTimer(); 
    }
  }, [questions]);

  return (
    <div className="bg-zinc-800 w-full border-4 rounded-md border-green-500 border-double p-4 text-center">
     
      <div className="min-h-screen flex flex-col justify-center">
      <Logout />
        {questions.length > 0 ? (
          showScore ? (
            <div className="border border-green-500 shadow-lg mx-auto max-w-3xl bg-zinc-900  rounded-lg p-4">
              <h2 className="text-xl text-white underline decoration-white decoration-double underline-offset-4 font-semibold mb-4">
                Total Score
              </h2>
              <h2 className="text-xl text-white font-semibold mb-4">
                {score} / {questions.length}
              </h2>
              <button
                className="bg-yellow-500 text-black font-semibold py-2 px-4 rounded-md hover:bg-red-500 transition duration-300"
                onClick={resetQuiz}
              >
                Restart Quiz
              </button>
            </div>
          ) : (
            <div className="border border-green-500 shadow-lg mx-auto max-w-3xl bg-zinc-900 rounded-lg p-4">
              <div className="flex pt-1">
              <TiStopwatch className="text-3xl text-red-500 mb-4" />
              <p className="text-red-500   ps-3  text-xl font-bold">
                {timeLeft} Seconds
              </p>
            </div>
              <h2 className="text-xl text-white underline decoration-white decoration-double underline-offset-4 font-semibold mb-4">
                Question {currentQuestion + 1} / {questions.length}
              </h2>
              <p className="text-lg mb-4 text-white font-semibold">
                {questions[currentQuestion].question}
              </p>

              {/* Options */}
              <div className="grid grid-cols-1  gap-4 max-w-lg mx-auto">
                {questions[currentQuestion].incorrect_answers.map(
                  (option, index) => (
                    <button
                      className="bg-green-500 text-white py-2 px-2 rounded-xl hover:bg-yellow-500 transition duration-300"
                      key={index}
                      onClick={() => handleClick(option)}
                    >
                      {option}
                    </button>
                  )
                )}
                <button
                  className="bg-green-500 text-white py-2 px-2 rounded-xl hover:bg-yellow-500 transition duration-300"
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
          <p className="text-white">Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Quiz;
