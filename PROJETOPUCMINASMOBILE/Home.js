import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
  const navigation = useNavigation();

  const handleNavigateToSistemas = () => {
    navigation.navigate('SistemaFinanceiro');
  };

  return (
    
    <View style={styles.container}>
      <Text style={styles.panelHeading}>Painel Financeiro</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>Bem-vindo à sua página inicial!</Text>
        <Text style={[styles.infoText, styles.secondaryText]}>Aqui você pode visualizar informações financeiras importantes.</Text>
        <Button title="Logout" onPress={() => { /* Implemente sua lógica de logout aqui */ }} />
      
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
  },
  panelHeading: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  infoContainer: {
    alignItems: 'center',
  },
  infoText: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
    color: '#666',
  },
  secondaryText: {
    color: '#999',
  },
});

export default Home;
