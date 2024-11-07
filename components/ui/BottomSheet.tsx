import { View, Text, Modal, TouchableOpacity, StatusBar, Pressable, Animated } from 'react-native'
import React, { ReactNode, useRef } from 'react'
import { BlurView } from 'expo-blur';
import { X } from '@tamagui/lucide-icons'
import { PanGestureHandler, GestureHandlerRootView, State } from 'react-native-gesture-handler'

const BottomSheet = ({
  children,
  title,
  description,
  open,
  setOpen,
}: {
  children: ReactNode,
  title: string,
  description: string,
  open: boolean,
  setOpen: (open: boolean) => void
}) => {
  const translateY = useRef(new Animated.Value(0)).current;

  const handleGesture = Animated.event(
    [{ nativeEvent: { translationY: translateY } }],
    { useNativeDriver: true }
  );

  const handleGestureEnd = (event: any) => {
    const { translationY, state } = event.nativeEvent;
    if (state === State.END) {
      if (translationY > 100) { // Adjust threshold as needed
        setOpen(false);
      } else {
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
        }).start(); // Reset position if not enough drag distance
      }
    }
  };

  return (
    <>
      <Modal
        transparent
        animationType='slide'
        visible={open}
        onRequestClose={() => setOpen(!open)}
      >
        <StatusBar animated hidden />
        <BlurView
          className='absolute w-full h-full'
          tint='systemMaterialDark'
          intensity={100}
          blurReductionFactor={10}
          style={{ height: '100%', position: 'absolute' }}
        >
          <Pressable
            className='h-full w-full flex justify-end'
            onPress={() => setOpen(false)}
          >
            <PanGestureHandler
              onGestureEvent={handleGesture}
              onHandlerStateChange={handleGestureEnd}
            >
              <Animated.View
                style={{
                  transform: [{ translateY }],
                }}
                className={`bg-white dark:bg-dark-400 p-4 rounded-md space-y-3 w-full rounded-t-xl`}
              >
                <View className='flex flex-row items-center justify-between'>
                  <Text className='text-base font-kufi-medium text-black dark:text-white'>{title}</Text>
                  <TouchableOpacity activeOpacity={0.8} onPress={() => setOpen(false)}>
                    <X size={28} color={"#A3A3A3"} />
                  </TouchableOpacity>
                </View>
                <Text className='text-neutral-400 font-kufi'>{description}</Text>
                <View>{children}</View>
              </Animated.View>
            </PanGestureHandler>
          </Pressable>
        </BlurView>
      </Modal>
    </>
  );
}

export default BottomSheet;
