import { useWallet } from "@solana/wallet-adapter-react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
import { Text } from "~/components/common/Text";
import { Button } from "~/components/controls/Button";
import { BlurBackground } from "~/components/layout/BlurBackground";
import { Container } from "~/components/layout/Container";
import { Flex } from "~/components/layout/Flex";
import { Logo } from "~/components/layout/Header";
import { Wallet } from "~/components/Wallet";
import { appendQueryParams } from "~/utils/appendQueryParams";
import { getRoute } from "~/utils/getRoute";
import { FactionGuard, useFaction } from "./FactionGuard";

const ImageContainer = styled.div`
  width: 100%;

  min-width: 280px;
  max-width: 280px;
`;

const CitizenshipComponent = () => {
  const { connected } = useWallet();
  const query = useRouter().query;
  const faction = useFaction();

  return (
    <>
      <Head>
        <title>Citizenship - StarAtlasItalia</title>
      </Head>

      <Container>
        <Flex direction="col" align="center" justify="center" pt={52}>
          <BlurBackground p={8} className="max-w-screen-md" direction="col">
            <Flex pb={5}>
              <Logo />
            </Flex>
            <Flex direction="col-reverse" mdDirection="row">
              <Flex>
                <Flex
                  direction="col"
                  className="space-y-4 mr-5 lg:mr-5"
                  pt={10}
                  lgPt={0}
                >
                  <Text size="4xl" weight="bold" color="text-white">
                    Round Cittadino
                  </Text>
                  <Text color="text-gray-200">
                    L’acquisizione del badge di cittadino ti permette di
                    ottenere l’accesso a tutti i servizi, le attività e i
                    vantaggi in-game relativi alla possibilità di intraprendere
                    un percorso di gioco che include una carriera nella DAO.
                  </Text>
                  <Text color="text-gray-200" weight="bold">
                    Connetti il tuo wallet per iniziare.
                  </Text>
                </Flex>
              </Flex>

              <Flex align="center" justify="center">
                <ImageContainer>
                  <img
                    className="rotate-12"
                    alt="Citizenship card"
                    src={`/images/cards/card-${faction}.webp`}
                  />
                </ImageContainer>
              </Flex>
            </Flex>

            <Flex pt={5} className="space-x-3">
              <Wallet />

              <Link
                href={appendQueryParams(
                  getRoute("/citizenship/checkout"),
                  (query || {}) as Record<string, any>
                )}
                passHref
              >
                <Button.Neutral
                  as="a"
                  className="cursor-pointer"
                  disabled={!connected}
                  size="small"
                >
                  Next
                </Button.Neutral>
              </Link>
            </Flex>
          </BlurBackground>
        </Flex>
      </Container>
    </>
  );
};

const Citizenship = () => (
  <FactionGuard>
    <CitizenshipComponent />
  </FactionGuard>
);

export default Citizenship;
