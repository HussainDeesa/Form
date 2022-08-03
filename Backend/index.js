const connectToMongo = require('./db')
const express = require('express')
const cors = require('cors')
const path = require('path')
connectToMongo();
const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())
// app.get('/',(req,res)=>{
//     res.send('hello')
// })

app.use('/api/auth', require('./routes/auth'))

if (process.env.NODE_ENV === "production") {
    app.get('/', (req, res) => {
        app.use(express.static(path.resolve(__dirname,'client','build')));
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}

app.listen(port, () => {
    console.log('Listening to ', port);
})
