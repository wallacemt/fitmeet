import {Dimensions, StyleSheet} from 'react-native';
import { themes } from '../../assets/themes';

export const styles = StyleSheet.create({
  participantsContainer: {
    flex: 1,
    width: '100%',
    marginTop: 10,

  },
  participantGroup: {
    width: Dimensions.get('window').width - 45,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 10,
  },
  participantItem: {
    width: '100%',
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center',
    marginBottom: 10,
  },
  participantName: {
    fontSize: 12,
    fontFamily: themes.fonts.DMSans.regular,
    marginTop: 8,
  },
  emptyContainer: {
    justifyContent: 'center',
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
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    right: 0,
    gap: 30,
  },
  buttonInteraction: {
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
  },
});
