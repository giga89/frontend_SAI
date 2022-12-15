import { captureException } from "@sentry/nextjs";
import {
  WalletNotConnectedError,
  WalletSignTransactionError,
} from "@solana/wallet-adapter-base";
import {
  useAnchorWallet,
  useConnection,
  useWallet,
} from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import Link from "next/link";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import { useCluster } from "~/components/ClusterProvider";
import { Text } from "~/components/common/Text";
import { Button } from "~/components/controls/Button";
import { Flex } from "~/components/layout/Flex";
import { useSwapStateAccount } from "~/components/SwapStateAccountGuard";
import { Translation } from "~/i18n/Translation";
import { useTranslation } from "~/i18n/useTranslation";
import { usePaymentReference } from "~/pages/swap/[swapAccount]/checkout/components/ReferenceRetriever";
import { swapToken } from "~/programs";

export const SwapTrigger = () => {
  const { cluster } = useCluster();

  const anchorWallet = useAnchorWallet();
  const { sendTransaction } = useWallet();

  const { connection } = useConnection();
  const { swapAccount, mint, quantity } = useSwapStateAccount();

  const reference = usePaymentReference();

  const successMessage = useTranslation("swap.checkout.transaction.success");
  const pendingMessage = useTranslation("swap.checkout.transaction.pending");
  const errorMessage = useTranslation("swap.checkout.transaction.error");
  const solscanMessage = useTranslation("generic.solscan.check");

  const [loading, setLoading] = useState(false);

  const handleDirectPayment = useCallback(async () => {
    if (loading) {
      return;
    }

    try {
      if (!anchorWallet) {
        throw new WalletNotConnectedError();
      }

      setLoading(true);

      const chainInfo = await connection.getLatestBlockhashAndContext();

      const transaction = await swapToken(
        cluster,
        connection,
        anchorWallet,
        swapAccount,
        mint,
        quantity
      );

      transaction.instructions[0].keys.push({
        pubkey: new PublicKey(reference),
        isSigner: false,
        isWritable: false,
      });

      transaction.recentBlockhash = chainInfo.value.blockhash;
      transaction.lastValidBlockHeight = chainInfo.value.lastValidBlockHeight;
      transaction.feePayer = anchorWallet.publicKey;

      toast.promise(() => sendTransaction(transaction, connection), {
        pending: pendingMessage,
        success: {
          render: ({ data: signature }) => {
            if (signature) {
              return (
                <Flex direction="col">
                  <Text>{successMessage}</Text>

                  <Flex pt={1}>
                    <Link
                      href={`https://solscan.io/tx/${signature}${
                        cluster ? `?cluster=${cluster}` : ""
                      }`}
                      target="_blank"
                    >
                      <Text
                        color="text-blue-700"
                        weight="semibold"
                        decoration="underline"
                      >
                        {solscanMessage}
                      </Text>
                    </Link>
                  </Flex>
                </Flex>
              );
            }

            return errorMessage;
          },
        },
        error: errorMessage,
      });
    } catch (e) {
      if (e instanceof WalletNotConnectedError) {
        return;
      }

      if (e instanceof WalletSignTransactionError) {
        if (e.error.code === 4001) {
          return;
        }
      }

      captureException(e);
    } finally {
      setLoading(false);
    }
  }, [
    loading,
    anchorWallet,
    connection,
    cluster,
    swapAccount,
    mint,
    quantity,
    reference,
    pendingMessage,
    errorMessage,
    sendTransaction,
    successMessage,
    solscanMessage,
  ]);

  return (
    <Button.Neutral
      disabled={loading}
      loading={loading}
      size="small"
      onClick={handleDirectPayment}
    >
      <Translation id="citizenship.checkout.payDirectly.action.title" />
    </Button.Neutral>
  );
};

const Loader = () => (
  <Button.Neutral disabled size="small">
    <Translation id="citizenship.checkout.payDirectly.action.title" />
  </Button.Neutral>
);

SwapTrigger.Loader = Loader;