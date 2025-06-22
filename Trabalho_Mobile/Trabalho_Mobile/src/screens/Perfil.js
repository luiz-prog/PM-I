import { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Keyboard } from 'react-native';
import Input from '../componentes/Input';
import Botao from '../componentes/Botao';
import { useAppContext } from '../context/AppContext';

const Perfil = () => {

  const { listaLivros, addBook, clearBooks } = useAppContext();

  const [livro, setLivro] = useState(''); 

  const handleCadastrar = () => {
    if (livro.trim()) {
      addBook(livro);
      setLivro('');
      Keyboard.dismiss();
    }
  };

  const handleLimparLista = () => { //limpa TODOS os registros
    clearBooks();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meus Livros Lidos</Text>
      <Input
        placeholder="Digite o nome do livro"
        value={livro}
        onChangeText={setLivro}
      />
      <View style={styles.buttonContainer}>
        <Botao title="Cadastrar" color="#007BFF" onPress={handleCadastrar} />
        <Botao title="Limpar Tudo" color="#DC3545" onPress={handleLimparLista} />
      </View>

      <FlatList
        data={listaLivros}
        keyExtractor={(item, index) => `${item}-${index}`}
        renderItem={({ item }) => <Text style={styles.listItem}>{item}</Text>}
        style={styles.list}
      />

      <View style={styles.livrosCountContainer}>
        <Text style={styles.livrosCountText}>Livros: {listaLivros.length}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#003366',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  list: {
    marginTop: 10,
  },
  listItem: {
    backgroundColor: '#004a80',
    color: 'white',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    fontSize: 16,
  },
  livrosCountContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  livrosCountText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default Perfil;