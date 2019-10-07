import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
import socketIO from 'socket.io-client';

import getEnvVars from './environment';
import HomeScreen from "./screens/HomeScreen";
import OnlineListScreen from "./screens/OnlineListScreen";
import ChatScreen from "./screens/ChatScreen";

const AppNavigator = createStackNavigator(
    {
        Home: HomeScreen,
        OnlineList: OnlineListScreen,
        ChatScreen: ChatScreen
    },
    {
        initialRouteName: "Home"
    }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
    componentDidMount() {
        const socket = socketIO(getEnvVars().wsUrl, {
            transports: ['websocket'], jsonp: false
        });
        socket.connect();
        // socket.emit('username', 'iOS'); //TODO Input username
        socket.on('connect', () => {
            console.log('connected to socket server');
        });
        // socket.on('chat_message', this._addMesage.bind(this));

        global.socket = socket;
    }

    render() {
        return <AppContainer />;
    }
}
