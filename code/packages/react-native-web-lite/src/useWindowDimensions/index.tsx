/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 * @flow strict-local
 */

import React from 'react'

import type { DisplayMetrics } from '../Dimensions/index'
import Dimensions from '../Dimensions/index'

export default function useWindowDimensions(): DisplayMetrics {
  const [dims, setDims] = React.useState(() => Dimensions.get('window'))
  React.useEffect(() => {
    function handleChange({ window }) {
      if (window != null) {
        setDims(window)
      }
    }
    Dimensions.addEventListener('change', handleChange)
    // We might have missed an update between calling `get` in render and
    // `addEventListener` in this handler, so we set it here. If there was
    // no change, React will filter out this update as a no-op.
    setDims(Dimensions.get('window'))
    return () => {
      Dimensions.removeEventListener('change', handleChange)
    }
  }, [])
  return dims
}
