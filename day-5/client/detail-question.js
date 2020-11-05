// Bước 1: Lấy ID câu hỏi

// console.log(window.location.pathname);
const pathName = window.location.pathname;
const idQuestion = pathName.split('/').pop();

$.ajax({
    url: `http://localhost:3000/detail-question/${idQuestion}`,
    method: 'GET',
    success: (res) => {
        // console.log(res);
        const question = res.data;
        console.log(question);
        const { content, id, yesCount: yes, noCount: no } = question;
        const total = parseInt(yes) + parseInt(no);
        const percentYes = total !== 0 ? (parseInt(yes) / total * 100).toFixed(2) : 50;
        const percentNo = (100 - percentYes).toFixed(2);
        // nhiệm vụ hiển thị của client
        document.getElementById('contentQuestion').innerHTML = content.value;
        document.getElementById("totalVote").innerHTML = total;
        document.getElementById("percentYes").innerHTML = percentYes;
        document.getElementById("percentNo").innerHTML = percentNo;

    },
    error: (res) => {
        console.log(res);
    }
})