const getRandomQuestion = () => {

    $.ajax({
        url: `http://localhost:3000/random-question`,
        method: 'GET',
        success: (res) => {
            // console.log(res);
            const question = res.data;
            const { content, id, yesCount: yes, noCount: no } = question;
            // nhiệm vụ hiển thị của client
            document.getElementById('contentQuestion').innerHTML = content.value;
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