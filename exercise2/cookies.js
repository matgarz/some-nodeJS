const express = require('express');
const cookieParser = require('cookie-parser');
const moment = require('moment-timezone');
const path =require('path');
const app = express();
const PORT = 5255;

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    let visits = parseInt(req.cookies.visits) || 0;
    visits++;

    // Get the last visited date from the cookie
    const lastVisited = req.cookies.lastVisited ? new Date(req.cookies.lastVisited) : null;

    // Set cookie to store the current visit
    res.cookie('visits', visits);
    res.cookie('lastVisited', new Date());

    if (visits === 1) {
        res.send('Welcome to my webpage! It is your first time that you are here.');
    } else {
        const lastVisitedFormatted = lastVisited ? moment(lastVisited).tz('EST').format('ddd MMM DD HH:mm:ss z YYYY') : '';
        res.send(`Hello, this is the ${visits} time that you are visiting my webpage.<br>
       <b> Last time you visited my webpage on: ${lastVisitedFormatted}</b><br> (EST= Eastern Standard Time Zone)`);
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
