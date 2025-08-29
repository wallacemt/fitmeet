import {Dimensions, StyleSheet} from 'react-native';
import {themes} from '../../../assets/themes';

const screenWidth = Dimensions.get('window').width;
export const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingTop: 60,
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  page: {
    width: screenWidth - 35,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  container: {
    width: '50%',
    gap: 23,
    alignItems: 'center',
  },
  imgIcon: {
    width: 120,
    height: 112,
    borderRadius: 120 / 2,
    marginBottom: 6,
  },
  buttonContainer: {
    gap: 12,
    marginBottom: 40,
  },
  textPreference: {
    fontFamily: themes.fonts.BebasNeue.regular,
    fontSize: 32,
    lineHeight: 36,
    marginBottom: 40,
    alignSelf:'center'
  },
  preferencesText:{
    fontFamily: themes.fonts.DMSans.semiBold,
  },
  imgIconSelected: {
    borderWidth: 2,
    borderColor: themes.colors.primary,
  }
});
