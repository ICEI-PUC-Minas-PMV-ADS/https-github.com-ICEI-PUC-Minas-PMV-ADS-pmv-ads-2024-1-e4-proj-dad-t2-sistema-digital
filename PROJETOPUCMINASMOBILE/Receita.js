import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Modal, FlatList, Picker } from 'react-native';
import axios from 'axios';

const Receita = () => {
  const [receitas, setReceitas] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [novaReceita, setNovaReceita] = useState({
    nome: '',
    valor: '',
    mes: '',
    ano: '',
    tipoReceita: '',
    categoriaId: ''
  });
  const [editandoReceita, setEditandoReceita] = useState(null);
  const [receitaEditando, setReceitaEditando] = useState({
    nome: '',
    valor: '',
    mes: '',
    ano: '',
    tipoReceita: '',
    categoriaId: ''
  });

  const deleteReceita = async (id) => {
    try {
      const confirmDelete = window.confirm('Tem certeza que deseja excluir esta receita?');
      if (confirmDelete) {
        await axios.delete(`https://localhost:7154/api/receita/${id}`);
        const response = await axios.get('https://localhost:7154/api/receita');
        setReceitas(response.data);
        alert('Receita excluída com sucesso!');
      }
    } catch (error) {
      console.error('Erro ao excluir receita:', error);
    }
  };

  const handleInputChange = (name, value) => {
    setNovaReceita({ ...novaReceita, [name]: value });
  };

  const handleAddReceita = async () => {
    try {
      await axios.post('https://localhost:7154/api/receita', novaReceita);
      const response = await axios.get('https://localhost:7154/api/receita');
      setReceitas(response.data);
      setNovaReceita({
        nome: '',
        valor: '',
        mes: '',
        ano: '',
        tipoReceita: '',
        categoriaId: ''
      });
      alert('Receita adicionada com sucesso!');
    } catch (error) {
      console.error('Erro ao adicionar receita:', error);
    }
  };

  const handleEditInputChange = (name, value) => {
    setReceitaEditando({ ...receitaEditando, [name]: value });
  };

  const handleEditReceita = async (id) => {
    try {
      await axios.put(`https://localhost:7154/api/receita/${id}`, receitaEditando);
      const response = await axios.get('https://localhost:7154/api/receita');
      setReceitas(response.data);
      setShowEditModal(false);
      alert('Receita atualizada com sucesso!');
    } catch (error) {
      console.error('Erro ao editar receita:', error);
    }
  };

  const editarReceita = (receita) => {
    setReceitaEditando(receita);
    setEditandoReceita(receita.id);
    setShowEditModal(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [receitasResponse, categoriasResponse] = await Promise.all([
          axios.get('https://localhost:7154/api/receita'),
          axios.get('https://localhost:7154/api/categoria')
        ]);
        setReceitas(receitasResponse.data);
        setCategorias(categoriasResponse.data);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.receitaContainer}>
        <Text style={styles.title}>Adicionar Nova Receita</Text>
        <TextInput
          style={styles.input}
          placeholder="Nome"
          value={novaReceita.nome}
          onChangeText={(text) => handleInputChange('nome', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Valor"
          value={novaReceita.valor}
          onChangeText={(text) => handleInputChange('valor', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Mês"
          value={novaReceita.mes}
          onChangeText={(text) => handleInputChange('mes', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Ano"
          value={novaReceita.ano}
          onChangeText={(text) => handleInputChange('ano', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Tipo de Receita"
          value={novaReceita.tipoReceita}
          onChangeText={(text) => handleInputChange('tipoReceita', text)}
        />
        <Picker
          style={styles.input}
          selectedValue={novaReceita.categoriaId}
          onValueChange={(itemValue, itemIndex) => handleInputChange('categoriaId', itemValue)}
        >
          <Picker.Item label="Selecione uma categoria" value="" />
          {categorias.map(categoria => (
            <Picker.Item key={categoria.id} label={categoria.nome} value={categoria.id} />
          ))}
        </Picker>
        <Button title="Adicionar" onPress={handleAddReceita} />
      </View>
      <View>
        <Text style={styles.title}>Lista de Receitas</Text>
        <FlatList
          data={receitas}
          renderItem={({ item }) => (
            <View style={styles.receitaItem}>
              <Text style={styles.receitaText}>{item.nome}</Text>
              <Text style={styles.receitaText}>{item.valor}</Text>
              <Text style={styles.receitaText}>{item.mes}</Text>
              <Text style={styles.receitaText}>{item.ano}</Text>
              <Text style={styles.receitaText}>{item.tipoReceita}</Text>
              <Text style={styles.receitaText}>{categorias.find(categoria => categoria.id === item.categoriaId)?.nome}</Text>
              <TouchableOpacity onPress={() => editarReceita(item)}>
                <Text style={[styles.receitaButton, styles.editButton]}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteReceita(item.id)}>
                <Text style={[styles.receitaButton, styles.deleteButton]}>Excluir</Text>
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
            <Text style={styles.modalTitle}>Editar Receita</Text>
            <TextInput
              style={styles.input}
              placeholder="Nome"
              value={receitaEditando.nome}
              onChangeText={(text) => handleEditInputChange('nome', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Valor"
              value={receitaEditando.valor}
              onChangeText={(text) => handleEditInputChange('valor', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Mês"
              value={receitaEditando.mes}
              onChangeText={(text) => handleEditInputChange('mes', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Ano"
              value={receitaEditando.ano}
              onChangeText={(text) => handleEditInputChange('ano', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Tipo de Receita"
              value={receitaEditando.tipoReceita}
              onChangeText={(text) => handleEditInputChange('tipoReceita', text)}
            />
            <Picker
              style={styles.input}
              selectedValue={receitaEditando.categoriaId}
              onValueChange={(itemValue, itemIndex) => handleEditInputChange('categoriaId', itemValue)}
            >
              <Picker.Item label="Selecione uma categoria" value="" />
              {categorias.map(categoria => (
                <Picker.Item key={categoria.id} label={categoria.nome} value={categoria.id} />
              ))}
            </Picker>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleEditReceita(editandoReceita)}
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
  receitaContainer: {
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
  receitaItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
  },
  receitaText: {
    flex: 1,
  },
  receitaButton: {
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

export default Receita;
