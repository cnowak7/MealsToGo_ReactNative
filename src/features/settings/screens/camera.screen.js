import { Camera, CameraView } from "expo-camera";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import { Text } from "../../../components/typography/text.component";

const ProfileCamera = styled(CameraView)`
  width: 100%;
  height: 100%;
`;

export const CameraScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);

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
  return <ProfileCamera facing="front" />;
};
