import { useNavigation, useRoute } from "@react-navigation/native";
import { Button, Text, View } from "react-native";

function ChatDetailsPage(){
    const navigator = useNavigation();
    const route = useRoute()
    return (
        <View>
            <Text> route {route.params.id} </Text>
            <Button title="Move" onPress={()=> navigator.navigate('Feed')} ></Button>
        </View>
    )
}



export default ChatDetailsPage