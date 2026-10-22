import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Platform,
  useColorScheme,
} from "react-native";
import { Colors } from "../../constants/theme";

function formatDate(date) {
  if (!(date instanceof Date) || isNaN(date)) return "";
  return date.toLocaleDateString("pt-BR");
}

function formatCurrency(amount) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(amount || 0);
}

export function DespesaItem({ item, onPress }) {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme === "dark" ? "dark" : "light"];

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        { backgroundColor: theme.cardBackground, borderColor: theme.border },
        pressed && styles.pressed,
      ]}
    >
      <View style={styles.leftContainer}>
        <Text style={[styles.description, { color: theme.textPrimary }]}>
          {item.description}
        </Text>
        <Text style={[styles.date, { color: theme.textSecondary }]}>
          {formatDate(item.date)}
        </Text>
      </View>

      <View style={styles.rightContainer}>
        <View
          style={[styles.badge, { backgroundColor: theme.badgeBackground }]}
        >
          <Text style={[styles.badgeText, { color: theme.badgeText }]}>
            {item.category}
          </Text>
        </View>
        <Text style={[styles.amount, { color: theme.primary }]}>
          {formatCurrency(item.amount)}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 14,
    marginVertical: 6,
    marginHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
      web: {
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.08)",
      },
    }),
  },
  pressed: {
    opacity: 0.7,
  },
  leftContainer: {
    flex: 1,
  },
  rightContainer: {
    alignItems: "flex-end",
  },
  description: {
    fontSize: 16,
    fontWeight: "600",
  },
  date: {
    fontSize: 12,
    marginTop: 4,
  },
  amount: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 4,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: "600",
  },
});
