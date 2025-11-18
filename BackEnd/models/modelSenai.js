const executeQuery = require('../services/query');
const modelSenai = {
    //Registrar
    cadastrarMedicamentos: async (nome, fabricante, categoria, forma_farmaceutica, dosagem, quantidade) => {
        try {
            const result = await executeQuery(
                "INSERT INTO  cadastrar_medicamentos (nome, fabricante, categoria, forma_farmaceutica, dosagem, quantidade) VALUES (?, ?, ?, ?, ?, ?)",
                [nome, fabricante, categoria, forma_farmaceutica, dosagem, quantidade]
            );
            return result;
        } catch (error) {
            throw error;
        }
    },

    cadastrarUsuarios: async (nome, idade, email, senha, setor) => {
        try {
            const result = await executeQuery(
                "INSERT INTO  usuarios (nome, idade, email, senha, setor) VALUES (?, ?, ?, ?, ?)",
                [nome, idade, email, senha, setor]
            );
            return result;
        } catch (error) {
            throw error;
        }
    },
    //Obter EMAIL
    consultarEmail: async (email) => {
        const result = await executeQuery("SELECT * FROM  usuarios WHERE email = ?", [email]);
        return result;
    },
    //Listar
    listar: async () => {
        try {
            const result = await executeQuery("SELECT id, nome, fabricante, categoria, forma_farmaceutica, dosagem, quantidade FROM cadastrar_medicamentos")
            return result;
        }
        catch (error) {
            throw error;
        }
    },
    listarPorID: async (id) => {
        return await executeQuery("SELECT * FROM cadastrar_medicamentos WHERE id = ?", [id]);
    },
    //Atualizar
    atualizar: async (nome, fabricante, categoria, forma_farmaceutica, dosagem, quantidade, id) => {
        try {
            const result = await executeQuery("UPDATE cadastrar_medicamentos SET nome=?, fabricante=?, categoria=?, forma_farmaceutica=?, dosagem=?, quantidade=? WHERE id=?",
                [nome, fabricante, categoria, forma_farmaceutica, dosagem, quantidade,  id])
            return result;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
    //Deletar
    deletar: async (id) => {
        const result = await executeQuery("DELETE FROM cadastrar_medicamentos WHERE id=?", [id])
        return result;
    },
};
module.exports = modelSenai;

