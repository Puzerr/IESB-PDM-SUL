import { StyleSheet, View, TextInput } from "react-native";
import { useState } from "react";
import { rotuloBtnCadastroMeta, rotuloInputMeta } from "../assets/mensagens";
import { Button } from "react-native";

function MetaInput(props) {
  const [inputMetaText, setInputMetaText] = useState("");

  function metaInputHandler(inputText) {
    setInputMetaText(inputText);
  }

  function addMetaHandler() {
    props.onAddMeta(inputMetaText);
    setInputMetaText('')
  }

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        flex: 1,
        flexWrap: "wrap",
      }}
    >
      <View style={{ width: "65%" }}>
        <TextInput
          style={styles.inputText}
          placeholder={rotuloInputMeta}
          onChangeText={(text) => metaInputHandler(text)}
        />
      </View>
      <View style={{ width: "30%" }}>
        <Button
          title={rotuloBtnCadastroMeta}
          onPress={() => addMetaHandler()}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    inputText: {
    borderColor: "#ccc",
    borderWidth: 1,
    height: "32px",
  }
})

export default MetaInput;
