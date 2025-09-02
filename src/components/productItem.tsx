import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { useDispatch } from "react-redux";
import { addToCart, updateQuantity } from "../redux/productsSlice";

interface Product {
  id: number;
  name: string;
  doesAddedToCart?: boolean;
  [key: string]: any;
}

const ProductItem: React.FC<{ product: Product }> = ({ product }) => {
  const dispatch = useDispatch();
  const [count, setCount] = useState(
    product.doesAddedToCart ? Number(product.quantity) : 1
  );
  if (product.doesAddedToCart) {
    console.log("ProductItem Rendered:", product);
  }
  const [addedToCart, setAddedToCart] = useState(product.doesAddedToCart);
  const [doesModified, setDoesModified] = useState(false);

  useEffect(() => {
    if (doesModified && addedToCart) {
      dispatch(updateQuantity({ id: product.id, quantity: count }));
    }
  }, [doesModified, count]);

  return (
    <View style={styles.item}>
      <View style={styles.info}>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.desc}>{product.description}</Text>
        <Text style={styles.meta}>
          {product.category} • ${product.price}
        </Text>
      </View>

      <View style={styles.actions}>
        {addedToCart ? (
          <View style={styles.qtyContainer}>
            <Button
              title="-"
              onPress={() => {
                setCount((prev) => prev - 1);
                if (!doesModified) {
                  setDoesModified(true);
                }
              }}
            />
            <Text style={styles.qty}>{count}</Text>
            <Button
              title="+"
              onPress={() => {
                setCount((prev) => prev + 1);
                if (!doesModified) {
                  setDoesModified(true);
                }
              }}
            />
          </View>
        ) : (
          <Button
            title="Add to Cart"
            onPress={() => {
              dispatch(
                addToCart({
                  ...product,
                  doesAddedToCart: true,
                  quantity: 1,
                })
              );
              setAddedToCart(true);
            }}
          />
        )}
      </View>
    </View>
  );
};

export default ProductItem;

const styles = StyleSheet.create({
  item: {
    padding: 12,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  info: {
    marginBottom: 8,
  },
  title: { fontSize: 16, fontWeight: "700", marginBottom: 4 },
  desc: { fontSize: 14, color: "#555", marginBottom: 4 },
  meta: { fontSize: 13, fontWeight: "600", color: "#333" },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  qtyContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  qty: {
    marginHorizontal: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
});
