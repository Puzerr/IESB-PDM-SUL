import { FlatList, View, Text, StyleSheet } from "react-native";
import { DespesaItem } from "./DespesaItem";

function DespesaLista({ despesas }) {
  return (
    <View style={styles.container}>
      <FlatList
        data={despesas}
        renderItem={DespesaItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    padding: 5,
  },
});
export default DespesaLista;
