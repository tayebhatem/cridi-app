import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const AccordionItem = ({ title, text }: { title: string, text: string }) => {
  const [expanded, setExpanded] = useState(false);

  // Shared value for animation (height)
  const height = useSharedValue(0);

  // Handle toggle of accordion
  const toggleAccordion = () => {
    setExpanded(!expanded);
    height.value = expanded ? 0 : 100; // Toggle between 0 and content height (150 is just an example)
  };

  // Animated style for the content view
  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: withTiming(height.value, { duration: 300 }), // Animate height
    };
  });

  return (
    <View >
      <TouchableOpacity onPress={toggleAccordion} className='flex flex-row justify-between items-center py-3 overflow-hidden'>
        <Text className='text-lg font-kufi  w-[90%] text-black dark:text-white'>{title}</Text>
        <MaterialIcons name='arrow-forward-ios' color={'#aaa'} size={24} />
      </TouchableOpacity>

      <Animated.View className='overflow-hidden' style={[ animatedStyle]} >
        <Text className='text-neutral-400 font-kufi' >{text}</Text>
      </Animated.View>
    </View>
  );
};



export default AccordionItem;
