const loginForm = $('#loginForm')
console.log(loginForm)
loginForm.on('submit', e => {
    e.preventDefault();
    const emailInput = $('#emailInput')
    const passwordInput = $('#passwordInput')
    // Here we get the values of the inputs to send them to the api.
    // In the meantime we continue to the main page
    window.location.href = "/main"
})