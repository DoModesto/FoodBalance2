import Icon from '@react-native-vector-icons/ionicons';
import { StyleSheet, Text, Button, View, TextInput, TouchableOpacity, ScrollView, Alert, ImageBackground } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { useState } from "react";
import axios from 'axios';

const Login = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const handleLogin = async () => {

        console.log("aquiiiiiiiiiiii");

        try {
            if (!email || !senha) {
                setMensagem('Todos os campos são obrigatórios!');
                Alert.alert('Erro', 'Todos os campos são obrigatórios!');
                return;
            }

            const data = {
                email,
                senha
            }

            const response = await axios.post('http://10.0.2.2:3002/login', data);

            console.log(response.data);

            if (response.status === 200) {

                navigation.navigate('Rotas');
            }
        } catch (erro) {
            console.log(erro);
            setMensagem('Email ou senha incorretos');
            Alert.alert('Erro', 'Email ou senha incorretos');
        }
    };

    return (
        <SafeAreaProvider>
            <SafeAreaView style={{ flex: 1 }}>
                <ImageBackground
                    style={styles.imagemFundo}
                    source={require('../../res/img/pagina-login.png')}
                >
                    <ScrollView contentContainerStyle={styles.scrollContainer}>
                        <View style={styles.container}> </View>
                        <View>

                            <TextInput
                                value={email}
                                onChangeText={(value) => setEmail(value)}
                                placeholder=" Digite seu e-mail"
                                style={styles.input}
                            />

                            <TextInput
                                value={senha}
                                onChangeText={(value) => setSenha(value)}
                                placeholder="Digite sua senha"
                                style={styles.input}
                            />

                            {/* <Button title= "Entrar" onPress={handleLogin} /> */}

                            <TouchableOpacity
                                style={styles.btn}
                                onPress={handleLogin}
                            >
                                <Text style={styles.btnText}>ENTRAR</Text>
                            </TouchableOpacity>

                            {/* <TouchableOpacity>                           
                                <Text style={styles.btnText}>ENTRAR</Text>
                            </TouchableOpacity> */}
                            <Text style={styles.text} onPress={() => navigation.navigate('Cadastro')}>
                                Não tem conta? Cadastrar-se
                            </Text>
                        </View>
                    </ScrollView>
                </ImageBackground>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    imagemFundo: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    scrollContainer: {
        flexGrow: 1,
    },
    icone_login: {
        alignSelf: 'center',
        marginTop: 50,
    },
    container: {
        padding: 5,
        flex: 1,
        justifyContent: 'center'
    },
    titulo: {
        fontSize: 30,
        marginBottom: 20,
        textAlign: 'center',
        color: '#000',
        fontWeight: 'bold',
    },
    input: {
        borderColor: '#ffffff',
        borderWidth: 2,
        padding: 14,
        marginVertical: 10,
        marginHorizontal: 25,
        marginBottom: 10,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        marginRight: 20,
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
        marginBottom: 15,
        marginTop: 25,
    },
    btnText: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 20,
    },
    text: {
        alignSelf: "center",
        color: '#000000',
        fontWeight: 'bold',
        marginBottom: 90,
    },
});
export default Login;