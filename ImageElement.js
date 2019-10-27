import React, { Component } from 'react'
import {Image, StyleSheet} from 'react-native'

export default class ImageElement extends Component{
    render() {
        return (
            <Image source={this.props.img} style={{width: 200, height: 200, marginBottom: 5}}></Image>
        );
    }
}

const styles = StyleSheet.create({
    image: {
        flex:1, 
        width: null,
        alignSelf: 'stretch'
    }
});