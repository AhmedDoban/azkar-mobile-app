import AppText from "@/components/ui/AppText";
import Icon from "@/components/ui/Icon";
import PressableScale from "@/components/ui/PressableScale";
import {
  getPage,
  getSurah,
  toArabicDigits,
} from "@/features/azkar/_data/quran";
import useThemeColors from "@/hooks/useThemeColors";
import {
  completeWird,
  endKhatma,
  startKhatma,
  undoWird,
  type KhatmaPlan,
} from "@/store/Slices/SettingsSlice";
import { useAppDispatch, useAppSelector } from "@/store/Store";
import * as Haptics from "expo-haptics";
import { Link } from "expo-router";
import { ReactNode, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import ResetDialog from "@/features/settings/_ui/ResetDialog";
import JuzPicker from "./JuzPicker";
import {
  khatmaWirds,
  pageCount,
  scheduledDay,
  wirdDate,
} from "../_data/khatma";

function Card({ children }: { children: ReactNode }) {
  return (
    <View className="gap-4 rounded-3xl border border-line bg-surface p-5">
      {children}
    </View>
  );
}

function Choice<T extends string>({
  value,
  options,
  onChange,
}: {
  value: T;
  options: { value: T; label: string }[];
  onChange: (value: T) => void;
}) {
  return (
    <View className="flex-row gap-2">
      {options.map((option) => {
        const selected = option.value === value;
        return (
          <PressableScale
            key={option.value}
            scaleTo={0.97}
            onPress={() => onChange(option.value)}
            accessibilityState={{ selected }}
            className={
              selected
                ? "flex-1 items-center rounded-2xl border border-main bg-main-soft py-3"
                : "flex-1 items-center rounded-2xl border border-line py-3"
            }
          >
            <AppText
              weight="bold"
              className={selected ? "text-main" : "text-main-gray"}
            >
              {option.label}
            </AppText>
          </PressableScale>
        );
      })}
    </View>
  );
}

function Stepper({
  label,
  value,
  min,
  max,
  step = 1,
  onChange,
  format,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
  format: (value: number) => string;
}) {
  const colors = useThemeColors();
  const change = (delta: number) => {
    const next = Math.min(max, Math.max(min, value + delta));
    if (next !== value) {
      Haptics.selectionAsync();
      onChange(next);
    }
  };
  return (
    <View className="flex-row items-center justify-between gap-3">
      <AppText className="flex-1 text-main-gray">{label}</AppText>
      <View className="flex-row items-center gap-3">
        <PressableScale
          onPress={() => change(-step)}
          onLongPress={() => change(-step * 10)}
          className="size-9 items-center justify-center rounded-full bg-main-soft"
        >
          <AppText weight="bold" className="text-lg text-main">
            −
          </AppText>
        </PressableScale>
        <AppText
          weight="bold"
          className="min-w-12 text-center text-lg"
          style={{ color: colors.ink }}
        >
          {format(value)}
        </AppText>
        <PressableScale
          onPress={() => change(step)}
          onLongPress={() => change(step * 10)}
          className="size-9 items-center justify-center rounded-full bg-main-soft"
        >
          <AppText weight="bold" className="text-lg text-main">
            +
          </AppText>
        </PressableScale>
      </View>
    </View>
  );
}

function KhatmaSetup() {
  const { t, i18n } = useTranslation("azkar");
  const dispatch = useAppDispatch();
  const ar = i18n.language === "ar";
  const num = (n: number) => (ar ? toArabicDigits(n) : String(n));

  const colors = useThemeColors();
  const [picking, setPicking] = useState<"from" | "to" | null>(null);
  const [scope, setScope] = useState<"all" | "juz">("all");
  const [fromJuz, setFromJuz] = useState(1);
  const [toJuz, setToJuz] = useState(30);
  const [mode, setMode] = useState<"days" | "pages">("days");
  const [days, setDays] = useState(30);
  const [perDay, setPerDay] = useState(20);

  const range =
    scope === "all" ? { from: 1, to: 30 } : { from: fromJuz, to: toJuz };
  const pages = pageCount(range.from, range.to);
  const totalDays =
    mode === "days" ? Math.min(days, pages) : Math.ceil(pages / perDay);
  const daily = Math.ceil(pages / totalDays);

  const start = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    dispatch(
      startKhatma({ fromJuz: range.from, toJuz: range.to, days: totalDays }),
    );
  };

  return (
    <View className="gap-4">
      <Card>
        <AppText weight="bold" className="text-lg">
          {t("khatmaWhat")}
        </AppText>
        <Choice
          value={scope}
          onChange={setScope}
          options={[
            { value: "all", label: t("khatmaWhole") },
            { value: "juz", label: t("khatmaJuzRange") },
          ]}
        />
        {scope === "juz" ? (
          <View className="flex-row gap-3">
            {[
              {
                key: "from" as const,
                label: t("khatmaFromJuz"),
                value: fromJuz,
              },
              { key: "to" as const, label: t("khatmaToJuz"), value: toJuz },
            ].map((field) => (
              <PressableScale
                key={field.key}
                scaleTo={0.97}
                onPress={() => setPicking(field.key)}
                className="flex-1 flex-row items-center justify-between rounded-2xl border border-line px-4 py-3"
              >
                <View className="gap-0.5">
                  <AppText className="text-xs text-main-gray">
                    {field.label}
                  </AppText>
                  <AppText weight="bold" className="text-lg text-main">
                    {num(field.value)}
                  </AppText>
                </View>
                <Icon name="chevronDown" size={18} tintColor={colors.main} />
              </PressableScale>
            ))}
          </View>
        ) : null}
        <JuzPicker
          visible={picking !== null}
          title={picking === "to" ? t("khatmaToJuz") : t("khatmaFromJuz")}
          value={picking === "to" ? toJuz : fromJuz}
          min={picking === "to" ? fromJuz : 1}
          max={picking === "to" ? 30 : toJuz}
          onSelect={(juz) =>
            picking === "to" ? setToJuz(juz) : setFromJuz(juz)
          }
          onClose={() => setPicking(null)}
        />
      </Card>

      <Card>
        <AppText weight="bold" className="text-lg">
          {t("khatmaHow")}
        </AppText>
        <Choice
          value={mode}
          onChange={setMode}
          options={[
            { value: "days", label: t("khatmaByDays") },
            { value: "pages", label: t("khatmaByWird") },
          ]}
        />
        {mode === "days" ? (
          <Stepper
            label={t("khatmaDaysLabel")}
            value={Math.min(days, pages)}
            min={1}
            max={Math.min(365, pages)}
            onChange={setDays}
            format={num}
          />
        ) : (
          <Stepper
            label={t("khatmaPagesLabel")}
            value={Math.min(perDay, pages)}
            min={1}
            max={pages}
            onChange={setPerDay}
            format={num}
          />
        )}
        <View className="rounded-2xl bg-main-soft px-4 py-3">
          <AppText className="text-center text-main">
            {t("khatmaPreview", {
              pages: num(daily),
              days: num(totalDays),
              total: num(pages),
            })}
          </AppText>
        </View>
      </Card>

      <PressableScale
        onPress={start}
        className="items-center rounded-full bg-main-fill py-4"
      >
        <AppText weight="bold" className="text-lg text-on-fill">
          {t("khatmaStart")}
        </AppText>
      </PressableScale>
    </View>
  );
}

