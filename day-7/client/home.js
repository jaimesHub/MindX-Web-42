let idQuestion;
const getRandomQuestion = () => {

    $.ajax({
        url: `http://localhost:3000/random-question`,
        method: 'GET',
        success: (res) => {
            // console.log(res);
            const question = res.data;
            // console.log("Random Question: ", question);
            const { _id: id, content, yesCount: yes, noCount: no } = question;
            // nhiệm vụ hiển thị của client
            idQuestion = id;
            // console.log("Random question with id: ", idQuestion);

            // $('#contentQuestion').html(content.value);
            $('#contentQuestion').html(content);
            // $('#result-bar-yes').css('style', yes);
            // $('#result-bar-no').css('style', no);
        },
        error: (res) => {
            console.log(res);
        }
    });
}

getRandomQuestion();

const otherQuestionBtn = $('#otherQuestion');
otherQuestionBtn.on('click', () => {
    getRandomQuestion();
});

const sendRequestVote = (type) => {
    $.ajax({
        url: `http://localhost:3000/vote-question/${idQuestion}/${type}`,
        method: 'GET',
        success: (res) => {
            console.log(res);
            window.location.href = `http://localhost:3000/question/${idQuestion}`;
        }
    });
}

$('#voteNo').on('click', () => {
    sendRequestVote('no');
});

$('#voteYes').on('click', () => {
    sendRequestVote('yes');
});

const resultRequestVote = (idQuestion) => {
    $.ajax({
        url: `http://localhost:3000/detail-question/${idQuestion}`,
        method: 'GET',
        success: (res) => {
            window.location.href = `http://localhost:3000/question/${idQuestion}`;
        }
    });
}

$('#resultVote').on('click', () => {
    resultRequestVote(idQuestion);
});

const directToCreateQuestion = () => {
    $.ajax({
        url: `http://localhost:3000/ask`,
        method: 'GET',
        success: (res) => {
            window.location.href = `http://localhost:3000/ask`
        },
        error: (res) => {
            console.log(res);
        }
    });
}

$("#createQuestion").on('click', () => {
    directToCreateQuestion();
});