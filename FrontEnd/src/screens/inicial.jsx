import { ScrollView, StyleSheet, View, Text, TouchableOpacity, ImageBackground } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

function Inicial({ navigation }) {
    return (
        <SafeAreaProvider>
            <SafeAreaView style={{ flex: 1 }}>
                <ImageBackground
                    style={styles.imagemFundo}
                    source={require('../../res/img/pagina-inicial.png')}
                >
                    <ScrollView contentContainerStyle={styles.scrollContainer}>
                        <View style={styles.contentContainer}>
                            <Text style={styles.welcomeText}>Olá, Bem vindo!</Text>

                            <TouchableOpacity
                                style={styles.btn}
                                onPress={() => navigation.navigate('Login')}
                            >
                                <Text style={styles.btnText}>INICIAR</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </ImageBackground>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

export default Inicial;

const styles = StyleSheet.create({
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
    btn: {
        backgroundColor: '#6af33c',
        width: 190,
        height: 50,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 24,

    },
    btnText: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 20,
    },
    imagemFundo: {
        flex: 1,
        height: 700,
        width: 450,
    },
});