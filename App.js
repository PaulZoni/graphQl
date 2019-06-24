/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View, NativeModules,
    Platform, DeviceEventEmitter, Animated, TouchableOpacity, Easing,
    requireNativeComponent, NativeEventEmitter,} from 'react-native';
import NetworkManager from "./src/netwok/NetworkManager";
import QueryPost from "./src/netwok/query/QueryPost";
import MapView from "./src/view/MapView";
import CollapsingToldBar from "./src/view/CollapsingToldBar";
var AndroidButton = requireNativeComponent('RCTButton');


export default class App extends Component<Props> {

    toldBar: CollapsingToldBar;

    constructor(props) {
        super(props);
        this.state = {
            allPosts: [],
            fadeAnim: new Animated.Value(1),
            spinnerAnim: new Animated.Value(0),
            springAnim: new Animated.Value(0),
            springMovingMargin: new Animated.Value(0),

        };
        this.buttonClick = false;
        this.spinner = this.state.spinnerAnim.interpolate({
            inputRange:[0,1],
            outputRange: ['0deg', '720deg'],
        });

        this.movingMargin = this.state.springMovingMargin.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [0, 300, 0]
        });

        this._iosNativeEvent();
    }

    componentDidMount(): void {
        this._requestPost();
        this._androidNativeEvent();
        this._iosModule();
    }


    _iosNativeEvent() {
        if (Platform.OS === 'ios') {
            this.eventManager = new NativeEventEmitter(NativeModules.EventManager);
            this.eventManager.addListener('sayHello', (event) => {
                alert(JSON.stringify(event));
            })
        }
    }

    _androidNativeEvent() {
        if (Platform.OS === 'android') {
            this.nativeEventListener = DeviceEventEmitter.addListener('onPause', function(e: Event) {
                NativeModules.ToastNativeAndroid.show('toast', 1);
            });
            NativeModules.ManagerModule.addedData(2, (answer) => alert(answer));
        }

    }

    _iosModule() {
        if (Platform.OS === 'ios') {
            NativeModules.CalendarManager.addEvent('user', '4');
            NativeModules.CalendarManager.findEvent((error, events) => {})
        }
    }

    _buttonUp() {
        Animated.parallel([
            Animated.timing(this.state.fadeAnim, {
                toValue: 1,
                duration: 2000,
                easing: Easing.back()
            }),

            Animated.timing(this.state.spinnerAnim, {
                toValue: 0,
                duration: 2000,
                easing: Easing.linear
            }),

            Animated.spring(this.state.springAnim, {
                toValue: 0,
            })

        ]).start();

    }

    _buttonDown() {
        Animated.parallel([
            Animated.timing(this.state.fadeAnim, {
                toValue: 0.2,
                duration: 2000,
                easing: Easing.back()
            }),
            Animated.timing(this.state.spinnerAnim, {
                toValue: 1,
                duration: 2000,
                easing: Easing.linear
            }),

            Animated.spring(this.state.springAnim, {
                toValue: 1,
                friction: 1
            }),

            Animated.spring(this.state.springMovingMargin, {
                toValue: 1,
                duration: 2000,
                easing: Easing.linear
            })


        ]).start();

    }

    _spinerView() {
        return(
          <Animated.View
            style={{
                transform: [
                        {rotate: this.spinner}, {scale: this.state.springAnim},

                    ],
                width: 50, height: 50, backgroundColor: '#883997', marginBottom: this.movingMargin
            }}
          />
        );
    }

    _animatedView() {
        return (
            <View>
                {this._spinerView()}
                <TouchableOpacity
                    onPress={() => {
                        if (this.buttonClick) {
                            this._buttonUp();
                            this.buttonClick = false;
                        } else {
                            this._buttonDown();
                            this.buttonClick = true;
                        }
                    }}
                    style={{width: 200, height: 50, marginBottom: 20}}>
                    <Animated.View style={{
                        flex: 1,
                        opacity: this.state.fadeAnim,
                        backgroundColor: '#ba68c8',
                    }}>

                    </Animated.View>

                </TouchableOpacity>
            </View>

        )
    }

    render() {

        return (

            <CollapsingToldBar
                ref={(toldBar) => this.toldBar = toldBar}
                data={this.state.allPosts}
                listFooterComponent={this._animatedView()}
                renderItem={(item) => {
                    return(
                        <Text style={{padding: 10,}}>
                            {item.item.title}
                        </Text>
                    )
                }}
            />


        );
    }

    _androidButton() {
        if (Platform.OS === 'android')
            return <AndroidButton width={200} height={200} backgroundColor={'#65499c'}/>;
    }

    _mapIos() {
        if (Platform.OS === 'ios') {
            let region = {
                latitude: 37.48,
                longitude: -122.16,
                latitudeDelta: 0.1,
                longitudeDelta: 0.1,
            };
            return (
                <MapView
                    style={{width: 200, height: 200}}
                    zoomEnabled={false}
                    region={region}
                />
                );
        }
    }

    _requestPost() {
        let manager: NetworkManager = new NetworkManager('https://api.graph.cool/simple/v1/ciyz901en4j590185wkmexyex');
        manager.executeQuery(new QueryPost(15),
            (result) => this.setState({allPosts: result.data.allPosts}),
            (error) =>  console.log(JSON.stringify(error))
        );
    }

}

const styles = StyleSheet.create({});
