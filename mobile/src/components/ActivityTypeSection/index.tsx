import {
  ActivityIndicator,
  FlatList,
  Image,
  TouchableOpacity,
  View,
} from 'react-native';
import {Text} from 'react-native-gesture-handler';
import {styles} from './styles';
import {ActivityType} from '../../types/ActivityData';
import {useEffect, useState} from 'react';
import {useTypedNavigation} from '../../hooks/useTypedNavigation';
import {NotePencil} from 'phosphor-react-native';
import {PreferencesModal} from '../Modais/PreferencesModal';
import {useActivities} from '../../hooks/useActivities';
import {themes} from '../../assets/themes';

interface TypeCardProps {
  type: ActivityType;
  cardType?: 'page' | 'selection' | 'default';
  isSelected: boolean;
  typeSelecte?: string;
  onChange: (selectedType: ActivityType) => void;
  selection?: boolean;
}

export const TypeCard = ({
  type,
  isSelected,
  onChange,
  cardType,
  typeSelecte,
  selection,
}: TypeCardProps) => {
  const navigation = useTypedNavigation();
  const handlePress = () => {
    if (selection) {
      onChange(type);
    } else if (!selection && cardType === 'page') {
      navigation.navigate('ActivityType', {type: type.name});
    }
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={styles.cardContainer}>
        <Image
          style={[
            styles.image,
            isSelected && styles.selected,
            typeSelecte === type.name && styles.selected,
          ]}
          source={{
            uri: `http://10.0.2.2:${type.image.split('http://localhost:')[1]}`,
          }}
        />
        <Text style={styles.subtitle}>{type.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

interface ActivityTypeSectionProps {
  type?: 'page' | 'selection' | 'default';
  typeSelected?: string;
  title?: string;
  loading?: boolean;
  userPreference?: string[];
  update?: () => Promise<void>;
}

export const ActivityTypeSection = ({
  type = 'page',
  typeSelected,
  title = 'Categorias',
  loading = false,
  userPreference,
  update,
}: ActivityTypeSectionProps) => {
  const [selectedType, setSelectedType] = useState<ActivityType | null>(null);
  const [viewEdit, setViewEdit] = useState(false);
  const [acTypes, setAcTypes] = useState<ActivityType[] | undefined>([]);
  const useAct = useActivities();

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const types = await useAct.getActivitiesTypes();
        return setAcTypes(types);
      } catch (error) {
        return;
      }
    };
    fetchTypes();
  }, []);

  const handleTypeChange = (newType: ActivityType) => {
    setSelectedType(prev => (prev?.id === newType.id ? null : newType));
  };

  return (
    <>
      <View
        style={[type === 'page' ? styles.container : styles.containerSingle]}>
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
          {type === 'default' && (
            <TouchableOpacity
              style={styles.edit}
              onPress={() => setViewEdit(true)}>
              <NotePencil size={20} />
            </TouchableOpacity>
          )}
        </View>
        {loading ? (
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
            data={acTypes}
            renderItem={({item}) => (
              <TypeCard
                type={item}
                isSelected={
                  selectedType?.id === item.id ||
                  (userPreference?.includes(item.id!) ?? false)
                }
                onChange={handleTypeChange}
                cardType={type}
                selection={type === 'selection'}
                typeSelecte={typeSelected}
              />
            )}
            keyExtractor={(_, index) => index.toString()}
            contentContainerStyle={{gap: 25}}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
          />
        )}
      </View>

      {viewEdit && (
        <PreferencesModal
          visible={viewEdit}
          isEdit
          onClose={async () => {
            setViewEdit(false);
            update && (await update());
          }}
        />
      )}
    </>
  );
};
