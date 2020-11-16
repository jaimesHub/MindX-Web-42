$.ajax({
    url: `http://localhost:3000/list-question`,
    method: 'GET',
    success: (res) => {
        if (res.success) {
            // console.log("Res from list-question.js: ", res.data);
            const listQuestion = res.data;
            const { _id, content, yesCount, noCount } = listQuestion;

            for (let question of listQuestion) {
                $("#infoTable").append(`
                <tbody>
                    <tr>
                        <td>${question.content}</td>
                        <td>${question.yesCount}</td>
                        <td>${question.noCount}</td>
                    </tr>
                </tbody>
                `);
            }
        }
    },
    error: (res) => {
        console.log(res);
    }
});

const createNewQuestion = () => {
    $.ajax({
        url: `http://localhost:3000/ask`,
        method: 'GET',
        success: (res) => {
            window.location.href = `http://localhost:3000/ask`
        }
    });
}

$('#createQuestion').on('click', () => {
    createNewQuestion();
});

const viewAnotherQuestion = () => {
    $.ajax({
        url: `http://localhost:3000/random-question`,
        method: 'GET',
        success: (res) => {
            if (res.success) {
                window.location.href = `http://localhost:3000`
            }
        },
        error: (res) => {
            console.log(res);
        }
    });
}

$('#otherQuestion').on('click', () => {
    console.log("Other question clicked");
    viewAnotherQuestion();
});