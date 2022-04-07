/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  Text,
  Button,
  ScrollView,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import {SearchBar} from '@rneui/themed';
import CardCustom from '../components/Card';
import {tmdburl} from '../helpers/url';
import {SafeAreaView} from 'react-native-safe-area-context';

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: false,
      offset: 1,
      isListEnd: false,
      search: '',
    };
  }
  componentDidMount() {
    const getData = async () => {
      console.log(tmdburl.toString());
      let data = await axios.get(tmdburl('tv/popular'));
      this.setState({
        data: data.data.results,
        loading: false,
      });
    };
    getData();
  }
  render() {
    const {routes, navigation} = this.props;
    const ItemView = ({item}) => {
      return (
        <CardCustom
          item={item}
          key={'item' + item.id}
          navigation={navigation}
        />
      );
    };
    const ItemSeparatorView = () => {
      return (
        // Flat List Item Separator
        <View
          style={{
            height: 0.5,
            width: '100%',
            backgroundColor: '#C8C8C8',
          }}
        />
      );
    };
    const renderFooter = () => {
      return (
        // Footer View with Loader
        <View style={styles.footer}>
          {this.state.loading ? (
            <ActivityIndicator color="black" style={{margin: 15}} />
          ) : null}
        </View>
      );
    };
    const getData = async () => {
      if (!this.state.loading && !this.state.isListEnd) {
        this.setState({
          loading: true,
        });
        await axios
          .get(tmdburl('tv/popular', this.state.offset))
          .then(res => {
            if (res.data.results.length > 0) {
              this.setState({
                offset: this.state.offset + 1,
                data: [...this.state.data, ...res.data.results],
                loading: false,
              });
            } else {
              this.setState({
                listEnd: true,
                loading: false,
              });
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    };
    let filteredData = () => {
      if (this.state.search === '') {
        return this.state.data;
      } else {
        return this.state.data.filter(item => {
          return item.name
            .toLowerCase()
            .includes(this.state.search.toLowerCase());
        });
      }
    };
    return (
      <SafeAreaView>
        <View>
          <View
            style={{
              alignItems: 'center',
            }}>
            <Text style={{paddingVertical: 10}}>TV Show</Text>
          </View>
          <Text>{JSON.stringify(filteredData)}</Text>
          <SearchBar
            placeholder="Type Here..."
            onChangeText={item => {
              this.setState({search: item});
            }}
            value={this.state.search}
            lightTheme={true}
            round={true}
            theme
            onSubmitEditing={item => {
              alert(`Search Result: ${filteredData().length} Record Found!`);
            }}
          />
          <View style={{paddingBottom: 100}}>
            <FlatList
              data={filteredData()}
              keyExtractor={(item, index) => index.toString()}
              ItemSeparatorComponent={ItemSeparatorView}
              renderItem={ItemView}
              ListFooterComponent={renderFooter}
              onEndReached={getData}
              onEndReachedThreshold={0.5}
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  footer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
