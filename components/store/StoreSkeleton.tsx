import { View, Text } from "react-native";
import React from "react";
import CardLayout from "../ui/CardLayout";
import { Skeleton } from "moti/skeleton";

const StoreSkeleton = () => {
  return (
    <CardLayout elevationAndroid={1}>
      <View className="space-y-2 flex justify-center items-center">
        <View>
          <Skeleton colorMode={"light"} radius="round" height={60} width={60} />
        </View>
        <View>
          <Skeleton
            colorMode={"light"}
            radius="square"
            height={15}
            width={120}
          />
        </View>
        <View>
          <Skeleton
            colorMode={"light"}
            radius="square"
            height={8}
            width={100}
          />
        </View>
        <View>
          <Skeleton
            colorMode={"light"}
            radius="square"
            height={8}
            width={100}
          />
        </View>
      </View>
    </CardLayout>
  );
};

export default StoreSkeleton;
