import {Image, View} from 'react-native';
import {styles} from './styles';
import { imageUriCorrect } from '../../utils/imageUriCorrect';

interface UserImageIconProps {
  url: string;
  size?: number;
}
export const UserImageIcon = ({url, size = 58}: UserImageIconProps) => {
 
  return (
    <View style={styles.container}>
      <Image
        source={{uri: imageUriCorrect(url)}}
        style={[{borderRadius: size / 2, width: size, height: size}]}
      />
    </View>
  );
};
