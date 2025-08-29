import {StyleSheet} from 'react-native';
import {themes} from '../../../assets/themes';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingTop: 60,
    paddingHorizontal: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 60,
  },
  form: {
    flexDirection: 'column',
    marginTop: 21,
    gap: 34,
  },
  visibility: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  btnVisibility: {
    backgroundColor: '#fff',
    padding: 10,
    color: themes.colors.softWhite,
    borderRadius: 5
  },
  isSelected: {
    backgroundColor: themes.colors.black,
    color: themes.colors.white
  },
});
