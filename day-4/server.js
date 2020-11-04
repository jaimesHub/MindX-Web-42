const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const port = 3000;

//  parse application/x-www-form-urlencoded => voi ajax
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// server sẽ trả về user các file static như css, img, javascript... => thay thế pp (1)
app.use(express.static('client'));



app.get('/', (req, res) => {
    res.send({ say: "Hello world" });
});

app.get("/ask", (req, res) => {
    // res.sendFile('/home/levi/Documents/Learn-NodeJS/MindX-Web-42/day-4/client/create-question.html');

    // res.sendFile(__dirname + '/client/create-question.html');

    const pathFile = path.resolve(__dirname, './client/create-question.html');
    res.sendFile(pathFile);
});

// pp (1)
// app.get('/create-question.css', (req, res) => {
//     const pathFile = path.resolve(__dirname, './client/create-question.css');
//     res.sendFile(pathFile);
// })

app.post('/create-question', (req, res) => {
    const content = req.body;
    console.log(req.body); // {value: 'alo'}

    // const content = req.body.value; // luu y value hay content o create-question.js
    // const { content } = req.body; // es6
    // console.log(content);

    // input: content
    // output: new question luu trong data.json
    // b1: doc list questions cu trong file
    fs.readFile('data.json', (err, data) => {
        if (err) return res.send({ success: 0 });

        let oldQuestions;

        try {
            oldQuestions = JSON.parse(data); // => ra 1 array
            // console.log(oldQuestions);
        } catch (err) {
            oldQuestions = [];
        }

        // b2: tao 1 question moi
        const newQuestion = {
            id: oldQuestions.length,
            content,
            yesCount: 0,
            noCount: 0
        }

        // b3: add question vao cuoi array
        const newQuestions = [...oldQuestions, newQuestion];
        fs.writeFile('data.json', JSON.stringify(newQuestions), (err) => {
            if (err) return res.send({ success: 0 });
            res.send({ success: 1, data: newQuestion });
        });
    });
});


app.get("*", (req, res) => {
    res.send({ say: "404" });
});

app.listen(port, (err) => {
    if (err) throw err;
    console.log(`App listening at http://localhost:${port}`);
});