import { create } from "zustand";
import axios from "axios";

export const quizStore = create((set, get) => ({
  questions: [],
  currentQuestion: 0,
  score: 0,
  showScore: false,
  timeLeft: 30,
  timerInterval: null,

  fixText: (html) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText;
  },

  fetchQuestions: async () => {
    try {
      const response = await axios.get(
        "https://opentdb.com/api.php?amount=10&category=31"
      );
      const formattedQuestions = response.data.results.map((question) => ({
        ...question,
        question: get().fixText(question.question),
        incorrect_answers: question.incorrect_answers.map(get().fixText),
        correct_answer: get().fixText(question.correct_answer),
      }));
      set({ questions: formattedQuestions });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  },

  startTimer: () => {
    set({ timeLeft: 30 }); // Setel timer ke 30 detik atau nilai awal

    const interval = setInterval(() => {
      set((state) => {
        if (state.timeLeft > 1) {
          return { timeLeft: state.timeLeft - 1 };
        } else {
          clearInterval(get().timerInterval);
          get().handleTimeout(); // Panggil handleTimeout saat waktu habis
          return { timeLeft: 0 };
        }
      });
    }, 1000);

    set({ timerInterval: interval });
  },

  handleClick: (answer) => {
    const { questions, currentQuestion, score } = get();

    // Periksa apakah jawaban benar dan perbarui skor jika benar
    if (answer === questions[currentQuestion].correct_answer) {
      set((state) => ({ score: state.score + 1 }));
    }

    // Perbarui pertanyaan tanpa mereset timer
    if (currentQuestion < questions.length - 1) {
      set((state) => ({ currentQuestion: state.currentQuestion + 1 }));
    } else {
      clearInterval(get().timerInterval); // Hentikan timer jika sudah tidak ada pertanyaan
      set({ showScore: true }); // Tampilkan skor jika kuis selesai
    }
  },

  // handleTimeout: () => {
  //   // const { currentQuestion, questions } = get();
  
  //   // Jika waktu habis, langsung tampilkan skor tanpa memeriksa pertanyaan berikutnya
  //   set({ showScore: true });
  
  //   // Hentikan interval timer jika masih berjalan
  //   clearInterval(get().timerInterval);
  // },
  

  resetQuiz: () => {
    clearInterval(get().timerInterval);
    set({
      questions: [],
      currentQuestion: 0,
      score: 0,
      showScore: false,
      timeLeft: 30,
      timerInterval: null,
    });
  },
}));
