import { useNavigation } from "@react-navigation/native"
import { View, Text, Button, StyleSheet } from "react-native"
import Color from "../constants/Color";


function VideoCallPage(){
    const nav = useNavigation();
    return (
        <View style={styles.mainContainer} >
            <Text>Settings</Text>
            <Button title="Go back" onPress={()=> nav.goBack()} ></Button>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: Color.background_color,
        flex: 1
    }

})

export default VideoCallPage