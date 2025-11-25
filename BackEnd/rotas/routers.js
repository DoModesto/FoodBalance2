const express = require('express');
const controllerSenai = require('../controllers/controllerSenai');
const routers = express.Router();
//Usuarios
routers.post('/cadastrarAlimentos', controllerSenai.registrarAlimentos);
routers.post('/cadastrarUsuarios', controllerSenai.registrarUsuarios);
routers.put('/atualizar/:id', controllerSenai.atualizar);
routers.delete('/deletar/:id', controllerSenai.deletar);
routers.get('/listar', controllerSenai.listarAlimentos);
routers.post('/login', controllerSenai.login);
module.exports = routers;