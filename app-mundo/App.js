import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import FormPais from './components/FormPais';
import ListaPaises from './components/ListaPaises';
import FormCidade from './components/FormCidade';
import ListaCidades from './components/ListaCidades';

export default function App() {
  const [tabAtiva, setTabAtiva] = useState('paises');
  const [refreshPaises, setRefreshPaises] = useState(0);
  const [refreshCidades, setRefreshCidades] = useState(0);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <StatusBar style="light" />
        
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>🌍 App Mundo</Text>
          <Text style={styles.headerSubtitle}>React Native + Expo</Text>
        </View>

        {/* Tabs */}
        <View style={styles.tabs}>
          <TouchableOpacity
            style={[styles.tab, tabAtiva === 'paises' && styles.tabAtiva]}
            onPress={() => setTabAtiva('paises')}
          >
            <Text style={[styles.tabText, tabAtiva === 'paises' && styles.tabTextAtiva]}>
              Países
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.tab, tabAtiva === 'cidades' && styles.tabAtiva]}
            onPress={() => setTabAtiva('cidades')}
          >
            <Text style={[styles.tabText, tabAtiva === 'cidades' && styles.tabTextAtiva]}>
              Cidades
            </Text>
          </TouchableOpacity>
        </View>

        {/* Conteúdo */}
        <ScrollView style={styles.content}>
          {tabAtiva === 'paises' ? (
            <>
              <FormPais onSuccess={() => setRefreshPaises(prev => prev + 1)} />
              <ListaPaises refresh={refreshPaises} />
            </>
          ) : (
            <>
              <FormCidade onSuccess={() => setRefreshCidades(prev => prev + 1)} />
              <ListaCidades refresh={refreshCidades} />
            </>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#7c3aed',
  },
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  header: {
    backgroundColor: '#7c3aed',
    padding: 20,
    paddingTop: 10,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#e9d5ff',
    marginTop: 5,
  },
  tabs: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginTop: -15,
    borderRadius: 10,
    padding: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  tabAtiva: {
    backgroundColor: '#7c3aed',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  tabTextAtiva: {
    color: '#fff',
  },
  content: {
    flex: 1,
    padding: 20,
  },
});
