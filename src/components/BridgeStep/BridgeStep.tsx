import { ExpandMore } from "@mui/icons-material";
import {
  usePrepareWrappedDydxTokenBridge,
  useWrappedDydxTokenAllowance,
} from "../../generated";
import { WDYDX_CONTRACT } from "../Form/Form";
import { LoadingButton } from "@mui/lab";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Box,
  Grid,
  InputAdornment,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { ReceiverAddressInput } from "../ReceiverAddressInput/ReceiverAddressInput";
import { useContractWrite, useWaitForTransaction } from "wagmi";
import { toHex } from "viem";

type Props = {
  address: `0x${string}` | undefined;
  onSubmit: (allowanceAmount: bigint) => void;
  onRecipientChange: (recipient: string) => void;
  cosmosAddress: string | undefined;
  allowanceAmount: bigint | undefined;
};

export const BridgeStep = ({
  address,
  cosmosAddress,
  onSubmit,
  onRecipientChange,
  allowanceAmount,
}: Props) => {
  const [expanded, setExpanded] = useState(true);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // !approvalData.isError && approveWrite && approveWrite();
  };

  const { config: bridgeConfig, ...bridgeData } =
    usePrepareWrappedDydxTokenBridge({
      chainId: 1,
      account: address,
      args:
        (typeof allowanceAmount !== "undefined" &&
          typeof address !== "undefined" &&
          typeof cosmosAddress !== "undefined" && [
            allowanceAmount,
            toHex(cosmosAddress),
            `0x${""}`,
          ]) ||
        undefined,

      // amount: amountToBridge.toString(),
    });
  const {
    data: approveData,
    write: approveWrite,
    ...writeParams
  } = useContractWrite(bridgeConfig);

  const approvalTx = useWaitForTransaction({ hash: approveData?.hash });

  useEffect(() => {
    allowanceAmount && expanded && setExpanded(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allowanceAmount]);

  const allowanceAmountStr = allowanceAmount?.toString() || "";

  const formattedAllowance = allowanceAmount
    ? Number(
        allowanceAmount / BigInt(1e18) +
          "." +
          allowanceAmountStr.substring(
            Math.max(0, allowanceAmountStr.length - 18)
          )
      ).toString()
    : 0;

  return (
    <Box
      component="form"
      flexGrow={1}
      noValidate
      onSubmit={handleSubmit}
      sx={{ mt: 3 }}
    >
      <Grid item xs={12}>
        <Accordion expanded={expanded}>
          <AccordionSummary
            onClick={() => setExpanded(!expanded)}
            expandIcon={<ExpandMore />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Bridge Tokens</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box>
              <Typography>{formattedAllowance} DYDX</Typography>

              <ReceiverAddressInput
                value={cosmosAddress || ""}
                onChange={onRecipientChange}
              />
            </Box>

            <LoadingButton
              loading={
                //   approvalData.isLoading ||
                approvalTx.isLoading || writeParams?.isLoading
              }
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Bridge Tokens
            </LoadingButton>
          </AccordionDetails>
        </Accordion>{" "}
        <Box>
          {!!approvalTx.data && (
            <Alert
              severity={
                approvalTx.data.status === "success" ? "success" : "info"
              }
            >
              <Link
                target="_blank"
                referrerPolicy="no-referrer"
                href={`https://etherscan.io/tx/${approvalTx.data.transactionHash}`}
              >
                View Bridge TX on Etherscan
              </Link>
            </Alert>
          )}
        </Box>
      </Grid>
    </Box>
  );
};
