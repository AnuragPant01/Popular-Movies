import React, { Component } from "react";
import {
  BackHandler,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Alert,
} from "react-native";
import NetInfo from "@react-native-community/netinfo";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import Toast from "react-native-toast-message";

export default class Cards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      remember: false,
      isConnected: false,
      netSubscribe: null,
      backHandler: null,
      api_key: "4e44d9029b1270a757cddc766a1bcb63",
      images: [],
      title: [],
      rating: [],
      releaseDate: [],
      overview: [],
      movieId: [],
    };
  }

  componentDidMount() {
    this.connectOnMount();
    this.state.backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackPress
    );
    this.getMovies();
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

  async getMovies() {
    try {
      const data = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${this.state.api_key}&language=en-US&page=1`
      );
      const { results } = await data.json();
      const images = [];
      const title = [];
      const rating = [];
      const releaseDate = [];
      const overview = [];
      const movieId = [];
      results.map((i) => {
        images.push(i.poster_path);
        title.push(i.title);
        rating.push(i.vote_average);
        releaseDate.push(i.release_date);
        overview.push(i.overview);
        movieId.push(i.id);
      });
      this.setState({ images });
      this.setState({ title });
      this.setState({ rating });
      this.setState({ releaseDate });
      this.setState({ overview });
      this.setState({ movieId });
    } catch (err) {
      console.log(err);
    }
  }

  showToast() {
    Toast.show({
      type: "success",
      position: "bottom",
      text1: "Added to bookmark",
      visibilityTime: 4000,
      autoHide: true,
      topOffset: 30,
      bottomOffset: 40,
      onPress: () => {
        Toast.hide();
      },
    });
  }
  render() {
    const index = this.props.index;
    return (
      <View style={styles.card}>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 15,
            marginLeft: 15,
            marginTop: 15,
            color: "white",
          }}
        >
          {this.state.title[index]}
        </Text>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 2.5 }}>
            <Text style={{ paddingTop: 5, paddingLeft: 15, color: "white" }}>
              Release : {this.state.releaseDate[index]}
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              flex: 1,
            }}
          >
            <AntDesign name="star" size={24} color="yellow" />
            <Text style={{ fontSize: 15, color: "white" }}>
              {this.state.rating[index]}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              Toast.show({
                type: "success",
                position: "bottom",
                text1: "Added to bookmark",
                visibilityTime: 4000,
                autoHide: true,
                topOffset: 30,
                bottomOffset: 40,
                onPress: () => {
                  Toast.hide();
                },
              });
            }}
          >
            <Feather
              name="bookmark"
              style={{ paddingRight: 15 }}
              size={24}
              color="white"
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate("Details", {
              overview: this.state.overview[index],
              title: this.state.title[index],
              movieId: this.state.movieId[index],
              imageUri: `https://image.tmdb.org/t/p/original/${this.state.images[index]}`,
            });
          }}
        >
          <Image
            style={{
              marginTop: 30,
              width: 300,
              height: 400,
              alignSelf: "center",
            }}
            source={{
              uri: `https://image.tmdb.org/t/p/original/${this.state.images[index]}`,
            }}
          />
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  card: {
    width: 350,
    height: 520,
    marginTop: 30,
    borderColor: "gray",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    marginBottom: 10,
    elevation: 2,
  },
});
