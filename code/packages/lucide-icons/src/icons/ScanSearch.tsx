// @ts-nocheck
import { memo } from 'react'
import type { IconProps } from '@tamagui/helpers-icon'
import { Svg, Circle as _Circle, Path } from 'react-native-svg'
import { themed } from '@tamagui/helpers-icon'

type IconComponent = (propsIn: IconProps) => JSX.Element

export const ScanSearch: IconComponent = themed(
  memo(function ScanSearch(props: IconProps) {
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
        <Path d="M3 7V5a2 2 0 0 1 2-2h2" stroke={color} />
        <Path d="M17 3h2a2 2 0 0 1 2 2v2" stroke={color} />
        <Path d="M21 17v2a2 2 0 0 1-2 2h-2" stroke={color} />
        <Path d="M7 21H5a2 2 0 0 1-2-2v-2" stroke={color} />
        <_Circle cx="12" cy="12" r="3" stroke={color} />
        <Path d="m16 16-1.9-1.9" stroke={color} />
      </Svg>
    )
  })
)
