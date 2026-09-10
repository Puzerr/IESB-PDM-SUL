import { Text, StyleSheet } from "react-native";
import { tituloHeader } from "../assets/labels.js";

function Header() {
  return <Text style={styles.tituloHeader}>{tituloHeader}</Text>;
}
const styles = StyleSheet.create({
  tituloHeader: {
    fontSize: "32px",
    alignSelf: "center",
    marginTop: '5%'
  },
});

export default Header;
