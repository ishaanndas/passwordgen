require('dotenv').config(); 
const express = require('express');
const app = express();
const fetch = (...args) =>
    import('node-fetch').then(({ default: fetch }) => fetch(...args));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/static/index.html');
});

app.get('/generate', async (req, res) => {
    const url = `https://api.api-ninjas.com/v1/passwordgenerator?length=${req.query.length}&exclude_numbers=${req.query.excludeNumbers}&exclude_special_chars=${req.query.excludeSpecialChars}`;
    const options = {
        method: "GET",
        headers: {
            "X-Api-Key": process.env.API_KEY 
        }
    }

    try {
        const resu = await fetch(url, options);
        const json = await resu.json();
        res.send(json["random_password"]);
    } catch (err) {
        console.log(err);
        res.send("Error generating password.");
    }
});


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
