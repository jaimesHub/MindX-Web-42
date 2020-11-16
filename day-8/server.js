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

app.get('/search', (req, res) => {
    const pathFile = path.resolve(__dirname, './client/search.html');
    res.sendFile(pathFile);
});

// search: buoc 2 trong quy trinh: tao api search
app.get('/search-question', async(req, res) => {
    const { keyword } = req.query;
    const newRegex = new RegExp(keyword, 'i');
    const questions = await QuestionModel.find({ content: { $regex: newRegex } });

    return res.send({ success: 1, data: questions });
});

app.get('/random-question', async(req, res) => {
    // const docs = await QuestionModel.find();
    // const doc = docs[Math.floor((Math.random() * docs.length))];
    // return res.send({
    //     success: 1,
    //     data: doc,
    // });

    // c1:
    // const questions = await QuestionModel.find();
    // const randomIndex = getRandomInt(0, questions.length);
    // const foundQuestion = questions[randomIndex];
    // return res.send({
    //     success: 1,
    //     data: foundQuestion
    // });

    // c2: sd aggregate: cú pháp của mongodb
    const questions = await QuestionModel.aggregate([
        // { $match: {a:10}}
        { $sample: { size: 1 } }
    ]);

    if (questions.length) {
        const foundQuestion = questions[0];
        // console.log(questions[0]);
        return res.send({
            success: 1,
            // data: {
            //     ...foundQuestion,
            //     id: foundQuestion._id
            // }
            data: foundQuestion
        });
    }
    return res.send({ success: 0 });
});

app.get("/ask", (req, res) => {
    const pathFile = path.resolve(__dirname, './client/create-question.html');
    res.sendFile(pathFile);
});

app.post('/create-question', async(req, res) => {
    const { content } = req.body;

    const newQuestion = {
        content,
        // yesCount: 0,
        // noCount: 0
    }

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

    const foundQuestion = await QuestionModel.findById(idQuestion).lean();
    // console.log("Found question: ", foundQuestion);
    if (!foundQuestion) {
        return res.send({ success: 0 });
    }
    return res.send({
        success: 1,
        // data: foundQuestion
        data: {
            ...foundQuestion,
            id: foundQuestion._id
        }
    });
});


app.get('/vote-question/:idQuestion/:voteType', async(req, res) => {
    // const { idQuestion, voteType } = req.params;

    // const question = await QuestionModel.findById(idQuestion);

    // if (question) {
    //     question[`${voteType}Count`]++;
    //     await question.save();
    //     return res.send({
    //         success: 1,
    //         data: question
    //     });
    // }
    // return res.send({ success: 0 });

    const question = await QuestionModel
        .findByIdAndUpdate(idQuestion, {
            $inc: {
                [`${voteType}Count`]: 1
            }
        }, { new: true });

    return res.send({
        success: 1,
        data: question
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