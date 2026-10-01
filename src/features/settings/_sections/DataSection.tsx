import { resetAllProgress, resetAzkarData } from "@/store/Slices/AzkarSlice";
import { resetSettings } from "@/store/Slices/SettingsSlice";
import { clearApiCache, useAppDispatch } from "@/store/Store";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import ResetDialog, { ResetDialogContent } from "../_ui/ResetDialog";
import SettingsActionRow from "../_ui/SettingsActionRow";

type ResetKind = "progress" | "cache" | "settings" | "all";

export default function DataSection() {
  const { t } = useTranslation("settings");
  const dispatch = useAppDispatch();
  const [pending, setPending] = useState<ResetKind | null>(null);

  const actions: Record<ResetKind, ResetDialogContent> = {
    progress: {
      icon: "reset",
      title: t("confirm.progress.title"),
      message: t("confirm.progress.message"),
      confirmLabel: t("confirm.progress.action"),
      doneText: t("confirm.progress.done"),
      danger: true,
      onConfirm: () => dispatch(resetAllProgress()),
    },
    cache: {
      icon: "clearCache",
      title: t("confirm.cache.title"),
      message: t("confirm.cache.message"),
      confirmLabel: t("confirm.cache.action"),
      doneText: t("confirm.cache.done"),
      danger: false,
      onConfirm: () => clearApiCache(dispatch),
    },
    settings: {
      icon: "resetSettings",
      title: t("confirm.settings.title"),
      message: t("confirm.settings.message"),
      confirmLabel: t("confirm.settings.action"),
      doneText: t("confirm.settings.done"),
      danger: false,
      onConfirm: () => dispatch(resetSettings()),
    },
    all: {
      icon: "resetAll",
      title: t("confirm.all.title"),
      message: t("confirm.all.message"),
      confirmLabel: t("confirm.all.action"),
      doneText: t("confirm.all.done"),
      danger: true,
      onConfirm: () => {
        dispatch(resetAzkarData());
        dispatch(resetSettings());
        clearApiCache(dispatch);
      },
    },
  };

  return (
    <>
      <View className="gap-3">
        <SettingsActionRow
          icon="clearCache"
          label={t("clearCache")}
          onPress={() => setPending("cache")}
        />
        <SettingsActionRow
          icon="resetSettings"
          label={t("resetSettings")}
          onPress={() => setPending("settings")}
        />
        <SettingsActionRow
          icon="reset"
          label={t("resetProgress")}
          danger
          onPress={() => setPending("progress")}
        />
        <SettingsActionRow
          icon="resetAll"
          label={t("resetAll")}
          danger
          onPress={() => setPending("all")}
        />
      </View>
      <ResetDialog
        content={pending ? actions[pending] : null}
        onClose={() => setPending(null)}
      />
    </>
  );
}
