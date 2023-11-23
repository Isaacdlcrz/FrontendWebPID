const credentials = ["CURP", "INE", "Licencia de Automovilista"];

function createButtons() {
    const buttons = document.getElementById('buttons-list');

    credentials.forEach(name => {
        const credentialButton = document.createElement('button');
        credentialButton.className = 'btn btn-primary';
        credentialButton.textContent = name;
        buttons.appendChild(credentialButton);
    });
}

document.addEventListener('DOMContentLoaded', createButtons);
