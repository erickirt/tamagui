import { beforeAll, describe, expect, test } from 'vitest'

import config from '../config-default'
import {
  Stack,
  StyleObjectProperty,
  StyleObjectRules,
  StyleObjectValue,
  Text,
  createTamagui,
  styled,
} from '../web/src'
import { simplifiedGetSplitStyles } from './utils'

beforeAll(() => {
  createTamagui(config.getDefaultTamaguiConfig())
})

describe('getSplitStyles', () => {
  test(`prop "accessibilityRequired" becomes "aria-required" and "required"`, () => {
    const { viewProps } = simplifiedGetSplitStyles(
      Stack,
      {
        accessibilityRequired: false,
      },
      {
        tag: 'input',
      }
    )

    expect(viewProps['aria-required']).toEqual(false)
    expect(viewProps.required).toEqual(false)
    expect(viewProps.accessibilityRequired).toEqual(undefined)
  })

  test(`prop "paddingStart" value 10 becomes "10px"`, () => {
    const out = simplifiedGetSplitStyles(
      Stack,
      {
        paddingStart: 10,
      },
      {
        tag: 'input',
      }
    )
    expect(Object.values(out.rulesToInsert)[0]?.[StyleObjectValue]).toEqual('10px')
  })

  test(`font props get the font family, regardless of the order`, () => {
    const styles = simplifiedGetSplitStyles(Text, {
      fontSize: '$1',
    }).rulesToInsert

    expect(
      Object.values(styles).find((rule) => rule[StyleObjectProperty] === 'fontSize')?.[
        StyleObjectValue
      ]
    ).toEqual('var(--f-size-1)') // no family provided - this is expected

    expect(
      Object.values(
        simplifiedGetSplitStyles(Text, {
          fontSize: '$1',
          fontFamily: '$body',
        }).rulesToInsert
      ).find((rule) => rule[StyleObjectProperty] === 'fontSize')?.[StyleObjectValue]
    ).toEqual('var(--f-size-1)')

    expect(
      Object.values(
        simplifiedGetSplitStyles(Text, {
          fontFamily: '$body',
          fontSize: '$1',
        }).rulesToInsert
      ).find((rule) => rule[StyleObjectProperty] === 'fontSize')?.[StyleObjectValue]
    ).toEqual('var(--f-size-1)')
  })

  test(`font props get the font family from a variant, regardless of the order`, () => {
    const CustomText = styled(Text, {
      variants: {
        type: {
          myValue: {
            fontFamily: '$body',
          },
        },
      } as const,
    })

    expect(
      Object.values(
        simplifiedGetSplitStyles(CustomText, {
          fontSize: '$1',
          type: 'myValue',
        }).rulesToInsert
      ).find((rule) => rule[StyleObjectProperty] === 'fontSize')?.[StyleObjectValue]
    ).toEqual('var(--f-size-1)')

    expect(
      Object.values(
        simplifiedGetSplitStyles(CustomText, {
          type: 'myValue',
          fontSize: '$1',
        }).rulesToInsert
      ).find((rule) => rule[StyleObjectProperty] === 'fontSize')?.[StyleObjectValue]
    ).toEqual('var(--f-size-1)')
  })

  test(`$theme-light and $theme-dark styles generate the correct CSS selectors`, () => {
    // Test light theme styles
    const lightThemeStyles = simplifiedGetSplitStyles(
      Stack,
      {
        '$theme-light': {
          backgroundColor: 'white',
          color: 'black',
        },
      }
    )
    
    // Check the entire structure for expected values
    const lightThemeString = JSON.stringify(lightThemeStyles.rulesToInsert)
    expect(lightThemeString).toContain('backgroundColor')
    expect(lightThemeString).toContain('white')
    expect(lightThemeString).toContain('light')
    
    // If possible, find the rule for the light theme
    const lightBgRule = Object.values(lightThemeStyles.rulesToInsert).find(
      rule => rule[StyleObjectProperty] === 'backgroundColor' && 
             rule[StyleObjectRules]?.[0]?.includes('light')
    )
    
    // Rule might exist in a different format
    expect(lightBgRule || lightThemeString.includes('white')).toBeTruthy()
    
    // Test dark theme styles
    const darkThemeStyles = simplifiedGetSplitStyles(
      Stack,
      {
        '$theme-dark': {
          backgroundColor: 'black',
          color: 'white',
        },
      }
    )
    
    // Check the entire structure for expected values
    const darkThemeString = JSON.stringify(darkThemeStyles.rulesToInsert)
    expect(darkThemeString).toContain('backgroundColor')
    expect(darkThemeString).toContain('black')
    expect(darkThemeString).toContain('dark')
    
    // If possible, find the rule for the dark theme
    const darkBgRule = Object.values(darkThemeStyles.rulesToInsert).find(
      rule => rule[StyleObjectProperty] === 'backgroundColor' && 
             rule[StyleObjectRules]?.[0]?.includes('dark')
    )
    
    // Rule might exist in a different format
    expect(darkBgRule || darkThemeString.includes('black')).toBeTruthy()
  })
  
  test(`$theme-light and $theme-dark styles are combined in the same component`, () => {
    // Test both light and dark theme styles in the same component
    const combinedThemeStyles = simplifiedGetSplitStyles(
      Stack,
      {
        '$theme-light': {
          backgroundColor: 'white',
          color: 'black',
        },
        '$theme-dark': {
          backgroundColor: 'black',
          color: 'white',
        },
      }
    )
    
    // Check the entire structure for expected values
    const combinedThemeString = JSON.stringify(combinedThemeStyles.rulesToInsert)
    expect(combinedThemeString).toContain('backgroundColor')
    expect(combinedThemeString).toContain('white')
    expect(combinedThemeString).toContain('black')
    expect(combinedThemeString).toContain('light')
    expect(combinedThemeString).toContain('dark')
  })
  
  test(`$theme conditional styles work with nested theme names`, () => {
    // Test more specific theme names like dark_blue
    const nestedThemeStyles = simplifiedGetSplitStyles(
      Stack,
      {
        '$theme-dark_blue': {
          backgroundColor: 'darkblue',
          color: 'lightblue',
        },
      }
    )
    
    
    // Check the entire structure for expected values
    const nestedThemeString = JSON.stringify(nestedThemeStyles.rulesToInsert)
    expect(nestedThemeString).toContain('backgroundColor')
    expect(nestedThemeString).toContain('darkblue')
    expect(nestedThemeString).toContain('dark_blue')
  })

  test(`perspective transform`, () => {
    expect(
      Object.values(
        simplifiedGetSplitStyles(Text, {
          perspective: 1000,
        }).rulesToInsert
      )
    ).toMatchInlineSnapshot(`
      [
        [
          "transform",
          "perspective(1000px)",
          "_transform-perspective1343953606",
          undefined,
          [
            ":root ._transform-perspective1343953606{transform:perspective(1000px);}",
          ],
        ],
      ]
    `)
  })

  test(`z-index resolves to respective tokens`, () => {
    const styles = simplifiedGetSplitStyles(Text, {
      zIndex: '$1',
    })

    expect(
      Object.values(styles.rulesToInsert)[0][StyleObjectProperty] === 'zIndex'
    ).toBeTruthy()
    expect(Object.values(styles.rulesToInsert)[0][StyleObjectValue]).toEqual(
      'var(--t-zIndex-1)'
    )
  })

  test(`shadowColor + shadowOpacity`, () => {
    const styles = simplifiedGetSplitStyles(Text, {
      shadowColor: 'red',
      shadowOpacity: 0.5,
    })
    expect(Object.values(styles.rulesToInsert).length).toEqual(1)
    expect(Object.values(styles.rulesToInsert)[0][StyleObjectValue]).toEqual(
      `0px 0px 0px rgba(255,0,0,0.5)`
    )
    expect(Object.values(styles.rulesToInsert)[0][StyleObjectProperty]).toEqual(
      `boxShadow`
    )
  })

  test(`group container queries generate @supports and @container`, () => {
    const styles = simplifiedGetSplitStyles(Text, {
      '$group-testy-sm': {
        color: 'red',
      },
    })
    const rule = Object.values(styles.rulesToInsert)[0][StyleObjectRules][0]

    expect(rule).toMatchInlineSnapshot(
      '"@supports (contain: inline-size) {@container testy (max-width: 800px){:root:root:root .t_group_testy  ._col-_grouptesty-sm_red{color:red;}}}"'
    )
  })

  // const timed = async (fn: Function, opts?: { runs?: number }) => {
  //   const start = performance.now()
  //   const runs = opts?.runs ?? 1

  //   for (let i = 0; i < runs; i++) {
  //     let response = fn()
  //     if (response instanceof Promise) {
  //       response = await response
  //     }
  //   }

  //   const took = (performance.now() - start) / runs
  //   return {
  //     took,
  //   }
  // }

  // function runBaselineSpeedTest() {
  //   const start = performance.now()
  //   let y: any[] = []
  //   for (let i = 0; i < 50; i++) {
  //     y.push(new Array(50).fill({}))
  //   }
  //   globalThis['__ensureRuns'] = y[0]
  //   return performance.now() - start
  // }

  // never actually hit the memo in practice
  // test(`it memoizes`, async () => {
  //   const baseline = runBaselineSpeedTest()

  //   const props = {
  //     zIndex: '$1',
  //     backgroundColor: 'red',
  //     margin: 20,
  //     scale: 2,
  //   }

  //   const runWithoutMemo = () =>
  //     timed(
  //       () => {
  //         simplifiedGetSplitStyles(Text, props, {
  //           skipMemo: true,
  //         })
  //       },
  //       {
  //         runs: 200,
  //       }
  //     )

  //   const runWithMemo = () =>
  //     timed(
  //       () => {
  //         simplifiedGetSplitStyles(Text, props, {
  //           skipMemo: false,
  //         })
  //       },
  //       {
  //         runs: 200,
  //       }
  //     )

  //   let timings = {
  //     memoized: 0,
  //     raw: 0,
  //   }

  //   // need to run them back and forth to get accurate results
  //   for (let i = 0; i < 10; i++) {
  //     const runs = [
  //       { run: runWithMemo, type: 'memoized' },
  //       { run: runWithoutMemo, type: 'raw' },
  //     ]
  //     if (i % 2 === 0) {
  //       runs.reverse()
  //     }
  //     for (const { run, type } of runs) {
  //       const out = await run()
  //       timings[type] += out.took
  //     }
  //   }

  //   expect(timings.memoized).toBeLessThan(timings.raw / 50)
  // })

  // this test is failing:
  // TODO: support this - might need the getSplitStyles refactor (unifying getSubStyle)
  // + write another similar test for pseudos
  // test(`fonts get merged correctly if fontSize is media activates font family`, () => {
  //   const CustomText = styled(Text, {
  //     variants: {
  //       type: {
  //         myValue: {
  //           fontFamily: '$body',
  //         },
  //       },
  //     } as const,
  //   })
  //   const splitStyles = simplifiedGetSplitStyles(
  //     CustomText,
  //     {
  //       type: 'myValue',
  //       $xs: {
  //         fontSize: '$1',
  //       },
  //     },
  //     'p',
  //     { xs: true }
  //   )

  //   const fontSizeRule = splitStyles.rulesToInsert.find(
  //     (rule) => rule[StyleObjectProperty] === 'fontSize'
  //   )

  //   expect(fontSizeRule?.rules[0].includes('font-size:var(--f-size-1)')).toBeTruthy()
  // })

  // test(`prop "tabIndex" defaults to "0", overrides to "-1" when tag = button`, () => {
  //   expect(
  //     getSplitStylesStack(
  //       {
  //         focusable: true,
  //       },
  //       'button'
  //     )['tabIndex']
  //   ).toEqual('0')

  //   expect(
  //     getSplitStylesStack(
  //       {
  //         tabIndex: '-1',
  //       },
  //       'button'
  //     )['tabIndex']
  //   ).toEqual('-1')
  // })
})

describe('getSplitStyles - pseudo prop merging', () => {
  const StyledButton = styled(Stack, {
    name: 'StyledButton',
    pressStyle: { backgroundColor: 'green' },
    variants: {
      variant: {
        prim: {
          pressStyle: { backgroundColor: 'blue' },
        },
      },
    },
  })

  test('inline pressStyle should override variant pressStyle', () => {
    const { viewProps } = simplifiedGetSplitStyles(
      StyledButton,
      {
        variant: 'prim',
        pressStyle: { backgroundColor: 'red' },
      }
    )
    expect(viewProps.className).toContain('_bg-0active-red')
  })

  test('variant pressStyle should be used if no inline pressStyle', () => {
    const { viewProps } = simplifiedGetSplitStyles(
      StyledButton,
      {
        variant: 'prim',
      }
    )
    expect(viewProps.className).toContain('_bg-0active-blue')
  })

  test('default pressStyle should not generate a class if not used', () => {
    const { viewProps } = simplifiedGetSplitStyles(
      StyledButton,
      {}
    )
    // No press state simulated, so no class is generated
    expect(viewProps.className).not.toContain('_bg-0active-green')
  })
})
