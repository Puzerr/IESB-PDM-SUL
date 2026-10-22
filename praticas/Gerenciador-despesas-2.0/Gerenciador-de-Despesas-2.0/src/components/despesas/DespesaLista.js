import { FlatList, View, Text, StyleSheet, useColorScheme } from "react-native";
import { DespesaItem } from "./DespesaItem";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/theme";

function DespesaLista({ despesas, onSelectItem, ListHeader }) {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme === "dark" ? "dark" : "light"];

  return (
    <FlatList
      data={despesas}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={ListHeader}
      renderItem={({ item }) => (
        <DespesaItem item={item} onPress={() => onSelectItem(item.id)} />
      )}
      ListEmptyComponent={
        <View style={styles.emptyContainer}>
          <Ionicons
            name="receipt-outline"
            size={48}
            color={theme.textSecondary}
          />
          <Text style={[styles.emptyText, { color: theme.textSecondary }]}>
            Nenhuma despesa encontrada.
          </Text>
          <Text style={[styles.emptySubText, { color: theme.textSecondary }]}>
            Toque no botão + para adicionar.
          </Text>
        </View>
      }
      contentContainerStyle={despesas.length === 0 && styles.emptyListContent}
    />
  );
}

const styles = StyleSheet.create({
  emptyListContent: {
    flexGrow: 1,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
    marginTop: 40,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 12,
  },
  emptySubText: {
    fontSize: 13,
    marginTop: 4,
  },
});

export default DespesaLista;
