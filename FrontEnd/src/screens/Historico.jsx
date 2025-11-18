import { FlatList, } from 'react-native';
import { useEffect, useState } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from "@react-native-async-storage/async-storage";

    function Historico() {
        const [Historico, setHistorico] = useState([]);
      
        useEffect(() => {
          Historico();
        }, );
      
      

}

export default function Info(){
    return(
        <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1 }}>
                <FlatList
                    data={Historico}
                    keyExtractor={(item) => item.token}
                    renderItem={(item)}
                    contentContainerStyle={{ paddingVertical: 20 }}
                />
        </SafeAreaView>
    </SafeAreaProvider>
    );
}