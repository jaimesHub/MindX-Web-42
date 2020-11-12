const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const mongoose = require('mongoose');
const QuestionModel = require('./models/question');

const port = 3000;

//1. kết nối mongodb server: mục connections, callback
mongoose.connect('mongodb://localhost:27017/quyetde', (err) => {
    if (err) throw err;
    console.log("Connecting mongodb successfully!");
});

//2. define schema

// 3. models

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

app.get('/random-question', async(req, res) => {

    // get list questions from data.json
    // lay ngau nhien 1 cau hoi ra

    // fs.readFile('data.json', (err, data) => {
    //     if (err) return res.send({ success: 0 });

    //     const questions = JSON.parse(data);

    //     const randomIndex = getRandomInt(0, questions.length);

    //     const foundQuestion = questions[randomIndex];

    //     return res.send({ success: 1, data: foundQuestion });
    // });

    const docs = await QuestionModel.find();
    const doc = docs[Math.floor((Math.random() * docs.length))];
    return res.send({
        success: 1,
        data: doc,
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

app.post('/create-question', async(req, res) => {

    // const content = req.body;

    // fs.readFile('data.json', (err, data) => {
    //     if (err) return res.send({ success: 0 });

    //     let oldQuestions;

    //     try {
    //         oldQuestions = JSON.parse(data);

    //     } catch (err) {
    //         oldQuestions = [];
    //     }

    //     const newQuestion = {
    //         id: oldQuestions.length,
    //         content,
    //         yesCount: 0,
    //         noCount: 0
    //     }

    //     const newQuestions = [...oldQuestions, newQuestion];
    //     fs.writeFile('data.json', JSON.stringify(newQuestions), (err) => {
    //         if (err) return res.send({ success: 0 });
    //         res.send({ success: 1, data: newQuestion });
    //     });
    // });

    const { content } = req.body;

    const newQuestion = {
        content,
        // yesCount: 0,
        // noCount: 0
    }

    // QuestionModel.create(newQuestion, (err, data) => {

    // });

    const newQuestionData = await QuestionModel.create(newQuestion);
    // console.log(newQuestionData);
    res.send({
        success: 1,
        data: {
            ...newQuestion,
            id: newQuestionData._id
        }
    })

});

app.get('/question/:id', (req, res) => {
    res.sendFile(path.resolve(__dirname, './client/detail-question.html'));
});

app.get("/detail-question/:id", async(req, res) => {

    const idQuestion = req.params.id;
    // console.log("Id question from server: ", idQuestion);

    // fs.readFile('data.json', (err, data) => {
    //     if (err) return res.send({ success: 0 });

    //     const questions = JSON.parse(data);
    //     const foundQuestion = questions.find(q => q.id === parseInt(idQuestion));

    //     if (!foundQuestion) {
    //         return res.send({ success: 0 });
    //     }
    //     return res.send({ success: 1, data: foundQuestion });
    // });

    const foundQuestion = await QuestionModel.findById(idQuestion);
    // console.log("Found question: ", foundQuestion);
    if (!foundQuestion) {
        return res.send({ success: 0 });
    }
    return res.send({
        success: 1,
        data: foundQuestion
    });
});



app.get('/vote-question/:idQuestion/:voteType', async(req, res) => {
    const { idQuestion, voteType } = req.params;
    // console.log("Id question: ", idQuestion);

    // fs.readFile('data.json', (err, data) => {
    //     if (err) return res.send({ success: 0 });

    //     const questions = JSON.parse(data);
    //     const foundQuestion = questions.find(q => q.id === parseInt(idQuestion));

    //     if (!foundQuestion) {
    //         // console.log("Loi o day");
    //         return res.send({ success: 0 });
    //     }

    //     // thay doi vote
    //     // if (voteType === 'no') {
    //     //     foundQuestion.noCount++;
    //     // } else if (voteType === 'yes') {
    //     //     foundQuestion.yesCount++;
    //     // }

    //     // <=>

    //     foundQuestion[`${voteType}Count`]++;

    //     // luu lai questions
    //     fs.writeFileSync('data.json', JSON.stringify(questions));

    //     return res.send({ success: 1, data: foundQuestion });
    // });

    // const foundQuestion = await QuestionModel.findOne({ _id: idQuestion });
    const foundQuestion = await QuestionModel.findById(idQuestion);
    // console.log("Found question: ", foundQuestion);

    if (!foundQuestion) {
        return res.send({ success: 0 });
    }

    // if (voteType === 'no') {
    //     foundQuestion.noCount++;
    //     await foundQuestion.save();
    // } else if (voteType === 'yes') {
    //     foundQuestion.yesCount++;
    //     await foundQuestion.save();
    // }
    foundQuestion[`${voteType}Count`]++;
    foundQuestion.save();

    // console.log("foundQuestion after updated: ", foundQuestion);

    return res.send({
        success: 1,
        data: foundQuestion
    });


});

app.get("/questions", (req, res) => {
    const pathFile = path.resolve(__dirname + '/client/list-question.html');
    // console.log(pathFile);
    res.sendFile(pathFile);
});

app.get("/list-question", async(req, res) => {
    const docs = await QuestionModel.find();
    // console.log(docs);
    // res.json(docs);
    res.send({
        success: 1,
        data: docs
    });
});

/**Delete question */
app.delete('/delete-question/:idQuestion', async(req, res) => {
    // console.log(req.params);
    const idQuestion = req.params.idQuestion;

    // try {
    //     const question = await QuestionModel.findByIdAndDelete(idQuestion);
    //     res.send({
    //         success: 1,
    //         data: question
    //     });
    // } catch (error) {
    //     res.send({ success: 0 });
    // }

    try {
        const foundQuestion = await QuestionModel.findById(idQuestion);
        if (!foundQuestion) {
            res.send({ success: 0 });
        }

        await QuestionModel.deleteOne({ _id: foundQuestion._id });

        res.send({
            success: 1,
            data: foundQuestion
        });
    } catch (error) {
        res.send({ success: 0 });
    }

});
let idEditedQuestion;
/**Update question */
app.get('/edit-question/:idQuestion', async(req, res) => {
    idEditedQuestion = req.params.idQuestion;
    const pathFile = path.resolve(__dirname + '/client/edit-question.html');
    res.sendFile(pathFile);
});

app.post('/edit-question', async(req, res) => {
    const content = req.body;
    console.log("Content: ", content);
    const foundQuestion = await QuestionModel.findById(idEditedQuestion);
    if (!foundQuestion) {
        res.send({ success: 0 });
    }

    foundQuestion.content = content.editedContent;
    foundQuestion.yesCount = content.editedYesCount;
    foundQuestion.noCount = content.editedNoCount;
    await foundQuestion.save();

    console.log("Found Question: ", foundQuestion);
    res.send({
        success: 1,
        data: foundQuestion
    });
});

app.get("*", (req, res) => {
    res.send({ say: "404" });
});

app.listen(port, (err) => {
    if (err) throw err;
    console.log(`App listening at http://localhost:${port}`);
});