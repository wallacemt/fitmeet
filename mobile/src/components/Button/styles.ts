import {StyleSheet} from 'react-native';
import {themes} from '../../assets/themes';

export const styles = StyleSheet.create({
  default: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    backgroundColor: themes.colors.primary,
    height: 44,
  },
  outiline: {
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: themes.colors.primaryA2,
    backgroundColor: 'white',
    height: 44,
  },
  ghost: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    height: 44,
  },
  desctructive: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    color: themes.colors.white,
    backgroundColor: themes.colors.perigo,
    height: 44,
  },
  label: {
    fontFamily: themes.fonts.DMSans.bold,
    fontSize: 16,
    lineHeight: 24,
  },
  defaultLabel: {
    color: themes.colors.white,
  },
  outilineLabel: {
    color: themes.colors.primaryA2,
  },
  ghostLabel: {color: themes.colors.black},
  desctructiveLabel: {color: themes.colors.white},
  disabled: {opacity: 0.8},
});
