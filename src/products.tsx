import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useDispatch, useSelector } from "react-redux";
import { RootStackParamList } from "../app";
import ProductItem from "./components/productItem";
import { fetchProducts } from "./redux/productsSlice";
import { AppDispatch, RootState } from "./redux/store";
type navigationProp = NativeStackNavigationProp<RootStackParamList>;

const ProductScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<navigationProp>();

  const products = useSelector((state: RootState) => state.products.products);
  const loading = useSelector((state: RootState) => state.products.loading);

  // Fetch data on mount
  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch]);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  const handleTouchCart = () => {
    navigation.navigate("Cart");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.touchable} onPress={handleTouchCart}>
        <Text style={styles.cart}>Go to Cart</Text>
      </TouchableOpacity>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ProductItem product={item} />}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<Text>No Products Found</Text>}
      />
    </View>
  );
};

export default ProductScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: hp("5%"),
    backgroundColor: "#fff",
    paddingHorizontal: hp("2%"),
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  touchable: {
    padding: hp("2%"),
    backgroundColor: "#e2e2e2",
    borderRadius: 10,
    marginVertical: hp("1%"),
  },
  cart: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
