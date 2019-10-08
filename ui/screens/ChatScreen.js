import React from 'react';
import {StyleSheet, Text, View,  TextInput, Button} from 'react-native';

export default class ChatScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = { text: '' };
    }

    render() {
        const { navigation } = this.props;
        return (
            <View>
                <Text>Chat With {navigation.getParam('username', 'NO-USER')}</Text>

                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={(text) => this.setState({text})}
                    value={this.state.text}
                />
                <Button onPress={() => this.sendMessage()} title="Send message"/>
            </View>
        );
    }

    sendMessage() {
        console.log("Send message: " + this.state.text);
    }
}