/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 * @format
 */

'use strict';

import infoLog from '../infoLog';

// Handler interface removed

/**
 * A utility for tracking stalls in the JS event loop that prevent timers and
 * other events from being processed in a timely manner.
 *
 * The "stall" time is defined as the amount of time in access of the acceptable
 * threshold, which is typically around 100-200ms. So if the treshold is set to
 * 100 and a timer fires 150 ms later than it was scheduled because the event
 * loop was tied up, that would be considered a 50ms stall.
 *
 * By default, logs stall events to the console when installed. Can also be
 * queried with `getStats`.
 */
const JSEventLoopWatchdog = {
  getStats: function() {
    return {stallCount, totalStallTime, longestStall, acceptableBusyTime};
  },
  reset: function() {
    infoLog('JSEventLoopWatchdog: reset');
    totalStallTime = 0;
    stallCount = 0;
    longestStall = 0;
    lastInterval = window.performance.now();
  },
  addHandler: function(handler) {
    handlers.push(handler);
  },
  install: function({thresholdMS}) {
    acceptableBusyTime = thresholdMS;
    if (installed) {
      return;
    }
    installed = true;
    lastInterval = window.performance.now();
    function iteration() {
      const now = window.performance.now();
      const busyTime = now - lastInterval;
      if (busyTime >= thresholdMS) {
        const stallTime = busyTime - thresholdMS;
        stallCount++;
        totalStallTime += stallTime;
        longestStall = Math.max(longestStall, stallTime);
        let msg =
          `JSEventLoopWatchdog: JS thread busy for ${busyTime}ms. ` +
          `${totalStallTime}ms in ${stallCount} stalls so far. `;
        handlers.forEach(handler => {
          msg += handler.onStall({lastInterval, busyTime}) || '';
        });
        infoLog(msg);
      }
      handlers.forEach(handler => {
        handler.onIterate && handler.onIterate();
      });
      lastInterval = now;
      setTimeout(iteration, thresholdMS / 5);
    }
    iteration();
  },
};

let acceptableBusyTime = 0;
let installed = false;
let totalStallTime = 0;
let stallCount = 0;
let longestStall = 0;
let lastInterval = 0;
const handlers = [];

export default JSEventLoopWatchdog;
