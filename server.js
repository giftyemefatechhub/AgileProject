const express = require('express')
const app = express()
const db = require('./database')
app.set('view-engine', 'ejs')
const bcrypt = require('bcrypt')
const cors = require('cors')
const path = require('path')

const { registerUser, validateLogin, userExists, getPassword } = require('./database.js')


app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(express.static(path.join(__dirname,'public')))

db.init()
app.use(cors({
    origin: "*",
}))


let encryptedPass

app.get('/', (req, res) =>{
    res.redirect('/LOGIN')

})

app.post('/LOGIN',async(req, res) =>{
    const username = req.body.username
    const rawPassword = req.body.password

    console.log(username)

    if (await userExists(username)){
        let dbPass = await getPassword(username)
        console.log(username)

        if(await bcrypt.compare(rawPassword,dbPass) && await validateLogin(username,dbPass)){
        console.log(username)
            
            res.sendFile(__dirname + '/views/index.html')

        }else{
            console.log('wrong pasword')
        }}else{
            res.render('register.ejs')
        }
        

	
        
	

    

})

app.get('/tasks.html',(req, res) =>{
    res.sendFile(__dirname + '/views/tasks.html') //This code allows us to access the tasks.html file
})

app.get('/js/tasks.js',(req, res) =>{  //This code allows us to be able to access the javascript file that contains code for the tasks.html to work
    res.sendFile(__dirname + '/js/tasks.js')
})

app.get('/js/tasks.js',(req, res) =>{
    res.sendFile(__dirname + '/js/tasks.js')
})

app.get('/calendar.html',(req, res) =>{
    res.sendFile(__dirname + '/views/calendar.html')
})

app.get('/employee.html',(req, res) =>{
    res.sendFile(__dirname + '/views/employee.html')
})

app.get('/mood.html',(req, res) =>{
    res.sendFile(__dirname + '/views/mood.html')
})

app.get('/LOGIN',(req, res) =>{
    res.render('login.ejs')
})

app.post('/REGISTER',async (req, res) =>{

    const username = req.body.name
    const password = req.body.password
    
    encryptedPass = await  bcrypt.hash(password, await bcrypt.genSalt(12))

    await registerUser(username,encryptedPass) 
    res.redirect('/LOGIN')
	  
})

app.get('/REGISTER',(req, res) =>{
    res.render('register.ejs')
})


app.listen(5000, () => {
    console.log("Server listening on port: " + 5000)
})
