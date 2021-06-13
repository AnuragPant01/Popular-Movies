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
  Image,
  Alert,
  Dimensions,
  ImageBackground,
} from "react-native";
import NetInfo from "@react-native-community/netinfo";
import Cards from "../cards";
const { width } = Dimensions.get("window");

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      remember: false,
      isConnected: false,
      netSubscribe: null,
      backHandler: null,
    };
  }

  componentDidMount() {
    this.connectOnMount();
    this.state.backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackPress
    );
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

  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
        <View name="header"></View>
        <View>
          <Text style={styles.headerText}> Popular Movies</Text>
        </View>
        <ScrollView
          name="fullscreen scroll"
          showsVerticalScrollIndicator={false}
        >
          <View style={{ alignItems: "center", marginTop: 30 }}>
            <ScrollView
              name="campus combined kpi"
              ref={(scrollView) => {
                this.scrollView = scrollView;
              }}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              decelerationRate={0}
              snapToInterval={width - 60}
              snapToAlignment={"center"}
              contentInset={{
                top: 0,
                left: 30,
                bottom: 0,
                right: 30,
              }}
            >
              <Cards index="0" {...this.props} />
              <Cards index="1" {...this.props} />
              <Cards index="2" {...this.props} />
              <Cards index="3" {...this.props} />
              <Cards index="4" {...this.props} />
              <Cards index="5" {...this.props} />
              <Cards index="6" {...this.props} />
              <Cards index="7" {...this.props} />
              <Cards index="8" {...this.props} />
              <Cards index="9" {...this.props} />
              <Cards index="10" {...this.props} />
              <Cards index="11" {...this.props} />
              <Cards index="12" {...this.props} />
              <Cards index="13" {...this.props} />
              <Cards index="14" {...this.props} />
              <Cards index="15" {...this.props} />
              <Cards index="16" {...this.props} />
              <Cards index="17" {...this.props} />
              <Cards index="18" {...this.props} />
              <Cards index="19" {...this.props} />
            </ScrollView>
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
  },
});
