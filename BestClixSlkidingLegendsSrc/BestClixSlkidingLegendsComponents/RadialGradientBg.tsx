import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Defs, RadialGradient, Rect, Stop } from 'react-native-svg';

const RadialGradientBg: React.FC<{ width: number; height: number }> = ({ width, height }) => (
    <View style={[StyleSheet.absoluteFill, { zIndex: -1 }]}>
        <Svg width={width} height={height}>
            <Defs>
                <RadialGradient
                    id="grad"
                    cx="50%"
                    cy="50%"
                    rx="50%"
                    ry="50%"
                    fx="50%"
                    fy="50%"
                >
                    <Stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
                    <Stop offset="30%" stopColor="#EFEFEF" stopOpacity="1" />
                    <Stop offset="100%" stopColor="#C4C4C4" stopOpacity="1" />
                </RadialGradient>
            </Defs>
            <Rect
                x="0"
                y="0"
                width={width}
                height={height}
                fill="url(#grad)"
            />
        </Svg>
    </View>
);

export default RadialGradientBg;
