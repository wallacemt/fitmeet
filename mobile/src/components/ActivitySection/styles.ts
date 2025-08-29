import {StyleSheet} from 'react-native';
import {themes} from '../../assets/themes';

export const styles = StyleSheet.create({
  container: {
    padding: 28,
    gap: 24,
  },
  title: {
    fontFamily: themes.fonts.BebasNeue.regular,
    fontSize: 28,
    lineHeight: 32,
    color: themes.colors.black,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardContainer: {
    position: 'relative',
    width: '100%',
    marginBottom: 24,
    gap: 12,
  },
  image: {
    borderRadius: 8,
    width: '100%',
    height: 160,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 20,
    fontFamily: themes.fonts.DMSans.semiBold,
  },
  acInfo: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
  },
  infoText: {
    fontFamily: themes.fonts.DMSans.regular,
    fontSize: 12,
    lineHeight: 16,
  },
  lock: {
    backgroundColor: themes.colors.primary,
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 36 / 2,
    position: 'absolute',
    top: 10,
    left: 10,
  },
  emptyContainer: {
    alignItems: 'center',
    gap: 5,
  },
  emptyText: {
    fontFamily: themes.fonts.DMSans.regular,
    fontSize: 16,
    lineHeight: 20,
  },
  emptImage: {
    width: 100,
    height: 100,
    padding: 5,
    borderRadius: 100 / 2,
    borderWidth: 1,
    borderColor: themes.colors.softWhite,
  },
});
