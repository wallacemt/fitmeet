import {Dimensions, StyleSheet} from 'react-native';
import {themes} from '../../assets/themes';

export const styles = StyleSheet.create({
  container: {
    width: 403,
    paddingTop: 12,
    alignItems: 'center',
  },
  item: {
    width: Dimensions.get('window').width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileStatusContainer: {
    width: '90%',
    height: 230,
    backgroundColor: '#696969A1',
    padding: 20,
    borderRadius: 30,
    marginTop: 10,
  },
  iconContainer: {
    marginBottom: 21
  },
  icon: {},
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 20
  },
  level: {
    fontSize: 25,
    fontFamily: themes.fonts.DMSans.bold,
    color: themes.colors.black
  },
  acIcon: {
    width: 160,
    height: 75,
  },
  bar: {
    marginTop: 6,
    width: '100%',
    height: 6,
    borderRadius: 4,
    backgroundColor: themes.colors.whiteA4

  },
  medalBoxContainer: {
    alignContent: 'center',
    justifyContent: 'center',
    height: 230,
  },
  subtitle: {
    fontFamily: themes.fonts.DMSans.bold,
    color: themes.colors.black,
    fontSize: 14,
  },
  subtitleh3:{
    fontFamily: themes.fonts.DMSans.medium,
    color: themes.colors.blackTiny,
    fontSize: 12,
  },
  progressContainer:{
    marginTop: 19,
    justifyContent: 'space-between',
    gap: 2
  },
  xp:{
    color: themes.colors.blackA1,
    fontFamily: themes.fonts.DMSans.medium,
    fontSize: 20,
    lineHeight: 24
  },
  acCriterion:{
    textAlign: 'center',
    color: themes.colors.blackA1,
    fontFamily: themes.fonts.DMSans.medium,
    fontSize: 12,
    lineHeight: 16
  }
});
