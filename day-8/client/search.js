$(document).ready(() => {
    $('#form').on('submit', (e) => {
        e.preventDefault();

        const keyword = $('#searchInput').val();

        $.ajax({
            url: 'http://localhost:3000/search-question',
            method: 'GET',
            data: {
                keyword
            },
            success: (res) => {
                console.log(res);
                if (res.success) {
                    const { data: questions } = res;
                    // console.log(questions);
                    const htmlStrArr = questions.map(question => {
                        const { content, yesCount, noCount } = question;
                        return `
                        <li class="list-group-item justify-content-between">
                          ${content}
                          <span class="badge badge-success badge-pill">${yesCount}</span>
                          <span class="badge badge-danger badge-pill">${noCount}</span>
                        </li>`;
                    });
                    // console.log(htmlStrArr);

                    const htmlDom = htmlStrArr.join('');
                    // console.log(htmlDom);
                    // truoc khi search thang moi, xoa het kq cu
                    $('#result').html('');

                    $('#result').append(htmlDom);
                }
            }
        });
    });
})