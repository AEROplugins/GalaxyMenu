const { Server } = require('socket.io')

const io = new Server(9596)

io.on('connection', (socket) => {
    console.log('new connection')
    $('#connection').append(`<br>Connection id: ${socket.id}`)
    
    setInterval(() => {
        socket.emit('request-update')
    },3*1000)

    socket.on('update', (json) => {
        updatePlayersGrid(json.players)
    })
})

function updatePlayersGrid(players = []) {
    $('#grid-container').html('')

    players.forEach((nickname) => {
        $('#grid-container').append(`
            <div class="card-container">
                <div class="card">
                    <p id="${nickname}"></p>
                </div>
            </div>
        `)
        $(`#${nickname}`).html(nickname)
    })
}

console.log('script loaded')