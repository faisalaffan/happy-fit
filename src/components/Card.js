import React, {Component} from 'react';
import {View, StyleSheet, Pressable, ImageBackground} from 'react-native';
import {Text, Card, Button, Icon, Chip} from '@rneui/themed';
import AccessibleImage from './AccessibleImage';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';

class CardCustom extends Component {
  constructor(props) {
    super(props);
    console.log('constructor');
    this.state = {
      name: 'faisal affan',
      isShow: true,
      error: false,
      alt: '',
    };
  }

  componentDidMount() {
    // console.log('componentDidMount');
  }

  componentDidUpdate() {
    // console.log('componentDidUpdate');
  }

  validateUrl = async url => {
    await axios
      .get(url)
      .then(() => {
        return url;
      })
      .catch(() => {
        return 'https://cdn-2.tstatic.net/jateng/foto/bank/images/regional-cdeo-bank-mandiri.jpg';
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <Pressable
          onPress={() => {
            // this.props.navigation.navigate('Details', {
            //   itemId: this.props.item.id,
            // });
            // navigation.navigate('details', {
            //   item: this.props.item,
            // });
          }}
          android_ripple={{color: 'black', borderless: false}}>
          <View style={styles.cardItem}>
            <ImageBackground
              accessible
              source={{
                uri: `https://image.tmdb.org/t/p/w500/${this.props.item?.backdrop_path}`,
              }}
              style={styles.cardImage}
              onError={this._onImageLoadError}>
              <View style={{padding: 5}}>
                <Text
                  style={{
                    color: 'white',
                    shadowColor: 'white',
                    shadowOpacity: 100,
                    shadowRadius: 10,
                    fontWeight: 'bold',
                    fontSize: 20,
                    bottom: 0,
                    alignSelf: 'flex-start',
                    marginTop: 60,
                    marginLeft: 10,
                  }}>
                  {this.props.item?.name}
                </Text>
                <Text
                  style={{
                    color: 'white',
                    shadowColor: 'white',
                    shadowOpacity: 100,
                    shadowRadius: 10,
                    fontWeight: '500',
                    fontSize: 15,
                    bottom: 0,
                    alignSelf: 'flex-start',
                    marginLeft: 10,
                  }}>
                  {this.props.item?.first_air_date}
                </Text>
                <View
                  style={{
                    bottom: 10,
                    alignSelf: 'flex-end',
                    right: 10,
                    position: 'absolute',
                    padding: 5,
                    borderRadius: 5,
                    backgroundColor:
                      this.props.item?.vote_average > 7 ? 'teal' : 'maroon',
                  }}>
                  <Text
                    style={{
                      color: 'white',
                      shadowColor: 'white',
                      shadowOpacity: 100,
                      shadowRadius: 10,
                      fontWeight: '500',
                      fontSize: 15,
                    }}>
                    {this.props.item?.vote_average.toFixed(1)}
                  </Text>
                </View>
              </View>
            </ImageBackground>
          </View>
        </Pressable>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 150,
    overflow: 'hidden',
    padding: 10,
    // position: 'absolute',
    // bottom: 250,
    // borderRadius: 50,
    // alignSelf: 'center',
  },
  cardItem: {
    // borderWidth: 1,
    // borderColor: 'red',
    height: '100%',
    borderRadius: 10,
    overflow: 'hidden',
  },
  cardImage: {
    height: '100%',
    resizeMode: 'cover',
  },
  fonts: {
    marginBottom: 8,
  },
  user: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  image: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  name: {
    fontSize: 16,
    marginTop: 5,
  },
});

export default CardCustom;
