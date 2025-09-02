import {ActivityIndicator, Image, TouchableOpacity, View} from 'react-native';
import {
  ActivityResponse,
  ActivityType,
  HistoryActivity,
  UserPreferencesType,
} from '../../types/ActivityData';
import {FlatList, Text} from 'react-native-gesture-handler';
import {styles} from './styles';
import {
  CalendarDots,
  CaretDown,
  CaretUp,
  Check,
  CheckCircle,
  Lock,
  LockSimple,
  UsersThree,
} from 'phosphor-react-native';
import {themes} from '../../assets/themes';
import {useEffect, useState} from 'react';
import {useTypedNavigation} from '../../hooks/useTypedNavigation';
import {getUserPreferences} from '../../api/userApi';
import {imageUriCorrect} from '../../utils/imageUriCorrect';

const emptyImage = require('../../assets/images/empty.png');

interface ActivitySectionProps {
  title: string;
  activityList?: ActivityResponse[];
  historyList?: HistoryActivity[];
  viewMore?: boolean;
  context?: 'home' | 'outher';
  type?: 'defalut' | 'history';
  emptyMessage?: string;
  userPreferences?: UserPreferencesType[];
  loading?: boolean;
}

export const ActivityCard = ({
  activity,
  history,
}: {
  activity?: ActivityResponse;
  history?: HistoryActivity;
}) => {
  const navigation = useTypedNavigation();

  return (
    <View style={styles.cardContainer}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Activity', {
            activity: activity || history?.activity,
          })
        }>
        <Image
          source={{
            uri: imageUriCorrect(
              history?.activity?.image || activity?.image || '',
            ),
          }}
          style={styles.image}
        />
      </TouchableOpacity>
      <Text style={styles.subtitle}>
        {history?.activity?.title || activity?.title}
      </Text>
      <View style={{flexDirection: 'row', gap: 12}}>
        <View style={[styles.acInfo, {flexDirection: 'row'}]}>
          <CalendarDots color={themes.colors.primary} size={20} />
          <Text style={styles.infoText}>
            {new Intl.DateTimeFormat('pt-BR', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            }).format(
              new Date(
                history?.activity?.scheduleDate ||
                  activity?.scheduleDate ||
                  new Date(),
              ),
            )}
          </Text>
        </View>
        <Text>|</Text>
        <View style={[styles.acInfo, {flexDirection: 'row', gap: 6}]}>
          <UsersThree size={20} color={themes.colors.primary} />
          <Text style={styles.infoText}>
            {history?.participantCount || activity?.participantCount || 0}
          </Text>
        </View>
      </View>
      {history?.activity?.private ||
        (activity?.private && (
          <View style={styles.lock}>
            <LockSimple size={20} color="#fff" />
          </View>
        ))}
      {history?.activity?.completedAt ||
        (activity?.completedAt && (
          <View style={styles.lock}>
            <Check size={20} color="#fff" />
          </View>
        ))}
    </View>
  );
};

export const ActivitySection = ({
  title,
  activityList,
  historyList,
  viewMore = true,
  context = 'outher',
  userPreferences,
  type = 'defalut',
  emptyMessage = 'Nenhuma atividade encontrada',
  loading = false,
}: ActivitySectionProps) => {
  const [activityListVisibility, setActivityListVisibility] = useState(true);
  const navigation = useTypedNavigation();

  const handleViewMore = async () => {
    try {
      if (userPreferences?.length! > 0) {
        navigation.navigate('ActivityType', {
          type: userPreferences![0].typeName,
        });
      }
      return;
    } catch (error: any) {
      console.log(error.message);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text
          onPress={() => setActivityListVisibility(!activityListVisibility)}
          style={styles.title}>
          {title}
        </Text>
        {viewMore &&
          (context === 'home' ? (
            <TouchableOpacity onPress={() => handleViewMore()}>
              <Text style={[styles.title, {fontSize: 15}]}>Ver Mais</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => {
                setActivityListVisibility(!activityListVisibility);
              }}>
              <Text style={[styles.title, {fontSize: 15}]}>
                {activityListVisibility ? (
                  <CaretUp
                    size={25}
                    weight="bold"
                    color={themes.colors.black}
                  />
                ) : (
                  <CaretDown
                    size={25}
                    weight="bold"
                    color={themes.colors.black}
                  />
                )}
              </Text>
            </TouchableOpacity>
          ))}
      </View>
      <View>
        {type === 'defalut' ? (
          loading ? (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <ActivityIndicator size="large" color={themes.colors.primary} />
            </View>
          ) : (
            <FlatList
              data={activityListVisibility ? activityList : []}
              renderItem={({item}) => (
                <ActivityCard key={item.id} activity={item} />
              )}
              ListEmptyComponent={() =>
                activityListVisibility && (
                  <View style={styles.emptyContainer}>
                    <Image source={emptyImage} style={styles.emptImage} />
                    <Text style={styles.emptyText}>{emptyMessage}</Text>
                  </View>
                )
              }
            />
          )
        ) : (
          <FlatList
            data={activityListVisibility ? historyList : []}
            renderItem={({item}) => (
              <ActivityCard key={item.id} history={item} />
            )}
            ListEmptyComponent={() =>
              activityListVisibility && (
                <View style={styles.emptyContainer}>
                  <Image source={emptyImage} style={styles.emptImage} />
                  <Text style={styles.emptyText}>{emptyMessage}</Text>
                </View>
              )
            }
          />
        )}
      </View>
    </View>
  );
};
