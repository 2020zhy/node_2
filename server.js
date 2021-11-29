// http モジュールを読み込み
const http = require('http');
require('dotenv').config()

const fs = require('fs')
const html = fs.readFileSync('index.html')
const querystring = require('querystring')

const port = process.env.PORT
const host = process.env.HOST
const message = 'Hello YSE!!!!'

//サーバを作成するする
const app = http.createServer(function (req, res) {
    // HTTPヘッダ
    res.writeHead(200, { 'Content-Type': 'text/html' });

    //res.write('<h1>Home Page</h1>')
    //res.write(message);
    //Request data event
    let post = ''
    req.on('data', (value) => {
        post += value
    })

    req.on('end', () => {
        if (post) {
            post = querystring.parse(post)
            console.log(post)
        }
        //レスポンスを閉じる
        res.end(html);
    })

});

// ホストとポートを指定して監視
app.listen(port, host);

console.log(`Server listen: http://${host}:${port}`);