import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export function rw(w: any) {
  const responsiveWidth = (w * width) / 100;
  return responsiveWidth;
}

export function rh(w: any) {
  const responsiveHeight = (w * height) / 100;
  return responsiveHeight;
}
