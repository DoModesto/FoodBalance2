import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import axios from 'axios';

const Atualizar = ({ navigation, route }) => {
    const [nome, setNome] = useState('');
    const [calorias, setCalorias] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [mensagem, setMensagem] = useState('');

    const id = route.params.id;

    const handleAtualizar = async () => {
        if (!nome || !calorias || !quantidade ) {
            setMensagem('Todos os campos são obrigatórios!');
            return;
        }

        const data = {
            nome,
            calorias,
            quantidade,
        };

        try {
            const response = await axios.put(`http://10.0.2.2:3002/atualizar/${id}`, data);
            
            setMensagem('Atualizado com sucesso!');
            setNome('');
            setCalorias('');
            setQuantidade('');
            

            setTimeout(() => {
                navigation.navigate('Rotas');
            }, 1500);
        } catch (error) {
            if (error.response) {
                if (error.response.status === 404) {
                    setMensagem('ID não encontrado na base de dados.');
                } else {
                    setMensagem('Erro ao atualizar. Tente novamente.');
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
            <SafeAreaView style={styles.container}>
                <Text style={styles.titulo}>ALIMENTOS</Text>
                
                <View style={styles.card}>
                    <Text style={styles.tituloCard}>ATUALIZAR ALIMENTO</Text>
                    
                    <TextInput
                        style={styles.input}
                        placeholder="Nome"
                        value={nome}
                        onChangeText={setNome}
                    />
                    
                    <TextInput
                        style={styles.input}
                        placeholder="calorias"
                        value={calorias}
                        onChangeText={setCalorias}
                        keyboardType="numeric"
                    />
                    
                    <TextInput
                        style={styles.input}
                        placeholder="quantidade"
                        value={quantidade}
                        onChangeText={setQuantidade}
                    />    
                    
                    <TouchableOpacity
                        style={styles.btn}
                        onPress={handleAtualizar}
                    >
                        <Text style={styles.btnText}>ATUALIZAR</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.btnVoltar}
                        onPress={() => navigation.goBack()}
                    >
                        <Text style={styles.btnVoltarText}>VOLTAR</Text>
                    </TouchableOpacity>

                    {mensagem ? <Text style={styles.mensagem}>{mensagem}</Text> : null}
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f7',
        paddingTop: 60,
    },
    titulo: {
        fontSize: 24,
        fontWeight: '600',
        alignSelf: 'center',
        marginBottom: 40,
        color: '#000',
        letterSpacing: 2,
    },
    card: {
        backgroundColor: '#7ed957',
        marginHorizontal: 20,
        borderRadius: 25,
        padding: 25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 5,
    },
    tituloCard: {
        fontSize: 16,
        fontWeight: '600',
        color: '#fff',
        textAlign: 'center',
        marginBottom: 20,
        letterSpacing: 1,
    },
    input: {
        backgroundColor: '#ffffff',
        padding: 15,
        marginBottom: 15,
        borderRadius: 25,
        fontSize: 14,
        color: '#666',
    },
    btn: {
        backgroundColor: '#fff',
        paddingVertical: 15,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    btnText: {
        color: '#7ed957',
        fontWeight: 'bold',
        fontSize: 16,
        letterSpacing: 1,
    },
    btnVoltar: {
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        paddingVertical: 12,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        borderWidth: 1,
        borderColor: '#fff',
    },
    btnVoltarText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 14,
        letterSpacing: 1,
    },
    mensagem: {
        color: '#fff',
        textAlign: 'center',
        marginTop: 15,
        fontSize: 13,
        fontWeight: '500',
    },
});

export default Atualizar;