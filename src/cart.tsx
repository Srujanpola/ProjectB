import * as React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux/store"; // adjust path

const CartScreen = ({ navigation }: any) => {
  const cartItems = useSelector((state: RootState) => state.products.cart);
  const dispatch = useDispatch();

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.item}>
      <View style={styles.info}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>${item.price}</Text>
      </View>

      <View style={styles.actions}>
        <Text style={styles.qty}>{"quantity: " + item.quantity}</Text>
        <TouchableOpacity onPress={() => alert(`Buying ${item.title}`)}>
          <Text style={styles.buy}>Buy Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <Text style={styles.back}>Back</Text>
      </TouchableOpacity>
      {cartItems.length === 0 ? (
        <Text style={styles.empty}>Your cart is empty</Text>
      ) : (
        <FlatList
          data={cartItems}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: hp("5%") }}
        />
      )}
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: hp("5%"),
    paddingHorizontal: hp("2%"),
    backgroundColor: "#fff",
  },
  empty: {
    textAlign: "center",
    marginTop: hp("5%"),
    fontSize: hp("1.5%"),
    color: "#555",
  },
  item: {
    padding: hp("2%"),
    marginVertical: hp("1%"),
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
  },
  info: {
    marginBottom: hp("1%"),
  },
  title: { fontSize: hp("2%"), fontWeight: "700" },
  price: { fontSize: hp("1.5%"), color: "#333" },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: hp("1%"),
    marginTop: hp("1%"),
  },
  qty: {
    fontSize: hp("1.5%"),
    fontWeight: "bold",
    marginHorizontal: hp("1%"),
  },
  backButton: {
    width: "20%",
    backgroundColor: "#e2e2e2",
    padding: hp("1%"),
    borderRadius: 8,
    marginBottom: hp("2%"),
    alignItems: "center",
  },
  back: {
    fontSize: hp("1.5%"),
    color: "#333",
  },
  buy: {
    fontSize: hp("1.5%"),
    fontWeight: "bold",
    color: "#fff",
    backgroundColor: "#000",
    padding: hp("1%"),
    borderRadius: 8,
  },
});
