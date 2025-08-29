import {Image, Modal, ScrollView, TouchableOpacity, View} from 'react-native';
import {FlatList, Text} from 'react-native-gesture-handler';
import {styles} from './styles';
import {Button} from '../../Button';
import {useEffect, useState} from 'react';
import {useActivities} from '../../../hooks/useActivities';
import {ActivityType, UserPreferencesType} from '../../../types/ActivityData';
import {useUser} from '../../../hooks/useUser';
import {showToast} from '../../../utils/showToast';

function chunkArray<T>(array: T[], size: number): T[][] {
  const chunked: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunked.push(array.slice(i, i + size));
  }
  return chunked;
}

interface PreferencesModalProps {
  visible: boolean;
  onClose: () => void;
  isEdit?: boolean;
}

interface PreferencesIconProps {
  preference: ActivityType;
  setUserPreferences: (prev: any) => void;
  selectedPreferences: string[];
  userHistory: UserPreferencesType[];
}

function PreferencesIcon({
  preference,
  setUserPreferences,
  userHistory,
  selectedPreferences,
}: PreferencesIconProps) {
  const [selected, setSelected] = useState(selectedPreferences.includes(preference.id));
  const [userHistorySelected, setUserHistorySelected] = useState(false);
  const handlePreferences = () => {
    if (selected) {
      setUserPreferences((prev: any) =>
        prev.filter((id: string) => id !== preference.id),
      );
      setUserHistorySelected(false);
    } else if (!selectedPreferences.includes(preference.id)) {
      setUserPreferences((prev: any) => [...prev, preference.id]);
      setUserHistorySelected(true);
    }
    setSelected(prev => !prev);
  };
  useEffect(() => {
    setUserHistorySelected(
      userHistory.map(p => p.typeId).includes(preference.id),
    );
  }, [userHistory]);
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => handlePreferences()}>
        <Image
          source={{
            uri: `http://10.0.2.2:${
              preference.image.split('http://localhost:')[1]
            }`,
          }}
          style={[
            styles.imgIcon,
            selected && styles.imgIconSelected,
            userHistorySelected && styles.imgIconSelected,
          ]}
        />
      </TouchableOpacity>
      <Text style={styles.preferencesText}>{preference.name}</Text>
    </View>
  );
}

export const PreferencesModal = ({
  visible,
  onClose,
  isEdit = false,
}: PreferencesModalProps) => {
  const [acTypes, setAcTypes] = useState<ActivityType[] | undefined>([]);
  const useAct = useActivities();
  const useUse = useUser();

  const [userHistoryPreferences, setUserHistoryPreferences] = useState<
    UserPreferencesType[]
  >([]);
  const [preferences, setUserPreferences] = useState<string[]>([]);

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const types = await useAct.getActivitiesTypes();
        return setAcTypes(types);
      } catch (error) {
        return;
      }
    };
    const fetchUserPreferences = async () => {
      try {
        const prefs = await useUse.getPreferences();
        setUserHistoryPreferences(prefs || []);
        setUserPreferences(prefs?.map(p => p.typeId) || []);
      } catch (error) {
        return;
      }
    };
    fetchTypes();
    fetchUserPreferences();
  }, []);

  const handlePreferences = async (typeIds: string[]) => {
    
    try {
    
      const res = await useUse.definePreferences(typeIds);
      if (res) {
        onClose();
        showToast({
          title: 'Sucesso!',
          message: 'Preferências salvas com sucesso!',
          type: 'success',
        });
      }
    } catch (error) {
      return;
    }
  };
  const grouped = chunkArray(acTypes!, 6);

  return (
    <Modal
      animationType="fade"
      visible={visible}
      statusBarTranslucent={true}
      onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <Text style={styles.textPreference}>Selecione seu tipo favorito</Text>

        <FlatList
          data={grouped}
          keyExtractor={(_, index) => index.toString()}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => (
            <View style={styles.page}>
              {chunkArray(item, 2).map((row, rowIndex) => (
                <View key={rowIndex} style={styles.row}>
                  {row.map(preference => (
                    <PreferencesIcon
                      key={preference.id}
                      selectedPreferences={preferences}
                      preference={preference}
                      setUserPreferences={setUserPreferences}
                      userHistory={userHistoryPreferences}
                    />
                  ))}
                </View>
              ))}
            </View>
          )}
        />
        <View style={styles.buttonContainer}>
          <Button.Root
            style={{height: 44}}
            onPress={() => handlePreferences([...preferences])}>
            <Button.Label>Salvar</Button.Label>
          </Button.Root>
          {!isEdit && (
            <Button.Root type="ghost" onPress={onClose}>
              <Button.Label style={{fontWeight: 'bold'}}>Pular</Button.Label>
            </Button.Root>
          )}
        </View>
      </View>
    </Modal>
  );
};
