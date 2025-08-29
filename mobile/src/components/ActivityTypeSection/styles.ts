import {StyleSheet} from 'react-native';
import {themes} from '../../assets/themes';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 25,
    gap: 24,
  },
  containerSingle: {
    gap: 24,
    marginBottom: 26
  },
  title: {
    fontFamily: themes.fonts.BebasNeue.regular,
    fontSize: 28,
    lineHeight: 32,
    color: themes.colors.black,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 20,
    fontFamily: themes.fonts.DMSans.semiBold,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    
    gap: 9,
  },
  image: {
    width: 61,
    height: 61,
    borderRadius: 61 / 2,
  },
  selected:{
    borderWidth: 2,
    borderColor: themes.colors.primary
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10
  },
  edit:{
    position: 'absolute',
    right: 0
  }
});
