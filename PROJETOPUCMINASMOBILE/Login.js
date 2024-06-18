import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  
  const handleLogin = () => {
    if (username === 'Financeiro@Puc.com' && password === 'T@ste1234') {
      Alert.alert('Login bem-sucedido', 'Você está conectado!');
      navigation.navigate('Home');
    } else {
      Alert.alert('Credenciais inválidas', 'Por favor, insira um usuário e senha válidos.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Financeiro</Text>
      <View style={styles.formContainer}>
        <Text style={styles.formTitle}>Login</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <Button title="Entrar" onPress={handleLogin} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3498db',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  formContainer: {
    width: '80%',
    backgroundColor: '#fff', 
    padding: 20,
    borderRadius: 10,
    elevation: 5, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  formTitle: {
    fontSize: 20,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
});

export default Login;
