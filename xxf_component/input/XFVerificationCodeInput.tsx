/**
 * @author youxuan  E-mail:xuanyouwu@163.com
 * @Description  验证码输入组件
 * @Company Beijing dsb
 */
import * as React from "react";
import {
    TextInput,
    StyleSheet,
    View,
    NativeSyntheticEvent,
    TextInputKeyPressEventData,
    TouchableOpacity
} from "react-native";


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    inputCell: {
        flex: 1,
        height: 44,
        textAlign: 'center',
        borderBottomColor: 'rgb(41,204,123)',
        borderBottomWidth: 1,
        marginHorizontal: 8,
    }
});

interface Props {
    /**
     * 输入改变
     * @param value
     */
    onChangeText: (value: string) => void;
}

interface State {
    inputIndex: number;
    inputArray: Array<string>;
}

type RefInput = React.RefObject<TextInput>;

export class XFVerificationCodeInput extends React.Component<Props, State> {
    private LIMIT_LENGTH: number = 6;
    private refArray: Array<RefInput> = new Array(this.LIMIT_LENGTH);

    constructor(props: Props) {
        super(props);
        this.state = {
            inputIndex: 0,
            inputArray: ['', '', '', '', '', ''],
        }
    }

    render(): React.ReactNode {
        return <TouchableOpacity style={styles.container} onPress={() => {
            //获取焦点
            let textInput: TextInput | null = this.refArray[this.state.inputIndex].current;
            if (textInput) {
                textInput.focus();
            }
        }}>
            {this.renderInputCell()}
        </TouchableOpacity>
    }

    /**
     * 获取下一个焦点
     */
    private focusNext(callback?: () => void) {
        if (this.state.inputIndex < this.LIMIT_LENGTH - 1) {
            this.focusCell(this.state.inputIndex + 1, callback);
        }
    }

    /**
     * 获取上一个焦点
     */
    private focusForward(callback?: () => void) {
        if (this.state.inputIndex > 0) {
            this.focusCell(this.state.inputIndex - 1, callback);
        }
    }

    /**
     * 获取焦点
     * @param index
     * @param callback
     */
    private focusCell(index: number, callback?: () => void) {
        if (index < 0 || index >= this.LIMIT_LENGTH) {
            return;
        }
        this.state.inputArray[index] = '';
        this.setState({
            inputIndex: index,
            inputArray: this.state.inputArray,
        }, () => {
            let textInput: TextInput | null = this.refArray[index].current;
            if (textInput) {
                textInput.focus();
            }
            if (callback) {
                callback();
            }
        });
    }

    private renderInputCell(): React.ReactNode {
        return this.state.inputArray.map((item: string, index: number) => {
            this.refArray[index] = React.createRef();
            return <TextInput
                key={index}
                editable={this.state.inputIndex == index}
                autoFocus={true}
                style={styles.inputCell}
                keyboardType={'numeric'}
                ref={this.refArray[index]}
                defaultValue={String(item)}
                maxLength={1}
                onKeyPress={(e: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
                    if (e.nativeEvent.key == 'Backspace') {
                        this.state.inputArray[index] = '';
                        this.focusForward(() => {
                            if (this.props.onChangeText) {
                                this.props.onChangeText(this.state.inputArray.join(''));
                            }
                        });
                    }
                }}
                onChangeText={(text: string) => {
                    this.state.inputArray[index] = text;
                    this.setState({
                        inputArray: this.state.inputArray,
                    }, () => {
                        if (this.props.onChangeText) {
                            this.props.onChangeText(this.state.inputArray.join(''));
                        }
                        if (text) {
                            this.focusNext();
                        }
                    });
                }}/>;
        });
    }
}