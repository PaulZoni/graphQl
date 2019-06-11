/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */


import React, {Component, PureComponent,} from 'react';
import {StyleSheet, Text, View, FlatList, NativeModules, Platform, DeviceEventEmitter} from 'react-native';
import NetworkManager from "./src/netwok/NetworkManager";
import QueryPost from "./src/netwok/query/QueryPost";


export default class App extends Component<Props> {


    constructor(props) {
        super(props);
        this.state = {
            allPosts: []
        };

    }

    componentDidMount(): void {
        this._requestPost();
        if (Platform.OS === 'android') {
             this.nativeEventListener = DeviceEventEmitter.addListener('onPause', function(e: Event) {
                NativeModules.ToastNativeAndroid.show('toast', 1);
            });
            NativeModules.ManagerModule.addedData(2, (answer) => alert(answer));
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    keyExtractor={(item, index) => item.id}
                    data={this.state.allPosts}
                    renderItem={(item) =>
                        <Text style={{padding: 10}}>
                            {item.item.title}
                        </Text>
                    }
                />
            </View>
        );
    }


    _requestPost() {
        let manager: NetworkManager = new NetworkManager('https://api.graph.cool/simple/v1/ciyz901en4j590185wkmexyex');
        manager.executeQuery(new QueryPost(2),
            (result) => this.setState({allPosts: result.data.allPosts}),
            (error) =>  console.log(JSON.stringify(error))
        );
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