function wirdLabel(from: number, to: number, ar: boolean) {
  const start = getPage(from).start;
  const end = getPage(to).end;
  const name = (surah: number) => {
    const s = getSurah(surah);
    return ar ? s?.name : s?.transliteration;
  };
  const num = (n: number) => (ar ? toArabicDigits(n) : String(n));
  return {
    start: `${name(start.surah)} ${num(start.ayah)}`,
    end: `${name(end.surah)} ${num(end.ayah)}`,
  };
}

function useDueLabel(plan: KhatmaPlan) {
  const { t, i18n } = useTranslation("azkar");
  const ar = i18n.language === "ar";
  const expected = scheduledDay(plan);
  return (index: number) => {
    const offset = index + 1 - expected;
    const days = Math.abs(offset);
    const title =
      offset === 0
        ? t("wirdToday")
        : offset === 1
          ? t("wirdTomorrow")
          : offset === 2
            ? t("wirdAfterTomorrow")
            : offset === -1
              ? t("wirdYesterday")
              : offset === -2
                ? t("wirdBeforeYesterday")
                : t(offset > 0 ? "wirdIn" : "wirdAgo", {
                    count: days,
                    days: ar ? toArabicDigits(days) : String(days),
                  });
    const date = wirdDate(plan, index).toLocaleDateString(
      ar ? "ar-EG" : "en-US",
      { weekday: "long", day: "numeric", month: "long" },
    );
    return { title, date };
  };
}

