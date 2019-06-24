import React, {Component, PureComponent} from 'react';
import {StyleSheet, Text, View, FlatList, NativeModules,
    Platform, DeviceEventEmitter, Animated, TouchableOpacity, Easing, Dimensions,ImageBackground,
    requireNativeComponent, NativeEventEmitter,} from 'react-native';
import PropTypes from 'prop-types';


const HEADER_EXPANDED_HEIGHT = 300;
const HEADER_COLLAPSED_HEIGHT = 60;
const image = require('../../../graphQl/src/res/piza.png');
const gear = require('../../../graphQl/src/res/gear.png');
const { width: SCREEN_WIDTH } = Dimensions.get('screen');

export default class CollapsingToldBar extends React.Component {

    static propTypes = {
        listFooterComponent: PropTypes.object,
        data: [],
        renderItem: PropTypes.func,
    };

    constructor(props) {
        super(props);
        this.state = {
            scrollY: new Animated.Value(0)
        };

        this.headerHeight = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_EXPANDED_HEIGHT-HEADER_COLLAPSED_HEIGHT],
            outputRange: [HEADER_EXPANDED_HEIGHT, HEADER_COLLAPSED_HEIGHT],
            extrapolate: 'clamp',
            useNativeDriver: true,

        });

        this.heroTitleOpacity = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_EXPANDED_HEIGHT-HEADER_COLLAPSED_HEIGHT],
            outputRange: [1, 0],
            extrapolate: 'clamp',
            useNativeDriver: true
        });

        this.headerTitleOpacity = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_EXPANDED_HEIGHT-HEADER_COLLAPSED_HEIGHT],
            outputRange: [0, 1],
            extrapolate: 'clamp',
            useNativeDriver: true
        });

        this.toldBarOpacity = this.state.scrollY.interpolate({
            inputRange: [200, HEADER_EXPANDED_HEIGHT-HEADER_COLLAPSED_HEIGHT],
            outputRange: [0, 1],
            extrapolate: 'clamp',
            useNativeDriver: true
        });


        this.spinner = this.state.scrollY.interpolate({
            inputRange:[0,360],
            outputRange: ['0deg', '720deg'],
        });
    }


    render() {
        return (
            <View style={styles.container}>
                <Animated.View style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    zIndex: 3,
                    backgroundColor: '#65499c',
                    height: HEADER_COLLAPSED_HEIGHT,
                    width: '100%',
                    opacity: this.toldBarOpacity,

                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 12,
                    },
                    shadowOpacity: 0.58,
                    shadowRadius: 16.00,

                    elevation: 24,
                }}>
                    <Animated.Text style={{textAlign: 'center', marginTop: 28, opacity: this.headerTitleOpacity}}>
                        {'headerTitle'}
                    </Animated.Text>

                </Animated.View>
                <Animated.View style={{
                    height: this.headerHeight, backgroundColor: '#65499c',
                    width: SCREEN_WIDTH, position: 'absolute', top: 0, left: 0, zIndex: 1,
                }}>
                    <ImageBackground
                        source={image}
                        style={{width: '100%', height: '100%', position: 'absolute'}}>

                    </ImageBackground>
                    <Animated.Text style={{position: 'absolute', bottom: 16, left: 16, opacity: this.heroTitleOpacity}}>
                        {'headerTitle'}
                    </Animated.Text>

                    <View style={{
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 12,
                        },
                        shadowOpacity: 0.58,
                        shadowRadius: 16.00,
                        elevation: 24,
                        position: 'absolute',
                        bottom: -30,
                        right: 10,
                        width: 60,
                        height: 60,
                        zIndex: 3
                    }}>
                        <Animated.Image
                            source={gear}
                            style={{
                                transform:[{rotate: this.spinner}],
                                width: 60,
                                height: 60,
                            }}
                        />
                    </View>

                </Animated.View>

                <FlatList
                    contentContainerStyle={{padding: 16, paddingTop: HEADER_EXPANDED_HEIGHT}}
                    ListFooterComponent={this.props.listFooterComponent}
                    style={{width: '100%', height: '100%', zIndex: 1, position: 'absolute'}}
                    keyExtractor={(item, index) => item.id}
                    data={this.props.data}
                    scrollEventThrottle={1}
                    onScroll={Animated.event(
                        [{nativeEvent: {contentOffset: {y: this.state.scrollY}}}],

                    )}
                    renderItem={(item) =>
                        this.props.renderItem(item)
                    }
                />

            </View>
        );
    }
}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },

});
