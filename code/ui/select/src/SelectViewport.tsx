import { FloatingFocusManager } from '@floating-ui/react'
import { AdaptPortalContents, useAdaptIsActive } from '@tamagui/adapt'
import { AnimatePresence } from '@tamagui/animate-presence'
import { useComposedRefs } from '@tamagui/compose-refs'
import { isAndroid, isIos, isWeb, useIsomorphicLayoutEffect } from '@tamagui/constants'
import { styled } from '@tamagui/core'
import { ThemeableStack } from '@tamagui/stacks'
import { VIEWPORT_NAME } from './constants'
import {
  ForwardSelectContext,
  useSelectContext,
  useSelectItemParentContext,
} from './context'
import type { SelectViewportExtraProps } from './types'
import { USE_NATIVE_PORTAL } from '@tamagui/portal'
import { useId } from 'react'

/* -------------------------------------------------------------------------------------------------
 * SelectViewport
 * -----------------------------------------------------------------------------------------------*/

export const SelectViewportFrame = styled(ThemeableStack, {
  name: VIEWPORT_NAME,

  variants: {
    unstyled: {
      false: {
        size: '$2',
        backgroundColor: '$background',
        elevate: true,
        bordered: true,
        userSelect: 'none',
        outlineWidth: 0,
      },
    },

    size: {
      '...size': (val, { tokens }) => {
        return {
          borderRadius: tokens.radius[val] ?? val,
        }
      },
    },
  } as const,

  defaultVariants: {
    unstyled: process.env.TAMAGUI_HEADLESS === '1',
  },
})

const needsRepropagation = isAndroid || (isIos && !USE_NATIVE_PORTAL)

export const SelectViewport = SelectViewportFrame.styleable<SelectViewportExtraProps>(
  function SelectViewport(props, forwardedRef) {
    const { scope, children, disableScroll, ...viewportProps } = props
    const context = useSelectContext(scope)
    const itemContext = useSelectItemParentContext(scope)
    const isAdapted = useAdaptIsActive(context.adaptScope)

    const composedRefs = useComposedRefs(
      // @ts-ignore TODO react 19 type needs fix
      forwardedRef,
      context.floatingContext?.refs.setFloating
    )

    useIsomorphicLayoutEffect(() => {
      if (context.update) {
        context.update()
      }
    }, [isAdapted])

    if (itemContext.shouldRenderWebNative) {
      return <>{children}</>
    }

    if (isAdapted || !isWeb) {
      let content = children

      if (needsRepropagation) {
        content = (
          <ForwardSelectContext itemContext={itemContext} context={context}>
            {content}
          </ForwardSelectContext>
        )
      }

      return (
        <AdaptPortalContents scope={context.adaptScope}>{content}</AdaptPortalContents>
      )
    }

    if (!itemContext.interactions) {
      if (process.env.NODE_ENV === 'development') {
        console.warn(`No interactions provided to Select, potentially missing Adapt`)
      }

      return null
    }

    const {
      style,
      // remove this, it was set to "Select" always
      className,
      ...floatingProps
    } = itemContext.interactions.getFloatingProps()

    return (
      <>
        {!disableScroll && !props.unstyled && (
          <style
            dangerouslySetInnerHTML={{
              __html: selectViewportCSS,
            }}
          />
        )}
        <AnimatePresence>
          {context.open ? (
            <FloatingFocusManager context={context.floatingContext!} modal={false}>
              <SelectViewportFrame
                key="select-viewport"
                size={itemContext.size}
                role="presentation"
                {...viewportProps}
                {...style}
                {...floatingProps}
                {...(!props.unstyled && {
                  overflowY: disableScroll ? undefined : (style.overflow ?? 'auto'),
                })}
                ref={composedRefs}
              >
                {children}
              </SelectViewportFrame>
            </FloatingFocusManager>
          ) : null}
        </AnimatePresence>

        {/* keep in dom to allow for portal to the trigger... very hacky! we should fix */}
        {!context.open && <div style={{ display: 'none' }}>{props.children}</div>}
      </>
    )
  }
)

const selectViewportCSS = `
.is_SelectViewport {
  scrollbar-width: none;
  -webkit-overflow-scrolling: touch;
  overscroll-behavior: contain;
}

.is_SelectViewport::-webkit-scrollbar{
  display:none
}
`
