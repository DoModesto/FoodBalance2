import Icon from '@react-native-vector-icons/ionicons';
import { StyleSheet, Text, Button, View, TextInput, TouchableOpacity, ScrollView, Alert, ImageBackground } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { useState } from "react";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

            console.log(response.data.id);

            if (response.status === 200) {
                AsyncStorage.setItem("id", response.data.id);
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
                        <View style={styles.container}>

                            <Text style={styles.titulo}></Text>

                            <View style={styles.inputContainer}>
                                <Icon name="mail-outline" size={20} color="#6af33c" style={styles.iconeInput} />
                                <TextInput
                                    value={email}
                                    onChangeText={(value) => setEmail(value)}
                                    placeholder="Digite seu e-mail"
                                    placeholderTextColor="#666"
                                    style={styles.input}
                                />
                            </View>

                            <View style={styles.inputContainer}>
                                <Icon name="lock-closed-outline" size={20} color="#6af33c" style={styles.iconeInput} />
                                <TextInput
                                    value={senha}
                                    onChangeText={(value) => setSenha(value)}
                                    secureTextEntry={true}
                                    placeholder="Digite sua senha"
                                    placeholderTextColor="#666"
                                    style={styles.input}
                                />
                            </View>

                            <TouchableOpacity
                                style={styles.btn}
                                onPress={handleLogin}
                                activeOpacity={0.8}
                            >
                                <Text style={styles.btnText}>ENTRAR</Text>
                                <Icon name="arrow-forward-outline" size={20} color="#000" style={styles.iconeBotao} />
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
                                <Text style={styles.text}>
                                    Não tem conta? <Text style={styles.textDestaque}>Cadastrar-se</Text>
                                </Text>
                            </TouchableOpacity>

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
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        padding: 20,
        paddingBottom: 60,
    },
    titulo: {
        fontSize: 32,
        marginBottom: 20,
        textAlign: 'center',
        color: '#fff',
        fontWeight: 'bold',
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 4,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#fff',
        borderWidth: 2,
        borderRadius: 15,
        marginBottom: 15,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        paddingHorizontal: 15,
        marginHorizontal: 10,
    },
    iconeInput: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        padding: 15,
        fontSize: 16,
        color: '#333',
    },
    btn: {
        backgroundColor: '#6af33c',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 55,
        borderRadius: 15,
        marginTop: 20,
        marginBottom: 20,
        marginHorizontal: 10,
        shadowColor: '#6af33c',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
    },
    btnText: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 18,
        marginRight: 8,
    },
    iconeBotao: {
        marginLeft: 5,
    },
    text: {
        alignSelf: "center",
        color: '#666',
        fontSize: 14,
        marginTop: 10,
    },
    textDestaque: {
        color: '#6af33c',
        fontWeight: 'bold',
    },
});

export default Login;