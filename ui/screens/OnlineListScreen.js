import React from 'react';
import {StyleSheet, Text, View,  Alert, FlatList, TouchableOpacity} from 'react-native';
import { Provider, connect } from 'react-redux';
import getEnvVars from "../environment";

class UserListItem extends React.PureComponent {
    render() {
        const textColor = this.props.selected ? 'red' : 'black';
        return (
            <TouchableOpacity onPress={this.props.startChat}>
                <View>
                    <Text style={{color: textColor}}>{this.props.title}</Text>
                </View>
            </TouchableOpacity>
        );
    }
}

export default class OnlineListScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = { users: [] }
    }

    componentDidMount() {
        var props = this.props;

        fetch(getEnvVars().usersUrl)
            .then(res => res.json())
            .then((data) => {
                let filtered = data.filter(function(value, index, arr){
                    return value !== props.username;
                });
                console.log("filtered users: ", filtered);
                this.setState({ users: filtered })
            }),
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
            this.setState({
                isLoaded: true,
                error
            });
        }
    }

    startChat = (user) => {
        console.log("Start chat with " + user);
        Alert.alert(
            'Alert Title',
            'Start chat with ' + user,
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel '),
                    style: 'cancel',
                },
                {
                    text: 'OK', onPress: () => {
                        console.log('OK Start chat with ' + user);
                        this.props.navigation.navigate("ChatScreen", {
                            username: user,
                        });
                    }
                },
            ],
            {cancelable: true},
        );


    };

    render() {
        const { navigate } = this.props.navigation;

        return (
            <View style={{ flex: 1}}>
                <Text>Welcome {this.props.username}</Text>
                <Text>Online List</Text>
                <FlatList
                    data={this.state.users}
                    renderItem={({item}) => <UserListItem startChat={() => this.startChat(item)} style={styles.item} title={item} />}
                    keyExtractor={item => item}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
});
