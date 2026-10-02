import { Platform } from "react-native";

const FS: typeof import("expo-file-system") | null =
  Platform.OS === "web" ? null : require("expo-file-system");

const pending = new Map<string, Promise<void>>();

function target(url: string) {
  if (!FS) return null;
  const [folder, name] = url.split("/").slice(-2);
  const dir = new FS.Directory(FS.Paths.document, "recitations", folder);
  return { dir, name, file: new FS.File(dir, name) };
}

export function cacheAudio(url: string) {
  if (!FS || pending.has(url)) return;
  const place = target(url);
  if (!place || place.file.exists) return;
  const { dir, name, file } = place;
  const task = (async () => {
    dir.create({ intermediates: true, idempotent: true });
    const part = new FS.File(dir, `${name}.part`);
    await FS.File.downloadFileAsync(url, part, { idempotent: true });
    if (part.size > 0) await part.move(file);
    else part.delete();
  })()
    .catch(() => {})
    .finally(() => pending.delete(url));
  pending.set(url, task);
}

export function isAudioCached(url: string) {
  try {
    const place = target(url);
    return !!place?.file.exists && place.file.size > 0;
  } catch {
    return false;
  }
}

export function audioSource(url: string) {
  try {
    const place = target(url);
    if (place?.file.exists && place.file.size > 0) return place.file.uri;
  } catch {}
  cacheAudio(url);
  return url;
}

function recitationsDir() {
  return FS ? new FS.Directory(FS.Paths.document, "recitations") : null;
}

export function recitationsSize() {
  try {
    const dir = recitationsDir();
    return dir?.exists ? (dir.size ?? 0) : 0;
  } catch {
    return 0;
  }
}

export function clearRecitations() {
  try {
    const dir = recitationsDir();
    if (dir?.exists) dir.delete();
  } catch {}
}
