import { StyleSheet, View, Text, Image } from "react-native";
import labels from "../labels";

function Header() {
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("../assets/logo.svg")} />
      <Text style={styles.titulo}>{labels.plchldHeaderTitulo}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 12,
    height: 200
  },
  logo: {
    width: 120,
    height: 120,
  },
  titulo: {
    fontSize: 32,
    marginTop: 12,
  },
});

export default Header;
