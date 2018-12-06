/**
 * @author youxuan  E-mail:xuanyouwu@163.com
 * @Description 扩展 blue和white 按钮
 */
import React from 'react';
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    TouchableHighlight,
    View,
    ViewStyle,
    StyleProp,
    TextProps,
    TouchableHighlightProps, TextStyle,
} from 'react-native';


export interface ButtonStateProps {
    base: StyleProp<ViewStyle>;
    normal: StyleProp<ViewStyle>;
    pressed: StyleProp<ViewStyle>;
    disabled: StyleProp<ViewStyle>;
}

export interface TextStateProps {
    base: StyleProp<TextStyle>;
    normal: StyleProp<TextStyle>;
    pressed: StyleProp<TextStyle>;
    disabled: StyleProp<TextStyle>;
}


export interface XFButtonProps extends TouchableHighlightProps {
    backgroundStyle?: StyleProp<ButtonStateProps>;
    textStyle?: StyleProp<TextStateProps>;
    indicatorStyle?: StyleProp<TextStateProps> | StyleProp<ViewStyle>;
    indicatorAnimating?: boolean;
}


interface ButtonState {
    btnState: 'normal' | 'pressed';
}

const styles = StyleSheet.create({
    contentContainerStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export class XFButton extends React.Component<XFButtonProps, ButtonState> {
    constructor(props: XFButtonProps) {
        super(props);
        this.state = {
            btnState: 'normal',
        };
    }

    static defaultProps = {
        disabled: false,
        indicatorAnimating: false,
        backgroundStyle: {
            base: {
                borderRadius: 8,
                borderWidth: 1,
            },
            normal: {
                backgroundColor: '#3966E6',
                borderColor: '#3966E6',
            },
            pressed: {
                backgroundColor: '#AABEF2',
                borderColor: '#AABEF2',
            },
            disabled: {
                backgroundColor: '#AABEF2',
                borderColor: '#AABEF2',
            },
        },
        textStyle: {
            base: {
                fontSize: 16,
            },
            normal: {
                color: '#fff',
            },
            pressed: {
                color: '#fff',
            },
            disabled: {
                color: '#fff',
            },
        },
        style: {
            justifyContent: 'center',
            height: 44,
        },
        indicatorStyle: {
            color: '#FFF',
            width: 16,
            height: 16,
            marginRight: 5,
        }
    };

    render() {
        const _backgroundStyles: any = this.props.backgroundStyle!;
        const backgroundStateStyle = [
            XFButton.defaultProps.style,
            this.props.style,
            _backgroundStyles[`base`],
            _backgroundStyles[`${(this.props.disabled ? 'disabled' : this.state.btnState)}`],
        ];

        let underlayColor;
        if (this.props.backgroundStyle && this.props.backgroundStyle.pressed) {
            underlayColor = Object.assign({}, this.props.style, this.props.backgroundStyle.pressed).backgroundColor;
        } else {
            underlayColor = (StyleSheet.flatten(this.props.style) as any).backgroundColor;
        }

        const _textStyles: any = this.props.textStyle!;
        const textStateStyle = [
            this.props.textStyle,
            _textStyles[`base`],
            _textStyles[`${(this.props.disabled ? 'disabled' : this.state.btnState)}`],
        ];
        const {color: indicatorColor} = Object.assign({}, XFButton.defaultProps.indicatorStyle, this.props.indicatorStyle);
        const indicatorStyle = Object.assign({}, XFButton.defaultProps.indicatorStyle, this.props.indicatorStyle);
        return (
            <TouchableHighlight style={backgroundStateStyle as ViewStyle}
                                activeOpacity={1}
                                onPress={this.props.onPress}
                                disabled={this.props.disabled}
                                underlayColor={underlayColor}
                                onShowUnderlay={this.onPressedIn.bind(this)}
                                onHideUnderlay={this.onPressedOut.bind(this)}
                                onPressIn={this.onPressedIn.bind(this)}
                                onPressOut={this.onPressedOut.bind(this)}>
                <View style={styles.contentContainerStyle}>
                    {
                        this.props.indicatorAnimating ? (
                            <ActivityIndicator color={indicatorColor} animating={this.props.indicatorAnimating}
                                               style={indicatorStyle as ViewStyle}/>) : null
                    }
                    <Text style={textStateStyle as TextStyle} numberOfLines={1}>
                        {this.props.children}
                    </Text>
                </View>
            </TouchableHighlight>
        );
    }

    protected onPressedIn() {
        this.setState({
            btnState: 'pressed',
        });
    }

    protected onPressedOut() {
        this.setState({
            btnState: 'normal',
        });
    }

}