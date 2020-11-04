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
            console.log(res);
        },
        error: (res) => {
            console.log(res.err);
        }
    });
});

const showTextAreaLength = () => {
    document.querySelector('#textarea-length').innerHTML = form.textArea.value.length + '/200';
}



// Bước 4