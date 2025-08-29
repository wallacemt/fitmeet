import {StyleSheet} from 'react-native';
import {themes} from '../../assets/themes';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  header: {
    marginTop: 68,
    alignItems: 'center',
    justifyContent: 'center',
  },
  back: {
    position: 'absolute',
    left: 20,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    left: 30,
    alignItems: 'center',
    marginBottom: 20,
    justifyContent: 'center',
  },
  image: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{translateX: -105}, {translateY: -40}],
    color: themes.colors.white,
  },
  form: {
    width: '100%',
    marginTop: 20,
    gap: 16,
    paddingHorizontal: 20,
  },
  buttonContainer: {
    gap: 12,
    marginBottom: 40,
    paddingHorizontal: 60,
  },
  modal:{
    backgroundColor: themes.colors.perigo,
    padding: 20
  },
  cancelContainer:{
    backgroundColor:themes.colors.whiteA3,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
    paddingHorizontal: 20
  },
  cancelBtnContainer:{
    width: '100%',
    gap: 20
  }
});
