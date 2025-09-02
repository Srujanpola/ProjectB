import NetInfo from "@react-native-community/netinfo";
import React from "react";
const useNetInfo = () => {
  const [isConnected, setIsConnected] = React.useState<boolean | null>(null);
  React.useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });
    return () => unsubscribe();
  }, []);
  return { isConnected };
};
export default useNetInfo;
