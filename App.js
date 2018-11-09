/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {testService} from "./test/TestApiService";
import Address from "./test/Address";
import {from, Observable} from "rxjs/index";

type Props = {
    age: string,
};
type State = {
    text: string,
}


export default class App extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            text: '暂无请求',
        }
    }

    onBtnClick() {
        testService.getCity('苏州市')
            .subscribe({
                next:
                    (item: Address) => {
                        console.log('xxx:' + JSON.stringify(item));
                        this.setState({
                            text: 'res:' + JSON.stringify(item),
                           // text: 'res:' + item.level,
                        })
                    },
                error: e => {
                    this.setState({
                        text: 'ex:' + JSON.stringify(e),
                    })
                },
                complete: () => {
                    //alert('complete')
                }
            });
    }

    componentDidMount() {
        this.onBtnClick();
    }

    render() {
        return (
            <View>
                <Text style={{padding: 20, marginTop: 100}} onPress={this.onBtnClick.bind(this)}>click</Text>
                <Text selectable={true}>请求结果:{this.state.text}</Text>
            </View>
        );
    }
}

