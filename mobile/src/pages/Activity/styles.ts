import {StyleSheet} from 'react-native';
import {themes} from '../../assets/themes';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    width: '100%',
    height: 370,
    justifyContent: 'center',
    position: 'relative',
  },
  back: {
    position: 'absolute',
    left: 41,
    top: 76,
    zIndex: 1,
    color: themes.colors.black,
  },
  edit: {
    position: 'absolute',
    right: 41,
    top: 76,
    zIndex: 1,
    color: themes.colors.blackTiny,
  },
  image: {
    width: '100%',
    height: 370,
    objectFit: 'cover',
  },
  info: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 45,
    gap: 12,
    height: 61,
    backgroundColor: themes.colors.white,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  acInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  infoText: {
    fontFamily: themes.fonts.DMSans.regular,
    fontSize: 12,
    lineHeight: 16,
    color: themes.colors.softBlack,
  },
  content: {
    paddingHorizontal: 20,
    gap: 12,
  },
  desc: {
    gap: 16,
    marginBottom: 20,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: themes.colors.whiteA4,
    opacity: 0.5,
    marginBottom: 40,
  },
});
