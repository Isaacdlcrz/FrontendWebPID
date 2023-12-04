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
    // Here we get the values of the inputs to send them to the api.
    // In the meantime we continue to the main page
    window.location.href = "/main"
})