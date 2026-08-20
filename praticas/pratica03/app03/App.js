import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import {
  rotuloInputMeta,
  rotuloBtnCadastroMeta,
  rotuloListaMetas,
} from "./components/mensagens";
export default function App() {
  return (
    <View style={styles.mainContainer}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          flex: 1,
        }}
      >
        <View style={{ width: "65%" }}>
          <TextInput style={styles.inputText} placeholder={rotuloInputMeta} />
        </View>
        <View style={{ width: "30%" }}>
          <Button title={rotuloBtnCadastroMeta} />        </View>
        <View style={styles.metaContainer}>
          <Text>{rotuloListaMetas}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  mainContainer: {
    flex: 1,
    flexDirection: "column",
    padding: 30
  },
  inputText: {
    borderColor: "#ccc",
    borderWidth: 1,
  },
  metaContainer: {
    flex: 1,
  },
});
