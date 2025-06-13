# Meme Generator

A React Native application for creating memes. Built with React Native, TypeScript, and NativeWind for styling.

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (>= 18)
- npm
- Ruby (for iOS development)
- Xcode (for iOS development)
- Android Studio (for Android development)
- CocoaPods (for iOS development)

## Installation

1. Clone the repository:

```sh
git clone <repository-url>
cd meme_generator
```

2. Install dependencies:

```sh
npm install
```

3. Install iOS dependencies (iOS only):

```sh
cd ios
bundle install
bundle exec pod install
cd ..
```

## Running the App

### Start Metro Bundler

```sh
npm start
```

### Run on iOS

```sh
npm run ios
```

### Run on Android

```sh
npm run android
```

## Available Scripts

- `npm start` - Start Metro bundler
- `npm run ios` - Run on iOS simulator
- `npm run android` - Run on Android emulator
- `npm run android:build` - Build Android release version
- `npm run android:release` - Run Android release version
- `npm run android:generate-apk` - Generate Android APK
- `npm run lint` - Run ESLint

## Project Structure

```
meme_generator/
├── src/               # Source code
├── android/          # Android specific files
├── ios/             # iOS specific files
├── node_modules/    # Dependencies
└── ...
```

## Dependencies

Key dependencies include:

- React Native
- TypeScript
- NativeWind (TailwindCSS for React Native)
- React Navigation
- Redux Toolkit
- React Native Image Picker
- And more (see package.json for complete list)

## Features

Currently, this app supports:

- Creating memes with custom text and images
- Text customization:
  - Adjusting text position and size
  - Changing text color
  - Adjusting text opacity
  - Adding/removing text background color
- Image customization:
  - Adjusting image opacity
- Element management:
  - Duplicating text elements
  - Duplicating image elements
  - Removing text elements
  - Removing image elements

## Troubleshooting

If you encounter any issues:

1. Make sure all dependencies are installed correctly
2. For iOS issues:
   - Run `cd ios && pod install`
   - Clean build folder in Xcode
3. For Android issues:
   - Clean project in Android Studio
   - Run `cd android && ./gradlew clean`

## Learn More

- [React Native Documentation](https://reactnative.dev)
- [NativeWind Documentation](https://www.nativewind.dev)
- [React Navigation Documentation](https://reactnavigation.org)
