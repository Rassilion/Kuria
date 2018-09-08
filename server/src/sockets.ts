
export class Sockets {     
    public sockets(io:SocketIO.Server): void {          
            
        
        io.on('connect', (socket: any) => {
            console.log('Client connected')
            socket.on('message', (m: any) => {
                console.log('[server](message): %s', JSON.stringify(m))
                io.emit('message', m)
            })

            socket.on('disconnect', () => {
                console.log('Client disconnected')
            })
        })
    }
}