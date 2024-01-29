const express = require('express');
const {createServer} = require('node:http');
const {Server} = require('socket.io');
const { addPlayer, game, removePlayer } = require('./game');
const cors = require('cors');

const app = express();
const server = createServer(app);
const PORT = 8081 ;

//io is used to listen for connections and to emit events to connected users
const io = require('socket.io')(server, {
    cors: {
      origin: '*',
    }
});


io.on('connection',(socket) => {
    
    socket.on('join',({name,gameID} , callback)=>{
        const {error , player , opponent} = addPlayer({
            gameID,
            name,
            playerID:socket.id,
        });
        if(error){
            return callback({error});
        }

        socket.join(gameID);
        callback({color:player.color});

        //send welcome to player1 and also send the opponent players data
        socket.emit('welcome',{
            message: `Hello ${player.name} , welcome to the game`,
            opponent,
        })

        //Tell player2 that player2 has joined
        socket.broadcast.to(player.gameID).emit('opponentJoin',{
            message: `${player.name} has joined the game`,
            opponent: player,
        });

        if(game(gameID).length >= 2){
            const white = game(gameID).find((player)=> player.color === 'w');
            io.to(gameID).emit('message',{
                message: `Lets start the game . White (${white.name}) goes first`,
            });
        }

        console.log("connected : " + player.playerID);

    });

    socket.on('move',({from,to,gameID}) => {
        socket.broadcast.to(gameID).emit('opponentMove',{from,to});
    })

    socket.on("disconnect",()=>{
        player = removePlayer(socket.id);

        if(player){
            io.to(player.game).emit('message',{
                message : `${player.name} has left the game`,
            });
            socket.broadcast.to(player.game).emit('opponentLeft');
        }
    });
});

server.listen(PORT,()=>console.log('Server running on port ' + PORT));