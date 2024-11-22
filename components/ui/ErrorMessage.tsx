import { View, Text } from "react-native";
import React from "react";
import { AlertCircle } from "@tamagui/lucide-icons";
const ErrorMessage = ({ error }: { error: string }) => {
  return (
    <View>
      {error ? (
        <Text className="text-red-500  my-3 font-kufi-medium  text-xs ">
          {error} <AlertCircle size={16} color={"#ef4444"} />
        </Text>
      ) : (
        <></>
      )}
    </View>
  );
};

export default ErrorMessage;
