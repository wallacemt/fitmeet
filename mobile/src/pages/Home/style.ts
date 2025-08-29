import {StyleSheet} from 'react-native';
import {themes} from '../../assets/themes';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonFixed: {
    position: 'absolute',
    backgroundColor: themes.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    bottom: 30,
    right: 23,
  },
});
