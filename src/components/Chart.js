import React from "react";
import { Box } from "@chakra-ui/react";
import {
  LineChart,
  XAxis,
  YAxis,
  Line,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export const Chart = ({ data }) => {
  const longestLabelLength = data
    .map((c) => c.baseFee.toString())
    .reduce((acc, cur) => (cur.length > acc ? cur.length : acc), 0);

  return (
    <Box w="70%" flex="1">
      <ResponsiveContainer height={400}>
        <LineChart
          data={data}
          margin={{ top: 0, left: 0, bottom: 0, right: 0 }}
        >
          <XAxis
            dataKey="block"
            type="number"
            domain={["dataMin", "dataMax"]}
          />
          <YAxis
            width={longestLabelLength * 14}
            domain={[
              (dataMin) => Math.max(0, Math.round(dataMin * 0.8)),
              (dataMax) => Math.round(dataMax * 1.2),
            ]}
          />
          <Line
            type="monotone"
            dataKey="baseFee"
            stroke="#007A99"
            dot={false}
          />
          <Tooltip
            labelFormatter={(label) => `Block ${label}`}
            formatter={(value) => [value, "Base Fee"]}
          />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};
