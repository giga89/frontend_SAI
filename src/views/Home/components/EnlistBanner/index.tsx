import Link from "next/link";
import { Text } from "~/components/common/Text";
import { Button } from "~/components/controls/Button";
import { BlurBackground } from "~/components/layout/BlurBackground";
import { Flex } from "~/components/layout/Flex";
import { Translation } from "~/i18n/Translation";
import { HumanImage } from "~/views/Home/components/EnlistBanner/HumanImage";

export const EnlistBanner = () => (
  <Flex
    align="center"
    className="md:grid md:grid-cols-2"
    direction="col"
    mdDirection="row"
    justify="center"
  >
    <Flex justify="center">
      <HumanImage />
    </Flex>
    <BlurBackground className="space-y-5" direction="col" py={5} px={8}>
      <Text
        color="white"
        className="tracking-tight "
        weight="extrabold"
        size="4xl"
        mdSize="6xl"
      >
        <Translation id="Home.EnlistBanner.title" />
      </Text>

      <Text size="lg" mdSize="xl" color="gray-200">
        <Translation id="Home.EnlistBanner.description.0" />
      </Text>

      <Text color="white" weight="semibold" size="lg" mdSize="xl">
        <Translation id="Home.EnlistBanner.description.1" />
      </Text>

      <Flex justify="end" pt={3}>
        <Link href="https://forms.gle/7VVMXHE5nDVdjcPL8">
          <a target="_blank">
            <Button
              as="span"
              bgColor="green-100"
              hoverBgColor="green-200"
              textColor="green-700"
            >
              <Translation id="Home.EnlistBanner.action.title" />
            </Button>
          </a>
        </Link>
      </Flex>
    </BlurBackground>
  </Flex>
);
