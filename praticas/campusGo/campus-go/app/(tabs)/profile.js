import { useEffect, useState } from "react";
import { Button, Image, Pressable, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { pickImage, takePhoto } from "../../services/media";
import { styles } from "../../styles/shared";

const PHOTO_KEY = "@profile-photo";

export default function ProfileScreen() {
  const [photoUri, setPhotoUri] = useState(null);
  const avatar = photoUri
    ? { uri: photoUri }
    : require("../../assets/icon.png");

  useEffect(() => {
    AsyncStorage.getItem(PHOTO_KEY).then((saved) => {
      if (saved) setPhotoUri(saved);
    });
  }, []);

  async function savePhoto(uri) {
    if (!uri) return;
    setPhotoUri(uri);
    await AsyncStorage.setItem(PHOTO_KEY, uri);
  }

  async function handleChangePhoto() {
    await savePhoto(await pickImage());
  }

  async function handleTakePhoto() {
    await savePhoto(await takePhoto());
  }

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Perfil</Text>
      <Pressable onPress={handleChangePhoto}>
        <Image source={avatar} style={styles.avatar} />
        <Text style={styles.name}>Raphael Ferraz</Text>
        <Text style={[styles.subtitle, { textAlign: "center" }]}>
          Engenharia de Software
        </Text>
      </Pressable>

      <View style={styles.buttonWrap}>
        <Button title="Galeria" onPress={handleChangePhoto} />
      </View>
      <View style={styles.buttonWrap}>
        <Button title="Câmera" onPress={handleTakePhoto} />
      </View>
    </View>
  );
}
