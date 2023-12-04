const getQuestions = async () => {
    let questionSubContainer;
    const quizId = window.location.href.split("answerQuiz/")[1];
    const questionContainer = $('#questionContainer');
    try {
        const res = await $.get(`https://quizmaniabackend.onrender.com/quiz/${quizId}`);
        console.log(res)
        questionContainer.append(`
            <h1 class="mb-5 text-center pb-3 border-bottom">${res.name}</h1>
            
            <div class="row mx-5 mb-5 justify-content-center">
                <div class="col-12 col-sm-10 pt-3 col-lg-8 border" id="questionSubContainer"></div>
            </div>
        `)
        let questionCounter = 0;
        questionSubContainer = $('#questionSubContainer')
        for (const question of res.questions) {
            questionCounter++;
            const questionDiv = `
                <div className="d-flex p-4 ps-5 align-items-center">
                    <div>
                        <h1 className="me-5">${questionCounter}</h1>
                    </div>
                
                    <div>
                        <h5 className="">${question.text}</h5>
                        <div className="mx-3" id="optionContainer">
                        </div>
                    </div>
                </div>
            `

            questionSubContainer.append(questionDiv);
            const optionContainer = $('#optionContainer')
            let optionCounter = 0;
            for (const option of question.options) {
                optionCounter++
                const optionsDiv = `
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="Guadalajara" id="option-${optionCounter}">
                        <label className="form-check-label" htmlFor="option-${optionCounter}">${option.text}</label>
                    </div>
                `
                optionContainer.append(optionsDiv)

            }
        }

    } catch (error) {
        console.error("Error fetching quizzes:", error);
    }

    questionSubContainer.append(`
        <div class="row text-center mt-4">
            <button type="button" class="btn btn-primary">Dale!</button>
        </div>
    `)

}

(async () => {
    await getQuestions();
})();