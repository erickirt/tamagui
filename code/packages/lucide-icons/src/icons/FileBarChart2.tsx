// @ts-nocheck
import { memo } from 'react'
import type { IconProps } from '@tamagui/helpers-icon'
import { Svg, Path } from 'react-native-svg'
import { themed } from '@tamagui/helpers-icon'

type IconComponent = (propsIn: IconProps) => JSX.Element

export const FileBarChart2: IconComponent = themed(
  memo(function FileBarChart2(props: IconProps) {
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
        <Path
          d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"
          stroke={color}
        />
        <Path d="M14 2v4a2 2 0 0 0 2 2h4" stroke={color} />
        <Path d="M8 18v-1" stroke={color} />
        <Path d="M12 18v-6" stroke={color} />
        <Path d="M16 18v-3" stroke={color} />
      </Svg>
    )
  })
)
