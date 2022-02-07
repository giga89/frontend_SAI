import { TranslationId } from "~/i18n/translations/types";
import { iconRenderProp } from "~/types";
import { Routes } from "~/utils/getRoute";

export type MenuItem = {
  adminOnly?: boolean;
  name: TranslationId;
  external?: boolean;
  icon: iconRenderProp;
  needPbk?: boolean;
  route?: Routes | string;
};
