import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Modal } from 'react-native';
import axios from 'axios';

const UsuarioSistemaFinanceiro = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [novoUsuario, setNovoUsuario] = useState({
    emailUsuario: '',
    administrador: false,
    sistemaAtual: false,
    sistemaId: ''
  });
  const [editandoUsuario, setEditandoUsuario] = useState(null);
  const [usuarioEditando, setUsuarioEditando] = useState({
    emailUsuario: '',
    administrador: false,
    sistemaAtual: false,
    sistemaId: ''
  });
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://localhost:7154/api/usuario-sistema-financeiro');
      setUsuarios(response.data);
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    }
  };

  const handleInputChange = (name, value) => {
    setNovoUsuario({ ...novoUsuario, [name]: value });
  };

  const handleEditInputChange = (name, value) => {
    setUsuarioEditando({ ...usuarioEditando, [name]: value });
  };

  const handleAddUsuario = async () => {
    try {
      await axios.post('https://localhost:7154/api/usuario-sistema-financeiro', novoUsuario);
      setNovoUsuario({
        emailUsuario: '',
        administrador: false,
        sistemaAtual: false,
        sistemaId: ''
      });
      fetchData();
      alert('Usuário adicionado com sucesso!');
    } catch (error) {
      console.error('Erro ao adicionar usuário:', error);
    }
  };

  const handleDeleteUsuario = async (id) => {
    try {
      const confirmDelete = window.confirm('Tem certeza que deseja excluir este usuário?');
      if (confirmDelete) {
        await axios.delete(`https://localhost:7154/api/usuario-sistema-financeiro/${id}`);
        fetchData();
        alert('Usuário excluído com sucesso!');
      }
    } catch (error) {
      console.error('Erro ao excluir usuário:', error);
    }
  };

  const handleEditUsuario = async (id) => {
    try {
      await axios.put(`https://localhost:7154/api/usuario-sistema-financeiro/${id}`, usuarioEditando);
      fetchData();
      setEditandoUsuario(null);
      setModalVisible(false);
      alert('Usuário atualizado com sucesso!');
    } catch (error) {
      console.error('Erro ao editar usuário:', error);
    }
  };

  const editarUsuario = (usuario) => {
    setUsuarioEditando(usuario);
    setEditandoUsuario(usuario.id);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Usuários do Sistema Financeiro</Text>
      <View style={styles.novoUsuarioForm}>
        <Text>Adicionar Novo Usuário</Text>
        <TextInput
          style={styles.input}
          placeholder="Email do Usuário"
          value={novoUsuario.emailUsuario}
          onChangeText={(text) => handleInputChange('emailUsuario', text)}
        />
        <View style={styles.checkboxContainer}>
          <Text>Administrador</Text>
          <Button
            title={novoUsuario.administrador ? "Sim" : "Não"}
            onPress={() => setNovoUsuario({ ...novoUsuario, administrador: !novoUsuario.administrador })}
          />
        </View>
        <View style={styles.checkboxContainer}>
          <Text>Sistema Atual</Text>
          <Button
            title={novoUsuario.sistemaAtual ? "Sim" : "Não"}
            onPress={() => setNovoUsuario({ ...novoUsuario, sistemaAtual: !novoUsuario.sistemaAtual })}
          />
        </View>
        <TextInput
          style={styles.input}
          placeholder="Código do Sistema"
          value={novoUsuario.sistemaId}
          onChangeText={(text) => handleInputChange('sistemaId', text)}
        />
        <Button title="Adicionar Usuário" onPress={handleAddUsuario} />
      </View>
      <View style={styles.listaUsuarios}>
        {usuarios.map((usuario) => (
          <View key={usuario.id} style={styles.usuarioItem}>
            <Text style={styles.label}>Email do Usuário: {usuario.emailUsuario}</Text>
            <Text style={styles.label}>Administrador: {usuario.administrador ? 'Sim' : 'Não'}</Text>
            <Text style={styles.label}>Sistema Atual: {usuario.sistemaAtual ? 'Sim' : 'Não'}</Text>
            <Text style={styles.label}>Código do Sistema: {usuario.sistemaId}</Text>
            <Button title="Excluir" onPress={() => handleDeleteUsuario(usuario.id)} />
            <Button title="Editar" onPress={() => editarUsuario(usuario)} />
          </View>
        ))}
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text>Editar Usuário</Text>
            <TextInput
              style={styles.input}
              placeholder="Email do Usuário"
              value={usuarioEditando.emailUsuario}
              onChangeText={(text) => handleEditInputChange('emailUsuario', text)}
            />
            <View style={styles.checkboxContainer}>
              <Text>Administrador</Text>
              <Button
                title={usuarioEditando.administrador ? "Sim" : "Não"}
                onPress={() => handleEditInputChange('administrador', !usuarioEditando.administrador)}
              />
            </View>
            <View style={styles.checkboxContainer}>
              <Text>Sistema Atual</Text>
              <Button
                title={usuarioEditando.sistemaAtual ? "Sim" : "Não"}
                onPress={() => handleEditInputChange('sistemaAtual', !usuarioEditando.sistemaAtual)}
              />
            </View>
            <TextInput
              style={styles.input}
              placeholder="Código do Sistema"
              value={usuarioEditando.sistemaId}
              onChangeText={(text) => handleEditInputChange('sistemaId', text)}
            />
            <Button title="Salvar" onPress={() => handleEditUsuario(editandoUsuario)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  novoUsuarioForm: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  listaUsuarios: {
    flex: 1,
  },
  usuarioItem: {
    backgroundColor: '#ffffff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  label: {
    fontWeight: 'bold',
  },
  centered: {
    alignItems: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  }
});

export default UsuarioSistemaFinanceiro;
