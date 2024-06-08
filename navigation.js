import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import FeedPage from "./screens/Feed";


function NavigationComponent() {
    const Stack = createNativeStackNavigator()
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="index" component={FeedPage} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default NavigationComponent