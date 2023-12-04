getCategories = async () => {
    const res = await $.get(`https://quizmaniabackend.onrender.com/category`);
    categorySelect = $('#category')
    for (const category of res.categories) {
        categorySelect.append(`
            <option value="${category._id}">${category.text}</option>
        `)
    }
}

getDifficulties = async () => {
    const res = await $.get(`https://quizmaniabackend.onrender.com/difficulty`);
    difficultySelect = $('#difficulty')
    for (const difficulty of res.difficulties) {
        difficultySelect.append(`
            <option value="${difficulty._id}">${difficulty.text}</option>
        `)
    }
}

questionsAvailable = []
getQuestionsAPI = async () => {
    const res = await $.get(`https://quizmaniabackend.onrender.com/question/656d0dd76776b4737dc1496c`);
    questionsContainerModal = $('#questionsContainerModal')
    questionsContainerModal.empty();
    for (const question of res) {
        questionsAvailable.push(question);
        questionsContainerModal.append(`
            <a href="#" class="list-group-item list-group-item-action" onclick="addQuestionToUI('${question._id}')" >${question.text}</a>
        `)
    }
}

const toSendQuestions = []
addQuestionToUI = (id) => {
    const foundQuestion = questionsAvailable.find(element => element._id === id);
    const questionsContainer = $('#questions')
    console.log(foundQuestion, "fofofo")
    toSendQuestions.push(foundQuestion)
    questionsContainer.append(`
        <div class="mb-3">
            ${foundQuestion.text}
        </div>
    `)
    $('#addQuestionModal').modal('hide');

}

// addQuestion = async () => {
//     const
// }


(async () => {
    await getCategories();
})();

(async () => {
    await getDifficulties();
})();

const $form = $('form').eq(0);
    const $button = $('#submit').first();
    const fileInput = $('input[name="archivo"]')[0]
    let archivoSelected = null;

    fileInput.addEventListener('change', () => {
        archivoSelected = fileInput.files[0];
        $button.attr('disabled', false);
    })

const quizName = $('#quizName')
const difficulty = $('#difficulty')
const category = $('#category')
const createQuiz = async () => {
    try {
        const quizData = {
            name: quizName.val(),
            idDifficulty: difficulty.val(),
            idCategory: category.val(),
            dateCreated: "2023-12-03",
            questions: toSendQuestions        }
        $.ajax({
            url: 'https://quizmaniabackend.onrender.com/quiz',
            type: 'post',
            contentType: 'application/json',
            data: JSON.stringify(quizData),
            processData: false,
            success: res => {
                const form = new FormData()
                form.append('archivo', archivoSelected);
                // if (res && archivoSelected) {
                //     $.ajax({
                //         url: `https://quizmaniabackend.onrender.com/uploadImageQuiz/${res._id}`,
                //         type: 'post',
                //         mimeType: 'multipart/form-data',
                //         data: form,
                //         processData: false,
                //         contentType: false,
                //         success: () => {alert("Se subio el archivo")},
                //         error: () => {alert("Algo salio mal")}
                //     })
                // }
                // else
                //     alert("Algo sucedió")
                alert("Creado con exito")
                window.location.href = "/main"
            },
            error: () => {alert("Error fatal")}
        })

    } catch (error) {
        console.error("Error creating quiz:", error);
    }
}