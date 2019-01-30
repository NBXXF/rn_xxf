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
    Text,
    Platform,
    Dimensions,
    NativeSyntheticEvent,
    TextInputKeyPressEventData,
    TouchableOpacity
} from "react-native";
import {XFInputErrorNoticeProps} from "./XFInputErrorNoticeProps";
import AlertModal from "../../../../react_native/src/common/widget/modal/alert/AlertModal";
import {string} from "prop-types";

const CUSOR_ON_TEXT: string = '|';
const CUSOR_BLUR_TEXT: string = '';
const SCREE_WIDTH: number = Dimensions.get('window').width;
const SPACING_WIDTH: number = 16;
const LIMIT_LENGTH: number = 6;
const CUSOR_BLUR_TIME: number = 600;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    contentContainer: {
        flex: 1,
        flexDirection: 'row',
    },
    inputCell: {
        // flex: 1,
        height: 44,
        borderBottomColor: 'rgb(41,204,123)',
        borderBottomWidth: 1,
        marginRight: SPACING_WIDTH,
    },
    inputCellText: {
        flex: 1,
        fontSize: 16,
        color: 'rgba(0, 0, 0, .8)',
        lineHeight: 44,
        textAlign: 'center',
    },
    inputAll: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: 100,
        height: 44,
        marginHorizontal: 8,
    },
    errorContainer: {
        flexDirection: 'row',
    },
    error: {
        marginTop: 6,
        fontSize: 12,
        flex: 1,
        color: 'rgb(230,92,83)',
    }
});

interface Props extends XFInputErrorNoticeProps {

    contentText: string;
    /**
     * 输入改变
     * @param value
     */
    onChangeText: (value: string) => void;
}

interface State {
    inputIndex: number;
    contentText: string;
    cusorText: string;
    inputArray: Array<string>;
}

export class XFVerificationCodeInput extends React.Component<Props, State> {
    private cusorTimer: number = 0;
    private textInput: React.RefObject<TextInput> = React.createRef();

    constructor(props: Props) {
        super(props);
        this.state = {
            inputIndex: 0,
            contentText: '',
            cusorText: CUSOR_ON_TEXT,
            inputArray: ['', '', '', '', '', ''],
        }
    }

    componentDidMount(): void {
        if (Platform.OS === 'android') {
            setTimeout(() => {
                this.textInput.current && this.textInput.current.focus();

            }, Math.ceil(CUSOR_BLUR_TIME / 3));
        }
    }

    shouldComponentUpdate(nextProps: Readonly<Props>,
                          nextState: Readonly<State>,
                          nextContext: any): boolean {


        if (nextProps.contentText != this.state.contentText) {
            this.setState({
                inputArray: nextProps.contentText.split(''),
                contentText: nextProps.contentText,
                inputIndex: nextProps.contentText.length
            });
            if (nextProps.contentText.length >= LIMIT_LENGTH) {
                this.textInput.current && this.textInput.current.blur();
            }
        }

        return nextProps.error !== this.props.error || nextProps.contentText !== this.state.contentText || nextState.cusorText !== this.state.cusorText;
    }

    render(): React.ReactNode {

        let {contentText} = this.state;

        return (<TouchableOpacity style={styles.container}
                                  activeOpacity={1}
                                  onPress={() => {
            //获取焦点
            if (this.textInput && this.textInput.current) {
                
                Platform.OS === 'android' && this.textInput.current.blur();
                InteractionManager.runAfterInteractions(() => {
                    this.textInput && this.textInput.current && this.textInput.current.focus();
                });
            }
        }}>

            <TextInput
                autoFocus={true}
                style={styles.inputAll}
                keyboardType={'numeric'}
                ref={this.textInput}
                maxLength={LIMIT_LENGTH}
                onKeyPress={(e: NativeSyntheticEvent<TextInputKeyPressEventData>) => {}}
                onChangeText={(text: string) => {

                    if (this.props.onChangeText) {
                        this.props.onChangeText(text);
                    }

                }}
                onFocus={this.startCusor.bind(this)}
                onBlur={this.endCusor.bind(this)}
            />

            <View style={{flex: 1,backgroundColor: '#fff'}}>
                <View style={{flexDirection: 'row'}}>
                    <View style={styles.contentContainer}>
                        {this.renderInputCell()}
                    </View>
                </View>
                {this.renderErrorCell()}
            </View>
        </TouchableOpacity>);
    }

    private startCusor(): void {
        this.endCusor();

        // if (this.checkShoudHasCusor()) {

            this.cusorTimer = setInterval(() => {
                this.setState({cusorText: this.state.cusorText === CUSOR_ON_TEXT ? CUSOR_BLUR_TEXT : CUSOR_ON_TEXT})
            }, CUSOR_BLUR_TIME);
        // }
    }

    private endCusor(): void {
        this.cusorTimer && clearInterval(this.cusorTimer);
    }

    private checkShoudHasCusor(): boolean {
        if (this.state.contentText.length >= LIMIT_LENGTH) {
            this.endCusor();
        }
        return this.state.contentText.length < LIMIT_LENGTH;
    }

    private renderInputCell(): React.ReactNode {

        let {contentText, cusorText, inputArray} = this.state;

        let allNodeArray: Array<any> = [1, 2, 3, 4, 5, 6];

        return allNodeArray.map((item: string, index: number) => {

            let cellValue: string = contentText.length === index ? cusorText : '';
            if (index < contentText.length) {
                cellValue = inputArray[index] ? inputArray[index] : '';
            } else if (index > contentText.length) {
                cellValue = '';
            }

            return <SingleItem key={index}
                               itemText={cellValue}/>;
        });
    }

    /**
     * 渲染错误展示
     */
    private renderErrorCell(): React.ReactNode {
        if (this.props.error) {
            if (typeof this.props.error == 'string') {
                return (<TouchableOpacity
                    style={styles.errorContainer}
                    onPress={this.props.onErrorClick}>
                    <Text style={styles.error}>
                        {String(this.props.error)}
                    </Text>
                </TouchableOpacity>);
            }
            return this.props.error;
        }
        return null;
    }
}

interface ItemProps {

    itemText: string;
}

interface ItemState {

    itemText: string;
}

class SingleItem extends React.Component<ItemProps, ItemState> {
    private cusorTimer: number = 0;
    private textInput: React.RefObject<TextInput> = React.createRef();

    constructor(props: Props) {
        super(props);
        this.state = {
            itemText: this.props.itemText,
        }
    }

    shouldComponentUpdate(nextProps: Readonly<ItemProps>, nextState: Readonly<ItemState>, nextContext: any): boolean {
        if (nextProps.itemText !== this.state.itemText) {
            this.setState({itemText: nextProps.itemText});
        }
        return nextProps.itemText !== this.state.itemText;
    }


    render(): React.ReactNode {
        let {itemText} = this.state;
        return <View style={[styles.inputCell,{width: Math.floor((SCREE_WIDTH - 2 * 2 * SPACING_WIDTH - (LIMIT_LENGTH - 1) * SPACING_WIDTH) / LIMIT_LENGTH)}]}>
                <Text style={styles.inputCellText}>{itemText}</Text>
            </View>;
    }
}
