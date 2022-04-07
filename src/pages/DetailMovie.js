/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  Text,
  Button,
  ScrollView,
  Dimensions,
  Animated,
  StyleSheet,
  Image,
  ImageBackground,
  Pressable,
} from 'react-native';
import axios from 'axios';
import {gettmdburlbyid} from '../helpers/url';

const HEADER_EXPANDED_HEIGHT = 300;
const HEADER_COLLAPSED_HEIGHT = 60;

const {width: SCREEN_WIDTH} = Dimensions.get('screen');

export default class DetailMovie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: true,
      scrollY: new Animated.Value(0),
    };
  }
  componentDidUpdate() {
    console.log(this.state.scrollY);
  }
  getData = async () => {
    this.setState({
      loading: true,
    });
    await axios
      .get(gettmdburlbyid(`tv/${this.props?.route.params.itemId}`))
      .then(res => {
        console.log(res.data);
        this.setState({
          loading: false,
          data: res.data,
        });
      });
  };
  componentDidMount() {
    this.getData();
  }
  render() {
    const headerHeight = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_EXPANDED_HEIGHT - HEADER_COLLAPSED_HEIGHT],
      outputRange: [HEADER_EXPANDED_HEIGHT, HEADER_COLLAPSED_HEIGHT],
      extrapolate: 'clamp',
    });
    const headerTitleOpacity = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_EXPANDED_HEIGHT - HEADER_COLLAPSED_HEIGHT],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    });
    const heroTitleOpacity = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_EXPANDED_HEIGHT - HEADER_COLLAPSED_HEIGHT],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });

    let headerTitle = '';

    const {route, navigation} = this.props;
    const {itemId, name} = route.params;
    headerTitle = this.state.data.name;

    if (this.state.loading == false) {
      return (
        <View style={{...styles.container, borderWidth: 1}}>
          <Animated.View style={[styles.header, {height: headerHeight}]}>
            <ImageBackground
              source={{
                uri: `https://image.tmdb.org/t/p/w500${this.state.data?.backdrop_path}`,
              }}
              style={{borderWidth: 1, height: '100%'}}>
              <Animated.Text
                style={{
                  textAlign: 'center',
                  fontSize: 18,
                  color: 'white',
                  marginTop: 28,
                  opacity: headerTitleOpacity,
                  textShadowColor: 'white',
                  textShadowOffset: {width: -1, height: 0},
                  textShadowRadius: 10,
                  // fontWeight: '800',
                }}>
                {headerTitle}
              </Animated.Text>
              <Animated.Text
                style={{
                  textAlign: 'center',
                  fontSize: 32,
                  color: 'white',
                  position: 'absolute',
                  bottom: 16,
                  left: 16,
                  opacity: heroTitleOpacity,
                  textShadowColor: 'black',
                  textShadowOffset: {width: -1, height: 0},
                  textShadowRadius: 10,
                }}>
                {headerTitle}
              </Animated.Text>
            </ImageBackground>
          </Animated.View>
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            onScroll={Animated.event([
              {
                nativeEvent: {
                  contentOffset: {
                    y: this.state.scrollY,
                  },
                },
              },
            ])}
            scrollEventThrottle={16}>
            <Text style={{...styles.content, marginTop: 30}}>
              {this.state.data?.overview}
            </Text>
            <Text style={styles.title}>SEASONS</Text>

            <View style={{flexDirection: 'column'}}>
              {this.state.data?.seasons.map((item, index) => {
                return (
                  <Pressable
                    onPress={() => {
                      navigation.navigate('Details', {
                        itemId: item.id,
                      });
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <View
                        style={{paddingVertical: 10, height: 200, width: 150}}>
                        <Image
                          source={{
                            uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
                          }}
                          style={{
                            height: '100%',
                            width: '100%',
                            resizeMode: 'cover',
                            borderRadius: 10,
                          }}></Image>
                      </View>
                      <View
                        style={{
                          top: 10,
                          flexDirection: 'column',
                          justifyContent: 'flex-start',
                          alignContent: 'flex-start',
                          width: '100%',
                          paddingLeft: 10,
                        }}>
                        <Text
                          style={{
                            fontSize: 20,
                            fontWeight: '500',
                            color: 'black',
                          }}>
                          {item?.name}
                        </Text>
                        <Text
                          style={{
                            fontSize: 20,
                            fontWeight: '500',
                            color: 'black',
                            top: 10,
                          }}>
                          {item?.air_date == null
                            ? '-'
                            : (item?.air_date).split('-')[0]}{' '}
                          | {item?.episode_count} Episode
                        </Text>
                        <Text
                          style={{
                            fontSize: 15,
                            fontWeight: '200',
                            color: 'black',
                            top: 10,
                            width: '100%',
                            paddingRight: 150,
                          }}>
                          {item?.overview}
                        </Text>
                      </View>
                    </View>
                  </Pressable>
                );
              })}
            </View>
          </ScrollView>
        </View>
      );
    } else {
      return <Text>LOADING...</Text>;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eaeaea',
  },
  scrollContainer: {
    padding: 16,
    paddingTop: HEADER_EXPANDED_HEIGHT,
  },
  header: {
    backgroundColor: 'transparent',
    position: 'absolute',
    width: SCREEN_WIDTH,
    top: 0,
    left: 0,
    zIndex: 9999,
  },
  title: {
    marginVertical: 16,
    color: 'black',
    fontWeight: 'bold',
    fontSize: 24,
  },
});
