const registerForm = $('#registerForm')
registerForm.on('submit', e => {
    e.preventDefault();
    const nameInput = $('#nameInput')
    const emailInput = $('#emailInput')
    const passwordInput = $('#passwordInput')
    const passwordConfirmationInput = $('#passwordConfirmationInput')

    if (passwordInput.val() !== passwordConfirmationInput.val()) {
        alert("Las contraseñas no coinciden, intenta otra vez.")
        return
    }

    const userData = {
        name: nameInput.val(),
        email: emailInput.val(),
        password: passwordInput.val()
    }
    $.ajax({
        url: 'https://quizmaniabackend.onrender.com/register',
        type: 'post',
        contentType: 'application/json',
        data: JSON.stringify(userData),
        processData: false,
        success: res => {
            console.log(res, "resss")
            if (res) {
                console.log(res)
                window.location.href = "/"
            }
            else
                alert("No token received")
        },
        error: () => {alert("Error en registro")}
    })
})