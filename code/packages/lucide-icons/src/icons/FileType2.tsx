// @ts-nocheck
import { memo } from 'react'
import type { IconProps } from '@tamagui/helpers-icon'
import { Svg, Path } from 'react-native-svg'
import { themed } from '@tamagui/helpers-icon'

type IconComponent = (propsIn: IconProps) => JSX.Element

export const FileType2: IconComponent = themed(
  memo(function FileType2(props: IconProps) {
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
        <Path d="M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4" stroke={color} />
        <Path d="M14 2v4a2 2 0 0 0 2 2h4" stroke={color} />
        <Path d="M2 13v-1h6v1" stroke={color} />
        <Path d="M5 12v6" stroke={color} />
        <Path d="M4 18h2" stroke={color} />
      </Svg>
    )
  })
)
