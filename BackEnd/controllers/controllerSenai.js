const modelSenai = require('../models/modelSenai');
const controllerSenai = {
    
    registrarAlimentos: async (req, res) => {
        const {nome, calorias, quantidade} = req.body;
        try {
            const resultado = await modelSenai.cadastrarAlimentos(nome, calorias, quantidade);
            if (resultado.affectedRows > 0) {
                res.status(201).json({ msg: "Alimento cadastrado com sucesso" });
            }
            else {
                res.status(400).json({ msg: "Falha ao realizar o cadastro" });
            }
        }
        catch (erro) {
            console.error(erro);
            res.status(500).json({ error: 'Erro ao tentar cadastrar' });
        }
    },

    registrarUsuarios: async (req, res) => {
        const { nome, sobrenome, email, senha} = req.body;
        try {
            const EmailExistente = await modelSenai.consultarEmail(email);
            console.log(EmailExistente);
            if (EmailExistente.length > 0) {
                return res.status(400).json({ msg: "Email já está cadastrado!" });
            }
            else {
                const resultado = await modelSenai.cadastrarUsuarios(nome, sobrenome, email, senha);
                if (resultado.affectedRows > 0) {
                    res.status(201).json({ msg: "Usuário cadastrado com sucesso" });
                }
                else {
                    res.status(400).json({ msg: "Falha ao realizar o cadastro" });
                }
            }
        }
        catch (erro) {
            console.error(erro);
            res.status(500).json({ error: 'Erro ao tentar cadastrar' });
        }
    },

    login: async (req, res) => {
        const { email, senha } = req.body;
        try {
            const resultado = await modelSenai.validarLogin(email, senha);
            
            if (resultado.length > 0) {
                res.status(200).json(resultado[0]);
            }
            else {
                res.status(401).json({ msg: "Email ou senha inválidos" });
            }
        }
        catch (error) {
            res.status(500).json(error);
        }
    },
 
    listarAlimentos: async (req, res) => {
        try {
            const alimentos = await modelSenai.listar();
            res.status(200).json(alimentos);
        }
        catch (erro) {
            res.status(500).json({ error: "Erro ao obter a lista de colaboradores" });
        }
    },
    
    atualizar: async (req, res) => {
        const {nome, calorias, quantidade } = req.body;
        try {
           
            const consulta = await modelSenai.listarPorID(req.params.id);
            if (consulta.length > 0) {
                await modelSenai.atualizar(nome, calorias, quantidade, req.params.id);
                res.status(200).json({ msg: "Dados atualizados com sucesso!!!" });              
            }
            else {
               
                res.status(404).json({ msg: `O ID ${req.params.id} não existe na base de dados` })
            }
        }
        catch (erro) {
            console.log(req.body)
            res.status(500).json({ error: 'Erro ao tentar atualizar' });
        }
    },
    
    deletar: async (req, res) => {
        console.log(req.params.id)
        try {
            const consulta = await modelSenai.listarPorID(req.params.id)
            if (consulta.length > 0) {
                const resultado = await modelSenai.deletar(req.params.id);
                if (resultado.affectedRows > 0) {
                    res.status(204).end()
                }
                else {
                    res.status(404).json({ msg: "Erro ao deletar o medicamento" })
                }
            }
            else {
                res.status(404).json({ msg: "O ID não existe na base de dados" })
            }
        }
        catch (erro) {
            res.status(500).json({ error: 'Erro ao tentar deletar' });
        }
    },
};
module.exports = controllerSenai;

