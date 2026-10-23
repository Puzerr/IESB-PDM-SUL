import { Text, View, StyleSheet } from "react-native";

function DespesaSumario({ despesas }) {
  const somaDespesas = despesas.reduce((total, despesa) => {
    return total + despesa.valor;
  },0);

  return (
    <View style={styles.itemContainer}>
      <Text>Total: </Text>
      <Text>{somaDespesas.toFixed(2)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 5,
    backgroundColor: "lightgray",
    flexDirection: "row",
  },
  itemText: {
    padding: 2,
    marginVertical: 2,
    marginHorizontal: 2,
  },
});
export default DespesaSumario;
