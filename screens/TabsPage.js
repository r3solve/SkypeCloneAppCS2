import { View, Text, TouchableOpacity } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import UsersPage from './tabs/HomePage'

import SettingsPage from './tabs/SettingsPage';
import { Ionicons } from '@expo/vector-icons';
import Color from '../constants/Color';
import CallsPage from './tabs/ExplorePage';
const Tabs = createBottomTabNavigator()

const HomePage = () => {
    return (
        <Tabs.Navigator  initialRouteName='Chats'
            
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color}) => {
                    let iconName;
                    if (route.name === 'Chats') {
                        iconName = focused ? 'chatbubble-ellipses' : 'chatbubble-ellipses';
                    } else if (route.name === 'Calls') {
                        iconName = focused ? 'compass' : 'compass-outline';
                    }else if ( route.name === 'Settings') {
                        iconName = focused ? 'person': 'person-outline'
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
        <Tabs.Group screenOptions={({navigation, route})=> (
            {headerStyle:{backgroundColor:Color.background_color},
            
            }
        ) }
           
        >
        <Tabs.Screen  name='Chats' component={UsersPage} options={{
            headerRight: () => (<TouchableOpacity style={{padding:15, flexDirection:'row'}}>
                <Ionicons style={{marginHorizontal:20}} size={25} name='qr-code-outline' ></Ionicons>
                <Ionicons size={25} name='person-add-outline'></Ionicons>
            </TouchableOpacity>)
        }} />
            <Tabs.Screen name='Calls' options={{title:'Explore'}} component={CallsPage} />
            <Tabs.Screen name='Settings' options={{headerStyle:{backgroundColor:Color.background_color}}}  component={SettingsPage} /> 
        </Tabs.Group>
           
        </Tabs.Navigator>
    )
}


export default HomePage