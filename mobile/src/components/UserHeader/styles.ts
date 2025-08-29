import {Dimensions, StyleSheet} from 'react-native';
import {themes} from '../../assets/themes';

export const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    height: 137,
    backgroundColor: themes.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 30,
    marginBottom: 20,
    borderEndEndRadius: 40,
    borderStartEndRadius: 40,
  },
  subtitle: {
    fontFamily: themes.fonts.DMSans.regular,
    fontSize: 15,
    color: '#fff',
  },
  title: {
    fontFamily: themes.fonts.BebasNeue.regular,
    fontSize: 32,
    lineHeight: 36,
    color: themes.colors.black,
  },
  col: {
    flexDirection: 'column',
    position: 'absolute',
    left: 20,
  },
  row: {
    flexDirection: 'row',
    gap: 14,
    position: 'absolute',
    right: 20,
  },
  level: {
    flexDirection: 'row',
    gap: 5,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 1)',
    alignSelf: 'center',
  },

  levelText: {
    fontFamily: themes.fonts.BebasNeue.regular,
    fontSize: 14,
    color: 'white',
  },
  circle1: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    width: 214.84,
    height: 214.84,
    borderRadius: 107.42,
    position: 'absolute',
    left: -90,
    top: -95,
  },
  circle2: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    width: 214.84,
    height: 214.84,
    borderRadius: 107.42,
    position: 'absolute',
    left: -78,
    top: -70,
  },
  rowProfile: {
    width: '100%',
    padding: 5,
    marginTop: 35,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  colProfile: {
    width: '100%',
    padding: 5,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12
  },
});
