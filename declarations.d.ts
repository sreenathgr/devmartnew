declare module '*.svg' {
  import React from 'react';
  import { SvgProps } from 'react-native-svg';
  const content: React.FC<SvgProps>;
  export default content;
}
declare module 'firebase/auth/react-native' {
  import { Persistence } from 'firebase/auth';
  export * from 'firebase/auth';
  export const getReactNativePersistence: (storage: any) => Persistence;
}
