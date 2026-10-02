#!/bin/sh
export JAVA_HOME=/opt/homebrew/opt/openjdk@17/libexec/openjdk.jdk/Contents/Home
export ANDROID_HOME=/opt/homebrew/share/android-commandlinetools

cd "$(dirname "$0")/../android" || exit 1

./gradlew assembleRelease -PreactNativeArchitectures=arm64-v8a,armeabi-v7a
status=$?

./gradlew --stop >/dev/null 2>&1
pkill -f KotlinCompileDaemon 2>/dev/null

if [ $status -eq 0 ]; then
  open app/build/outputs/apk/release/
fi
exit $status
