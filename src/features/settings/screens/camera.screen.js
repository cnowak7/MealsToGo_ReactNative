import AsyncStorage from "@react-native-async-storage/async-storage";
import { Camera, CameraView } from "expo-camera";
import React, { useContext, useEffect, useRef, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";

import { Text } from "../../../components/typography/text.component";

import { AuthenticationContext } from "../../../services/authentication/authentication.context";

const ProfileCamera = styled(CameraView)`
  width: 100%;
  height: 100%;
`;

const CameraTouchableOverlay = styled(TouchableOpacity)`
  width: 100%;
  height: 100%;
`;

export const CameraScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const cameraRef = useRef();
  const { user } = useContext(AuthenticationContext);

  const snap = async () => {
    if (cameraRef) {
      const photo = await cameraRef.current.takePictureAsync();
      AsyncStorage.setItem(`${user.uid}-photo`, photo.uri);
      navigation.goBack();
    }
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
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
    <ProfileCamera ref={cameraRef} facing="front">
      <CameraTouchableOverlay onPress={snap} />
    </ProfileCamera>
  );
};
