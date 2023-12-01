const quizzes = [
    {
       category: "Geografía",
       quizzes: [
           {}
       ]
    },
]

const goToQuiz = (id) => {
    window.location.href = `/answerQuiz/${id}`
}