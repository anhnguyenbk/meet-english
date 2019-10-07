import React from 'react';
import {StyleSheet, Text, View,  Alert, FlatList, TouchableOpacity} from 'react-native';

class MyListItem extends React.PureComponent {
    // _onPress = () => {
    //     return new Promise(function(resolve, reject) {
    //         Alert.alert(
    //             'Alert Title',
    //             'Start chat with ' + this.props.title,
    //             [
    //                 {
    //                     text: 'Cancel',
    //                     onPress: () => console.log('Cancel Pressed'),
    //                     style: 'cancel',
    //                 },
    //                 {
    //                     text: 'OK', onPress: () => {
    //                         console.log('OK Pressed');
    //                         resolve(this.props.title);
    //                     }
    //                 },
    //             ],
    //             {cancelable: false},
    //         );
    //     })
    // };

    render() {
        const textColor = this.props.selected ? 'red' : 'black';
        return (
            <TouchableOpacity>
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
        this.state ={ users: [] }
    }

    componentDidMount() {
        fetch('http://192.168.3.100:8080/api/users')
            .then(res => res.json())
            .then((data) => {
                this.setState({ users: data })
            })
            .catch(console.log)
    }

    render() {
        return (
            <View style={{ flex: 1}}>
                <Text>Online List Screen</Text>
                <FlatList
                    data={this.state.users}
                    renderItem={({item}) => <MyListItem style={styles.item} title={item}/>}
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
