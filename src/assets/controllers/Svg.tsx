import React, {Component} from 'react';
import {SvgXml} from 'react-native-svg';
import svgs from '../svgs';

interface SvgProps {
  icon: keyof typeof svgs;
  size?: number | string;
  color?: string | undefined;
  style?: object;
}

export default class Svg extends Component<SvgProps> {
  render() {
    let {color, size, style, icon} = this.props;

    const xml = svgs[icon];

    if (!xml) {
      const err_msg = `There is no "${icon}" svg file`;
      throw new Error(err_msg);
    }
    if (size === undefined) {
      size = '100%';
    }
    if (color === undefined) {
      return <SvgXml width={size} height={size} xml={xml} style={style} />;
    }
    return <SvgXml width={size} height={size} xml={xml} fill={color} style={style} />;
  }
}