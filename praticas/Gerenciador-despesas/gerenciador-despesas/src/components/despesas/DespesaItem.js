import { Pressable, StyleSheet, Text, View } from "react-native";

function getDataFormatada(data) {
  return (
    data.getDate() + "/" + (data.getMonth() + 1) + "/" + data.getFullYear()
  );
}

function ValorFormatado(numero) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(numero);
}

function DespesaItem({ item }) {
  return (
    <Pressable>
      <View style={styles.itemContainer}>
        <View style={styles.itemText}>
          <Text>{getDataFormatada(item.data)}</Text>
        </View>
        <View style={styles.itemText}>
          <Text>{item.descricao}</Text>
        </View>
        <View style={styles.itemText}>
          <Text>{ValorFormatado(item.valor)}</Text>
        </View>
        <View style={styles.categoriaText}>
          <Text>{item.categoria}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    padding: 5,
    marginVertical: 5,
    marginHorizontal: 5,
    backgroundColor: "lightgray",
    justifyContent: 'center',
    flexDirection: "row",
  },
  itemText: {
    flex: 1,
    padding: 2,
    marginVertical: 2,
    marginHorizontal: 2,
    alignContent: "left",
  },
  categoriaText: {
    flex: 1,
    padding: 3,
    marginVertical: 2,
    marginHorizontal: 2,
    textAlign: 'rigth',
    backgroundColor: "white",
    borderRadius: 4
  }
});

export { DespesaItem };
