// @ts-nocheck
import { memo } from 'react'
import type { IconProps } from '@tamagui/helpers-icon'
import { Svg, Path, Rect } from 'react-native-svg'
import { themed } from '@tamagui/helpers-icon'

type IconComponent = (propsIn: IconProps) => JSX.Element

export const AlignHorizontalDistributeCenter: IconComponent = themed(
  memo(function AlignHorizontalDistributeCenter(props: IconProps) {
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
        <Rect width="6" height="14" x="4" y="5" rx="2" stroke={color} />
        <Rect width="6" height="10" x="14" y="7" rx="2" stroke={color} />
        <Path d="M17 22v-5" stroke={color} />
        <Path d="M17 7V2" stroke={color} />
        <Path d="M7 22v-3" stroke={color} />
        <Path d="M7 5V2" stroke={color} />
      </Svg>
    )
  })
)
