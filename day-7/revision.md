- Ngữ cảnh this trong arrow function và function thường
- $(this).attr('data-type') => lay ra gia tri cua attribute dom co attribute name: data-type
- MongoDB - Database

CRUD
- done: create
- Xong get random question
- Vote question
- Xong đọc từ db
=> done: đọc câu hỏi ngẫu nhiên, đoc danh sách câu hỏi
- next:update + delete: crud nodejs mongoose
+ delete: home + list-question
https://stackoverflow.com/questions/34835325/ajax-update-and-remove-table-rows-with-node-js-and-mongoose
+ https://viblo.asia/p/bat-dau-nodejs-mongoose-api-authentication-crud-cho-nguoi-moi-hoc-Eb85oa66Z2G#_43-controllers-21 

- Tư tưởng làm một trang web Khi cần thay đổi giao diện trang web và lưu kết quả trên server

Bước 1: Bắt sự kiện để client gọi http request lên server 
++ Load trang, click button, mouse move button 
++ Dùng fetch (thuần javascript), thư viện (ajax, axios)

Bước 2: Server nhận request đấy, xử lý dữ liệu, trả về cho client

Bước 3: Client nhận kết quả thì thay đổi giao diện bằng cách dùng javascript tác động vào dom

location, Math.random, Math.floor

https://codersera.com/blog/nestjs-typeorm-graphql-dataloader-tutorial-with-typescript/