import {
  StyleSheet,
  Text,
  ScrollView,
  Pressable,
  View
} from "react-native";

function MetasList(props) {
  return (
    <ScrollView>
      {props.array.map((meta) => {
        return (
          <View key={meta.id} style={styles.item}>
            <Pressable
              android_ripple={{ color: "yellow" }}
              onPress={() => props.onDeleteItem(meta.id)}
            >
              <Text styles={{padding: 8}}>{meta.texto}</Text>
            </Pressable>
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  item: {
    margin: 8,
    backgroundColor: "lightblue",
  },
});

export default MetasList;
