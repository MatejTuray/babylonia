import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import AppContainer from "./containers/AppContainer";
import { StatusBar } from "react-native";

export default class App extends React.Component {
  componentDidMount() {
    console.log("mount");
  }
  render() {
    return (
      <PaperProvider>
        <View style={{ flex: 1 }}>
          <StatusBar translucent backgroundColor="rgba(0,0,0,0.2)" />
          <AppContainer />
        </View>
      </PaperProvider>
    );
  }
}
