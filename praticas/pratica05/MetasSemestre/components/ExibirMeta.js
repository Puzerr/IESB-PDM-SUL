import React from "react";
import { View, Text, StyleSheet, FlatList, Pressable, Alert, Platform } from "react-native";

export default function ExibirMeta({ metas, onExcluir }) {  
  function confirmarExclusao(id) {
    if (Platform.OS === 'web') {
      const confirmacao = window.confirm("Tem certeza que deseja excluir esta meta?");
      if (confirmacao) {
        onExcluir(id);
      }
    } else {
      Alert.alert(
        "Excluir Meta",
        "Tem certeza que deseja excluir esta meta?",
        [
          { text: "Cancelar", style: "cancel" },
          { text: "Excluir", onPress: () => onExcluir(id), style: "destructive" }
        ]
      );
    }
  }

  return (
    <FlatList
      data={metas}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Pressable 
          onLongPress={() => confirmarExclusao(item.id)}
          delayLongPress={500}
          style={({ pressed }) => [
            styles.itemCard,
            pressed && styles.itemPressionado
          ]}
        >
          <View style={styles.textosContainer}>
            <Text style={styles.titulo}>{item.titulo}</Text>
            <Text style={styles.data}>Criado em: {item.criadoEm}</Text>
          </View>
        </Pressable>
      )}
      contentContainerStyle={styles.listaContainer}
    />
  );
}

const styles = StyleSheet.create({
  listaContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  itemCard: {
    padding: 15,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: "row", 
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemPressionado: {
    backgroundColor: "#e0e0e0", 
    opacity: 0.8,
  },
  textosContainer: {
    flex: 1,
  },
  titulo: {
    fontSize: 16,
    fontWeight: "bold",
  },
  data: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  }
});