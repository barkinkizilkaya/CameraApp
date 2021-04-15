import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Camera } from "expo-camera";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const CameraScreen = (props) => {
  const cameraRef = useRef();

  const [hasPermission, setHasPermission] = useState(null);

  const SnapPictures = async () => {
    if (cameraRef) {
      const photo = await cameraRef.current.takePictureAsync();
      AsyncStorage.setItem("CameraAppPhoto", photo.uri);
      props.navigation.goBack();
    }
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <TouchableOpacity onPress={SnapPictures}>
      <Camera
        ref={(camera) => (cameraRef.current = camera)}
        style={styles.CameraStyle}
        type={Camera.Constants.Type.front}
        ratio={"16:9"}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  CameraStyle: {
    width: "100%",
    height: "100%",
  },
});
