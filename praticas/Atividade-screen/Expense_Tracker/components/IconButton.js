import { Ionicons } from "@expo/vector-icons";
import { Pressable, View, StyleSheet } from "react-native";

function IconButton({ icon, size, color, onPress }) {
  return (
    <Pressable onPress={onPress} style={(pressed) => pressed && styles.button_pressed}>
      <View style={styles.button_pressed}>
        <Ionicons name={icon} size={size} color={color} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button_pressed: {
    opacity: 0.5,
  },
});

export default IconButton;
