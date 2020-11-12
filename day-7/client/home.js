let idQuestion;
const getRandomQuestion = () => {

    $.ajax({
        url: `http://localhost:3000/random-question`,
        method: 'GET',
        success: (res) => {
            // console.log(res);
            const question = res.data;
            if (!question) {
                console.log("Error");
                return;
            }
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
            // console.log(res);
            res.send({ success: 0 });
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

const getListQuestion = () => {
    $.ajax({
        url: `http://localhost:3000/list-question`,
        method: 'GET',
        success: (res) => {
            window.location.href = `http://localhost:3000/questions`;
        },
        error: (res) => {
            console.log(res);
        }
    });
}

$("#getListQuestion").on('click', () => {
    getListQuestion();
});

const deleteQuestion = () => {
    $.ajax({
        url: `http://localhost:3000/delete-question/${idQuestion}`,
        method: 'DELETE',
        success: (res) => {
            console.log(res.data);
            window.location.href = `http://localhost:3000/questions`;
        },
        error: (res) => {
            console.log(res);
        }
    });
}

/**Xóa câu hỏi  */
$("#deleteButton").on('click', () => {
    deleteQuestion();
});

/**Chỉnh sửa câu hỏi */
$("#updateButton").on('click', () => {
    window.location.href = `http://localhost:3000/edit-question/${idQuestion}`;
});