function KhatmaProgress() {
  const { t, i18n } = useTranslation("azkar");
  const dispatch = useAppDispatch();
  const plan = useAppSelector((s) => s.settings.khatma)!;
  const ar = i18n.language === "ar";
  const num = (n: number) => (ar ? toArabicDigits(n) : String(n));

  const wirds = khatmaWirds(plan);
  const total = wirds.length;
  const finished = plan.done >= total;
  const today = wirds[Math.min(plan.done, total - 1)];
  const next = wirds[plan.done + 1];
  const expected = scheduledDay(plan);
  const behind = Math.max(0, expected - 1 - plan.done);
  const progress = plan.done / total;
  const due = useDueLabel(plan);
  const current = due(plan.done);
  const upcomingDue = due(plan.done + 1);

  const [confirming, setConfirming] = useState(false);
  const ended = useRef(false);
  const confirmEnd = () => setConfirming(true);

  const scopeLabel =
    plan.fromJuz === 1 && plan.toJuz === 30
      ? t("khatmaWhole")
      : t("khatmaJuzScope", { from: num(plan.fromJuz), to: num(plan.toJuz) });

  if (finished) {
    return (
      <Card>
        <View className="items-center gap-3 py-4">
          <Icon name="checkCircle" size={48} />
          <AppText weight="bold" className="text-center text-xl">
            {t("khatmaDone")}
          </AppText>
          <AppText className="text-center text-main-gray">{scopeLabel}</AppText>
        </View>
        <PressableScale
          onPress={() => dispatch(endKhatma())}
          className="items-center rounded-full bg-main-fill py-4"
        >
          <AppText weight="bold" className="text-on-fill">
            {t("khatmaNew")}
          </AppText>
        </PressableScale>
      </Card>
    );
  }

  const label = wirdLabel(today.from, today.to, ar);
  const upcoming = next ? wirdLabel(next.from, next.to, ar) : null;

  return (
    <View className="gap-4">
      <Card>
        <View className="flex-row items-center justify-between">
          <AppText weight="bold" className="text-xl">
            {t("khatmaDay", { day: num(plan.done + 1), days: num(total) })}
          </AppText>
          <AppText className="text-sm text-main-gray">{scopeLabel}</AppText>
        </View>
        <View className="h-2.5 overflow-hidden rounded-full bg-main-soft">
          <View
            className="h-full rounded-full bg-main-fill"
            style={{ width: `${progress * 100}%` }}
          />
        </View>
        <AppText className="text-sm text-main-gray">
          {behind > 0
            ? t("khatmaBehind", { count: behind, days: num(behind) })
            : t("khatmaOnTrack")}
        </AppText>
      </Card>

      <Card>
        <AppText weight="bold" className="text-lg">
          {current.title}
        </AppText>
        <View className="gap-1">
          <AppText className="text-sm text-main-gray">{current.date}</AppText>
          <AppText weight="bold" className="text-main">
            {t("khatmaPages", { from: num(today.from), to: num(today.to) })}
          </AppText>
          <AppText className="text-main-gray">
            {t("khatmaRange", { start: label.start, end: label.end })}
          </AppText>
        </View>
        <View className="flex-row gap-3">
          <Link
            href={{
              pathname: "/mushaf/[id]",
              params: { id: getPage(today.from).start.surah, page: today.from },
            }}
            asChild
          >
            <PressableScale className="flex-1 items-center rounded-full border border-main py-3.5">
              <AppText weight="bold" className="text-main">
                {t("khatmaRead")}
              </AppText>
            </PressableScale>
          </Link>
          <PressableScale
            onPress={() => {
              Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Success,
              );
              dispatch(completeWird());
            }}
            className="flex-1 flex-row items-center justify-center gap-2 rounded-full bg-main-fill py-3.5"
          >
            <Icon name="check" size={18} tintColor="#ffffff" />
            <AppText weight="bold" className="text-on-fill">
              {t("khatmaMarkDone")}
            </AppText>
          </PressableScale>
        </View>
      </Card>

      {upcoming && next ? (
        <View className="gap-1 rounded-3xl border border-line px-5 py-4">
          <AppText weight="bold" className="text-main-gray">
            {`${upcomingDue.title} · ${upcomingDue.date}`}
          </AppText>
          <AppText className="text-main-gray">
            {`${t("khatmaPages", { from: num(next.from), to: num(next.to) })} · ${t(
              "khatmaRange",
              { start: upcoming.start, end: upcoming.end },
            )}`}
          </AppText>
        </View>
      ) : null}

      <View className="flex-row justify-between px-2">
        {plan.done > 0 ? (
          <PressableScale onPress={() => dispatch(undoWird())}>
            <AppText className="text-main-gray">{t("khatmaUndo")}</AppText>
          </PressableScale>
        ) : (
          <View />
        )}
        <PressableScale onPress={confirmEnd}>
          <AppText className="text-error">{t("khatmaEnd")}</AppText>
        </PressableScale>
      </View>

      <ResetDialog
        content={
          confirming
            ? {
                icon: "resetAll",
                title: t("khatmaEndTitle"),
                message: t("khatmaEndMessage"),
                confirmLabel: t("khatmaEnd"),
                doneText: t("khatmaEnded"),
                danger: true,
                onConfirm: () => {
                  ended.current = true;
                },
              }
            : null
        }
        onClose={() => {
          setConfirming(false);
          if (ended.current) {
            ended.current = false;
            dispatch(endKhatma());
          }
        }}
      />
    </View>
  );
}

export default function KhatmaTab() {
  const plan = useAppSelector((s) => s.settings.khatma);
  return plan ? <KhatmaProgress /> : <KhatmaSetup />;
}
