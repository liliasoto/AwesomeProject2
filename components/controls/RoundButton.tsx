import React, { PropsWithoutRef } from "react";
import { TouchableOpacity, Text, StyleSheet, GestureResponderEvent} from "react-native";

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#78c426',
        borderRadius: 1000,
        padding: 16,
        alignItems: 'center'
      },
      buttonText: {
        fontWeight: 'bold',
        fontSize: 20,
        textTransform: 'uppercase',
        color:'white'
      }
});

type RoundButtonProps = PropsWithoutRef<{
    title: string;
    onPress?: ((event: GestureResponderEvent) => void)| undefined;
}>;

function RoundButton(props:RoundButtonProps): React.JSX.Element {
    return(
        <TouchableOpacity style={styles.button} onPress={props.onPress}>
            <Text style={styles.buttonText}>{props.title}</Text>
        </TouchableOpacity>
    );
};

export default RoundButton;