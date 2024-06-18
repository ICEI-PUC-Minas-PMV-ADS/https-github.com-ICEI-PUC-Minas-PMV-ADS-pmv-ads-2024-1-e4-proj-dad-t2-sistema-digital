import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Modal, FlatList, Picker } from 'react-native';
import axios from 'axios';

const Despesa = () => {
  const [despesas, setDespesas] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [novaDespesa, setNovaDespesa] = useState({
    nome: '',
    valor: '',
    mes: '',
    ano: '',
    categoriaId: ''
  });
  const [editandoDespesa, setEditandoDespesa] = useState(null);
  const [despesaEditando, setDespesaEditando] = useState({
    nome: '',
    valor: '',
    mes: '',
    ano: '',
    categoriaId: ''
  });

  const togglePago = async (id) => {
    setDespesas(despesas.map(despesa => {
      if (despesa.id === id) {
        return { ...despesa, pago: !despesa.pago };
      }
      return despesa;
    }));
  };

  const deleteDespesa = async (id) => {
    try {
      const confirmDelete = window.confirm('Tem certeza que deseja excluir esta despesa?');
      if (confirmDelete) {
        await axios.delete(`https://localhost:7154/api/despesa/${id}`);
        const response = await axios.get('https://localhost:7154/api/despesa');
        setDespesas(response.data);
        alert('Despesa excluída com sucesso!');
      }
    } catch (error) {
      console.error('Erro ao excluir despesa:', error);
    }
  };

  const handleInputChange = (name, value) => {
    setNovaDespesa({ ...novaDespesa, [name]: value });
  };

  const handleAddDespesa = async () => {
    try {
      await axios.post('https://localhost:7154/api/despesa', novaDespesa);
      const response = await axios.get('https://localhost:7154/api/despesa');
      setDespesas(response.data);
      setNovaDespesa({
        nome: '',
        valor: '',
        mes: '',
        ano: '',
        categoriaId: ''
      });
      alert('Despesa adicionada com sucesso!');
    } catch (error) {
      console.error('Erro ao adicionar despesa:', error);
    }
  };

  const handleEditInputChange = (name, value) => {
    setDespesaEditando({ ...despesaEditando, [name]: value });
  };

  const handleEditDespesa = async (id) => {
    try {
      await axios.put(`https://localhost:7154/api/despesa/${id}`, despesaEditando);
      const response = await axios.get('https://localhost:7154/api/despesa');
      setDespesas(response.data);
      setShowEditModal(false);
      alert('Despesa atualizada com sucesso!');
    } catch (error) {
      console.error('Erro ao editar despesa:', error);
    }
  };

  const editarDespesa = (despesa) => {
    setDespesaEditando(despesa);
    setEditandoDespesa(despesa.id);
    setShowEditModal(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [despesasResponse, categoriasResponse] = await Promise.all([
          axios.get('https://localhost:7154/api/despesa'),
          axios.get('https://localhost:7154/api/categoria')
        ]);
        setDespesas(despesasResponse.data);
        setCategorias(categoriasResponse.data);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.despesaContainer}>
        <Text style={styles.title}>Adicionar Nova Despesa</Text>
        <TextInput
          style={styles.input}
          placeholder="Nome"
          value={novaDespesa.nome}
          onChangeText={(text) => handleInputChange('nome', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Valor"
          value={novaDespesa.valor}
          onChangeText={(text) => handleInputChange('valor', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Mês"
          value={novaDespesa.mes}
          onChangeText={(text) => handleInputChange('mes', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Ano"
          value={novaDespesa.ano}
          onChangeText={(text) => handleInputChange('ano', text)}
        />
        <Picker
          style={styles.input}
          selectedValue={novaDespesa.categoriaId}
          onValueChange={(itemValue, itemIndex) => handleInputChange('categoriaId', itemValue)}
        >
          <Picker.Item label="Selecione uma categoria" value="" />
          {categorias.map(categoria => (
            <Picker.Item key={categoria.id} label={categoria.nome} value={categoria.id} />
          ))}
        </Picker>
        <Button title="Adicionar" onPress={handleAddDespesa} />
      </View>
      <View>
        <Text style={styles.title}>Lista de Despesas</Text>
        <FlatList
          data={despesas}
          renderItem={({ item }) => (
            <View style={styles.despesaItem}>
              <Text style={styles.despesaText}>{item.nome}</Text>
              <Text style={styles.despesaText}>{item.valor}</Text>
              <Text style={styles.despesaText}>{item.mes}</Text>
              <Text style={styles.despesaText}>{item.ano}</Text>
              <Text style={styles.despesaText}>{categorias.find(categoria => categoria.id === item.categoriaId)?.nome}</Text>
              <TouchableOpacity onPress={() => editarDespesa(item)}>
                <Text style={[styles.despesaButton, styles.editButton]}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteDespesa(item.id)}>
                <Text style={[styles.despesaButton, styles.deleteButton]}>Excluir</Text>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
      {/* Modal de edição */}
      <Modal
        visible={showEditModal}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Editar Despesa</Text>
            <TextInput
              style={styles.input}
              placeholder="Nome"
              value={despesaEditando.nome}
              onChangeText={(text) => handleEditInputChange('nome', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Valor"
              value={despesaEditando.valor}
              onChangeText={(text) => handleEditInputChange('valor', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Mês"
              value={despesaEditando.mes}
              onChangeText={(text) => handleEditInputChange('mes', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Ano"
              value={despesaEditando.ano}
              onChangeText={(text) => handleEditInputChange('ano', text)}
            />
            <Picker
              style={styles.input}
              selectedValue={despesaEditando.categoriaId}
              onValueChange={(itemValue, itemIndex) => handleEditInputChange('categoriaId', itemValue)}
            >
              <Picker.Item label="Selecione uma categoria" value="" />
              {categorias.map(categoria => (
                <Picker.Item key={categoria.id} label={categoria.nome} value={categoria.id} />
              ))}
            </Picker>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleEditDespesa(editandoDespesa)}
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
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  despesaContainer: {
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
  despesaItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
  },
  despesaText: {
    flex: 1,
  },
  despesaButton: {
    padding: 5,
    borderRadius: 5,
    textAlign: 'center',
  },
  editButton: {
    color: 'blue',
    marginRight: 10,
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
});

export default Despesa;
