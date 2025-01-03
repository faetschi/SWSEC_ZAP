const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Predefined alphabet
const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

// Serve static files (HTML, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to parse JSON request bodies
app.use(express.json());

// Function to generate random passwords
function generatePasswords(count) {
    const passwords = [];
    for (let i = 0; i < count; i++) {
        let password = "";
        for (let j = 0; j < 10; j++) { // Fixed password length: 10
            const randomIndex = Math.floor(Math.random() * alphabet.length);
            password += alphabet[randomIndex];
        }
        passwords.push(password);
    }
    return passwords;
}

// Handle password generation request
app.post('/generate-passwords', (req, res) => {
    const { numPasswords } = req.body;

    // Enforce the limit on the backend (maximum 10 passwords) (ZAP cant bypass this)
    //if (numPasswords < 1 || numPasswords > 10) {
    //    return res.status(400).json({ error: "Invalid input: Please enter a number between 1 and 10." });
    //}

    // Generate and return passwords
    const passwords = generatePasswords(numPasswords);
    res.json({ passwords });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
