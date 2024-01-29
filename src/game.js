
/**
 * games = {
 * 6768798: [player1,player2],
 * }
 */
const games = {};

class Player{
    constructor(name,color,playerID,gameID){
        this.name = name ;
        this.color = color;
        this.playerID = playerID;
        this.gameID = gameID;
    }
}

const addPlayer = ({ gameID, name, playerID }) => {
    if (!games[gameID]) {
        const color = Math.random() <= 0.5 ? 'w' : 'b';
        const player = new Player(name, color, playerID, gameID);
        games[gameID] = [player];
        return {
            message: "Joined successfully",
            opponent: null,
            player,
        };
    }

    // Check if a player with the same playerID already exists in the game
    const existingPlayer = games[gameID].find(player => player.playerID === playerID);
    if (existingPlayer) {
        return { error: "Player with the same socket.id already exists in the game." };
    }

    if (games[gameID].length >= 2) {
        return { error: "This game is full" };
    }

    const opponent = games[gameID][0];
    const color = opponent.color === 'w' ? 'b' : 'w';
    const player = new Player(name, color, playerID, gameID);
    games[gameID].push(player);
    console.log("rooms : " , games)

    return {
        message: "Added Successfully",
        opponent,
        player,
    };
};

const game = (id) => games[id];

const removePlayer = (playerID) => {
    for(const game in games){
        let players = games[game];
        const index = players.findIndex((pl) => pl.playerID === playerID);

        if(index !== -1){
            //return the removed element
            return players.splice(index,1)[0];
        }
    }
}


module.exports = {
    addPlayer,
    game,
    removePlayer,
};