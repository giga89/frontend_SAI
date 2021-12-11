import Link from "next/link";
import React from "react";
import { Button } from "~/components/controls/Button";
import { Flex } from "~/components/layout/Flex";
import { MaxWidth } from "~/components/layout/MaxWidth";
import { ColorName } from "~/components/layout/Pane";
import { Description } from "~/components/pages/ShipList/components/Ship/components/Description";
import { Heading } from "~/components/pages/ShipList/components/Ship/components/Heading";
import { Image } from "~/components/pages/ShipList/components/Ship/components/Image";
import { Polygon } from "~/components/pages/ShipList/components/Ship/components/Polygon";
import { StarAtlasEntity } from "~/types";

type Props = { ship: StarAtlasEntity };

const shipColors: { [key: string]: ColorName } = {
  "xx-small": "white",
  "x-small": "indigo-300",
  small: "yellow-500",
  medium: "green-500",
  large: "pink-600",
  capital: "purple-400",
  commander: "red-600",
};

export const ShipCard = ({ ship }: Props) => {
  return (
    <div className="rounded-3xl relative bg-black overflow-hidden backdrop-filter backdrop-blur-lg bg-opacity-10">
      <Image src={ship.image} alt={ship.name} />
      <MaxWidth className="mx-auto" size="7xl">
        <div className="lg:float-right relative pb-8 sm:pb-16 md:pb-20 lg:max-w-lg xl:max-w-2xl lg:w-full">
          <Polygon />

          <main className="relative z-10 pt-5 mx-auto w-full px-4 sm:pt-12 sm:px-6 md:pt-16 lg:px-8">
            <div className="xl:pl-28 sm:text-center lg:text-left">
              <Heading
                color={shipColors[ship.attributes.class.toLowerCase()]}
                title={ship.name}
                subtitle={ship.attributes.class}
              />
              <div className="mt-3 sm:mt-5 sm:max-w-xl sm:mx-auto md:mt-5 lg:mx-0">
                <Description text={ship.description} />
              </div>
              <Flex
                direction="col"
                lgDirection="row"
                justify="center"
                lgJustify="start"
                className="mt-5 sm:mt-10"
              >
                <a
                  href={`https://play.staratlas.com/market/${ship.markets[0].id}`}
                  target="_blank"
                >
                  <Button
                    as="span"
                    bgColor="indigo-600"
                    hoverBgColor="indigo-700"
                    className="w-full lg:w-auto"
                    textColor="white"
                  >
                    Buy
                  </Button>
                </a>
                <Flex className="mt-3 lg:ml-3 lg:mt-0 w-full">
                  <Link
                    href={{
                      pathname: "/ships/[id]",
                      query: { id: ship._id },
                    }}
                  >
                    <a className="w-full lg:w-auto">
                      <Button
                        as="span"
                        bgColor="indigo-100"
                        hoverBgColor="indigo-200"
                        className="w-full lg:w-auto"
                        textColor="indigo-700"
                      >
                        Read more
                      </Button>
                    </a>
                  </Link>
                </Flex>
              </Flex>
            </div>
          </main>
        </div>
      </MaxWidth>
    </div>
  );
};
