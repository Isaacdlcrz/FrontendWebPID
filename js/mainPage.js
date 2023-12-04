const getQuizzes = async () => {
    const quizContainer = $('#quizContainer');
    try {
        const res = await $.get("https://quizmaniabackend.onrender.com/quiz");
        for (const category of res) {
            const carouselId = `carousel-${category._id}`;
            const carouselIndicatorId = `carousel-indicator-${category._id}`;
            const carouselInnerId = `carousel-inner-${category._id}`;

            const [categoryName, categoryGroup] = await Promise.all([
                getCategoryName(category._id),
                createCategoryGroup(category)
            ]);

            quizContainer.append(categoryGroup);

            // Set the title of the category
            let indicatorCounter = 0;
            for (const quiz of category.quizzes) {
                const carouselIndicators = $(`#${carouselIndicatorId}`);
                carouselIndicators.append(`
                    <button type="button" data-bs-target="#${carouselId}" data-bs-slide-to="${indicatorCounter + 1}" class="${indicatorCounter === 0 ? 'active' : ''}" aria-current="${indicatorCounter === 0}" aria-label="Slide ${indicatorCounter}"></button>
                `);

                const carouselInners = $(`#${carouselInnerId}`);
                carouselInners.append(`
                    <div class="carousel-item ${indicatorCounter === 0 ? 'active' : ''}" onclick="goToQuiz(category._id)">
                        <img src="https://dineroynegocios.mx/wp-content/uploads/2023/10/Mexico-cultura-1200x750.jpg" class="d-block w-100 carousel-image" alt="...">
                        <div class="carousel-caption d-none d-md-block">
                            <h2>${quiz.name}</h2>
                        </div>
                    </div>
                `);

                indicatorCounter++;
            }
        }
    } catch (error) {
        console.error("Error fetching quizzes:", error);
    }
}

const getCategoryName = async (id) => {
    try {
        const response = await $.get(`https://quizmaniabackend.onrender.com/category/${id}`);
        return response.text || "Unknown Category";
    } catch (e) {
        console.error("Error fetching category name:", e);
        return "ERROR";
    }
}

const createCategoryGroup = async (category) => {
    const carouselId = `carousel-${category._id}`;
    const carouselIndicatorId = `carousel-indicator-${category._id}`;
    const carouselInnerId = `carousel-inner-${category._id}`;

    const categoryName = await getCategoryName(category._id);

    const categoryGroup = `
        <div class="mb-5 px-5">
            <h3>${categoryName}</h3>
            <div id="${carouselId}" class="carousel slide">
                <div class="carousel-indicators" id="${carouselIndicatorId}"></div>
                <div class="carousel-inner" id="${carouselInnerId}"></div>
                <button class="carousel-control-prev" type="button" data-bs-target="#${carouselId}" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#${carouselId}" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>
        </div>`;

    return [categoryGroup];
}

(async () => {
    await getQuizzes();
})();


const goToQuiz = (id) => {
    window.location.href = `/answerQuiz/${id}`
}

const goToCreateQuiz = () => {
    window.location.href = '/createQuiz'
}