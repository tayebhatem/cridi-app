import { View, Text, Pressable, Linking } from "react-native";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import useLanguageStore from "@/stores/useLanguageStore";
import Carousel from "react-native-reanimated-carousel";
import { Dimensions } from "react-native";
import { publicationType } from "@/types";
import { getPublications } from "@/libs/appwrite";
import { Image } from "tamagui";

const Hero = () => {
  const width = Dimensions.get("window").width;
  const [posistion, setposistion] = useState(0);
  const [publications, setpublications] = useState<publicationType[]>([]);
  useEffect(() => {
    const fetchPubs = async () => {
      try {
        const data = await getPublications();

        setpublications(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPubs();
  }, []);

  return (
    <View className="">
      <Carousel
        style={{
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
        }}
        loop
        width={width}
        height={width / 2}
        autoPlay={true}
        mode="parallax"
        data={publications}
        scrollAnimationDuration={1500}
        onSnapToItem={(index) => setposistion(index)}
        autoPlayInterval={3000}
        renderItem={(item) => (
          <Pressable
            onPress={() => {
              Linking.openURL(item.item.url).catch((err) =>
                console.error("Failed to open URL", err)
              );
            }}
            className=" rounded-md overflow-hidden  flex justify-center items-center"
          >
            <Image
              source={{
                uri: item.item.image,
                width: 400,
                height: 200,
              }}
            />
          </Pressable>
        )}
      />
    </View>
  );
};

export default Hero;
