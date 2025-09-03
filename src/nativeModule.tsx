import React, { useEffect, useState } from "react";
import { NativeModules, StyleSheet, Text, View } from "react-native";

const { DeviceModule } = NativeModules;

const DeviceInfoScreen = () => {
  const [osVersion, setOsVersion] = useState("");
  const [appVersion, setAppVersion] = useState("");

  useEffect(() => {
    const fetchDeviceInfo = async () => {
      try {
        const os = await DeviceModule.getOSVersion();
        const app = await DeviceModule.getAppVersion();
        setOsVersion(os);
        setAppVersion(app);
      } catch (error) {
        console.error("Error fetching device info:", error);
      }
    };

    fetchDeviceInfo();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Device & App Info</Text>
      <Text style={styles.info}>OS Version: {osVersion}</Text>
      <Text style={styles.info}>App Version: {appVersion}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f0f0f0",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
  },
  info: {
    fontSize: 18,
    marginBottom: 12,
  },
});

export default DeviceInfoScreen;
