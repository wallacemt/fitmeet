import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {MainStackParamList} from '../../routes/AppRoutes';
import {RouteProp, useRoute} from '@react-navigation/native';
import {styles} from './styles';
import {
  CalendarDots,
  CaretLeft,
  NotePencil,
  UsersThree,
} from 'phosphor-react-native';
import {useTypedNavigation} from '../../hooks/useTypedNavigation';
import {themes} from '../../assets/themes';
import Title from '../../components/Title';
import {CustomText} from '../../components/CustomText';
import Maps from '../../components/Maps';
import {ScrollView} from 'react-native-gesture-handler';

import {
  ActivityResponse,
  Participant,
  UserSubscriptionStatus,
} from '../../types/ActivityData';
import {ParticipantSection} from '../../components/ParticipantSection';
import useAppContext from '../../hooks/useAppContext';
import {useActivities} from '../../hooks/useActivities';
import {useEffect, useState} from 'react';
import {imageUriCorrect} from '../../utils/imageUriCorrect';
import {
  ActivityButtonFactory,
  ActivityCheckInButton,
} from '../../components/ActivityActionsButton';
import {CreateOrEditModal} from '../../components/Modais/CreateOrEditModal';

type ActivityParams = RouteProp<MainStackParamList, 'Activity'>;

export const Activity = () => {
  const route = useRoute<ActivityParams>();
  const {activity} = route.params;
  const [showEditModal, setShowEditModal] = useState(false);
  if (!activity) return useTypedNavigation().goBack();
  const [activityDetails, setActivityDetails] = useState(activity);
  const {user} = useAppContext();
  if (!user) return null;
  const navigation = useTypedNavigation();
  const {
    getParticipantsAcitivites,
    subscribeActivity,
    loading,
    getActivityForId,
    unsubscribeActivity,
  } = useActivities();
  const owner = {
    id: 'string',
    activityId: 'string',
    userId: activity?.creator.id,
    approved: true,
    approvedAt: new Date().toISOString(),
    confirmedAt: new Date().toISOString(),
    subscriptionStatus: UserSubscriptionStatus.ACCEPTED,
    user: {
      id: activity?.creator.id!,
      name: activity?.creator.name!,
      avatar: activity?.creator.avatar!,
    },
    owner: true,
  };
  const [participants, setParticipants] = useState<Participant[]>([]);
  const fetchParticipants = async () => {
    const [participants, activityDetail] = await Promise.all([
      getParticipantsAcitivites(activity?.id!),
      getActivityForId(activityDetails.id),
    ]);
    setActivityDetails(activityDetail);
    if (participants!.filter(p => p.approvedAt && p.approved).length > 0) {
      setParticipants([
        owner,
        ...participants!.filter(p => p.approvedAt && p.approved),
      ]);
    } else {
      setParticipants([owner]);
    }
  };
  useEffect(() => {
    fetchParticipants();
  }, []);

  async function handleSubscribe() {
    await subscribeActivity(activityDetails.id);
    await fetchParticipants();
  }

  async function handleUnsubscribe() {
    await unsubscribeActivity(activityDetails.id);
    await fetchParticipants();
  }
  async function handleCheckin(code: string) {
    // feature here!
  }

  const isParticipant = participants.find(
    par => par.userId === user?.id && par.subscriptionStatus === 'accepted',
  );
  return (
    <>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.back}>
            <CaretLeft size={32} weight="bold" />
          </TouchableOpacity>
          {activityDetails.isSelf && (
            <TouchableOpacity
              onPress={() => setShowEditModal(true)}
              style={styles.edit}>
              <NotePencil size={32} weight="bold" />
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.header}>
          <Image
            source={{uri: imageUriCorrect(activityDetails.image || '')}}
            style={styles.image}
          />
          <View style={styles.info}>
            <View style={styles.acInfo}>
              <CalendarDots color={themes.colors.primary} size={20} />
              <Text style={styles.infoText}>
                {activity?.completedAt
                  ? 'Atividade Finalizada'
                  : new Intl.DateTimeFormat('pt-BR', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    }).format(
                      new Date(activityDetails.scheduleDate || new Date()),
                    )}
              </Text>
            </View>
            <Text>|</Text>
            <View>
              <Text style={styles.infoText}>
                {activity?.private ? 'Privado' : 'Publico'}
              </Text>
            </View>
            <Text>|</Text>
            <View style={styles.acInfo}>
              <UsersThree size={20} color={themes.colors.primary} />
              <Text style={styles.infoText}>
                {activityDetails.participantCount || 0}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.content}>
          {isParticipant &&
            new Date(activityDetails.scheduleDate).getTime() <
              new Date().getTime() &&
            !activityDetails.completedAt &&
            !participants.find(
              par => par.userId === user?.id && par.confirmedAt,
            ) && (
              <ActivityCheckInButton
                checkInFunc={handleCheckin}
                loading={loading}
              />
            )}
          <View style={styles.desc}>
            <Title fontSize={20}>{activityDetails.title}</Title>
            <CustomText fontSize={12}>{activityDetails.description}</CustomText>
          </View>
          <View>
            <Title fontSize={20}>Ponto de Encontro</Title>
            <Maps
              size={288}
              locationPoint={{
                latitude: activityDetails.address.latitude!,
                longitude: activityDetails.address.longitude!,
              }}
            />
          </View>
          <View>
            <Title fontSize={20}>Participantes</Title>
            <ParticipantSection
              participants={participants || []}
              user={user}
              activity={activityDetails}
            />
          </View>

          {loading ? (
            <View style={styles.loading}>
              <ActivityIndicator size="large" color={themes.colors.black} />
            </View>
          ) : (
            <ActivityButtonFactory
              activity={activityDetails}
              participants={participants}
              user={user}
              onClick={{
                subscribeActivity: handleSubscribe,
                unsubscribeActivity: handleUnsubscribe,
                checkInActivity: handleCheckin,
              }}
              loading={loading}
            />
          )}
        </View>
      </ScrollView>
      {showEditModal && (
        <CreateOrEditModal
          visible={showEditModal}
          onClose={() => setShowEditModal(false)}
          type="edit"
          activity={activityDetails}
          update={fetchParticipants}
        />
      )}
    </>
  );
};
