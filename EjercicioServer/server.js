const express= require("express")
const server = express()
const Task = require('./models/esquema')

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {console.log("Base de dado conectada")})
    .catch((error) => {console.log(error)});

server.use(express.json());

server.get("/",function(req, res){
    return res.send("Hola estoy funcionando")
})

server.get('/tasks', async (req, res) => {
    const task = await Task.find({});
    res.json({ task })
})

server.post('/tasks', async (req, res) => {
    const task = new Task(req.body);
    await task.save()
    res.send(task)
})

server.get('/tasks/:id', async (req, res) => {
    const task = await Task.findById(req.params.id);
    res.json({ task })
})

server.put('/tasks/:id', async (req, res) => {
    const task = await Task.findById(req.params.id);
    if(req.body.done == 'true'){
        task.done = true
    }
    if(req.body.done == 'false'){
        task.done = false
    }
    task.description = req.body.description
    res.json({ task })
})

server.delete('/tasks/:id', async (req, res) => {
    await Task.findByIdAndDelete(req.params.id)
    res.send('Deleted!')
})

server.listen(5000,function(){
    console.log("server is running")
})