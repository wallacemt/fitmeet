import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import useAppContext from '../../hooks/useAppContext';
import {styles} from './style';
import {UserHeader} from '../../components/UserHeader';
import {PreferencesModal} from '../../components/Modais/PreferencesModal';
import {useEffect, useState} from 'react';
import {ActivitySection} from '../../components/ActivitySection';

import {Plus} from 'phosphor-react-native';
import {themes} from '../../assets/themes';
import {ActivityTypeSection} from '../../components/ActivityTypeSection';
import {FlatList} from 'react-native-gesture-handler';
import {CreateOrEditModal} from '../../components/Modais/CreateOrEditModal';
import {useActivities} from '../../hooks/useActivities';
import {
  ActivityResponse,
  ActivityType,
  UserPreferencesType,
} from '../../types/ActivityData';
import {useUser} from '../../hooks/useUser';

export const Home = () => {
  const {user, load} = useAppContext();
  const [showSetPreferences, setShowSetPreferences] = useState(false);
  const [showCreateAcModal, setShowCreateAcModal] = useState<boolean>(false);
  const [recomended, setRecomended] = useState<ActivityResponse[] | undefined>(
    [],
  );
  const [userPreferences, setUserPreferences] = useState<
    UserPreferencesType[] | undefined
  >([]);
  const useAct = useActivities();
  const {getPreferences} = useUser();
  const [loading, setLoading] = useState(false);

  const fetchActivities = async () => {
    try {
      setLoading(true);
      const actvities = await useAct.getActivities();
      setRecomended(actvities);
    } catch (error) {
      return;
    } finally {
      setLoading(false);
    }
  };
  const fetchPreferences = async () => {
    setLoading(true);
    try {
      const preferences = await getPreferences();
      if (preferences?.length! <= 0) setShowSetPreferences(true);
      setUserPreferences(preferences);
    } catch (error) {
      return;
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (!user) return;
    fetchActivities();
    fetchPreferences();
    load();
  }, [showSetPreferences]);
  return (
    <>
      <FlatList
        data={[]}
        renderItem={() => <></>}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={styles.container}>
            <UserHeader user={user!} type="home" />
              <ActivitySection
                title="Suas Recomendações"
                context="home"
                activityList={recomended?.slice(0, 2)}
                userPreferences={userPreferences}
                loading={loading}
              />
           
            <ActivityTypeSection />
            <View style={{marginBottom: 70}} />
          </View>
        }
      />
      <TouchableOpacity
        style={styles.buttonFixed}
        onPress={() => setShowCreateAcModal(true)}>
        <Text>
          <Plus size={30} color={themes.colors.white} />
        </Text>
      </TouchableOpacity>
      {showSetPreferences && (
        <PreferencesModal
          visible={showSetPreferences}
          onClose={() => setShowSetPreferences(false)}
        />
      )}

      {showCreateAcModal && (
        <CreateOrEditModal
          visible={showCreateAcModal}
          onClose={() => setShowCreateAcModal(false)}
          type="create"
        />
      )}
    </>
  );
};
