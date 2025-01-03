document.getElementById("passwordForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const numPasswords = parseInt(document.getElementById("numPasswords").value, 10);
    const errorDiv = document.getElementById("error");
    const outputDiv = document.getElementById("output");

    // Reset error and output
    errorDiv.textContent = "";
    outputDiv.textContent = "";

    // Client-side check to ensure the number of passwords is between 1 and 10
    if (numPasswords < 1 || numPasswords > 10) {
        errorDiv.textContent = "Invalid input: Please enter a number between 1 and 10.";
        return;
    }

    // Send the number of passwords to the backend
    fetch('/generate-passwords', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ numPasswords })
    })
    .then(response => response.json())
    .then(data => {
        const passwords = data.passwords;
        outputDiv.innerHTML = passwords.map(password => `${password}<br>`).join("");
    })
    .catch(error => {
        errorDiv.textContent = "Error generating passwords.";
        console.error('Error:', error);
    });
});
