import { getVariableValue, useTheme, useThemeName } from 'tamagui'
import type { VictoryThemeDefinition } from 'victory'
import { useDemoProps } from '../hooks/useDemoProps'

export const useVictoryTheme = (): VictoryThemeDefinition => {
  const demoProps = useDemoProps()
  const theme = useTheme()
  const themeName = useThemeName()
  const isAccent = themeName.includes('accent')

  // *
  // * Typography
  // *
  const letterSpacing = 'normal'
  const fontSize = 12
  // *
  // * Layout
  // *
  const padding = 8
  const baseProps = {
    width: 350,
    height: 350,
    padding: 50,
  }

  const accentColor = getVariableValue(
    isAccent ? theme.color : theme[demoProps.accentBackground]
  )

  // *
  // * Labels
  // *
  const baseLabelStyles = {
    fontFamily: 'sans-serif',
    fontSize,
    letterSpacing,
    padding,
    fill: getVariableValue(theme[demoProps.accentBackground]),
    stroke: 'transparent',
    strokeWidth: 0,
  }

  const centeredLabelStyles = Object.assign({ textAnchor: 'middle' }, baseLabelStyles)
  // *
  // * Strokes
  // *
  const strokeDasharray = '10, 5'
  const strokeLinecap = 'round'
  const strokeLinejoin = 'round'

  // *
  // * Colors
  // *
  const colors = [
    getVariableValue(theme.color9),
    getVariableValue(theme.color3),
    getVariableValue(theme.color6),
    getVariableValue(theme.accent3),
    getVariableValue(theme.accent6),
    getVariableValue(theme.pink9),
    getVariableValue(theme.red9),
  ]

  return {
    area: Object.assign(
      {
        style: {
          data: {
            fill: accentColor,
          },
          labels: baseLabelStyles,
        },
      },
      baseProps
    ),
    axis: Object.assign(
      {
        style: {
          axis: {
            fill: 'transparent',
            stroke: getVariableValue(theme.color5),
            strokeWidth: 2,
            strokeLinecap,
            strokeLinejoin,
          },
          axisLabel: Object.assign({}, centeredLabelStyles, {
            padding,
            stroke: 'transparent',
          }),
          grid: {
            fill: 'none',
            stroke: getVariableValue(theme.color6),
            strokeDasharray,
            strokeLinecap,
            strokeLinejoin,
            pointerEvents: 'painted',
          },
          ticks: {
            fill: 'transparent',
            size: 5,
            stroke: accentColor,
            strokeWidth: 1,
            strokeLinecap,
            strokeLinejoin,
          },
          tickLabels: Object.assign({}, baseLabelStyles, {
            fill: getVariableValue(theme.color8),
          }),
        },
      },
      baseProps
    ),
    polarDependentAxis: Object.assign({
      style: {
        ticks: {
          fill: 'transparent',
          size: 1,
          stroke: 'transparent',
        },
      },
    }),
    bar: Object.assign(
      {
        style: {
          strokeLinejoin: 'round',
          strokeWidth: 6,
          data: {
            fill: accentColor,
            padding,
            strokeWidth: 0,
          },
          labels: baseLabelStyles,
        },
      },
      baseProps
    ),
    boxplot: Object.assign(
      {
        style: {
          max: { padding, stroke: getVariableValue(theme.color8), strokeWidth: 1 },
          maxLabels: Object.assign({}, baseLabelStyles, { padding: 3 }),
          median: { padding, stroke: getVariableValue(theme.color8), strokeWidth: 1 },
          medianLabels: Object.assign({}, baseLabelStyles, { padding: 3 }),
          min: { padding, stroke: getVariableValue(theme.color8), strokeWidth: 1 },
          minLabels: Object.assign({}, baseLabelStyles, { padding: 3 }),
          q1: { padding, fill: getVariableValue(theme.color8) },
          q1Labels: Object.assign({}, baseLabelStyles, { padding: 3 }),
          q3: { padding, fill: getVariableValue(theme.color8) },
          q3Labels: Object.assign({}, baseLabelStyles, { padding: 3 }),
        },
        boxWidth: 20,
      },
      baseProps
    ),
    candlestick: Object.assign(
      {
        style: {
          data: {
            stroke: getVariableValue(theme.color8),
          },
          labels: Object.assign({}, baseLabelStyles, { padding: 5 }),
        },
        candleColors: {
          positive: '#ffffff',
          negative: getVariableValue(theme.color8),
        },
      },
      baseProps
    ),
    chart: baseProps,
    errorbar: Object.assign(
      {
        borderWidth: 8,
        style: {
          data: {
            fill: 'transparent',
            opacity: 1,
            stroke: getVariableValue(theme.color8),
            strokeWidth: 2,
          },
          labels: baseLabelStyles,
        },
      },
      baseProps
    ),
    group: Object.assign(
      {
        colorScale: colors,
      },
      baseProps
    ),
    histogram: Object.assign(
      {
        style: {
          data: {
            fill: getVariableValue(theme.color8),
            stroke: accentColor,
            strokeWidth: 2,
          },
          labels: baseLabelStyles,
        },
      },
      baseProps
    ),
    legend: {
      colorScale: colors,
      gutter: 10,
      orientation: 'vertical',
      titleOrientation: 'top',
      style: {
        data: {
          type: 'circle',
        },
        labels: baseLabelStyles,
        title: Object.assign({}, baseLabelStyles, { padding: 5 }),
      },
    },
    line: Object.assign(
      {
        style: {
          data: {
            fill: 'transparent',
            opacity: 1,
            stroke: accentColor,
            strokeWidth: 2,
          },
          labels: baseLabelStyles,
        },
      },
      baseProps
    ),
    pie: Object.assign(
      {
        colorScale: colors,
        style: {
          data: {
            padding,
            strokeWidth: 0,
          },
          labels: Object.assign({}, baseLabelStyles, { padding: 20 }),
        },
      },
      baseProps
    ),
    scatter: Object.assign(
      {
        style: {
          data: {
            fill: getVariableValue(theme.color8),
            opacity: 1,
            stroke: 'transparent',
            strokeWidth: 0,
          },
          labels: baseLabelStyles,
        },
      },
      baseProps
    ),
    stack: Object.assign(
      {
        colorScale: colors,
      },
      baseProps
    ),
    tooltip: {
      style: Object.assign({}, baseLabelStyles, { padding: 0, pointerEvents: 'none' }),
      flyoutStyle: {
        stroke: getVariableValue(theme.borderColor),
        strokeWidth: 1,
        fill: getVariableValue(theme.background),
        pointerEvents: 'none',
      },
      flyoutPadding: 5,
      cornerRadius: 5,
      pointerLength: 10,
    },
    voronoi: Object.assign(
      {
        style: {
          data: {
            fill: 'transparent',
            stroke: 'transparent',
            strokeWidth: 0,
          },
          labels: Object.assign({}, baseLabelStyles, {
            padding: 5,
            pointerEvents: 'none',
          }),
          flyout: {
            stroke: accentColor,
            strokeWidth: 1,
            fill: 'red',
            pointerEvents: 'none',
          },
        },
      },
      baseProps
    ),
  }
}
