import React, {
  useEffect,
} from "react";
import { StyleSheet, StatusBar, View } from "react-native";
import Reels from "./src/Reels/components/Reels";
import { Audio } from "expo-av";

import videos from "./utils/videos";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Reels videos={videos} pauseOnOptionsShow={false} />
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
