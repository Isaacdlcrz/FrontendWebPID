const loginForm = $('#loginForm')
console.log(loginForm)
loginForm.on('submit', e => {
    e.preventDefault();
    const emailInput = $('#emailInput')
    const passwordInput = $('#passwordInput')

    console.log(emailInput.val(), "email")
    console.log(passwordInput.val(), "password")
    jQuery.post( "https://quizmaniabackend.onrender.com/login",
        {email: emailInput.val(), password: passwordInput.val()},
        () => {
            console.log()
        },
        "json").done()
})