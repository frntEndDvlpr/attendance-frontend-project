import React, { useEffect } from "react";
import { View, StyleSheet, Modal } from "react-native";
import * as Progress from "react-native-progress";
import LottieView from "lottie-react-native";
import colors from "../config/colors";

function UploadScreen({
  progress = 0,
  visible = false,
  onDone,
  timeout = 9000,
}) {
  useEffect(() => {
    if (progress >= 1) {
      const timer = setTimeout(onDone, timeout);
      return () => clearTimeout(timer);
    }
  }, [progress, onDone, timeout]);

  return (
    <Modal visible={visible}>
      <View style={styles.container}>
        {progress < 1 ? (
          <Progress.Circle
            size={150}
            indeterminate={true}
            progress={progress}
            color={colors.secondary}
          />
        ) : (
          <LottieView
            autoPlay
            loop={false}
            onAnimationFinish={onDone}
            source={require("../assets/animations/Done.json")}
            style={styles.doneAninmation}
          />
        )}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  doneAninmation: { width: 200, height: 200 },
});

export default UploadScreen;
