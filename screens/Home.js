import React, { PureComponent } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Picker
} from "react-native";
import { Camera, Permissions } from "expo";
import { Button, Colors, Divider } from "react-native-paper";
import { ImagePicker } from "expo";
import ImageLoad from "react-native-image-placeholder";
import placeholder from "../assets/empty-image.png";
import { Subheading, Text } from "react-native-paper";
import axios from "axios";
import languages from "../languages";
import ocrArray from "../ocrLang";
class Home extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;

    return {
      title: "Home",

      headerStyle: {
        backgroundColor: "red",
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
    this.takeAPhoto = this.takeAPhoto.bind(this);
    this.handleOCR = this.handleOCR.bind(this);
    this.translateText = this.translateText.bind(this);
    this.openGallery = this.openGallery.bind(this);
    this.state = {
      imageUri: placeholder,
      lang: "English",
      value: "en"
    };
  }
  async componentDidMount() {
    console.log(ocrArray);
    const { CAMERA, CAMERA_ROLL } = Permissions;
    const permissions = {
      [CAMERA]: await Permissions.askAsync(CAMERA),
      [CAMERA_ROLL]: await Permissions.askAsync(CAMERA_ROLL)
    };
  }
  handleOCR() {
    if (this.state.imageUri.uri) {
      let form = new FormData();
      const base64 = "data:image/jpg;base64," + this.state.base;
      form.append("base64Image", base64);
      form.append("isOverlayRequired", false);
      form.append("language", "eng");
      console.log("sending");
      axios
        .request({
          url: "https://api.ocr.space/parse/image",
          method: "post",
          data: form,
          headers: {
            "X-Requested-With": "XMLHttpRequest",
            "Content-Type": "application/x-www-form-urlencoded",
            apikey: "3d8779aa0188957"
          }
        })
        .then(res => {
          let parsed = JSON.parse(res.request._response);

          this.setState({
            parsedText: parsed.ParsedResults[0].ParsedText
          });
        })
        .then(res => {
          this.translateText();
        });
    }
  }
  translateText() {
    let translation = languages.find(lang => lang.text === this.state.lang);
    console.log(translation.value);
    if (this.state.parsedText) {
      axios
        .get(
          "https://translate.googleapis.com/translate_a/single?client=gtx&sl=" +
            "auto" +
            "&tl=" +
            translation.value +
            "&dt=t&q=" +
            this.state.parsedText,
          true
        )
        .then(res => {
          console.log(JSON.stringify(res.data[0][0][0], null, 4));
          this.setState({
            translatedText: res.data[0][0][0]
          });
        });
    }
  }
  async takeAPhoto() {
    const options = {
      allowsEditing: true,
      base64: true,
      quality: 0.9
    };
    const status = await ImagePicker.launchCameraAsync(options);
    if (status.cancelled === false) {
      this.setState({
        imageUri: {
          uri: status.uri
        },
        base: status.base64,
        width: status.width,
        height: status.height
      });
    }
  }
  async openGallery() {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      base64: true,
      quality: 0.9
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({
        imageUri: { uri: result.uri },
        base: result.base64,
        width: result.width,
        height: result.height
      });
    }
  }

  render() {
    let options = Array.from(languages.map(lang => lang.text));
    return (
      <View style={styles.container}>
        <View style={styles.upload}>
          <Button
            icon="add-a-photo"
            color={Colors.red500}
            size={20}
            onPress={() => this.takeAPhoto()}
          >
            Take a picture
          </Button>
        </View>
        <View style={styles.upload}>
          <Button
            icon="cloud-upload"
            color={Colors.red500}
            size={20}
            onPress={() => this.openGallery()}
          >
            Upload from gallery
          </Button>
        </View>
        <View style={styles.image}>
          <ImageLoad
            style={{ width: 200, height: 150 }}
            loadingStyle={{ size: "large", color: "blue" }}
            source={this.state.imageUri}
          />
        </View>
        <ScrollView style={styles.text}>
          <Subheading style={{ marginLeft: 15, marginTop: 35 }}>
            Original Text
          </Subheading>
          <Text style={{ marginLeft: 15, marginTop: 15 }}>
            {this.state.parsedText}
          </Text>
        </ScrollView>
        <ScrollView style={styles.text}>
          <View style={{ flex: 1, flexDirection: "row" }}>
            <Subheading style={{ marginLeft: 15, marginTop: 12.5 }}>
              Translation language:
            </Subheading>
            <Picker
              selectedValue={this.state.lang}
              style={{ height: 50, width: 200 }}
              onValueChange={value => {
                this.setState({
                  lang: value
                });
              }}
            >
              {languages.map(lang => (
                <Picker.Item
                  key={languages.indexOf(lang)}
                  label={lang.text}
                  value={lang.text}
                />
              ))}
            </Picker>
          </View>
          <Text style={{ marginLeft: 15, marginTop: 5 }}>
            {this.state.translatedText}
          </Text>
        </ScrollView>

        <Divider />
        <Button
          icon="translate"
          color={Colors.red500}
          size={20}
          onPress={() => this.handleOCR()}
        >
          Read & translate!
        </Button>
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
  image: {
    flex: 1,
    marginTop: 25,
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    flex: 0.5,
    marginTop: 20
  }
});

export default Home;
