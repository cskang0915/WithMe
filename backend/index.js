const express = require('express')
const userRouter = require('./routes/user')
const entryRouter = require('./routes/entry')
const collectionRouter = require('./routes/collection')

const app = express()

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*')
	res.setHeader('Access-Control-Allow-Methods', '*')
	res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
	next()
})

app.use(express.json())
app.use('/api/user', userRouter)
app.use('/api/entry', entryRouter)
app.use('/api/collection', collectionRouter)


app.get('/', (req, res)=>{
	res.send('this is the backend')
})

app.listen(9000, ()=>{
	console.log('Listening on port 9000')
})