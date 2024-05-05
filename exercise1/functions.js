const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 5255;
app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.urlencoded({extended:true}));
app.post('/findSummation', (req, res) => {
    const { number } = req.body;
    const result = findSummation(Number(number));
    res.send(`<h2>Result: ${result}</h2><a href="/call.html">Back to Form</a>`);
});

app.post('/uppercaseFirstandLast', (req, res) => {
    const { text } = req.body;
    const result = uppercaseFirstandLast(text);
    res.send(`<h2>Result: ${result}</h2><a href="/call.html">Back to Form</a>`);
});

app.post('/findAverageAndMedian', (req, res) => {
    const { numbers } = req.body;
    const result = findAverageAndMedian(numbers.split(',').map(Number));
    res.send(`<h2>Result:</h2><p>Average: ${result.average}, Median: ${result.median}</p><a href="/call.html">Back to Form</a>`);
});

app.post('/find4Digits', (req, res) => {
    const { numbers } = req.body;
    const result = find4Digits(numbers);
    res.send(`<h2>Result: ${result ? result : 'false'}</h2><a href="/call.html">Back to Form</a>`);
});

function findSummation(n = 1) {
    if (isNaN(n) || n <= 0) {
        return false;
    } else {
        let sum = 0;
        for (let i = 1; i <= n; i++) {
            sum += i;
        }
        return sum;
    }
}

function uppercaseFirstandLast(str) {
    return str.replace(/\b(\w)(\w*)\b/g, function(match, firstChar, rest) {
        return firstChar.toUpperCase() + rest.slice(0, -1) + rest.slice(-1).toUpperCase();
    });
}

function findAverageAndMedian(numbers) {
    const sortedNumbers = numbers.sort((a, b) => a - b);
    const length = sortedNumbers.length;
    const sum = sortedNumbers.reduce((acc, val) => acc + val, 0);
    const average = sum / length;

    let  median=0;
    if (length % 2 === 0) {
        median = (sortedNumbers[length / 2 - 1] + sortedNumbers[length / 2]) / 2;
    } else {
        median = sortedNumbers[Math.floor(length / 2)];
    }

    return { average, median };
}

function find4Digits(str) {
    let  hello="";
    const numbers = str.split(' ');
    for (let i=0;i<numbers.length-1;i++) {
	for(let j=0;j<4;j++)
		hello+=numbers[i+j];
	if(hello.match(/\d{4}/g)){
	   return hello;}
	else
	    hello="";
    }
    return false;
}

app.listen(port,() => {
    console.log(`Server is running on port ${port}`);
});
