import React from 'react';
import {StyleSheet, Text, View,  Alert} from 'react-native';
import socketIO from 'socket.io-client';

export default class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = { messages: [] };
        this._addMesage = this._addMesage.bind(this);
    }

    self = this;

    _addMesage(msg){
        console.log(msg);
        this.state.messages.push(msg);
        this.setState({ messages: this.state.messages })
    }

    componentDidMount() {
        const socket = socketIO('http://localhost:8080', {
            transports: ['websocket'], jsonp: false
        });
        socket.connect();
        socket.emit('username', 'iOS'); //TODO Input username
        socket.on('connect', () => {
            console.log('connected to socket server');
        });

        socket.on('chat_message', this._addMesage.bind(this));
    }

    displayNameInput() {
        // Works on both iOS and Android
        Alert.alert(
            'Alert Title',
            'My Alert Msg',
            [
                {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            {cancelable: false},
        );
    }

    render() {
        let CheckIndex = i => {
            if((i % 2) == 0) {
                return styles.gray
            }
        };

        let rows = this.state.messages.map((r, i) => {
            return <View key={ i } style={[styles.row, CheckIndex(i)]}>
                <Text >Row { r }, Index { i }</Text>
            </View>
        });

        return(
            <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                <Text>Meet English</Text>
                { rows }
                {/*{this.displayNameInput()}*/}
            </View>
    )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    row: {
        height:40,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomColor: '#ededed',
        borderBottomWidth: 1
    },
});
