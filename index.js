//Cross-Origin Resource Sharing (CORS) is an HTTP-header based mechanism that allows a server to indicate any origins (domain, scheme, or port) other than its own from which a browser should permit loading resources
const io = require("socket.io")(8000, {
    cors: {
      origin: "http://localhost:5500",
      methods: ["GET", "POST"],
      allowedHeaders: ["my-custom-header"],
      credentials: true
    }
  });
const user={};
//node server is going to handel some events
//io is a socket io server listning to every server instances
//for any incoming events we have to listen to socket
io.on('connection', (socket) => {
 //if any new user joins,let other user who is already connected gets to know   
    socket.on('new-user-joined',names=>{
    user[socket.id]=names; 
    g=socket.broadcast.emit('user-joined',names);
    });
//if a msg is sent,let other people see that msg
socket.on('send',message=>{
    socket.broadcast.emit('receive',{message:message,names:user[socket.id]})
});
//if any user leaves ,let other user know that he or she left
socket.on('disconnect',message=>{
    socket.broadcast.emit('left',user[socket.id])
delete user[socket.id]
});

  });
    