import {createServer} from "http";
import { WebSocketServer } from "ws";
import {parse} from "url";
import {v4} from "uuid";

const port = 8000;
const server = createServer();

const wss = new WebSocketServer({server});

const connections = { };
const users = { };


function handleMessage(msg,uuid){

}

//here req respresents http handshake and conn is underlying websocket connection.
wss.on("connection",(conn,req)=>{

    //parse is funciton of url, which is used to parse req url and if 2nd arg passed true, allows you to parse query, which returns a dict with key-value pair

    const {username} = parse(req.url,true).query;
    const uuid = v4();

    connections[uuid] = conn;
    users[uuid] = {
        username
    }

    conn.on("message",(msg)=>handleMessage(msg,uuid));
    conn.on("close",()=> console.log(users));

})

server.listen(port,()=>{console.log(`Server listening on ${port}`)});

