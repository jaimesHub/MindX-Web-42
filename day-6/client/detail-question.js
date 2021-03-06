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

            const total = parseInt(yes) + parseInt(no);
            const percentYes = total !== 0 ? (parseInt(yes) / total * 100).toFixed(2) : 50;
            const percentNo = (100 - percentYes).toFixed(2);

            // nhiệm vụ hiển thị của client
            $('#contentQuestion').html(content.value);
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