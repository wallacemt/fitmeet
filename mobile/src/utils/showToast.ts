import Toast from 'react-native-toast-message';
interface showToastProps {
  title: string;
  message: string;
  type: "success" | "error";
}
export const showToast = ({title, message, type}: showToastProps) => {
    Toast.show({
        type: type,
        text1: title,
        text2: message
    })
};
