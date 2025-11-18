import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";

function Home() {
    const route = useRoute();
    const navigation = useNavigation();
    const loginToken = route.params?.loginToken || 'Token não recebido';
    const sair = () => {
        navigation.replace('Login');
    };

    return (
        <View style={styles.container}>
        <Text style={styles.token}>{loginToken}</Text>
        <View><Button title="Voltar" onPress={sair} color="#ff0000" /></View>
        </View>
    );
}
export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 25,
        justifyContent: 'center',
        
    },
    
    token: {
        backgroundColor: '#73baf41e',
        padding: 15,
        fontSize: 10,
        borderRadius: 10,
        marginBottom: 35,
    },
   
});