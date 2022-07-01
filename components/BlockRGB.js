import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function BlockRGB(props) {
  return (
    <View
      style={{
        backgroundColor: `rgb(${props.red}, ${props.green}, ${props.blue})`,
        padding: 10,
        width: "100%",
        alignItems: "center",
      }}
    >
      <Text>Red: {props.red}</Text>
      <Text>Green: {props.green}</Text>
      <Text>Blue: {props.blue}</Text>
    </View>
  );
}
