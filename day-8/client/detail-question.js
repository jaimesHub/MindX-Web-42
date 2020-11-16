// Bước 1: Lấy ID câu hỏi

// console.log(window.location.pathname);
const pathName = window.location.pathname;
const idQuestion = pathName.split('/').pop();
// console.log(idQuestion);

$.ajax({
    url: `http://localhost:3000/detail-question/${idQuestion}`,
    method: 'GET',
    success: (res) => {
        // console.log(res);
        if (res.success) {
            const question = res.data;

            const { content, id, yesCount: yes, noCount: no } = question;
            // console.log("Yes from detail-question-api: ", yes);
            // console.log("No from detail-question-api: ", no);

            const total = parseInt(yes) + parseInt(no);
            const percentYes = total !== 0 ? (parseInt(yes) / total * 100).toFixed(2) : 50;
            // console.log("Percent yes: ", percentYes);
            const percentNo = (100 - percentYes).toFixed(2);
            // console.log("Percent no: ", percentNo);
            // console.log("Content from detail-question: ", content);
            // nhiệm vụ hiển thị của client
            $('#contentQuestion').html(content);
            $("#totalVote").html(total);
            $("#percentYes").html(percentYes);
            $("#percentNo").html(percentNo);
        }

    },
    error: (res) => {
        console.log(res);
    }
});

const viewAnotherQuestion = () => {
    $.ajax({
        url: `http://localhost:3000/random-question`,
        method: 'GET',
        success: (res) => {
            if (res.success) {
                window.location.href = `http://localhost:3000/`
            }
        },
        error: (res) => {
            console.log(res);
        }
    });
}

$('#viewAnotherQuestion').on('click', () => {
    viewAnotherQuestion();
});