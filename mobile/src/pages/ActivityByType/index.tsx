import {RouteProp, useRoute} from '@react-navigation/native';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {MainStackParamList} from '../../routes/AppRoutes';
import {styles} from './styles';
import {ActivityTypeSection} from '../../components/ActivityTypeSection';
import {CaretLeft} from 'phosphor-react-native';
import Title from '../../components/Title';
import {ActivitySection} from '../../components/ActivitySection';
import {useTypedNavigation} from '../../hooks/useTypedNavigation';
import {useEffect, useState} from 'react';
import {useActivities} from '../../hooks/useActivities';
import {ActivityResponse} from '../../types/ActivityData';

type ActivityByTypeParams = RouteProp<MainStackParamList, 'ActivityType'>;

export const ActivityByType = () => {
  const navigation = useTypedNavigation();
  const route = useRoute<ActivityByTypeParams>();
  const [userAct, setUserAct] = useState<ActivityResponse[] | undefined>([]);
  const [comunityActivites, setComunityActivites] = useState<
    ActivityResponse[] | undefined
  >([]);
  const [loading, setLoading] = useState(false);
  const {type} = route.params || {type: ''};
  const useAct = useActivities();
  const fetchUserAc = async () => {
    setLoading(true);
    try {
      const res = await useAct.getActivitesUser();
      setUserAct(res?.filter(act => act.type === type));
    } catch (error) {
      return;
    } finally {
      setLoading(false);
    }
  };
  const fetchActivites = async () => {
    setLoading(true);
    try {
      const res = await useAct.getActivities();
      setComunityActivites(res?.filter(act => act.type === type));
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchUserAc();
    fetchActivites();
  }, []);

  return (
    <FlatList
      data={[]}
      renderItem={() => <></>}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.back}>
              <CaretLeft size={34} weight="bold" />
            </TouchableOpacity>
            <Title>{type}</Title>
            <View></View>
          </View>
          <ActivityTypeSection typeSelected={type} />
          <ActivitySection
            title="Suas Atividades"
            emptyMessage="Você ainda não possui atividades"
            activityList={userAct}
            viewMore={true}
            type="defalut"
            loading={loading}
          />
          <ActivitySection
            title="Atividades da comunidade"
            emptyMessage={`Nenhuma atividade de ${type} encontrada`}
            activityList={comunityActivites}
            viewMore={true}
            type="defalut"
            loading={loading}
          />
        </View>
      }
    />
  );
};
