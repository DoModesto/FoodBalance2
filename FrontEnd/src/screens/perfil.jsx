import { ScrollView, StyleSheet, View, Text, TouchableOpacity, ImageBackground } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Icon from '@react-native-vector-icons/ionicons';

function Principal({ navigation }) {
    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <View style={styles.tituloCalculo}>
                        <Text style={styles.fonteCalculo}>CALCULO IMC</Text>
                    </View>
                    <View style={styles.caixaInformações}>
                        <View style={styles.contentContainer}>
                            <View>
                                <Icon style={styles.iconePerfil} name="person-circle-outline" size={150} color={'#000000'} />
                                <Text style={styles.infoTexto1}>Usuário 1 </Text>
                                <Text style={styles.infoTexto2}>Informações Pessoais: </Text>

                                <View style={styles.infoTexto3}>
                                    <Text style={styles.infoTexto4}>Seu IMC: </Text>
                                    <Text style={styles.infoTexto4}>Peso: </Text>
                                    <Text style={styles.infoTexto4}>Peso KG: </Text>
                                    <Text style={styles.infoTexto4}>Altura cm: </Text>
                                    <Text style={styles.infoTexto4}>Meta Cal: </Text>

                                    <View style={styles.infoTexto5}>
                                        <Text style={styles.infoSair}>SAIR </Text>
                                        <Text>EXCLUIR </Text>
                                    </View>
                                </View>

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
    welcomeText: {
        color: '#000',
        fontSize: 38,
        marginTop: 270,
        marginBottom: 30,
        fontWeight: 'bold',
        alignSelf: 'center',
        marginRight: 28,

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

    iconePerfil: {
        marginBottom: 10,
        marginLeft: 3,
    },

    infoTexto1: {
        alignSelf: 'center',
        marginLeft: 10,

    },

    infoTexto2: {
        alignSelf: 'center',
        marginLeft: 5,
    },

    infoTexto3: {
        alignSelf: 'center',
        marginLeft: 5,
        marginTop: 25,
    },

    infoTexto4: {
        alignSelf: 'center',
        marginLeft: 5,
    },

    infoTexto5: {
        alignSelf: 'center',
        marginLeft: 5,
        marginTop: 45,
    },

    infoSair: {
        marginLeft: 13,
        color: '#ff0000'
    },

});