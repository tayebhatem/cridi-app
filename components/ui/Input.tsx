import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Feather } from "@expo/vector-icons";

const Input = ({
  title,
  placeholder,
  type,
  value,
  error,
  onChange,
}: {
  title: string;
  placeholder: string;
  type: "text" | "email" | "password" | "number";
  value: string | undefined;
  error: string;
  onChange: (text: string) => void;
}) => {
  const [show, setShow] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View className="">
      <Text
        className={`font-kufi-medium leading-9 text-black dark:text-white ${
          error ? "text-red-500" : ""
        }`}
      >
        {title}
      </Text>
      <View
        className={`w-full flex flex-row items-center bg-neutral-100 dark:bg-dark-300 border rounded-md p-3 ${
          error
            ? "border-red-500"
            : isFocused
            ? "border-primary-500"
            : "border-neutral-200"
        }`}
      >
        <View className="flex flex-row items-center flex-1 space-x-2">
          <View className="w-8">
            <Feather
              name={
                type === "text" ? "user" : type === "password" ? "lock" : "mail"
              }
              size={24}
              color={error ? "#ef4444" : "#A3A3A3"}
            />
          </View>
          <TextInput
            className="flex-1 text-black dark:text-white font-kufi"
            secureTextEntry={!show && type === "password"}
            placeholder={placeholder}
            defaultValue={value}
            onChangeText={(text) => onChange(text)}
            keyboardType={type === "number" ? "numeric" : "default"}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
        </View>
        {type === "password" && (
          <TouchableOpacity activeOpacity={0.8} onPress={() => setShow(!show)}>
            {!show ? (
              <Feather name="eye" color={"#A3A3A3"} size={24} />
            ) : (
              <Feather name="eye-off" color={"#A3A3A3"} size={24} />
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Input;
