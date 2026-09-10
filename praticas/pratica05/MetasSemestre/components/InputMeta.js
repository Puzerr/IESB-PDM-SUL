import React, { useState } from "react";
import { TextInput, Pressable, View, StyleSheet, Text } from "react-native";
import { placeholderNomeInserir, placeholderBotaoInserir } from "../assets/labels.js";

export default function InputMeta({ onSalvarMeta }) {
  const [textoInput, setTextoInput] = useState("");

  function handleSalvar() {
    if (textoInput.trim() === "") return;

    const agora = new Date();
    
    const novaMeta = {
      id: Date.now().toString(),
      titulo: textoInput.trim(),
      criadoEm: agora.toLocaleDateString(),
    };

    onSalvarMeta(novaMeta);
    setTextoInput(""); 
  }

  return (
    <View style={styles.mainContainer}>
      <TextInput
        style={styles.textoInserir}
        placeholder={placeholderNomeInserir || "Digite uma meta"}
        value={textoInput}
        onChangeText={setTextoInput}
      />
      <Pressable style={styles.botaoInserir} onPress={handleSalvar}>
        <Text>{placeholderBotaoInserir || "Inserir"}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 15,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  textoInserir: {
    flex: 1,
    borderWidth: 1,
    borderColor: "blue",
    borderStyle: "solid",
    borderRadius: 5,
    paddingHorizontal: 15,
    marginRight: 10,
    height: 40,
  },
  botaoInserir: {
    backgroundColor: "lightblue",
    paddingHorizontal: 15,
    justifyContent: "center",
    borderRadius: 4,
    height: 40,
  },
});