import React from 'react';
import {StyleSheet, Text, View,  Alert, Button, TextInput} from 'react-native';
import { createStore } from 'redux'

export default class HomeScreen extends React.Component {

    static navigationOptions = {
        title: 'Welcome',
    };

    constructor(props) {
        super(props);
        this.state = { text: '' };
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={{flex: 1}}>
                <Text>Tell us your name</Text>
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={text => this.setState({ text })}
                    value={this.state.text}
                />
                <Button title="Chat now" onPress={() => {
                    global.socket.emit('username', this.state.text);
                    this.props.dispatch({ type: 'USERNAME', value: this.state.text});
                    navigate('OnlineList');
                }}  />
            </View>
        );
    }
}