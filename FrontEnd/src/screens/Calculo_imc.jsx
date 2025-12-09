import { ScrollView, StyleSheet, View, TextInput, TouchableOpacity, Text, Alert } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect } from "react";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Imc() {
  const [altura, setAltura] = useState('');
  const [peso, setPeso] = useState('');
  const [resultado, setResultado] = useState(null);
  const [mensagem, setMensagem] = useState('');
  const [usuarioId, setUsuarioId] = useState(null);

  
  useEffect(() => {
    const buscarUsuarioId = async () => {
      try {
        const id = await AsyncStorage.getItem('id');
        console.log('ID recuperado do AsyncStorage:', id);

        if (id && id !== 'null' && id !== 'undefined') {
          setUsuarioId(parseInt(id)); 
          console.log('ID do usuário definido:', id);
        } else {
          console.log('ID não encontrado ou inválido');
          setMensagem('Erro: Usuário não está logado');
        }
      } catch (error) {
        console.error('Erro ao buscar ID do usuário:', error);
        setMensagem('Erro ao recuperar dados do usuário');
      }
    };

    buscarUsuarioId();
  }, []);

  async function calcularIMC() {
    if (!usuarioId) {
      setMensagem('Erro: Usuário não identificado. Faça login novamente.');
      return;
    }

    if (!altura || !peso) {
      setMensagem('Preencha todos os campos!');
      return;
    }

    const alturaLimpa = altura.replace(',', '.').trim();
    const pesoLimpo = peso.replace(',', '.').trim();
    const alturaNumero = parseFloat(alturaLimpa);
    const pesoNumero = parseFloat(pesoLimpo);

    if (isNaN(alturaNumero) || isNaN(pesoNumero)) {
      setMensagem('Digite valores numéricos válidos!');
      return;
    }

    if (alturaNumero <= 0 || pesoNumero <= 0) {
      setMensagem('Altura e peso devem ser maiores que zero!');
      return;
    }

    const imc = pesoNumero / (alturaNumero * alturaNumero);
    const imcFormatado = imc.toFixed(1);

    let situacao;
    if (imc < 18.5) {
      situacao = 'Magreza';
    } else if (imc < 25) {
      situacao = 'Normal';
    } else if (imc < 30) {
      situacao = 'Sobrepeso';
    } else if (imc < 40) {
      situacao = 'Obesidade';
    } else {
      situacao = 'Obesidade Grave';
    }

    setResultado({
      imc: imcFormatado,
      situacao: situacao
    });

    try {
      console.log('Enviando dados para o backend:');
      console.log('altura:', alturaNumero);
      console.log('peso:', pesoNumero);
      console.log('imc:', parseFloat(imcFormatado));
      console.log('situacao:', situacao);
      console.log('usuario_id:', usuarioId, 'tipo:', typeof usuarioId);

      const response = await axios.post('http://10.0.2.2:3002/cadastrarIMC', {
        altura: alturaNumero,
        peso: pesoNumero,
        imc: parseFloat(imcFormatado),
        situacao: situacao,
        usuarios_id: usuarioId
      });

      console.log('Resposta do backend:', response.data);

      if (response.status === 201) {
        setMensagem('IMC cadastrado com sucesso!');
        console.log('IMC cadastrado para o usuário:', usuarioId);
      }
    } catch (error) {
      console.error('Erro completo:', error);
      if (error.response) {
        console.error('Erro de resposta:', error.response.data);
        if (error.response.status === 403) {
          setMensagem('Erro de autenticação ao cadastrar!');
        } else {
          setMensagem('Erro ao cadastrar IMC: ' + (error.response.data.message || 'Erro desconhecido'));
        }
      } else if (error.request) {
        setMensagem('Não foi possível conectar-se ao servidor');
      } else {
        setMensagem('Erro inesperado: ' + error.message);
      }
    }
  }
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.tituloCalculo}>
          <Text style={styles.fonteCalculo}>CALCULO IMC</Text>
        </View>
        <View style={styles.caixaCalculo}>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Text style={styles.textoNav}>Calculadora de IMC</Text>
            <Text style={styles.textoNav2}>Preencha os campos para calcular</Text>

            {resultado && (
              <View style={styles.resultadoContainer}>
                <Text style={styles.resultadoTexto}>Seu IMC: {resultado.imc}</Text>
                <Text style={styles.situacaoTexto}>Situação: {resultado.situacao}</Text>
              </View>
            )}

            {mensagem ? <Text style={styles.mensagem}>{mensagem}</Text> : null}
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              value={altura}
              onChangeText={setAltura}
              placeholder="Digite sua altura:"
              style={styles.input}
              keyboardType="numeric"
            />
            <TextInput
              value={peso}
              onChangeText={setPeso}
              placeholder="Digite seu peso:"
              style={styles.input}
              keyboardType="numeric"
            />
            <TouchableOpacity style={styles.btn} onPress={calcularIMC}>
              <Text style={styles.btnText}>Calcular</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default Imc;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dfe2e9',
  },

  caixaCalculo: {
    backgroundColor: '#ffff',
    justifyContent: 'center',
    borderRadius: 30,
    height: 380,
    width: 370,
    marginLeft: 20,
    marginTop: 80,
  },

  inputContainer: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 50,
  },

  textoNav: {
    color: '#2f2f2f',
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 25,
  },

  textoNav2: {
    color: '#2f2f2f',
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 11,
  },

  resultadoContainer: {
    padding: 10,
    borderRadius: 15,
    marginTop: 10,
    alignItems: 'center',
  },

  resultadoTexto: {
    color: '#2f2f2f',
    fontWeight: 'bold',
    fontSize: 18,
  },

  situacaoTexto: {
    color: '#2f2f2f',
    fontWeight: 'bold',
    fontSize: 12,
    marginTop: 5,
  },

  mensagem: {
    color: '#2f2f2f',
    textAlign: 'center',
    marginTop: 10,
    fontSize: 12,
    fontWeight: '500',
  },

  input: {
    borderColor: '#ffffff',
    color: '#000000',
    borderWidth: 3,
    borderRadius: 30,
    fontSize: 15,
    width: '70%',
    height: '20%',
    marginVertical: 5,
    textAlign: 'center',
    backgroundColor: '#D9D9D9',
  },

  btn: {
    backgroundColor: '#6af33c',
    width: 140,
    height: 30,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 24,
    marginLeft: 30,
    marginBottom: 15,
    marginTop: 25,
  },

  btnText: {
    color: '#000000',
    fontWeight: 'bold',
  },

  imagemFundo: {
    flex: 1,
  },

  tituloCalculo: {
    backgroundColor: '#ffffff',
    height: 80,
    borderBottomLeftRadius: 65,
    borderBottomRightRadius: 65,
  },
  
  fonteCalculo: {
    color: '#2f2f2f',
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 25,
    marginTop: 15,
  }
});