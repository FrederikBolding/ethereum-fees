import { DateTime } from "luxon";
import React, { useState } from "react";

import { useInterval } from "../hooks/useInterval";

const format = (val) => DateTime.fromMillis(val).toRelative();

export const TimeElapsed = ({ value }) => {
  const [timeElapsed, setTimeElapsed] = useState(format(value));

  useInterval(
    () => {
      setTimeElapsed(format(value));
    },
    1000,
    true,
    [value]
  );

  return <>{timeElapsed}</>;
};
