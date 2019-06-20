import React, { PureComponent } from 'react'
import LinearGradient from 'react-native-linear-gradient';
import {
  RkButton,
  RkText,
  RkComponent,
} from 'react-native-ui-kitten';
import { gradient, button, colors, textStyle } from 'react-native'

export default class GradientButton extends PureComponent {
  componentName = 'GradientButton';
  typeMapping = {
    button: {},
    gradient: {},
    text: {},
  };

  renderContent = (textStyle) => {
    const hasText = this.props.text === undefined;
    return hasText ? this.props.children : this.renderText(textStyle);
  };

  renderText = (textStyle) => (
    <RkText style={textStyle}>{this.props.text}</RkText>
  );

  render() {
    const { style, rkType, ...restProps } = this.props;
    return (
      <RkButton
        rkType='stretch'
        style={[button, style]}
        {...restProps}>
        <LinearGradient
          colors={colors}
          start={{ x: 0.0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={[gradient]}>
          {this.renderContent(textStyle)}
        </LinearGradient>
      </RkButton>
    );
  }
}
