import * as ImagePicker from "expo-image-picker";
import { Alert, Linking } from "react-native";

function alertUnavailable(action) {
  Alert.alert(
    "Recurso indisponível",
    `Não foi possível abrir a ${action} neste dispositivo.`,
  );
}

export async function pickImage() {
  try {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      quality: 0.7,
    });
    return result.canceled ? null : result.assets[0].uri;
  } catch (error) {
    console.log("pickImage falhou", error);
    alertUnavailable("galeria");
    return null;
  }
}

export async function takePhoto() {
  try {
    const { granted } = await ImagePicker.requestCameraPermissionsAsync();
    if (!granted) {
      Alert.alert("Permissão negada", "Libere a câmera.", [
        { text: "Agora não", style: "cancel" },
        { text: "Abrir ajustes", onPress: () => Linking.openSettings() },
      ]);
      return null;
    }

    const shot = await ImagePicker.launchCameraAsync({ quality: 0.7 });
    return shot.canceled ? null : shot.assets[0].uri;
  } catch (error) {
    console.log("takePhoto falhou", error);
    alertUnavailable("câmera");
    return null;
  }
}
