import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Modal, Picker, FlatList } from 'react-native';
import axios from 'axios';

const Categoria = () => {
  const [categorias, setCategorias] = useState([]);
  const [sistemas, setSistemas] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [novaCategoria, setNovaCategoria] = useState({
    nome: '',
    sistemaId: ''
  });
  const [categoriaEditandoId, setCategoriaEditandoId] = useState(null);
  const [categoriaEditando, setCategoriaEditando] = useState({
    nome: '',
    sistemaId: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriasResponse, sistemasResponse] = await Promise.all([
          axios.get('https://localhost:7154/api/categoria'),
          axios.get('https://localhost:7154/api/sistema-financeiro')
        ]);
        setCategorias(categoriasResponse.data);
        setSistemas(sistemasResponse.data);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };

    fetchData();
  }, []);

  const deleteCategoria = async (id) => {
    try {
      const confirmDelete = window.confirm('Tem certeza que deseja excluir esta categoria?');
      if (confirmDelete) {
        await axios.delete(`https://localhost:7154/api/categoria/${id}`);
        const response = await axios.get('https://localhost:7154/api/categoria');
        setCategorias(response.data);
        alert('Categoria excluída com sucesso!');
      }
    } catch (error) {
      console.error('Erro ao excluir categoria:', error);
    }
  };

  const handleInputChange = (name, value) => {
    setNovaCategoria({ ...novaCategoria, [name]: value });
  };

  const handleAddCategoria = async () => {
    try {
      await axios.post('https://localhost:7154/api/categoria', novaCategoria);
      const response = await axios.get('https://localhost:7154/api/categoria');
      setCategorias(response.data);
      setNovaCategoria({
        nome: '',
        sistemaId: ''
      });
      alert('Categoria adicionada com sucesso!');
    } catch (error) {
      console.error('Erro ao adicionar categoria:', error);
    }
  };

  const handleEditInputChange = (name, value) => {
    setCategoriaEditando({ ...categoriaEditando, [name]: value });
  };

  const handleEditCategoria = async () => {
    try {
      await axios.put(`https://localhost:7154/api/categoria/${categoriaEditandoId}`, categoriaEditando);
      const response = await axios.get('https://localhost:7154/api/categoria');
      setCategorias(response.data);
      setShowEditModal(false);
      alert('Categoria atualizada com sucesso!');
    } catch (error) {
      console.error('Erro ao editar categoria:', error);
    }
  };

  const editarCategoria = (categoria) => {
    setCategoriaEditandoId(categoria.id);
    setCategoriaEditando({ ...categoria });
    setShowEditModal(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.categoriaContainer}>
        <Text style={styles.title}>Adicionar Nova Categoria</Text>
        <TextInput
          style={styles.input}
          placeholder="Nome"
          value={novaCategoria.nome}
          onChangeText={(text) => handleInputChange('nome', text)}
        />
        <Picker
          style={styles.input}
          selectedValue={novaCategoria.sistemaId}
          onValueChange={(itemValue, itemIndex) => handleInputChange('sistemaId', itemValue)}
        >
          <Picker.Item label="Selecione um sistema" value="" />
          {sistemas.map(sistema => (
            <Picker.Item key={sistema.id} label={sistema.nome} value={sistema.id} />
          ))}
        </Picker>
        <Button title="Adicionar" onPress={handleAddCategoria} />
      </View>
      <FlatList
        data={categorias}
        renderItem={({ item }) => (
          <View style={styles.categoriaItem}>
            <Text style={styles.categoriaText}>{item.nome}</Text>
            <Text style={styles.categoriaText}>{sistemas.find(sistema => sistema.id === item.sistemaId)?.nome}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.editButtonContainer} onPress={() => editarCategoria(item)}>
                <Text style={styles.editButton}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteCategoria(item.id)}>
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
            <Text style={styles.modalTitle}>Editar Categoria</Text>
            <TextInput
              style={styles.input}
              placeholder="Nome"
              value={categoriaEditando.nome}
              onChangeText={(text) => handleEditInputChange('nome', text)}
            />
            <Picker
              style={styles.input}
              selectedValue={categoriaEditando.sistemaId}
              onValueChange={(itemValue, itemIndex) => handleEditInputChange('sistemaId', itemValue)}
            >
              <Picker.Item label="Selecione um sistema" value="" />
              {sistemas.map(sistema => (
                <Picker.Item key={sistema.id} label={sistema.nome} value={sistema.id} />
              ))}
            </Picker>
            <TouchableOpacity
              style={styles.button}
              onPress={handleEditCategoria}
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
  categoriaContainer: {
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
  categoriaItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
  },
  categoriaText: {
    flex: 1,
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
});

export default Categoria;
