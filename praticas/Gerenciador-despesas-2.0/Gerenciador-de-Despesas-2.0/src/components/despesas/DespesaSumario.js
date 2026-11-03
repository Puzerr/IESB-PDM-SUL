import { Text, View, StyleSheet, useColorScheme } from "react-native";
import { Colors } from "../../constants/theme";

function DespesaSumario({ despesas, periodo }) {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme === "dark" ? "dark" : "light"];

  const count = despesas.length;
  const total = despesas.reduce((acc, curr) => acc + (curr.amount || 0), 0);

  const formattedTotal = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(total);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.cardBackground, borderColor: theme.border },
      ]}
    >
      <Text style={[styles.periodText, { color: theme.textSecondary }]}>
        {periodo || `${count} despesa(s)`}
      </Text>
      <Text style={[styles.totalText, { color: theme.primary }]}>
        {formattedTotal}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 14,
    marginHorizontal: 12,
    marginVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  periodText: {
    fontSize: 14,
    fontWeight: "500",
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default DespesaSumario;
