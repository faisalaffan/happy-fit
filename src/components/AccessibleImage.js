import React, {Component} from 'react';
import {Text, ImageBackground} from 'react-native';
export default class AccessibleImage extends Component {
  state = {
    error: false,
  };

  _onImageLoadError = event => {
    console.warn(event.nativeEvent.error);
    this.setState({error: true});
  };

  render() {
    const {source, alt, style} = this.props;
    const {error} = this.state;

    if (error) {
      return <Text>{alt}</Text>;
    }

    return (
      <ImageBackground
        accessible
        accessibilityLabel={alt}
        source={source}
        style={style}
        onError={this._onImageLoadError}
      />
    );
  }
}
