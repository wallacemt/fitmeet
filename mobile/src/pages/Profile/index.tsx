import {View} from 'react-native';
import {UserHeader} from '../../components/UserHeader';
import useAppContext from '../../hooks/useAppContext';
import {UserCarrousel} from '../../components/UserCarrousel';
import {styles} from './style';
import {ActivitySection} from '../../components/ActivitySection';
import {FlatList} from 'react-native-gesture-handler';
import {useActivities} from '../../hooks/useActivities';
import {useEffect, useState} from 'react';
import {ActivityResponse, HistoryActivity} from '../../types/ActivityData';
import {UserResponse} from '../../types/UserTypes';
import {useUser} from '../../hooks/useUser';

export const Profile = () => {
  const {user} = useAppContext();
  if (!user) return null;
  const [userNew, setUserNew] = useState<UserResponse>(user);
  const useAct = useActivities();
  const [userHistory, setUserHistory] = useState<HistoryActivity[] | undefined>(
    [],
  );
  const [userActivites, setUserActivities] = useState<
    ActivityResponse[] | undefined
  >([]);

  const fetchHistory = async () => {
    try {
      const response = await useAct.getHistoryActivitiesUser();
      setUserHistory(response);
    } catch (error) {
      return;
    }
  };

  const fetchUserActivites = async () => {
    try {
      const res = await useAct.getActivitesUser();
      setUserActivities(res);
    } catch (error) {
      return;
    }
  };

  const fetchUser = async () => {
    try {
      const res = await useUser().getUserApi();
      setUserNew(res);
    } catch (error) {
      return;
    }
  };
  useEffect(() => {
    fetchHistory();
    fetchUserActivites();
    fetchUser();
  }, []);

  return (
    <FlatList
      data={[]}
      renderItem={() => <></>}
      ListHeaderComponent={
        <View style={styles.container}>
          <UserHeader user={userNew} type="profile" />
          <UserCarrousel user={userNew} />
          <ActivitySection
            title="Suas Atividades"
            context="outher"
            activityList={userActivites}
            emptyMessage="Você ainda não criou nenhuma atividade!"
          />
          <ActivitySection
            title="Histórico de Atividades"
            context="outher"
            type="history"
            emptyMessage="Nehuma atividade participada encontrada!"
            historyList={userHistory}
          />
        </View>
      }
    />
  );
};
