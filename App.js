/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component, PureComponent} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import NetworkManager from "./src/netwok/NetworkManager";
import QueryPost from "./src/netwok/query/QueryPost";


export default class App extends Component<Props> {


  componentDidMount(): void {
      this._requestPost();
  }

  render() {
    return (
        <View style={styles.container}>

        </View>
    );
  }


    _requestPost() {
        let manager: NetworkManager = new NetworkManager('https://api.graph.cool/simple/v1/ciyz901en4j590185wkmexyex');
        manager.executeQuery(new QueryPost(2),
            (result) => {
          alert(JSON.stringify(result))
            }, (error) => {
          alert(JSON.stringify(error))
        });
    }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },

});
