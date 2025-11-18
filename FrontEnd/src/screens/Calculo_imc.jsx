import { ScrollView, StyleSheet, View, TextInput, TouchableOpacity, Button, Text, Alert } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";

function Imc() {
  const [altura, setAltura] = useState('');
  const [peso, setPeso] = useState('');
  const [resultado, setResultado] = useState(null);

  function calcularIMC() {
    const alturaLimpa = altura.replace(',', '.').trim();
    const pesoLimpo = peso.replace(',', '.').trim();
    const alturaNumero = parseFloat(alturaLimpa);
    const pesoNumero = parseFloat(pesoLimpo);
    const imc = pesoNumero / (alturaNumero * alturaNumero);
    const imcFormatado = imc.toFixed(1);

    let situacao;
    if (imc < 18.5) {
      situacao = 'Magreza';
    }
    else if (imc < 25) {
      situacao = 'Normal';
    }
    else if (imc < 30) {
      situacao = 'Sobrepeso';
    }
    else if (imc < 40) {
      situacao = 'Obesidade';
    }
    else {
      situacao = 'Obesidade Grave';
    }

    setResultado({
      imc: imcFormatado,
      situacao: situacao
    });
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
            <Text style={styles.textoNav2}>preencha os campos para calcular</Text>

            {resultado && (
              <View style={styles.resultadoContainer}>
                <Text style={styles.resultadoTexto}>Seu IMC: {resultado.imc}</Text>
                <Text style={styles.situacaoTexto}>Situação: {resultado.situacao}</Text>
              </View>
            )}

          </View>
          <View style={styles.inputContainer}>
            <TextInput value={altura} onChangeText={setAltura} placeholderTextColor={'#000000'} placeholder="Digite sua altura:" style={styles.input} keyboardType="numeric" />
            <TextInput value={peso} onChangeText={setPeso} placeholderTextColor={'#000000'} placeholder="Digite seu peso:" style={styles.input} keyboardType="numeric" />
            <TouchableOpacity
              style={styles.btn}
              onPress={(calcularIMC)}
            >
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
    height: 330,
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