import React, { useState } from "react";
import { Avatar } from "react-native-paper";
import { View, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
export const AvatarScreen = (props) => {
  const openCamera = () => {
    props.navigation.navigate("Camera");
  };

  const [profileUri, setProfileUri] = useState(null);

  const getProfilePicture = async () => {
    const photoUri = await AsyncStorage.getItem("CameraAppPhoto");
    if (photoUri) {
      setProfileUri(photoUri);
    }
  };

  useFocusEffect(() => {
    getProfilePicture();
  });

  return (
    <View style={styles.container}>
      <View style={styles.Start}>
        <TouchableOpacity onPress={() => openCamera()}>
          {!profileUri && (
            <Avatar.Image
              size={Dimensions.get("window").width / 2}
              source={require("../assets/avatarIcon.png")}
            />
          )}
          {profileUri && (
            <Avatar.Image
              size={Dimensions.get("window").width / 3}
              source={{ uri: profileUri }}
            />
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.Middle} />
      <View style={styles.End} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  Start: {
    flex: 1,
    backgroundColor: "rgba(233, 37, 37, 0.9))",
    borderBottomEndRadius: 50,
    borderBottomLeftRadius: 50,

    justifyContent: "center",
    alignItems: "center",
  },
  Middle: {
    flex: 1,
  },
  End: {
    flex: 1,
  },
});
