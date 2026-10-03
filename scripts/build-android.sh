#!/bin/sh
export JAVA_HOME=/opt/homebrew/opt/openjdk@17/libexec/openjdk.jdk/Contents/Home
export ANDROID_HOME=/opt/homebrew/share/android-commandlinetools

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT" || exit 1

if [ ! -d android ] || [ "$1" = "--clean" ]; then
  npx expo prebuild --platform android --no-install ${1:+--clean} || exit 1
fi

if [ ! -f android/local.properties ]; then
  echo "sdk.dir=$ANDROID_HOME" > android/local.properties
fi

cd android || exit 1

./gradlew assembleRelease -PreactNativeArchitectures=arm64-v8a,armeabi-v7a
status=$?

./gradlew --stop >/dev/null 2>&1
pkill -f KotlinCompileDaemon 2>/dev/null

if [ $status -eq 0 ]; then
  mv -f app/build/outputs/apk/release/app-release.apk app/build/outputs/apk/release/maab.apk
  osascript -l JavaScript -e "ObjC.import('AppKit'); \$.NSWorkspace.sharedWorkspace.setIconForFileOptions(\$.NSImage.alloc.initWithContentsOfFile('$ROOT/assets/images/icon.png'), '$ROOT/android/app/build/outputs/apk/release/maab.apk', 0)" >/dev/null 2>&1
  open app/build/outputs/apk/release/
fi
exit $status
