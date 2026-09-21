

const socket = io("http://localhost:3000",{
    auth:{
        token : localStorage.getItem("token")
    }
})

socket.on('connect',()=>{
    console.log('socket connected')
})

socket.on('send',(data)=>{
    console.log(`${data} from front`);
})

socket.on('connect_error',(error)=>{
    console.log(error);
    
})