/*
 * Delayed Summary to show BehaviorSubject is not a hot observable. It holds the value & emits when subscribed to.
 */

import React, { useState, useEffect } from "react";
import Summary from "./Summary";

const DelayedSummary = (props) => {
  const [callApp, setCallApp] = useState(false);

  useEffect(() => {
    setTimeout(() => setCallApp(true), 3000);
  }, []);

  return callApp ? <Summary /> : null;
};

export default DelayedSummary;
