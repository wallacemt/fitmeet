import {StyleSheet} from 'react-native';
import {themes} from '../../../assets/themes';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'baseline',
    padding: 25,
    backgroundColor: themes.colors.white,
  },
  header: {
    marginTop: 40,
    gap: 12,
    width: '80%',
  },
  form: {
    width: '100%',
    marginTop: 23,
    gap: 16,
  },
  button: {
    marginTop: 30,
    marginBottom: 18,
    width: '80%',
    height: 44,
    alignSelf: 'center',
  },
});
