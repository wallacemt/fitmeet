import {FlatList, View, Image} from 'react-native';
import {Text} from 'react-native-gesture-handler';
import {styles} from './styles';
import {CustomText} from '../../components/CustomText';
import {themes} from '../../assets/themes';
import {UserResponse} from '../../types/UserTypes';

const achivimentsIcon = require('../../assets/images/achivimentsImg.png');
const awardsIcon = require('../../assets/images/award.png');
const medalIcon = require('../../assets/images/medal.png');

interface ProfileStatusBoxProps {
  user: UserResponse;
}

function ProfileStatusBox({user}: ProfileStatusBoxProps) {
  return (
    <View style={styles.profileStatusContainer}>
      <View style={styles.iconContainer}>
        <Image source={awardsIcon} style={styles.icon} />
      </View>
      <View style={styles.row}>
        <View style={{gap: 13}}>
          <CustomText style={styles.subtitle}>Seu nível é</CustomText>
          <CustomText style={styles.level}>{user.level}</CustomText>
        </View>
        <Image source={achivimentsIcon} style={styles.acIcon} />
      </View>
      <View style={styles.progressContainer}>
        <View style={styles.row}>
          <CustomText style={styles.subtitleh3}>
            Pontos para o próximo nível
          </CustomText>
          <CustomText style={styles.xp}>
            {user.xp}/50
            <CustomText>pts</CustomText>
          </CustomText>
        </View>
        <View style={styles.bar}>
          <View
            style={[
              styles.bar,
              {
                marginTop: 0,
                backgroundColor: '#000',
                width: `${(user.xp * 100) / 50}%`,
              },
            ]}
          />
        </View>
      </View>
    </View>
  );
}

function RenderMedalCard(ac: any) {
  return (
    <View
      style={{
        width: 120,
        height: '100%',
        alignSelf: 'center',
        marginHorizontal: 20,
        marginTop: 10,
      }}>
      <View
        style={{
          width: 110,
          height: 110,
          borderRadius: 120 / 2,
          backgroundColor: "#a8a8a8a1",
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image source={medalIcon} style={{width: 65, height: 90}} />
      </View>
      <View>
        <CustomText style={styles.acCriterion}>
          {ac.criterion}
        </CustomText>
      </View>
    </View>
  );
}

function MedalBox({user}: {user: UserResponse}) {
  const groupedAchiviments: any[][] = [];

  if (user.achievements) {
    for (let i = 0; i < user.achievements?.length; i += 2) {
      groupedAchiviments.push(user.achievements.slice(i, i + 2));
    }
  }

  return (
    <View style={styles.medalBoxContainer}>
      <FlatList
        data={groupedAchiviments}
        keyExtractor={(__, index) => `group-${index}`}
        renderItem={({item}) => (
          <View
            style={{
              height: 230,
              width: '80%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingVertical: 10,
            }}>
            {item.map((ac, index) => (
              <View style={{paddingHorizontal: 10}} key={ac.name + '_' + index}>
                {RenderMedalCard(ac)}
              </View>
            ))}
          </View>
        )}
        showsVerticalScrollIndicator={false}
        pagingEnabled
        nestedScrollEnabled
        ListEmptyComponent={() => (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: 230,
            }}>
            <CustomText style={{fontSize: 20, fontWeight: 'bold'}}>
              Voce ainda não possui medalhas
            </CustomText>
          </View>
        )}
      />
    </View>
  );
}

export const UserCarrousel = ({user}: {user: UserResponse}) => {
  const components = [
    <ProfileStatusBox user={user} key="profile-status" />,
    <MedalBox user={user} key="modal-box" />,
  ];

  return (
    <View style={styles.container}>
      <FlatList
        data={components}
        keyExtractor={(__, index) => `page-${index}`}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        renderItem={item => <View style={styles.item}>{item.item}</View>}
      />
    </View>
  );
};
