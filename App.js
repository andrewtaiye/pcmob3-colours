import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
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

// ====================================================================================================================
// Home Screen Code
// ====================================================================================================================

function HomeScreen({navigation}) {
  useEffect(() => {
    navigation.setOptions({
      // headerRight: () => <Button onPress={addColor} title={"Add Color"}/>,
      headerRight: () =>
        <TouchableOpacity style={styles.headerButton} onPress={addColor}>
          <Text style={{ color: "red" }}>Add Colour</Text>
        </TouchableOpacity>,
    });
  });

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

  function resetColor() {
    setColorArray([]);
  }

  const numColumns = 4;

  function renderItem({ item }) {
    return (
      <TouchableOpacity onPress={() => navigation.navigate("Colour Details", item)} style={{aspectRatio: 1, flex: 1 / numColumns,}}>
        <BlockRGB red={item.red} green={item.green} blue={item.blue}/>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={resetColor}>
        <Text style={{ color: "#CACACA" }}>Reset Colour</Text>
      </TouchableOpacity>
      <FlatList style={styles.list} data={colorArray} renderItem={renderItem} numColumns={numColumns}/>
    </View>
  );
}

// ====================================================================================================================
// Colour Screen Code
// ====================================================================================================================

function ColourScreen({ route }) {
  const { red, green, blue } = route.params;

  const colorValue = red + green + blue;
  let fontColor;

  if (colorValue < 255) {
    fontColor = "white";
  } else {
    fontColor = "black";
  }

  return (
    <View style={{backgroundColor: `rgb(${red}, ${green}, ${blue})`, flex: 1, justifyContent: 'center', alignItems: 'center',}}>
      <Text style={[styles.colorDetailsText, {color: fontColor}]}>Red: {red}</Text>
      <Text style={[styles.colorDetailsText, {color: fontColor}]}>Green: {green}</Text>
      <Text style={[styles.colorDetailsText, {color: fontColor}]}>Blue: {blue}</Text>
    </View>
  );
}

// ====================================================================================================================
// Main App Function
// ====================================================================================================================

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

// ====================================================================================================================
// Styles
// ====================================================================================================================

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
    borderWidth: 2,
    borderRadius: 15,
    borderColor: '#CACACA',
    marginTop: 10,
    padding: 10,
    backgroundColor: 'grey',
  },
  headerButton: {
    height: 40,
    marginRight: 20,
    justifyContent: 'center',
  },
  colorDetailsText: {
    fontSize: 24,
    marginBottom: 10,
  }
});
