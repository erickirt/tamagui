// @ts-nocheck
import { memo } from 'react'
import type { IconProps } from '@tamagui/helpers-icon'
import { Svg, Line, Path } from 'react-native-svg'
import { themed } from '@tamagui/helpers-icon'

type IconComponent = (propsIn: IconProps) => JSX.Element

export const Navigation2Off: IconComponent = themed(
  memo(function Navigation2Off(props: IconProps) {
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
        <Path d="M9.31 9.31 5 21l7-4 7 4-1.17-3.17" stroke={color} />
        <Path d="M14.53 8.88 12 2l-1.17 3.17" stroke={color} />
        <Line x1="2" x2="22" y1="2" y2="22" stroke={color} />
      </Svg>
    )
  })
)
