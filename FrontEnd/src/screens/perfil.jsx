import { ScrollView, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import axios from 'axios';

function Principal({ navigation }) {
    const [nome, setNome] = useState('');
    const [sobrenome, setSobrenome] = useState('');
    const [peso, setPeso] = useState('');
    const [altura, setAltura] = useState('');
    const [imc, setImc] = useState('');
    const [mensagem, setMensagem] = useState('');

    useEffect(() => {
        async function carregarDadosUsuario() {
            try {
                const resposta = await axios.get('http://10.0.2.2:3002/listarDadosUsuario');
                if (resposta.data && resposta.data.length > 0) {
                    const usuario = resposta.data[0];
                    setNome(usuario.nome);
                    setSobrenome(usuario.sobrenome);
                    setPeso(usuario.peso);
                    setAltura(usuario.altura);
                    setImc(usuario.imc);
                } else {
                    setMensagem('Nenhum dado encontrado para o usuário.');
                }
            } catch (error) {
                console.log("Erro ao carregar dados do usuário", error);
                setMensagem('Erro ao carregar informações do usuário.');
            }
        }

        carregarDadosUsuario();
    }, []);

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <View style={styles.tituloCalculo}>
                        <Text style={styles.fonteCalculo}>PERFIL</Text>
                    </View>
                    <View style={styles.caixaInformações}>
                        <View style={styles.contentContainer}>
                            <View>
                                <Text style={styles.infoTexto1}>{nome} {sobrenome}</Text>
                                <Text style={styles.infoTexto2}>Informações Pessoais:</Text>

                                <View style={styles.infoTexto3}>
                                    <Text style={styles.infoTexto4}>Seu IMC: {imc}</Text>
                                    <Text style={styles.infoTexto4}>Peso: {peso} kg</Text>
                                    <Text style={styles.infoTexto4}>Altura: {altura} m</Text>
                                </View>

                                {mensagem ? <Text style={styles.infoTexto5}>{mensagem}</Text> : null}

                                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                                    <Text style={styles.infoTexto5}>
                                        <Text style={styles.infoSair}>Sair</Text>
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity>
                                    <Text style={styles.infoTexto5}>EXCLUIR</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

export default Principal;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#dfe2e9',
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    contentContainer: {
        alignItems: 'center',
    },
    tituloCalculo: {
        backgroundColor: '#ffffff',
        height: 80,
        marginBottom: 70,
        borderBottomLeftRadius: 65,
        borderBottomRightRadius: 65,
    },
    fonteCalculo: {
        color: '#2f2f2f',
        alignSelf: 'center',
        fontWeight: 'bold',
        fontSize: 25,
        marginTop: 15,
    },
    caixaInformações: {
        width: 350,
        height: 440,
        backgroundColor: '#ffffff',
        alignSelf: 'center',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 100,
    },
    infoTexto1: {
        alignSelf: 'center',
        marginLeft: 10,
        fontWeight: 'bold',
        fontSize: 18,
    },
    infoTexto2: {
        alignSelf: 'center',
        marginLeft: 5,
        fontSize: 16,
        marginTop: 10,
    },
    infoTexto3: {
        alignSelf: 'center',
        marginLeft: 5,
        marginTop: 25,
    },
    infoTexto4: {
        alignSelf: 'center',
        marginLeft: 5,
        fontSize: 14,
        marginBottom: 5,
    },
    infoTexto5: {
        alignSelf: 'center',
        marginLeft: 5,
        marginTop: 10,
    },
    infoSair: {
        marginLeft: 13,
        color: '#ff0000',
        fontWeight: 'bold',
    },
});