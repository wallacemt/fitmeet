import { StyleSheet } from "react-native";
import { themes } from "../../assets/themes";

export const styles = StyleSheet.create({
    container: {
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',     
    },
    camera: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [{ translateX: -150 }, { translateY: -25 }],
        color: themes.colors.perigo
    }
});