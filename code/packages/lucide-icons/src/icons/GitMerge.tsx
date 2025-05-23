// @ts-nocheck
import { memo } from 'react'
import type { IconProps } from '@tamagui/helpers-icon'
import { Svg, Circle as _Circle, Path } from 'react-native-svg'
import { themed } from '@tamagui/helpers-icon'

type IconComponent = (propsIn: IconProps) => JSX.Element

export const GitMerge: IconComponent = themed(
  memo(function GitMerge(props: IconProps) {
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
        <_Circle cx="18" cy="18" r="3" stroke={color} />
        <_Circle cx="6" cy="6" r="3" stroke={color} />
        <Path d="M6 21V9a9 9 0 0 0 9 9" stroke={color} />
      </Svg>
    )
  })
)
