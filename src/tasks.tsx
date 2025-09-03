import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import * as React from "react";
import { Button, StyleSheet, View } from "react-native";
import { RootStackParamList } from "../app";
type navigationProp = NativeStackNavigationProp<RootStackParamList>;

interface TaskScreenProps {}

const TaskScreen = (props: TaskScreenProps) => {
  const navigation = useNavigation<navigationProp>();

  return (
    <View style={styles.container}>
      {[
        "List",
        "ProductDetails",
        "UsersScreen",
        "TokenScreen",
        "DeviceInfoScreen",
      ].map((screenName, index) => (
        <View key={screenName} style={styles.buttonContainer}>
          <Button
            title={screenName}
            onPress={() => {
              switch (screenName) {
                case "List":
                  navigation.navigate(screenName);
                  break;
                case "ProductDetails":
                  navigation.navigate(screenName);
                  break;
                case "UsersScreen":
                  navigation.navigate(screenName, { userId: undefined });
                  break;
                case "TokenScreen":
                  navigation.navigate(screenName);
                  break;
                case "DeviceInfoScreen":
                  navigation.navigate(screenName);
                  break;
                default:
                  console.log(`Unknown screen: ${screenName}`);
              }
            }}
          />
        </View>
      ))}
    </View>
  );
};

export default TaskScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    marginVertical: 10,
  },
});
