const loginForm = $('#loginForm')
loginForm.on('submit', e => {
    e.preventDefault();
    const emailInput = $('#emailInput')
    const passwordInput = $('#passwordInput')

    const userData = {
        email: emailInput.val(),
        password: passwordInput.val()
    };

    console.log(JSON.stringify(userData), "user Data")


    console.log(emailInput.val(), "email")
    console.log(passwordInput.val(), "password")
    $.ajax({
        url: 'https://quizmaniabackend.onrender.com/login',
        type: 'post',
        contentType: 'application/json',
        data: JSON.stringify(userData),
        processData: false,
        success: res => {
            console.log(res, "resss")
            if (res) {
                localStorage.setItem("token", res);
                window.location.href = "/main"
            }
        else
            alert("No token received")
        },
        error: () => {alert("Correo o contraseña son incorrectos")}
    })
})