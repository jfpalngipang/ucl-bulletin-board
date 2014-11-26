var http = require('http'),
    express = require('express'),
    path = require('path'),
    url = require('url'),
    bodyParser = require('body-parser');
var app = express();
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
var server = http.Server(app);
server.listen(app.get('port'), function() {
  console.log('Express running on port '+ app.get('port'));
});
app.get('/', function(req, res){
  res.sendFile('receiver.html',{ root: path.join(__dirname, './views') });
});
var io = require('socket.io')(http);

io.listen(server);
io.sockets.on('connection', function(socket){
  console.log('connection detected');
  console.log(socket['id']);

  socket.on('loadVideo', function(data){
    socket.broadcast.emit('loadVideo', {'videoID' : data});
    console.log('CAUGHT!');
    console.log(data);
  });
  socket.on('customText', function(data){
    socket.broadcast.emit('customText', {'customText' : data})
    console.log(data);
  });
  //socket.broadcast.emit('check', {'message' : 'hi,franz!'});
});

app.post('/config', function(req, res){
	res.sendFile('config.html',{ root: path.join(__dirname, './public') });
	console.log(req.body);
  	console.log(req.body.videoId);

	//sendvideoId(req.body.videoId);
  //io.sockets.socket(socketid).emit('check', {'message':req.body.videoId});
  });

app.use(function (req, res){
	res.render('404', {url:req.url});
//	console.log(req.url);
});







function sendvideoId(videoId, socket)
{
  console.log('connection detected. reached this!');

}
/*
// use socket.io
var io = require('socket.io').listen(server);

//turn off debug
io.set('log level', 1);

// define interactions with client
io.sockets.on('connection', function(socket){
    //send data to client
    setInterval(function(){
        socket.emit('date', {'date': new Date()});
    }, 1000);

    //recieve client data
    socket.on('client_data', function(data){
        process.stdout.write(data.letter);
    });
});
*/
