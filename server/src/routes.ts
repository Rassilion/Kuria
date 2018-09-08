import express,{Request, Response} from "express"

const index=`
<script src="/socket.io/socket.io.js"></script>
<script>
  var socket = io();
</script>
`
export class Routes {       
    public routes(app:express.Application): void {          
        app.route('/')
        .get((req: Request, res: Response) => {            
            res.send(index)
        })               
    }
}