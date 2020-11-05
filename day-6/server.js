const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const port = 3001;

//  parse application/x-www-form-urlencoded => voi ajax
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// server sẽ trả về user các file static như css, img, javascript... => thay thế pp (1)
app.use(express.static('client'));



app.get('/', (req, res) => {
    const pathFile = path.resolve(__dirname, './client/home.html');
    res.sendFile(pathFile);
});

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.ceil(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

app.get('/random-question', (req, res) => {

    // get list questions from data.json
    // lay ngau nhien 1 cau hoi ra
    fs.readFile('data.json', (err, data) => {
        if (err) return res.send({ success: 0 });

        const questions = JSON.parse(data);

        const randomIndex = getRandomInt(0, questions.length);

        const foundQuestion = questions[randomIndex];

        return res.send({ success: 1, data: foundQuestion });
    });
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
    // console.log("Req: ", req);
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

app.get('/question/:id', (req, res) => {
    res.sendFile(path.resolve(__dirname, './client/detail-question.html'));
});

app.get("/detail-question/:id", (req, res) => {
    // console.log(req.body);
    const idQuestion = req.params.id;

    // get list questions from data.json
    fs.readFile('data.json', (err, data) => {
        if (err) return res.send({ success: 0 });

        const questions = JSON.parse(data);
        const foundQuestion = questions.find(q => q.id === parseInt(idQuestion));

        if (!foundQuestion) {
            return res.send({ success: 0 });
        }
        return res.send({ success: 1, data: foundQuestion });
    });
});

// app.put("/vote-no", (req, res) => {
//     const { idQuestion } = req.body;
//     console.log(idQuestion);
//     fs.readFile("data.json", (err, data) => {
//         const listQuestion = JSON.parse(data)
//         for (let minidata of listQuestion) {
//             if (parseInt(minidata.id) === parseInt(idQuestion)) {
//                 minidata.noCount++;
//                 fs.writeFile("data.json", JSON.stringify(listQuestion), (err) => {
//                     if (err) throw err;
//                     console.log("Write successfully!");
//                 });
//                 // break;
//             }
//         }
//     });

// });

// app.put("/vote-yes", (req, res) => {
//     const { idQuestion } = req.body;
//     fs.readFile("data.json", (err, data) => {
//         const listQuestion = JSON.parse(data)
//         for (let minidata of listQuestion) {
//             if (parseInt(minidata.id) === parseInt(idQuestion)) {
//                 minidata.yesCount++;
//                 fs.writeFile("data.json", JSON.stringify(listQuestion), (err) => {
//                     if (err) throw err;
//                     console.log("Write successfully!");
//                 });
//                 // break;
//             }
//         }
//     });

// });

app.get('/vote-question/:idQuestion/:voteType', (req, res) => {
    const { idQuestion, voteType } = req.params;
    console.log(idQuestion);

    fs.readFile('data.json', (err, data) => {
        if (err) return res.send({ success: 0 });

        const questions = JSON.parse(data);
        const foundQuestion = questions.find(q => q.id === parseInt(idQuestion));

        if (!foundQuestion) {
            // console.log("Loi o day");
            return res.send({ success: 0 });
        }

        // thay doi vote
        // if (voteType === 'no') {
        //     foundQuestion.noCount++;
        // } else if (voteType === 'yes') {
        //     foundQuestion.yesCount++;
        // }

        // <=>

        foundQuestion[`${voteType}Count`]++;

        // luu lai questions
        fs.writeFileSync('data.json', JSON.stringify(questions));

        return res.send({ success: 1, data: foundQuestion });
    });
});

app.get("*", (req, res) => {
    res.send({ say: "404" });
});

app.listen(port, (err) => {
    if (err) throw err;
    console.log(`App listening at http://localhost:${port}`);
});