import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

const API_URL = 'http://10.67.127.136/api'; // Coloca seu IP aqui

export default function FormPais({ onSuccess } ) {
  const [nome, setNome] = useState('');
  const [continente, setContinente] = useState('');
  const [populacao, setPopulacao] = useState('');
  const [idioma, setIdioma] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!nome || !continente || !populacao || !idioma) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }

    setLoading(true);
    console.log('Enviando dados:', { nome, continente, populacao, idioma });

    try {
      const response = await axios.post(`${API_URL}/paises.php`, {
        nome,
        continente,
        populacao: parseInt(populacao),
        idioma
      });

      console.log('Resposta:', response.status, response.data);

      // Aceita tanto 200 quanto 201
      if (response.status === 200 || response.status === 201) {
        Alert.alert('Sucesso', 'País cadastrado com sucesso!');
        setNome('');
        setContinente('');
        setPopulacao('');
        setIdioma('');
        if (onSuccess) onSuccess();
      } else {
        Alert.alert('Erro', 'Resposta inesperada da API');
      }
    } catch (error) {
      console.error('Erro completo:', error);
      console.error('Resposta do erro:', error.response?.data);
      Alert.alert('Erro', 'Erro ao cadastrar país: ' + (error.message || 'Desconhecido'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastrar País</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Nome do País"
        value={nome}
        onChangeText={setNome}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Continente"
        value={continente}
        onChangeText={setContinente}
      />
      
      <TextInput
        style={styles.input}
        placeholder="População"
        value={populacao}
        onChangeText={setPopulacao}
        keyboardType="numeric"
      />
      
      <TextInput
        style={styles.input}
        placeholder="Idioma"
        value={idioma}
        onChangeText={setIdioma}
      />
      
      <TouchableOpacity 
        style={[styles.button, loading && styles.buttonDisabled]} 
        onPress={handleSubmit}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Cadastrando...' : 'Cadastrar País'}
        </Text>
      </TouchableOpacity>
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
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#7c3aed',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonDisabled: {
    backgroundColor: '#9ca3af',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
