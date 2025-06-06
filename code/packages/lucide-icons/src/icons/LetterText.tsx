// @ts-nocheck
import { memo } from 'react'
import type { IconProps } from '@tamagui/helpers-icon'
import { Svg, Path } from 'react-native-svg'
import { themed } from '@tamagui/helpers-icon'

type IconComponent = (propsIn: IconProps) => JSX.Element

export const LetterText: IconComponent = themed(
  memo(function LetterText(props: IconProps) {
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
        <Path d="M15 12h6" stroke={color} />
        <Path d="M15 6h6" stroke={color} />
        <Path d="m3 13 3.553-7.724a.5.5 0 0 1 .894 0L11 13" stroke={color} />
        <Path d="M3 18h18" stroke={color} />
        <Path d="M3.92 11h6.16" stroke={color} />
      </Svg>
    )
  })
)
