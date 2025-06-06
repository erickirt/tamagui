// @ts-nocheck
import { memo } from 'react'
import type { IconProps } from '@tamagui/helpers-icon'
import { Svg, Line, Rect } from 'react-native-svg'
import { themed } from '@tamagui/helpers-icon'

type IconComponent = (propsIn: IconProps) => JSX.Element

export const BatteryMedium: IconComponent = themed(
  memo(function BatteryMedium(props: IconProps) {
    const { color = 'black', size = 24, ...otherProps } = props
    return (
      <Svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...otherProps}
      >
        <Rect width="16" height="10" x="2" y="7" rx="2" ry="2" stroke={color} />
        <Line x1="22" x2="22" y1="11" y2="13" stroke={color} />
        <Line x1="6" x2="6" y1="11" y2="13" stroke={color} />
        <Line x1="10" x2="10" y1="11" y2="13" stroke={color} />
      </Svg>
    )
  })
)
