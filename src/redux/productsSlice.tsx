import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Product {
  id: number;
  name: string;
  doesAddedToCart: boolean;
  [key: string]: any;
}

interface CartItem extends Product {
  quantity: number;
}

interface ProductsState {
  products: Product[];
  cart: CartItem[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  products: [],
  cart: [],
  loading: false,
  error: null,
};

// ✅ Async thunk
export const fetchProducts = createAsyncThunk<Product[]>(
  "products/fetchProducts",
  async (_, { getState }) => {
    const { products } = getState() as ProductsState;
    const response = await fetch("https://dummyjson.com/products");
    const data = await response.json();
    return data.products.map((p: any) => ({ ...p, doesAddedToCart: false }));
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const index = state.products.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index >= 0) {
        state.products[index].doesAddedToCart = true;
        state.products[index].quantity = action.payload.quantity;
        state.cart.push({ ...action.payload });
      }
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) => {
      const index = state.products.findIndex(
        (item) => item.id === action.payload.id
      );
      const cartIndex = state.cart.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index >= 0) {
        state.products[index].quantity = action.payload.quantity;
      }
      if (cartIndex >= 0) {
        state.cart[cartIndex].quantity = action.payload.quantity;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch products";
      });
  },
});

export const { addToCart, updateQuantity } = productsSlice.actions;
export default productsSlice.reducer;
