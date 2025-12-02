import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Alert, ImageBackground } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { useState } from "react";
import axios from 'axios';

export default function Home({ navigation }) {

    const [mensagem, setMensagem] = useState('');
    const [formData, setFormData] = useState({
        nome: '',
        sobrenome: '',
        email: '',
        senha: '',
    });

    const handleInputChange = (name, value) => {
        setFormData({ ...formData, [name]: value });
    };

    const handleCadastrar = async () => {
        if (!formData.nome || !formData.sobrenome || !formData.email || !formData.senha) {
            setMensagem('Todos os campos são obrigatórios!');
            return;
        }

        try {
            const response = await axios.post('http://10.0.2.2:3002/cadastrarUsuarios', formData);

            if (response.status === 201) {
                setFormData({
                    nome: '',
                    sobrenome: '',
                    email: '',
                    senha: '',
                });
                setMensagem('Cadastro efetuado com sucesso!!!');
                // Navega para a tela Inicial após 2 segundos
                // setTimeout(() => {
                //     navigation.navigate('Inicial');
                // }, 2000);
            }
        } catch (error) {
            if (error.response) {
                if (error.response.status === 403) {
                    setMensagem('Erro de autenticação ao cadastrar!');
                } else {
                    console.log(error);
                    setMensagem('Erro ao cadastrar');
                }
            } else if (error.request) {
                setMensagem('Não foi possível conectar-se ao servidor. Verifique sua conexão ou se a API está ativa.');
            } else {
                setMensagem('Erro inesperado: ' + error.message);
            }
        }
    };

    return (
        <SafeAreaProvider>
            <SafeAreaView style={{ flex: 1 }}>
               
                <Text style={styles.titulo}>CADASTRAR ALIMENTO</Text>
                <Text style={styles.titulo2}>inscreva-se agora</Text>
                <View>
                    <Text style={styles.tituloCampos}>Nome</Text>
                    <TextInput
                        value={formData.nome}
                        onChangeText={(value) => handleInputChange('nome', value)}
                        placeholder="Seu Nome"
                        style={styles.input}>
                    </TextInput>
                    <Text style={styles.tituloCampos}>Sobrenome</Text>
                    <TextInput
                        value={formData.sobrenome}
                        onChangeText={(value) => handleInputChange('sobrenome', value)}
                        placeholder="Seu Sobrenome"
                        style={styles.input}>
                    </TextInput>
                    <Text style={styles.tituloCampos}>Email</Text>
                    <TextInput
                        value={formData.email}
                        onChangeText={(value) => handleInputChange('email', value)}
                        placeholder="Seu Email"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        style={styles.input}>
                    </TextInput>
                    <Text style={styles.tituloCampos}>Senha</Text>
                    <TextInput
                        value={formData.senha}
                        onChangeText={(value) => handleInputChange('senha', value)}
                        secureTextEntry
                        placeholder="Sua Senha"
                        style={styles.input}>
                    </TextInput>

                    <TouchableOpacity
                        style={styles.btn}
                        onPress={handleCadastrar}
                    >
                        <Text style={styles.btnText}>CADASTRAR</Text>
                    </TouchableOpacity>

                    {mensagem ? <Text style={styles.mensagem}>{mensagem}</Text> : null}
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        flex: 1,
        justifyContent: 'center'
    },
    titulo: {
        fontSize: 40,
        alignSelf: 'center',
        marginTop: 120,
    },
    titulo2: {
        fontSize: 20,
        alignSelf: 'center',
        marginBottom: 10,
    },

    tituloCampos: {
        marginLeft: 20,
        marginTop: 10,
    },
    input: {
        backgroundColor: '#ffffff',
        padding: 10,
        marginVertical: 15,
        marginHorizontal: 15,
        marginBottom: 0,
        borderRadius: 40,
    },
    btn: {
        backgroundColor: '#6af33c',
        width: 190,
        height: 50,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 24,
        marginLeft: 110,
        marginBottom: 3,
        marginTop: 10,
    },
    btnVoltar: {
        backgroundColor: '#cccccc',
        width: 150,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 24,
        marginLeft: 130,
        marginBottom: 20,
        marginTop: 5,
    },
    btnText: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 20,
    },
    text: {
        alignSelf: "center",
        color: "#454545",
    },
    imagemFundo: {
        flex: 1,
        height: 900,
        width: 410,
    },
    mensagem: {
        color: 'red',
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 20,
        fontSize: 14,
    },
});
