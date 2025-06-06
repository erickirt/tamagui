// @ts-nocheck
import { memo } from 'react'
import type { IconProps } from '@tamagui/helpers-icon'
import { Svg, Circle as _Circle, Path } from 'react-native-svg'
import { themed } from '@tamagui/helpers-icon'

type IconComponent = (propsIn: IconProps) => JSX.Element

export const UserCircle: IconComponent = themed(
  memo(function UserCircle(props: IconProps) {
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
        <_Circle cx="12" cy="12" r="10" stroke={color} />
        <_Circle cx="12" cy="10" r="3" stroke={color} />
        <Path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662" stroke={color} />
      </Svg>
    )
  })
)
