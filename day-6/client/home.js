let idQuestion;
const getRandomQuestion = () => {

    $.ajax({
        url: `http://localhost:3000/random-question`,
        method: 'GET',
        success: (res) => {
            // console.log(res);
            const question = res.data;
            const { id, content, yesCount: yes, noCount: no } = question;
            // nhiệm vụ hiển thị của client
            idQuestion = id;
            $('#contentQuestion').html(content.value);
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

// document.querySelectorAll('.voteBtn').addEventListener('click', function(){
//     console.log(this);
// });