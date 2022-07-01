import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Button,
  TouchableOpacity,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, useNavigation, StackActions } from "@react-navigation/native";

import BlockRGB from "./components/BlockRGB";

function HomeScreen({navigation}) {
  const [colorArray, setColorArray] = useState([]);

  function addColor() {
    setColorArray([
      ...colorArray,
      {
        red: Math.floor(Math.random() * 256),
        green: Math.floor(Math.random() * 256),
        blue: Math.floor(Math.random() * 256),
        id: `${colorArray.length}`,
      },
    ]);
  }

  function renderItem({ item }) {
    return (
      <TouchableOpacity onPress={() => navigation.navigate("Colour Details", item)}>
        <BlockRGB red={item.red} green={item.green} blue={item.blue} />
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={addColor}>
        <Text style={{ color: "red" }}>Add Colour</Text>
      </TouchableOpacity>
      <FlatList style={styles.list} data={colorArray} renderItem={renderItem} />
    </View>
  );
}

function ColourScreen({ route }) {
  const { red, green, blue } = route.params;

  return (
    <View style={{backgroundColor: `rgb(${red}, ${green}, ${blue})`, flex: 1, justifyContent: 'center', alignItems: 'center',}}>
      <Text>Red: {red}</Text>
      <Text>Green: {green}</Text>
      <Text>Blue: {blue}</Text>
    </View>
  );
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name={"Colour List"} component={HomeScreen} />
        <Stack.Screen name={"Colour Details"} component={ColourScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  list: {
    padding: 10,
    width: "100%",
  },
  button: {
    height: 40,
    justifyContent: "center",
  },
});
