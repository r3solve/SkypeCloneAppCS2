import { useNavigation } from "@react-navigation/native"
import { View, Text, Button, StyleSheet } from "react-native"
import Color from "../../constants/Color";


function SettingsPage(){
    const nav = useNavigation();
    return (
        <View style={styles.mainContainer}>
            
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer:{
        flex:1,
        backgroundColor: Color.background_color
    }

})

export default SettingsPage