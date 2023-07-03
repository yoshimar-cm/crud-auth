import app from './app.js'
import { connectDB } from './db.js'



app.listen(3000, ()=>{
    connectDB();
    console.log('server listener on port 3000')
})