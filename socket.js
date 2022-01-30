var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var fs = require('fs');
var port =  3001;
http.listen(port, ()=>{
    console.log("listening on *:"+port);
});

app.get('/',(req,res)=>{
    fs.readFile('./index.html','utf8',(err,data)=>{
        res.send(data);
    }); 
})

// 1. 이벤트 리스너 'on'이 클라이언트가 연결되면 함수를 작동
io.on('connection',(socket)=>{
    console.log(socket.id, 'Connected');
    //2. 들어온 client는 room1번에 조인
    socket.join('room1');
    // 5..emit이 클라이언트한테 메시지를 쏨
    socket.emit('msg', `세명 커뮤니티에 연결 되었습니다.`);
    // 4.. 소켓한테 'msg'이벤트 들어오면 들어온 데이터를 콘솔과 클라이언트에 표시
    socket.on('msg',(data)=>{
        console.log(socket.id, data);
        socket.broadcast.emit('msg', ` ${data} : 세명인 `);
    });
});