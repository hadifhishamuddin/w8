const MongoClient = require("mongodb").MongoClient;
const User = require("./user");

MongoClient.connect(
	// TODO: Connection 
	"mongodb+srv://m001-student:m001-mongodb-basics@Sandbox.mktdo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
	{ useNewUrlParser: true },
).catch(err => {
	console.error(err.stack)
	process.exit(1)
}).then(async client => {
	console.log('Connected to MongoDB');
	User.injectDB(client);
})

const express = require('express')
const app = express()
const port = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
	res.send('Hello World')
})

app.get('/hello', (req, res) => {
	res.send('Hello BENR2423')
})

app.post('/login', async (req, res) => {
	console.log(req.body);

	const user = await User.login(req.body.username, req.body.password);

	if (user == 'Invalid username'){
		res.status(401).send("Invalid username")
		return
	}

	else if (user == 'Invalid password'){
		res.status(401).send("Invalid password")
		return
	}
	res.status(200).send("login successful!")
	// res.status(200).json({
	// 	_id: user._id,
	// 	name: user.username,
	// 	phonenumber: user.phone,
	// })
})

app.post('/register', async (req, res) => {
	console.log(req.body);

	let user = await User.register(req.body.username, req.body.password, req.body.phone);
	if (user == 'Duplicate username'){
		res.status(401).send("Duplicate username")
		return
	}

	res.status(200).send("New user registrated")
	return
	// res.json({
	// 	_id: '123456',
	// 	name: 'test',
	// 	age: 18,
	// })
})

app.patch('/update/user',async (req,res) =>{
	console.log(req.body);

	let user = await User.update(req.body.username, req.body.password, req.body.phone);
	if (user == 'Invalid username'){
		res.status(401).send("Invalid username")
		return
	}

	else if (user == 'Invalid password'){
		res.status(401).send("Invalid password")
		return
	}

	res.status(200).send("Update successfully")
	//res.status(200).json({
	//	_id: user._id,
	//	name: user.username,
	//	phonenumber: user.phone,
	//})
})

app.delete('/delete/user',async (req,res) =>{
	console.log(req.body);

	let user = await User.delete(req.body.username, req.body.password);
	if (user == 'Invalid username'){
		res.status(401).send("Invalid username")
		return
	}

	else if (user == 'Invalid password'){
		res.status(401).send("Invalid password")
		return
	}

	res.status(200).send("Delete successfully")
	//res.status(200).json({
	//	_id: user._id,
	//	name: user.username,
	//	phonenumber: user.phone,
	//})
})

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})
