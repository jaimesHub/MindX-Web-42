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
            document.getElementById('contentQuestion').innerHTML = content.value;
            // document.getElementById('voteNo').addEventListener('click', (idQuestion) => {
            //     $.ajax({
            //         url: `http://localhost:3000/vote-no`,
            //         method: 'PUT',
            //         data: {
            // idQuestion: idQuestion
            // }
            //         success: (res) => {
            //             window.location.href = `http://localhost:3000/question/${idQuestion}`;
            //         },
            //         error: (res) => {
            //             console.log(res);
            //         }
            //     });
            // });
            // document.getElementById('voteYes').addEventListener('click', (idQuestion) => {
            //     $.ajax({
            //         url: `http://localhost:3000/vote-yes`,
            //         method: 'PUT',
            //         success: (res) => {
            //             window.location.href = `http://localhost:3000/question/${idQuestion}`;
            //         },
            //         error: (res) => {
            //             console.log(res);
            //         }
            //     });
            // });
        },
        error: (res) => {
            console.log(res);
        }
    });
}

getRandomQuestion();

const otherQuestionBtn = document.getElementById('otherQuestion');
otherQuestionBtn.addEventListener('click', () => {
    // c1: load lai trang
    // window.location.reload(); // => server rendering: tra ve html

    // c2: goi lai http get random question // => client rendering: tra ve du lieu 
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

document.getElementById('voteNo').addEventListener('click', () => {
    sendRequestVote('no');
});

document.getElementById('voteYes').addEventListener('click', () => {
    sendRequestVote('yes');
});

// document.querySelectorAll('.voteBtn').addEventListener('click', function(){
//     console.log(this);
// });