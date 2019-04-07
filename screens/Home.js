import React, { PureComponent } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Picker
} from "react-native";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import { Button, Colors, Divider, TextInput } from "react-native-paper";
import { ImagePicker } from "expo";
import { List } from "react-native-paper";
import { Subheading, Text } from "react-native-paper";
import axios from "axios";

class Home extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;

    return {
      title: "Search",

      headerStyle: {
        backgroundColor: "#4a148c",
        elevation: 0
      },
      headerTintColor: "white",
      headerTitleStyle: {
        color: "white"
      }
    };
  };
  constructor(props) {
    super(props);

    this.state = {
      source: "",
      destination: "",
      dates: []
    };
  }

  resetDates = day => {
    this.setState({ dates: [] });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.form}>
          <TextInput
            label="From"
            value={this.state.text}
            mode="outlined"
            style={{ marginBottom: 10 }}
            onChangeText={text => this.setState({ source: text })}
          />

          <TextInput
            label="To"
            value={this.state.text}
            mode="outlined"
            placeholder={"Try London"}
            onChangeText={text => this.setState({ destination: text })}
          />
          <List.Subheader style={{ marginTop: 10 }}>
            {this.state.dates.length !== 2
              ? this.state.dates.length === 0
                ? "Departure date"
                : "Arrival date"
              : `Departure: ${Object.keys(
                  this.state.dates[0]
                )}         Arrival: ${Object.keys(this.state.dates[1])}`}
          </List.Subheader>

          <CalendarList
            horizontal={true}
            pagingEnabled={false}
            calendarWidth={350}
            showScrollIndicator={true}
            onDayPress={day => {
              dateStr = day.dateString;

              this.state.dates.length !== 2
                ? this.setState({
                    dates: [
                      ...this.state.dates,
                      {
                        [dateStr]: {
                          selected: true,
                          selectedColor: "#4a148c"
                        }
                      }
                    ]
                  })
                : console.log("stuff");
            }}
            markedDates={Object.assign({}, ...this.state.dates)}
          />
          <Button
            icon="search"
            mode="contained"
            color="#4a148c"
            onPress={() => console.log("Pressed search")}
          >
            Search
          </Button>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  upload: {
    marginTop: 10
  },
  form: {
    flex: 1,
    marginTop: 20,
    marginBottom: 60,
    marginLeft: 20,
    marginRight: 20,
    justifyContent: "space-between"
  },
  text: {
    flex: 0.5,
    marginTop: 20
  }
});

export default Home;
