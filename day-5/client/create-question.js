const textArea = document.querySelector(".formQuestion");
const form = document.getElementById("form");

// Bước 1: bắt sư kiện
form.addEventListener("submit", (event) => {
    event.preventDefault();

    // console.log("Form submit");

    // Bước 2: lấy ra giá trị areaText
    const content = textArea.value;
    // console.log(content);

    // Bước 3: gửi lên server
    $.ajax({
        url: 'http://localhost:3000/create-question',
        type: 'POST',
        data: {
            // content: content
            value: content
        },
        success: (res) => {
            // console.log(res);
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
textArea.addEventListener('input', () => {
    console.log("Vao day");

    // lay gia tri cua textarea
    const content = textArea.value;
    // so ki tu con lai
    const restCharacterLength = 200 - content.length;

    const restSpan = document.getElementById("rest");
    restSpan.innerHTML = restCharacterLength;
});