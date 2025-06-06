// @ts-nocheck
import { memo } from 'react'
import type { IconProps } from '@tamagui/helpers-icon'
import { Svg, Path, Rect } from 'react-native-svg'
import { themed } from '@tamagui/helpers-icon'

type IconComponent = (propsIn: IconProps) => JSX.Element

export const FunctionSquare: IconComponent = themed(
  memo(function FunctionSquare(props: IconProps) {
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
        <Rect width="18" height="18" x="3" y="3" rx="2" ry="2" stroke={color} />
        <Path d="M9 17c2 0 2.8-1 2.8-2.8V10c0-2 1-3.3 3.2-3" stroke={color} />
        <Path d="M9 11.2h5.7" stroke={color} />
      </Svg>
    )
  })
)
