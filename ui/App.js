import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
import socketIO from 'socket.io-client';
import { Provider, connect } from 'react-redux';

import getEnvVars from './environment';
import HomeScreen from "./screens/HomeScreen";
import OnlineListScreen from "./screens/OnlineListScreen";
import ChatScreen from "./screens/ChatScreen";
import {createStore} from "redux";

function currentUser(state = {username: ''}, action) {
    switch (action.type) {
        case 'USERNAME':
            return {
                username: action.value
            };
        default:
            return state
    }
}

let store = createStore(currentUser);
store.subscribe(() => console.log(store.getState()));

// Connect the screens to Redux
let HomeContainer = connect(state => ({ username: state.username }))(HomeScreen);
let OnlineListContainer = connect(state => ({ username: state.username }))(OnlineListScreen);
let ChatContainer = connect(state => ({ username: state.username }))(ChatScreen);

// Create our stack navigator
let RootStack = createStackNavigator(
    {
        Home: HomeContainer,
        OnlineList: OnlineListContainer,
        ChatScreen: ChatContainer
    },
    {
        initialRouteName: "Home"
    }
);

// And the app container
let Navigation = createAppContainer(RootStack);

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
        return (
            <Provider store={store}>
                <Navigation />
            </Provider>
        );
    }
}
