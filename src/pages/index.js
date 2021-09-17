import React, { useEffect, useState } from "react";
import {
  Box,
  Text,
  Heading,
  Stat,
  StatGroup,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  VStack,
  Link,
} from "@chakra-ui/react";
import { Chart } from "../components/Chart";
import { StaticJsonRpcProvider } from "@ethersproject/providers";
import { formatUnits } from "@ethersproject/units";
import { estimateFees } from "@mycrypto/gas-estimation";
import Seo from "../components/SEO";

const provider = new StaticJsonRpcProvider(
  "https://api.mycryptoapi.com/eth",
  1
);

const formatGwei = (value, decimals = 2) =>
  parseFloat(formatUnits(value, "gwei"), 10).toFixed(decimals);

function IndexPage() {
  const [blocks, setBlocks] = useState([]);
  const [estimate, setEstimate] = useState(undefined);

  useEffect(() => {
    provider.send("eth_feeHistory", [100, "latest", []]).then((result) => {
      setBlocks(
        result.baseFeePerGas.map((b, i) => ({
          block: parseInt(result.oldestBlock, 16) + i,
          baseFee: formatGwei(b),
        }))
      );
    });
    estimateFees(provider).then((e) => setEstimate(e));
  }, []);

  const oldestBlock = blocks.length > 0 ? blocks[0] : undefined;
  const latestBlock = blocks.length > 0 ? blocks[blocks.length - 1] : undefined;
  const percentageChange =
    oldestBlock &&
    latestBlock &&
    ((latestBlock.baseFee - oldestBlock.baseFee) / oldestBlock.baseFee) * 100;

  return (
    <Box p={8}>
      <Seo />
      <VStack>
        <Heading>Ethereum Fees</Heading>
        <Chart data={blocks} />
        <StatGroup
          w="70%"
          borderRadius="12px"
          border="1px"
          p="3"
          borderColor="#007A99"
        >
          <Stat>
            <StatLabel>Latest Base Fee</StatLabel>
            <StatNumber>
              {latestBlock ? latestBlock.baseFee : "?"} Gwei
            </StatNumber>
            <StatHelpText>
              {percentageChange !== undefined && percentageChange !== 0 && (
                <StatArrow
                  type={percentageChange > 0 ? "increase" : "decrease"}
                />
              )}
              {percentageChange !== undefined
                ? percentageChange.toFixed(2)
                : "?"}
              % in the last 100 blocks
            </StatHelpText>
          </Stat>
          <Stat>
            <StatLabel>Recommended Max Fee</StatLabel>
            <StatNumber>
              {estimate?.maxFeePerGas
                ? formatGwei(estimate.maxFeePerGas, 0)
                : "?"}{" "}
              Gwei
            </StatNumber>
            <StatHelpText>Based on the latest base fee</StatHelpText>
          </Stat>
          <Stat>
            <StatLabel>Recommended Priority Fee</StatLabel>
            <StatNumber>
              {estimate?.maxPriorityFeePerGas
                ? formatGwei(estimate.maxPriorityFeePerGas, 0)
                : "?"}{" "}
              Gwei
            </StatNumber>
            <StatHelpText>Based on fees paid in the last 10 blocks</StatHelpText>
          </Stat>
        </StatGroup>
        <Text>
          Powered by{" "}
          <Link isExternal href="https://mycrypto.com">
            MyCrypto
          </Link>
        </Text>
      </VStack>
    </Box>
  );
}

export default IndexPage;
