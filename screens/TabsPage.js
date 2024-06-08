import { View, Text } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import UsersPage from './HomePage';
import SettingsPage from './SettingsPage';
import { Ionicons } from '@expo/vector-icons';
import Color from '../constants/Color';
import CallsPage from './Calls';
const Tabs = createBottomTabNavigator()

const FeedPage = () => {
    return (
        <Tabs.Navigator  initialRouteName='Chats'
            
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color}) => {
                    let iconName;
                    if (route.name === 'Chats') {
                        iconName = focused ? 'chatbubble-ellipses' : 'chatbubble-ellipses';
                    } else if (route.name === 'Calls') {
                        iconName = focused ? 'call' : 'call-outline';
                    }else if ( route.name === 'Settings') {
                        iconName = focused ? 'settings': 'settings-outline'
                    }
                    return <Ionicons name={iconName} size={30} color={color} />;
                },
                tabBarStyle: { backgroundColor: Color.background_color, height:60, borderTopColor:Color.background_color },

                
            })}
            tabBarOptions={{
                activeTintColor: Color.primary_color,
                inactiveTintColor: 'gray',
                
                
            }}
        >  
           <Tabs.Screen  name='Chats' options={{headerStyle:{backgroundColor:Color.background_color, height:70}}}  component={UsersPage} />
            <Tabs.Screen name='Calls' options={{headerStyle:{backgroundColor:Color.background_color}}} component={CallsPage} />
            <Tabs.Screen name='Settings' options={{headerStyle:{backgroundColor:Color.background_color}}}  component={SettingsPage} /> 
        </Tabs.Navigator>
    )
}


export default FeedPage