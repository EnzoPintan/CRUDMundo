import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

const API_URL = 'https://8000-iskahsp4y211mqzu9f4f3-b2956e13.manus.computer/api';

export default function ListaPaises({ refresh }) {
  const [paises, setPaises] = useState([]);
  const [loading, setLoading] = useState(true);

  const carregarPaises = async () => {
    try {
      const response = await axios.get(`${API_URL}/paises.php`);
      setPaises(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Erro ao carregar países:', error);
      setLoading(false);
    }
  };

  const deletarPais = async (id) => {
    Alert.alert(
      'Confirmar',
      'Deseja deletar este país?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Deletar',
          style: 'destructive',
          onPress: async () => {
            try {
              await axios.delete(`${API_URL}/paises.php?id=${id}`);
              carregarPaises();
            } catch (error) {
              Alert.alert('Erro', 'Erro ao deletar país');
            }
          }
        }
      ]
    );
  };

  useEffect(() => {
    carregarPaises();
  }, [refresh]);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Lista de Países</Text>
        <Text style={styles.loading}>Carregando...</Text>
      </View>
    );
  }

  if (paises.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Lista de Países</Text>
        <Text style={styles.empty}>Nenhum país cadastrado ainda.</Text>
      </View>
    );
  }

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <View style={styles.itemContent}>
        <Text style={styles.itemTitle}>🌍 {item.nome}</Text>
        <Text style={styles.itemText}>📍 Continente: {item.continente}</Text>
        <Text style={styles.itemText}>👥 População: {parseInt(item.populacao).toLocaleString('pt-BR')}</Text>
        <Text style={styles.itemText}>🗣️ Idioma: {item.idioma}</Text>
      </View>
      <TouchableOpacity 
        style={styles.deleteButton}
        onPress={() => deletarPais(item.id_pais)}
      >
        <Text style={styles.deleteButtonText}>Deletar</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Países</Text>
      <FlatList
        data={paises}
        renderItem={renderItem}
        keyExtractor={(item) => item.id_pais.toString()}
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
    borderLeftColor: '#7c3aed',
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
