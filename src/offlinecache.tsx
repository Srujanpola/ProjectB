import useNetInfo from "@/hooks/useNetInfo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RouteProp } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { RootStackParamList } from "../app";
type UsersScreenRouteProp = RouteProp<RootStackParamList, "UsersScreen">;

const UsersScreen = ({ route }: { route: UsersScreenRouteProp }) => {
  console.log("UsersScreen route.params",route.params);
  const userId = route.params?.userId;
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { isConnected } = useNetInfo();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const cachedUsers = await AsyncStorage.getItem("users");
        if (cachedUsers && !isConnected) {
          const parsedUsers = JSON.parse(cachedUsers);
          setUsers(
            userId
              ? parsedUsers.filter((user: any) => user.id == userId)
              : parsedUsers
          );
          setLoading(false);
        } else if (isConnected) {
          const response = await fetch(
            "https://jsonplaceholder.typicode.com/users"
          );
          const data = await response.json();
          setUsers(
            userId ? data.filter((user: any) => user.id == userId) : data
          );
          await AsyncStorage.setItem("users", JSON.stringify(data));
        } else {
          setUsers([]);
        }
      } catch (error) {
        console.error("Failed to fetch users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [isConnected, userId]);

  if (loading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );
  }

  if (!isConnected && users.length === 0) {
    return (
      <View style={[styles.container, styles.center]}>
        <Text style={styles.noInternetText}>
          No internet connection and no cached users.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={{ paddingHorizontal: hp("2%") }}
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: hp("5%"),
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  item: {
    padding: 12,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  noInternetText: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
  },
});

export default UsersScreen;
