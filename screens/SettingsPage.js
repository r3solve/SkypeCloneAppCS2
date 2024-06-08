import { useNavigation } from "@react-navigation/native"
import { View, Text, Button, StyleSheet } from "react-native"


function SettingsPage(){
    const nav = useNavigation();
    return (
        <View>
            <Text>Settings</Text>
            <Button title="Go back" onPress={()=> nav.goBack()} ></Button>
        </View>
    )
}

const styles = StyleSheet.create({

})

export default SettingsPage