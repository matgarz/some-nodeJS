const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5257;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.post('/submit', (req, res) => {
    const { name, phone } = req.body;

    // Validate phone number format
    const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;
    if (!phone.match(phoneRegex)) {
        return res.status(400).send('Invalid phone number format. Please enter in the format ddd-ddd-dddd.');
    }

    // Respond with success message
    res.send('Phone number format is correct');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
