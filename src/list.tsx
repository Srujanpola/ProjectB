import { RootStackParamList } from "@/app";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "expo-router";
import * as React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

type navigationProp = NativeStackNavigationProp<RootStackParamList>;
interface componentNameProps {}

const DATA_SIZE = 5000;
const ITEMS_PER_BATCH = 100;
const PAGE_SIZE = DATA_SIZE / ITEMS_PER_BATCH;

const ITEM_HEIGHT = hp("7%"); // Responsive item height

const HomeScreen = (props: componentNameProps) => {
  const [fullData, setFullData] = React.useState<string[]>([]);
  const [displayData, setDisplayData] = React.useState<string[]>([]);
  const [page, setPage] = React.useState(1);
  const navigation = useNavigation<navigationProp>();

  React.useEffect(() => {
    const data = Array.from({ length: DATA_SIZE }, (_, i) => `Item ${i + 1}`);
    setFullData(data);
    setDisplayData(data.slice(0, PAGE_SIZE));
  }, []);

  // Load more data when end is reached
  const handleLoadMore = () => {
    const nextPage = page + 1;
    const nextData = fullData.slice(0, nextPage * PAGE_SIZE);
    if (nextData.length > displayData.length) {
      setDisplayData(nextData);
      setPage(nextPage);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={displayData}
        keyExtractor={(item) => item}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemText}>{item}</Text>
          </View>
        )}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        getItemLayout={(_, index) => ({
          length: ITEM_HEIGHT,
          offset: ITEM_HEIGHT * index,
          index,
        })}
        initialNumToRender={ITEMS_PER_BATCH}
        maxToRenderPerBatch={ITEMS_PER_BATCH}
        windowSize={5}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: hp("5%"),
    backgroundColor: "#fff",
    paddingHorizontal: hp("2%"),
  },
  title: {
    fontSize: hp("3%"),
    fontWeight: "bold",
    marginBottom: hp("2%"),
    textAlign: "center",
  },
  linkContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 16,
  },
  link: {
    fontSize: 16,
    color: "#0a7ea4",
  },
  item: {
    height: ITEM_HEIGHT,
    borderWidth: 1,
    borderBottomColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: hp("0.5%"),
  },
  itemText: {
    fontSize: hp("2.2%"),
    textAlign: "center",
  },
});
