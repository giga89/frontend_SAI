import { useCallback } from "react";
import { useAppStore } from "~/stores/useAppStore";
import { useAuthStore } from "~/stores/useAuthStore";
import { useBadgesStore } from "~/stores/useBadgesStore";
import { useFleetStore } from "~/stores/useFleetStore";
import { usePlayerStore } from "~/stores/usePlayerStore";

export const useClearAllStores = () =>
  useCallback(() => {
    useAppStore.setState({ lastConnectedWallet: null });
    useAuthStore.getState().clear();
    useFleetStore.getState().clear();
    useBadgesStore.getState().clear();
    usePlayerStore.getState().clear();
  }, []);
