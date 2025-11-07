import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

const API_URL = 'https://8000-iskahsp4y211mqzu9f4f3-b2956e13.manus.computer/api';

export default function FormCidade({ onSuccess }) {
  const [nome, setNome] = useState('');
  const [idPais, setIdPais] = useState('');
  const [populacao, setPopulacao] = useState('');
  const [paises, setPaises] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    carregarPaises();
  }, []);

  const carregarPaises = async () => {
    try {
      const response = await axios.get(`${API_URL}/paises.php`);
      setPaises(response.data);
      if (response.data.length > 0) {
        setIdPais(response.data[0].id_pais.toString());
      }
    } catch (error) {
      console.error('Erro ao carregar países:', error);
      Alert.alert('Erro', 'Erro ao carregar países');
    }
  };

  const handleSubmit = async () => {
    if (!nome || !idPais || !populacao) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }

    setLoading(true);
    try {
      await axios.post(`${API_URL}/cidades.php`, {
        nome: nome,
        id_pais: parseInt(idPais),
        populacao: parseInt(populacao)
      });
      Alert.alert('Sucesso', 'Cidade criada com sucesso!');
      setNome('');
      setPopulacao('');
      onSuccess();
    } catch (error) {
      console.error('Erro ao criar cidade:', error);
      Alert.alert('Erro', 'Erro ao criar cidade');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Adicionar Nova Cidade</Text>
      
      <View style={styles.form}>
        <Text style={styles.label}>Nome da Cidade</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o nome da cidade"
          value={nome}
          onChangeText={setNome}
          editable={!loading}
        />

        <Text style={styles.label}>País</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={idPais}
            onValueChange={(itemValue) => setIdPais(itemValue)}
            enabled={!loading}
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

        <Text style={styles.label}>População</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite a população"
          value={populacao}
          onChangeText={setPopulacao}
          keyboardType="numeric"
          editable={!loading}
        />

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleSubmit}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Criando...' : 'Criar Cidade'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
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
  form: {
    gap: 15,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    backgroundColor: '#f9fafb',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#f9fafb',
    overflow: 'hidden',
  },
  button: {
    backgroundColor: '#7c3aed',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
