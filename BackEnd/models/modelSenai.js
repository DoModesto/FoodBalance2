const { listarUsuarios } = require('../controllers/controllerSenai');
const executeQuery = require('../services/query');
const bycrypt = require('bcrypt');
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

            const password = await bycrypt.hash(senha,10);

            console.log(password);

            const result = await executeQuery(
                "INSERT INTO  usuarios (nome, sobrenome, email, senha) VALUES (?, ?, ?, ?)",
                [nome, sobrenome, email, password]
            );
            return result;
        } catch (error) {
            throw error;
        }
    },

    cadastrarIMC: async (usuarios_id, altura, peso, imc, situacao) => {
        try {
            const result = await executeQuery(
                "INSERT INTO historico_imc (usuarios_id, altura, peso, imc, situacao) VALUES (?, ?, ?, ?, ?)",
                [usuarios_id, altura, peso, imc, situacao]
            );
            return result;
        } catch (error) {
            throw error;
        }
    },
    

    validarLogin: async (email, senha) => {
        try {
            const [resultado] = await executeQuery(
                "SELECT id, nome, email, senha FROM usuarios WHERE email = ?",
                [email, senha]
            );

            console.log(resultado);

            if(resultado){
                const validarSenha = bycrypt.compare(senha, resultado.senha);

                if(validarSenha){
                    return resultado;
                }
                else{
                    return null
                }
            }
            else{
                return null;
            }
        } 
        catch (erro) {
            return erro;
        }
    },
   
    consultarEmail: async (email) => {
        const result = await executeQuery("SELECT * FROM  usuarios WHERE email = ?", [email]);
        return result;
    },
  
    listar: async () => {
        try {
            const result = await executeQuery("SELECT id, nome, calorias, quantidade FROM alimentos")
            return result;
        }
        catch (error) {
            throw error;
        }
    },

    listarUsuarioss: async () => {
        try {
            const result = await executeQuery("SELECT id, nome, sobrenome FROM usuarios")
            return result;
        }
        catch (error) {
            throw error;
        }
    },

    listarUsuariosPorID: async (id) => {
        return await executeQuery("SELECT * FROM usuarios WHERE id = ?", [id]);
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
        const result = await executeQuery("DELETE FROM alimentos WHERE id=?", [id])
        return result;
    },
};
module.exports = modelSenai;

