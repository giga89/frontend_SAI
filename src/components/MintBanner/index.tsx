import { useFeature } from "@growthbook/growthbook-react";
import Link from "next/link";
import { Text } from "~/components/common/Text";
import { Flex } from "~/components/layout/Flex";
import { Translation } from "~/i18n/Translation";
import { getRoute } from "~/utils/getRoute";

export const CitizenInfoBanner = () => {
  const isCitizenInfoBannerDisabled = useFeature(
    "sai-frontend-enable-mint-banner"
  ).off;

  const isEnabledCitizenshipPurchase = useFeature(
    "sai-frontend-enabled-citizenship-purchase"
  ).off;

  if (isCitizenInfoBannerDisabled) {
    return null;
  }

  return (
    <Flex justify="center" pb={5}>
      <Flex
        align="center"
        className="bg-white rounded-lg w-full xl:max-w-2xl space-x-2"
        direction="col"
        px={5}
        py={3}
        justify="between"
        mdDirection="row"
      >
        <Flex direction="col">
          <Text weight="semibold">
            <Translation id="citizenBanner.title" />
          </Text>
          <Text>
            <Translation id="citizenBanner.subtitle" />
          </Text>
        </Flex>

        {isEnabledCitizenshipPurchase && (
          <Link href={getRoute("/citizenship")}>
            <a className="underline cursor-pointer text-right">
              <Translation id="citizenBanner.action.title" />
            </a>
          </Link>
        )}
      </Flex>
    </Flex>
  );
};
