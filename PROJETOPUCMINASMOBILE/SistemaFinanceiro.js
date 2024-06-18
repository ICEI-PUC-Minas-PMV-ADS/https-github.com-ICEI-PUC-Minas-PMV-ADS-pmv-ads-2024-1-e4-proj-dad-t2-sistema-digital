import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Modal, ScrollView, Switch, CheckBox, FlatList } from 'react-native';

import axios from 'axios';

const SistemaFinanceiro = () => {
  const [sistemas, setSistemas] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [novoSistema, setNovoSistema] = useState({
    nome: '',
    mes: '',
    ano: '',
    diaFechamento: '',
    gerarCopiaDespesa: false,
    mesCopia: '',
    anoCopia: ''
  });
  const [editandoSistema, setEditandoSistema] = useState(null);
  const [sistemaEditando, setSistemaEditando] = useState({
    nome: '',
    mes: '',
    ano: '',
    diaFechamento: '',
    gerarCopiaDespesa: false,
    mesCopia: '',
    anoCopia: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://localhost:7154/api/sistema-financeiro');
        setSistemas(response.data);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };

    fetchData();
  }, []);

  const deleteSistema = async (id) => {
    try {
      const confirmDelete = window.confirm('Tem certeza que deseja excluir este sistema financeiro?');
      if (confirmDelete) {
        await axios.delete(`https://localhost:7154/api/sistema-financeiro/${id}`);
        const response = await axios.get('https://localhost:7154/api/sistema-financeiro');
        setSistemas(response.data);
        alert('Sistema financeiro excluído com sucesso!');
      }
    } catch (error) {
      console.error('Erro ao excluir sistema financeiro:', error);
    }
  };

  const handleInputChange = (name, value) => {
    setNovoSistema({ ...novoSistema, [name]: value });
  };

  const handleAddSistema = async () => {
    try {
      await axios.post('https://localhost:7154/api/sistema-financeiro', novoSistema);
      const response = await axios.get('https://localhost:7154/api/sistema-financeiro');
      setSistemas(response.data);
      setNovoSistema({
        nome: '',
        mes: '',
        ano: '',
        diaFechamento: '',
        gerarCopiaDespesa: false,
        mesCopia: '',
        anoCopia: ''
      });
      alert('Sistema financeiro adicionado com sucesso!');
    } catch (error) {
      console.error('Erro ao adicionar sistema financeiro:', error);
    }
  };

  const handleEditInputChange = (name, value) => {
    setSistemaEditando({ ...sistemaEditando, [name]: value });
  };

  const handleEditSistema = async (id) => {
    try {
      await axios.put(`https://localhost:7154/api/sistema-financeiro/${id}`, sistemaEditando);
      const response = await axios.get('https://localhost:7154/api/sistema-financeiro');
      setSistemas(response.data);
      setShowEditModal(false);
      alert('Sistema financeiro atualizado com sucesso!');
    } catch (error) {
      console.error('Erro ao editar sistema financeiro:', error);
    }
  };

  const editarSistema = (sistema) => {
    setSistemaEditando({ ...sistema });
    setEditandoSistema(sistema.id);
    setShowEditModal(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.sistemaContainer}>
        <Text style={styles.title}>Adicionar Novo Sistema Financeiro</Text>
        <TextInput
          style={styles.input}
          placeholder="Nome"
          value={novoSistema.nome}
          onChangeText={(text) => handleInputChange('nome', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Mês"
          value={novoSistema.mes}
          onChangeText={(text) => handleInputChange('mes', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Ano"
          value={novoSistema.ano}
          onChangeText={(text) => handleInputChange('ano', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Dia de Fechamento"
          value={novoSistema.diaFechamento}
          onChangeText={(text) => handleInputChange('diaFechamento', text)}
        />
        <View style={styles.checkboxContainer}>
          <Text style={styles.checkboxLabel}>Gerar Cópia de Despesa</Text>
          <CheckBox
            value={novoSistema.gerarCopiaDespesa}
            onValueChange={(value) => handleInputChange('gerarCopiaDespesa', value)}
          />
        </View>
        <TextInput
          style={styles.input}
          placeholder="Mês Cópia"
          value={novoSistema.mesCopia}
          onChangeText={(text) => handleInputChange('mesCopia', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Ano Cópia"
          value={novoSistema.anoCopia}
          onChangeText={(text) => handleInputChange('anoCopia', text)}
        />
        <Button title="Adicionar" onPress={handleAddSistema} />
      </View>
      <FlatList
        data={sistemas}
        renderItem={({ item }) => (
          <View style={styles.sistemaItem}>
           <Text style={styles.sistemaText}>{item.nome}</Text>
           <Text style={styles.sistemaText}>{item.mes}</Text>
           <Text style={styles.sistemaText}>{item.ano}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.editButtonContainer} onPress={() => editarSistema(item)}>
                <Text style={styles.editButton}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteSistema(item.id)}>
                <Text style={styles.deleteButton}>Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={showEditModal}
        onRequestClose={() => setShowEditModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Editar Sistema Financeiro</Text>
            <TextInput
              style={styles.input}
              placeholder="Nome"
              value={sistemaEditando.nome}
              onChangeText={(text) => handleEditInputChange('nome', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Mês"
              value={sistemaEditando.mes}
              onChangeText={(text) => handleEditInputChange('mes', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Ano"
              value={sistemaEditando.ano}
              onChangeText={(text) => handleEditInputChange('ano', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Dia de Fechamento"
              value={sistemaEditando.diaFechamento}
              onChangeText={(text) => handleEditInputChange('diaFechamento', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Mês Cópia"
              value={sistemaEditando.mesCopia}
              onChangeText={(text) => handleEditInputChange('mesCopia', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Ano Cópia"
              value={sistemaEditando.anoCopia}
              onChangeText={(text) => handleEditInputChange('anoCopia', text)}
            />
            <View style={styles.checkboxContainer}>
              <Text style={styles.checkboxLabel}>Gerar Cópia de Despesa</Text>
              <CheckBox
                value={sistemaEditando.gerarCopiaDespesa}
                onValueChange={(value) => handleEditInputChange('gerarCopiaDespesa', value)}
              />
            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleEditSistema(editandoSistema)}
            >
              <Text style={styles.buttonText}>Salvar</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={() => setShowEditModal(false)}
            >
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
          
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  sistemaContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  sistemaItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
  },
  sistemaText: {
    flex: 1,
  },
  cell: {
    textAlign: 'center',
  },
  nomeCell: {
    textAlign: 'center',
  },
  dataCell: {
    borderRightWidth: 1,
    borderRightColor: '#ccc',
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editButtonContainer: {
    marginRight: 10,
  },
  editButton: {
    color: 'blue',
  },
  deleteButton: {
    color: 'red',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  button: {
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
    marginVertical: 5,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: 'red',
  },
  buttonText: {
    color: '#ffffff',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkboxLabel: {
    marginRight: 10,
  },
});

export default SistemaFinanceiro;
