import { Camera, CameraView } from "expo-camera";
import React, { useEffect, useRef, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";
import { Text } from "../../../components/typography/text.component";

const ProfileCamera = styled(CameraView)`
  width: 100%;
  height: 100%;
`;

const CameraTouchableView = styled(TouchableOpacity)`
  width: 100%;
  height: 100%;
`;

export const CameraScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const cameraRef = useRef();

  const snap = async () => {
    if (cameraRef) {
      const photo = await cameraRef.current.takePictureAsync();
      console.log(photo);
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
      <CameraTouchableView onPress={snap} />
    </ProfileCamera>
  );
};
