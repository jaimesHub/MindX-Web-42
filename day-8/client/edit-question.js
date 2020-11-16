const formEdit = $('#formEdit');
const inputText = $('#textEdit');

const yesCount = $('#yesCountEdit');
const noCount = $('#noCountEdit');

const submitBtn = $('#submitBtn');

formEdit.on('submit', (event) => {
    event.preventDefault();

    const editedContent = inputText.val();
    const editedYesCount = yesCount.val();
    const editedNoCount = noCount.val();

    $.ajax({
        url: `http://localhost:3000/edit-question`,
        method: "POST",
        data: {
            editedContent,
            editedYesCount,
            editedNoCount
        },
        success: (res) => {
            // console.log(res.data);
            window.location.href = 'http://localhost:3000/questions';
        },
        error: (res) => {
            console.log(res);
        }
    });
});