import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Alert, TouchableOpacity } from 'react-native';
import axios from 'axios';
import Icon from '@react-native-vector-icons/ionicons';

const ListarAlimentos = ({ navigation }) => {
  const [data, setData] = useState([]);

  const carregarDados = () => {
    axios.get('http://10.0.2.2:3002/listar')
      .then(response => {
        const sortedData = response.data.sort((a, b) => a.id - b.id);
        setData(sortedData);

        console.log(data);
      })
      .catch(error => {
        console.log(JSON.stringify(error));
      });
  };

  useEffect(() => {
    carregarDados();
  }, []);

  const handleAtualizar = (id) => {
    navigation.navigate('Atualizar', { id });
  };

  const handleDeletar = (id) => {
    Alert.alert(
      'Confirmar Exclusão',
      'Tem certeza que deseja excluir este alimento?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => {
            axios.delete(`http://10.0.2.2:3002/deletar/${id}`)
              .then(() => {
                Alert.alert('Sucesso', 'Alimento excluído com sucesso.');
                carregarDados();
              })
              .catch(error => {
                console.log(error);
                Alert.alert('Erro', 'Erro ao excluir alimento.');
                console.log(error);
              });
          }
        }
      ]
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <View style={styles.itemLeft}>
        <Text style={styles.quantidade}>{item.quantidade}</Text>
        <View style={styles.itemInfo}>
          <Text style={styles.itemNome}>{item.nome}</Text>
          <Text style={styles.itemCalorias}>🟠 {item.calorias} kcal</Text>
        </View>
      </View>
      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => handleAtualizar(item.id)}
        >
          <Icon name="create-outline" size={18} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => handleDeletar(item.id)}
        >
          <Icon name="trash-outline" size={18} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>ALIMENTOS</Text>
        <TouchableOpacity 
          style={styles.adicionarButton} 
          onPress={() => navigation.navigate('Cadastrar')}
        >
          <Text style={styles.adicionarButtonText}>ADICIONAR</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        style={styles.list}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F8',
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
    letterSpacing: 1,
  },
  adicionarButton: {
    backgroundColor: '#7ED957',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  adicionarButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  list: {
    flex: 1,
    paddingHorizontal: 20,
  },
  listContent: {
    paddingBottom: 20,
  },
  item: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginBottom: 12,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  quantidade: {
    fontSize: 14,
    color: '#999',
    marginRight: 16,
    minWidth: 40,
  },
  itemInfo: {
    flex: 1,
  },
  itemNome: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
    marginBottom: 4,
  },
  itemCalorias: {
    fontSize: 12,
    color: '#FF9500',
    fontWeight: '500',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  editButton: {
    backgroundColor: '#5AC8FA',
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  addButton: {
    backgroundColor: '#7ED957',
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  buttonsContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#F5F5F8',
  },
  navButton: {
    backgroundColor: '#FF3B30',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  navButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default ListarAlimentos;