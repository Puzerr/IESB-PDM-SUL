import { Pressable, Text, TextInput, View, StyleSheet } from "react-native";
import { useState } from "react";
import labels from "../labels";

function CompromissosInput({ salvarRotina }) {
  const [textoInput, setTextoInput] = useState("");

  function handleSalvarCompromisso() {
    if (textoInput.trim() === "") {
      return console.error("Deu ruim: o nome não deve ser vazio");
    }
    console.log("Executei a função de adicionar.")

    const agora = new Date();

    const novaRotina = {
      id: Date.now().toString(),
      nomeRotina: textoInput,
      criadaEm: agora.toLocaleDateString(),
    };

    salvarRotina(novaRotina);
    setTextoInput("");
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.inputRotinaTexto}
        placeholder={labels.plchldInputRotina.texto}
        value={textoInput}
        onChangeText={setTextoInput}
      />
      <Pressable style={styles.inputRotinaBotao} onPress={handleSalvarCompromisso}>
        <Text style={styles.inputRotinaBotaoTexto}>
          {labels.plchldInputRotina.botao}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
  },
  borda: {
    borderWidth: 2,
    borderColor: "#000",
    borderStyles: "solid",
  },
  inputRotinaTexto: {
    width: "65%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#62716e",
    borderStyles: "solid",
    borderRadius: 3,
    marginBottom: 5,
  },
  inputRotinaBotao: {
    width: "30%",
    padding: 10,
    marginTop: 5,
    backgroundColor: "#65a8df",
    borderRadius: 3,
  },
  inputRotinaBotaoTexto: {
    pointerEvents:"none",
    fontSize: 16,
    textAlign: "center",
  },
});

export default CompromissosInput;
