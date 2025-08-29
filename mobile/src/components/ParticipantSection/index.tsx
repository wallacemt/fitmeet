import {FlatList, View, StyleSheet, Text, Image} from 'react-native';
import {ActivityResponse, Participant} from '../../types/ActivityData';
import {CustomText} from '../CustomText';
import {UserImageIcon} from '../UserImageIcon';
import {styles} from './styles';
import Title from '../Title';
import {Button} from '../Button';
import {Heart, X} from 'phosphor-react-native';
import {themes} from '../../assets/themes';
import {UserResponse} from '../../types/UserTypes';

const emptyImage = require('../../assets/images/empty.png');

interface ParticipantSectionProps {
  participants: Participant[];
  user?: UserResponse;
  activity?: ActivityResponse;
}

export const ParticipantSection = ({
  participants,
  user,
  activity,
}: ParticipantSectionProps) => {
  const groupedParticipants = [];
  for (let i = 0; i < participants.length; i += 3) {
    groupedParticipants.push(participants.slice(i, i + 3));
  }

  return (
    <View style={styles.participantsContainer}>
      <FlatList
        data={groupedParticipants}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        keyExtractor={(__, index) => `group-${index}`}
        renderItem={({item}) => (
          <View style={styles.participantGroup}>
            {item.map((ac: Participant, index: number) => (
              <View
                style={styles.participantItem}
                key={ac.user.id + '_' + index}>
                <UserImageIcon size={44} url={ac.user.avatar} />
                <View style={{flexDirection: 'column', marginLeft: 8}}>
                  <Title fontSize={16} lineHeight={12}>
                    {`${ac.user.name.split(' ')[0]} ${
                      ac.user.name.split(' ')[
                        ac.user.name.split(' ').length - 1
                      ]
                    }`}
                  </Title>
                  <CustomText
                    fontSize={12}
                    style={{color: themes.colors.blackTiny}}>
                    {activity?.creator.id === ac.userId
                      ? 'Organizador'
                      : user?.id === ac.userId
                      ? 'Você'
                      : 'Participante'}
                  </CustomText>
                </View>
                {user?.id === ac.id && (
                  <View style={styles.buttonContainer}>
                    <Button.Root style={styles.buttonInteraction}>
                      <X color="#fff" size={16} />
                    </Button.Root>
                    <Button.Root style={styles.buttonInteraction}>
                      <Heart color="#fff" size={16} />
                    </Button.Root>
                  </View>
                )}
              </View>
            ))}
          </View>
        )}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Image source={emptyImage} style={styles.emptImage} />
            <Text style={styles.emptyText}>Sem participantes</Text>
          </View>
        )}
      />
    </View>
  );
};
