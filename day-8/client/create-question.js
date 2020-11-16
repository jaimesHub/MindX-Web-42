const textArea = $(".formQuestion");
const form = $("#form");

// Bước 1: bắt sư kiện
form.on("submit", (event) => {
    event.preventDefault();

    // console.log("Form submit");

    // Bước 2: lấy ra giá trị areaText
    const content = textArea.val();
    // console.log(content);

    // Bước 3: gửi lên server
    $.ajax({
        url: 'http://localhost:3000/create-question',
        type: 'POST',
        data: {
            // content: content
            content
        },
        success: (res) => {
            // console.log("RES: ", res);
            if (res.success) {
                const idQuestion = res.data.id;
                window.location.href = "http://localhost:3000/question/" + idQuestion;
            }
        },
        error: (res) => {
            console.log(res.err);
        }
    });
});

// Bước 4

// Chữa bài day-4: Thay đổi giá trị 200/200
textArea.on('input', () => {
    // console.log("Vao day");

    // lay gia tri cua textarea
    const content = textArea.val();
    // so ki tu con lai
    const restCharacterLength = 200 - content.length;

    const restSpan = $("#rest");
    restSpan.html(restCharacterLength);
});