import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

const API_URL = 'http://10.67.127.136/api';

export default function FormCidade({ onSuccess }) {
  const [nome, setNome] = useState('');
  const [idPais, setIdPais] = useState('');
  const [populacao, setPopulacao] = useState('');
  const [paises, setPaises] = useState([]);

  useEffect(() => {
    carregarPaises();
  }, []);

  const carregarPaises = async () => {
    try {
      const response = await axios.get(`${API_URL}/paises.php`);
      setPaises(response.data);
    } catch (error) {
      console.error('Erro ao carregar países:', error);
    }
  };

  const handleSubmit = async () => {
    if (!nome || !idPais || !populacao) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/cidades.php`, {
        nome,
        id_pais: parseInt(idPais),
        populacao: parseInt(populacao)
      });

      if (response.status === 201) {
        Alert.alert('Sucesso', 'Cidade cadastrada com sucesso!');
        setNome('');
        setIdPais('');
        setPopulacao('');
        if (onSuccess) onSuccess();
      }
    } catch (error) {
      Alert.alert('Erro', 'Erro ao cadastrar cidade');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastrar Cidade</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Nome da Cidade"
        value={nome}
        onChangeText={setNome}
      />
      
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={idPais}
          onValueChange={(itemValue) => setIdPais(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Selecione um país" value="" />
          {paises.map((pais) => (
            <Picker.Item 
              key={pais.id_pais} 
              label={pais.nome} 
              value={pais.id_pais.toString()} 
            />
          ))}
        </Picker>
      </View>
      
      <TextInput
        style={styles.input}
        placeholder="População"
        value={populacao}
        onChangeText={setPopulacao}
        keyboardType="numeric"
      />
      
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Cadastrar Cidade</Text>
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
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 12,
  },
  picker: {
    height: 50,
  },
  button: {
    backgroundColor: '#7c3aed',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
