export default function createGame(){
    const state = {
        players:{},
        fruits:{},
        screen:{
            width:10,
            height:10
        }
    }

    function addPlayer(command){
        const playerId = command.playerId
        const playerX = command.playerX
        const playerY = command.playerY

        state.players[playerId] = {
            x: playerX,
            y: playerY
        }
    }

    function removePlayer(command){
        const playerId = command.playerId

        delete state.players[playerId]
    }

    function addFruit(command){
        const fruitId = command.fruitId
        const fruitX = command.fruitX
        const fruitY = command.fruitY

        state.fruits[fruitId] = {
            x: fruitX,
            y: fruitY
        }
    }

    function removeFruit(command){
        const fruitId = command.fruitId

        delete state.fruits[fruitId]
    }

    function movePlayer(command){
        const acceptedMoves = {
            ArrowUp(player){ player.y -1 >= 0 ? player.y -= 1 : '' },
            ArrowRight(player){ player.x +1 < state.screen.width ? player.x += 1 : '' },
            ArrowDown(player){ player.y +1 < state.screen.height ? player.y += 1 : '' },
            ArrowLeft(player){ player.x -1 >= 0 ? player.x -= 1 : '' }
        }

        //console.log(`${command.playerId} monving whith ${command.keyPressed}`);
        const keyPressed = command.keyPressed
        const playerId = command.playerId
        const player = state.players[command.playerId]
        const moveFunction = acceptedMoves[keyPressed]

        if(player && moveFunction){
            moveFunction(player)
            checkFruitCollision(playerId)
            document.getElementById('jsonGame').innerHTML = JSON.stringify(state,null,2)
        }

        function checkFruitCollision(playerId){
            const player = state.players[playerId]
            for(const fruitId in state.fruits){
                const fruit = state.fruits[fruitId]
                if(player.x === fruit.x && player.y === fruit.y){
                    removeFruit({fruitId:fruitId})
                }
            }
        }
    }

    return {
        addPlayer,
        removePlayer,
        addFruit,
        removeFruit,
        movePlayer,
        state
    }
}