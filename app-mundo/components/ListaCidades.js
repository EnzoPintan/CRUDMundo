import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';

const API_URL = 'https://8000-iskahsp4y211mqzu9f4f3-b2956e13.manus.computer/api';

export default function ListaCidades({ refresh }) {
  const [cidades, setCidades] = useState([]);
  const [loading, setLoading] = useState(true);

  const carregarCidades = async () => {
    try {
      const response = await axios.get(`${API_URL}/cidades.php`);
      setCidades(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Erro ao carregar cidades:', error);
      setLoading(false);
    }
  };

  const deletarCidade = async (id) => {
    Alert.alert(
      'Confirmar',
      'Deseja deletar esta cidade?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Deletar',
          style: 'destructive',
          onPress: async () => {
            try {
              await axios.delete(`${API_URL}/cidades.php?id_cidade=${id}`);
              carregarCidades();
            } catch (error) {
              Alert.alert('Erro', 'Erro ao deletar cidade');
            }
          }
        }
      ]
    );
  };

  useEffect(() => {
    carregarCidades();
  }, [refresh]);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Lista de Cidades</Text>
        <Text style={styles.loading}>Carregando...</Text>
      </View>
    );
  }

  if (cidades.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Lista de Cidades</Text>
        <Text style={styles.empty}>Nenhuma cidade cadastrada ainda.</Text>
      </View>
    );
  }

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <View style={styles.itemContent}>
        <Text style={styles.itemTitle}>🏙️ {item.nome}</Text>
        <Text style={styles.itemText}>🌍 País: {item.nome_pais}</Text>
        <Text style={styles.itemText}>👥 População: {parseInt(item.populacao).toLocaleString('pt-BR')}</Text>
      </View>
      <TouchableOpacity 
        style={styles.deleteButton}
        onPress={() => deletarCidade(item.id_cidade)}
      >
        <Text style={styles.deleteButtonText}>Deletar</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Cidades</Text>
      <FlatList
        data={cidades}
        renderItem={renderItem}
        keyExtractor={(item) => item.id_cidade.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#7c3aed',
    marginBottom: 15,
  },
  loading: {
    textAlign: 'center',
    color: '#666',
    padding: 20,
  },
  empty: {
    textAlign: 'center',
    color: '#666',
    padding: 20,
  },
  item: {
    backgroundColor: '#f9fafb',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#3b82f6',
  },
  itemContent: {
    marginBottom: 10,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  itemText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  deleteButton: {
    backgroundColor: '#ef4444',
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
