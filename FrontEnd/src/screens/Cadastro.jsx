import { StyleSheet, Text, View, TextInput, TouchableOpacity, Button, ScrollView, Alert, ImageBackground } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { useState } from "react";


export default function Cadastro({ navigation }) {

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [usuario, setUsuario] = useState('');


    return (
        <SafeAreaProvider>
            <SafeAreaView style={{ flex: 1 }}>
                <ImageBackground
                    style={styles.imagemFundo}
                    source={require('../../res/img/imagemCadastro.png')}
                ></ImageBackground>
                <Text style={styles.titulo}>CRIE SUA CONTA</Text>
                <Text style={styles.titulo2}>inscreva-se agora</Text>
                <View>
                    <Text style={styles.tituloCampos}>Nome</Text>
                    <TextInput value={nome}
                        onChangeText={(value) =>
                            setNome(value)}
                        placeholder="Seu Nome Completo"
                        style={styles.input}>
                    </TextInput>
                    <Text style={styles.tituloCampos}>Usuário</Text>
                    <TextInput value={usuario}
                        onChangeText={(value) =>
                            setUsuario(value)}
                        placeholder="Seu usuário"
                        style={styles.input}>
                    </TextInput>
                    <Text style={styles.tituloCampos}>Senha</Text>
                    <TextInput value={senha}
                        onChangeText={(value) =>
                            setSenha(value)}
                        secureTextEntry
                        placeholder="Sua Senha"
                        style={styles.input}>
                    </TextInput>
                    <Text style={styles.tituloCampos}>Email</Text>
                    <TextInput value={email}
                        onChangeText={(value) =>
                            setSenha(value)}
                        secureTextEntry
                        placeholder="Seu Email"
                        style={styles.input}>
                    </TextInput>


                    <TouchableOpacity
                        style={styles.btn}
                        onPress={() => navigation.navigate('Inicial')}
                    >
                        <Text style={styles.btnText}>CADASTRAR</Text>
                    </TouchableOpacity>
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
        marginBottom: 10,
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
        marginBottom: 35,
        marginTop: 10,
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

});