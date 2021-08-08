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

const provider = new StaticJsonRpcProvider(
  "https://api.mycryptoapi.com/eth",
  1
);

function IndexPage() {
  const [blocks, setBlocks] = useState([]);

  useEffect(() => {
    provider.send("eth_feeHistory", [100, "latest", []]).then((result) => {
      setBlocks(
        result.baseFeePerGas.map((b, i) => ({
          block: result.oldestBlock + i,
          baseFee: parseInt(formatUnits(b, "gwei"), 16),
        }))
      );
    });
  }, []);

  const oldestBlock = blocks.length > 0 ? blocks[0] : undefined;
  const latestBlock = blocks.length > 0 ? blocks[blocks.length - 1] : undefined;
  const percentageChange =
    oldestBlock &&
    latestBlock &&
    ((latestBlock.baseFee - oldestBlock.baseFee) / oldestBlock.baseFee) * 100;

  return (
    <Box p={8}>
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
              {percentageChange && (
                <StatArrow
                  type={percentageChange > 0 ? "increase" : "decrease"}
                />
              )}
              {percentageChange ? percentageChange.toFixed(2) : "?"}% in the
              last 100 blocks
            </StatHelpText>
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
