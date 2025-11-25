const executeQuery = require('../services/query');
const modelSenai = {
    
    cadastrarAlimentos: async (nome, calorias, quantidade) => {
        try {
            const result = await executeQuery(
                "INSERT INTO  alimentos (nome, calorias, quantidade) VALUES (?, ?, ?)",
                [nome, calorias, quantidade]
            );
            return result;
        } catch (error) {
            throw error;
        }
    },

    cadastrarUsuarios: async (nome, sobrenome, email, senha) => {
        try {
            const result = await executeQuery(
                "INSERT INTO  usuarios (nome, sobrenome, email, senha) VALUES (?, ?, ?, ?)",
                [nome, sobrenome, email, senha]
            );
            return result;
        } catch (error) {
            throw error;
        }
    },

    validarLogin: async (email, senha) => {
        try {
            const [result] = await conexao.query(
                "SELECT id, nome, email, senha FROM usuarios WHERE email = ? AND senha = ?",
                [email, senha]
            );
            return result;
        } catch (erro) {
            return erro;
        }
    },
   
    consultarEmail: async (email) => {
        const result = await executeQuery("SELECT * FROM  usuarios WHERE email = ?", [email]);
        return result;
    },
  
    listar: async () => {
        try {
            const result = await executeQuery("SELECT nome, calorias, quantidade FROM alimentos")
            return result;
        }
        catch (error) {
            throw error;
        }
    },
    listarPorID: async (id) => {
        return await executeQuery("SELECT * FROM alimentos WHERE id = ?", [id]);
    },
   
    atualizar: async (nome, calorias, quantidade, id) => {
        try {
            const result = await executeQuery("UPDATE alimentos SET nome=?, calorias=?, quantidade=? WHERE id=?",
                [nome, calorias, quantidade, id])
            return result;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
    
    deletar: async (id) => {
        const result = await executeQuery("DELETE FROM cadastrar_medicamentos WHERE id=?", [id])
        return result;
    },
};
module.exports = modelSenai;

