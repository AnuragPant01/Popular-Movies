import React, { Component } from "react";
import {
  SafeAreaView,
  BackHandler,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  ImageBackground,
  TextInput,
  Alert,
  Image,
} from "react-native";
import NetInfo from "@react-native-community/netinfo";
import YoutubePlayer from "react-native-youtube-iframe";
import Toast from "react-native-toast-message";
import { AntDesign } from "@expo/vector-icons";
export default class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      remember: false,
      isConnected: false,
      netSubscribe: null,
      backHandler: null,
      api_key: "4e44d9029b1270a757cddc766a1bcb63",
      movie_key: "nokey",
      feedbackData: "nothing",
      disabled: true,
      author: "not user",
      rating: "not rating given",
      content: "empty",
    };
  }

  componentDidMount() {
    this.connectOnMount();
    this.state.backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackPress
    );
    this.getTrailer();
    this.getReview();
    // console.log(this.props.route.params.movieId);
  }

  handleBackPress = () => {
    Alert.alert(
      "",
      "Do you really want to quit the application?",
      [
        {
          text: "No",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "Yes", onPress: () => BackHandler.exitApp() },
      ],
      { cancelable: false }
    );
    return true;
  };

  connectOnMount() {
    this.state.netSubscribe = NetInfo.addEventListener(
      this.handleConnectivityChange
    );
    NetInfo.fetch().then(this.handleConnectivityChange);
  }

  connectOnUnmount = () => {
    this.state.backHandler.remove();
    this.state.netSubscribe();
  };

  handleConnectivityChange = (state) => {
    this.setState({
      isConnected: state.isConnected,
    });
  };

  async getTrailer() {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${this.props.route.params.movieId}/videos?api_key=${this.state.api_key}&language=en-US`
    );
    const { results } = await data.json();
    this.setState({ movie_key: results[0].key });
  }

  async getReview() {
    try {
      const data = await fetch(
        `https://api.themoviedb.org/3/movie/${this.props.route.params.movieId}/reviews?api_key=${this.state.api_key}&language=en-US&page=1`
      );
      const { results } = await data.json();
      if (results[0]) {
        this.setState({ author: results[0].author });
        this.setState({ rating: results[0].author_details.rating });
        this.setState({ content: results[0].content.slice(0, 1000) });
      }
    } catch (err) {
      console.log(err);
    }
  }

  submit() {
    if (this.state.feedbackData) {
      Toast.show({
        type: "success",
        position: "bottom",
        text1: "Thanks for your valueable feedback 🙏",
        visibilityTime: 4000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
        onPress: () => {
          Toast.hide();
        },
      });
    } else {
      this.setState({ disabled: true });
    }
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ImageBackground
          source={{ uri: this.props.route.params.imageUri }}
          style={{
            flex: 1,
            resizeMode: "cover",
            justifyContent: "center",
          }}
          blurRadius={10}
        >
          <View>
            <Text style={styles.headerText}>
              {" "}
              {this.props.route.params.title}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.demoButton}
            onPress={() => {
              this.props.navigation.navigate("Home");
            }}
          >
            <Text style={styles.demoButtonText}>Home Screen</Text>
          </TouchableOpacity>
          <ScrollView>
            <View
              name="trailer"
              style={{ marginLeft: 10, marginRight: 10, marginTop: 20 }}
            >
              <YoutubePlayer
                height={250}
                width={"auto"}
                // play={true}
                videoId={String(this.state.movie_key)}
              />
              <Text
                style={{
                  color: "white",
                  fontWeight: "bold",
                  fontSize: 20,
                }}
              >
                Description :
              </Text>
              <Text
                style={{ color: "white", margin: 10, textAlign: "justify" }}
              >
                {this.props.route.params.overview}
              </Text>
            </View>
            <View
              style={{
                borderBottomColor: "white",
                borderBottomWidth: 1,
              }}
            />
            <View name="feedback" style={{ marginTop: 20 }}>
              <Text
                style={{
                  color: "white",
                  fontWeight: "bold",
                  fontSize: 15,
                  marginLeft: 10,
                }}
              >
                Give your valueable Feedback:
              </Text>
              <TextInput
                style={{
                  marginTop: 10,
                  marginLeft: 10,
                  height: 100,
                  width: 380,
                  color: "#ffffff",
                  fontWeight: "bold",
                  paddingLeft: 5,
                  borderWidth: 1,
                  borderColor: "#ffffff",
                }}
                multiline={true}
                numberOfLines={10}
                placeholder="....."
                placeholderTextColor="#b2b1b5"
                autoCorrect={false}
                onChangeText={(feedbackData) => {
                  this.setState({ feedbackData, disabled: false });
                }}
              />
              <TouchableOpacity
                disabled={this.state.disabled}
                style={styles.submitButton}
                onPress={() => {
                  this.submit();
                }}
              >
                <Text style={styles.demoButtonText}>Submit</Text>
              </TouchableOpacity>
              <View name="user-reviews">
                <Text
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    fontSize: 15,
                    marginLeft: 10,
                  }}
                >
                  Reviews:
                </Text>
                <View name="userName" style={{ flexDirection: "row" }}>
                  <Text
                    style={{
                      color: "white",
                      fontWeight: "bold",
                      fontSize: 15,
                      marginLeft: 10,
                    }}
                  >
                    User :
                  </Text>
                  <Text
                    style={{
                      color: "white",
                      fontWeight: "bold",
                      fontSize: 15,
                      marginLeft: 10,
                    }}
                  >
                    {this.state?.author}
                  </Text>
                </View>
                <View name="rating" style={{ flexDirection: "row" }}>
                  <Text
                    style={{
                      color: "white",
                      fontWeight: "bold",
                      fontSize: 15,
                      marginLeft: 10,
                    }}
                  >
                    Rating given
                  </Text>
                  <Text
                    style={{
                      color: "white",
                      fontWeight: "bold",
                      fontSize: 15,
                      marginLeft: 10,
                    }}
                  >
                    {this.state?.rating}
                  </Text>
                  <AntDesign name="star" size={24} color="yellow" />
                </View>
                <Text
                  style={{ color: "white", margin: 10, textAlign: "justify" }}
                >
                  {this.state?.content}...
                </Text>
              </View>
            </View>
          </ScrollView>
          <View name="footer" style={{ bottom: 0 }}>
            <Text
              style={{
                color: "#BDBDBD",
                textAlign: "center",
              }}
            >
              Copyright © 2021 | Made by Anurag Pant
            </Text>
          </View>
        </ImageBackground>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  headerText: {
    alignSelf: "center",
    color: "white",
    fontSize: 25,
    fontWeight: "bold",
    marginTop: 40,
    marginLeft: 10,
  },
  demoButton: {
    borderWidth: 0,
    height: 40,
    width: 150,
    borderRadius: 20,
    padding: 10,
    marginTop: 15,
    backgroundColor: "#40C057",
    alignSelf: "center",
  },
  demoButtonText: {
    alignSelf: "center",
    color: "white",
  },
  submitButton: {
    borderWidth: 0,
    height: 40,
    width: 150,
    borderRadius: 20,
    padding: 10,
    marginTop: 15,
    backgroundColor: "#1d76a3",
    alignSelf: "flex-end",
    marginRight: 10,
    marginBottom: 10,
  },
});
