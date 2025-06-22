import { useState } from 'react';
import { View, Text, StyleSheet, Keyboard, FlatList, Switch, Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

import Input from '../componentes/Input';
import Botao from '../componentes/Botao';
import { useAppContext } from '../context/AppContext';

const screenWidth = Dimensions.get('window').width;

const Resenhas = () => {
  const { resenhasCadastradas, brazilianWritersCount, addReview, clearAllReviews } = useAppContext();

  const [nomeLivro, setNomeLivro] = useState('');
  const [resumo, setResumo] = useState('');
  const [isBrazilianWriter, setIsBrazilianWriter] = useState(false);

  const handleCadastrarResenha = () => {
    if (nomeLivro.trim() && resumo.trim()) {
      const novaResenha = {
        id: Date.now().toString(),
        nomeLivro: nomeLivro,
        resumo: resumo,
        isBrazilianWriter: isBrazilianWriter,
      };

      addReview(novaResenha);

      setNomeLivro('');
      setResumo('');
      setIsBrazilianWriter(false);
      Keyboard.dismiss();
    } 
  };

  const handleLimparCampos = (clearAll = true) => {
    setNomeLivro('');
    setResumo('');
    setIsBrazilianWriter(false);
    if (clearAll) {
      clearAllReviews();
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.resenhaItem}>
      <Text style={styles.resenhaTitulo}> {item.nomeLivro}</Text>
      <Text style={styles.resenhaResumo}>"{item.resumo}"</Text>
      {item.isBrazilianWriter && (
        <Text style={styles.brazilianWriterTag}>Escritor Brasileiro</Text>
      )}
    </View>
  );

  const chartData = {
    labels: ['Total', 'Brasileiros'],
    datasets: [
      {
        data: [resenhasCadastradas.length, brazilianWritersCount],
        colors: [
          (opacity = 1) => `rgba(255, 223, 0, ${opacity})`,
          (opacity = 1) => `rgba(0, 128, 0, ${opacity})`,
        ],
      },
    ],
  };

  const chartConfig = {
    backgroundColor: '#004080',
    backgroundGradientFrom: '#004080',
    backgroundGradientTo: '#003366',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForLabels: {
      fontSize: 12,
    },
    barPercentage: 0.5,
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Escrever Resenha</Text>

      <Input
        placeholder="Nome do livro"
        value={nomeLivro}
        onChangeText={setNomeLivro}
      />
      <Input
        placeholder="O que você achou do livro?"
        value={resumo}
        onChangeText={setResumo}
        multiline
        numberOfLines={4}
      />

      <View style={styles.switchContainer}>
        <Text style={styles.switchLabel}>Escritor Brasileiro?</Text>
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={isBrazilianWriter ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={setIsBrazilianWriter}
          value={isBrazilianWriter}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Botao title="Cadastrar" color="#007BFF" onPress={handleCadastrarResenha} />
        <Botao title="Limpar Tudo" color="#DC3545" onPress={() => handleLimparCampos(true)} />
      </View>

      <View style={styles.contentRow}>

        {resenhasCadastradas.length > 0 && (
          <View style={styles.chartColumn}>
            <Text style={styles.chartTitle}>Análise</Text>
            <BarChart
              data={chartData}
              width={(screenWidth / 2) - 30}
              height={200}
              chartConfig={chartConfig}
              style={styles.chart}
              withInnerLines={false}
              showValuesOnTopOfBars
              fromZero
            />
          </View>
        )}

        {resenhasCadastradas.length === 0 ? (
          <View style={styles.noReviewsColumn}>
            <Text style={styles.noReviewsText}>Nenhuma resenha cadastrada ainda. Que tal adicionar uma?</Text>
          </View>
        ) : (
          <FlatList
            data={resenhasCadastradas}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.listContentContainer}
            style={styles.listColumn}
          />
        )}
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
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 30,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 3,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
    backgroundColor: '#004080',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  switchLabel: {
    fontSize: 16,
    color: '#FFD700',
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    marginBottom: 30,
  },

  contentRow: {
    flex: 1, 
    flexDirection: 'row', 
    justifyContent: 'space-between',
    marginTop: 10,
  },
  chartColumn: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#004080',
    borderRadius: 16,
    paddingVertical: 10,
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
    maxHeight: 250,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 10,
    textAlign: 'center',
  },
  chart: {
    marginVertical: 0,
    borderRadius: 16,
  },
  listColumn: {
    flex: 1, 
    marginLeft: 10, 
  },
  resenhaItem: {
    backgroundColor: '#004080',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#0055AA',
  },
  resenhaTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#E0E0E0',
    marginBottom: 5,
  },
  resenhaResumo: {
    fontSize: 16,
    color: '#CCCCCC',
    lineHeight: 24,
  },
  brazilianWriterTag: {
    fontSize: 14,
    color: '#90EE90',
    marginTop: 5,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  noReviewsColumn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    backgroundColor: '#004080',
    borderRadius: 16,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  noReviewsText: {
    fontSize: 16,
    color: '#ADD8E6',
    textAlign: 'center',
  }
});

export default Resenhas;