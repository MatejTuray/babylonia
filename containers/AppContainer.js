import React, { Component } from "react";
import Home from "../screens/Home";
import { createStackNavigator, createAppContainer } from "react-navigation";
import { connect } from "react-redux";

const RootStack = createStackNavigator({
  Home: { screen: Home, path: "home/", navigationOptions: {} },
  initialRouteName: "Home"
});

const Wrapper = createAppContainer(RootStack);

const AppContainer = props => {
  return <Wrapper {...props} />;
};

export default AppContainer;
