const modelSenai = require('../models/modelSenai');
const controllerSenai = {
    //Controller para registrar
    registrarMedicamentos: async (req, res) => {
        const {nome, fabricante, categoria, forma_farmaceutica, dosagem, quantidade} = req.body;
        try {
            const resultado = await modelSenai.cadastrarMedicamentos(nome, fabricante, categoria, forma_farmaceutica, dosagem, quantidade);
            if (resultado.affectedRows > 0) {
                res.status(201).json({ msg: "Medicamento cadastrado com sucesso" });
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
        const { nome, idade, email, senha, setor } = req.body;
        try {
            const EmailExistente = await modelSenai.consultarEmail(email);
            console.log(EmailExistente);
            if (EmailExistente.length > 0) {
                return res.status(400).json({ msg: "NIF já está cadastrado!" });
            }
            else {
                const resultado = await modelSenai.cadastrarUsuarios(nome, idade, email, senha, setor);
                if (resultado.affectedRows > 0) {
                    res.status(201).json({ msg: "Colaborador cadastrado com sucesso" });
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
    //Controller para listar
    listarSenai: async (req, res) => {
        try {
            const usuarios = await modelSenai.listar();
            res.status(200).json(usuarios);
        }
        catch (erro) {
            res.status(500).json({ error: "Erro ao obter a lista de colaboradores" });
        }
    },
    //Controller para atualizar
    atualizar: async (req, res) => {
        const {nome, fabricante, categoria, forma_farmaceutica, dosagem, quantidade } = req.body;
        try {
           
            const consulta = await modelSenai.listarPorID(req.params.id);
            if (consulta.length > 0) {
                await modelSenai.atualizar(nome, fabricante, categoria, forma_farmaceutica, dosagem, quantidade, req.params.id);
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
    //Controller para deletar
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

