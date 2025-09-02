import * as SecureStore from "expo-secure-store";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

interface TokenScreenProps {}

const TokenScreen = (props: TokenScreenProps) => {
  const [token, setToken] = useState<string | null>(null);
  const saveToken = async (token: string) => {
    try {
      await SecureStore.setItemAsync("authToken", token);
      alert("Token saved!");
    } catch (e) {
      console.error("Error saving token:", e);
    }
  };

  const getToken = async () => {
    try {
      const storedToken = await SecureStore.getItemAsync("authToken");
      setToken(storedToken);
    } catch (e) {
      console.error("Error retrieving token:", e);
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  return (
    <View style={styles.container}>
      {token ? (
        <Text style={styles.text}>Stored Token: {token}</Text>
      ) : (
        <>
          <Text style={styles.text}>No token found. Saving a new token...</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={async () => {
              await saveToken("my-dummy-token");
              getToken();
            }}
          >
            <Text> Save Token</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default TokenScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: hp("5%"),
    paddingHorizontal: hp("2%"),
    borderWidth: 1,
    borderColor: "black",
  },
  text: {
    marginBottom: hp(2),
    fontSize: hp(2),
    color: "black",
  },
  button: {
    paddingHorizontal: hp(2),
    paddingVertical: hp(1),
  },
});
