import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Switch } from 'react-native';
import Color from '../../constants/Color';
import { useState } from 'react';

const settingsData = [
    { id: '1', title: 'Change Email' },
    { id: '2', title: 'Change Phone Number' },
    { id: '3', title: 'Change Password' },
    { id: '4', title: 'Manage Socials' },
    {id:'5', title:'Sync Contacts'}
];

const AccountScreen = () => {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const handlePress = (setting) => {
        // Implement navigation or actions based on the setting pressed
        console.log(`Setting pressed: ${setting}`);
    };

    const renderSettingItem = ({ item }) => (
        item.title === 'Sync Contacts' ?
        <View style={{flexDirection:'row'}}><Text style={{paddingTop:10, paddingRight:'50%', paddingLeft:20,fontSize:16, color:'#4d4e4e'}}>Sync Contacts</Text>
            <Switch
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            style={{borderBottomWidth:1,
                borderColor:'gray'
            }}
            value={isEnabled}
            />
         </View>:
        <TouchableOpacity
            style={styles.settingButton}
            onPress={() => handlePress(item.title)}
        >
            <Text style={styles.settingText}>{item.title}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={settingsData}
                renderItem={renderSettingItem}
                keyExtractor={item => item.id}
                style={styles.flatList}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.background_color,
    },
    flatList: {
        width: '100%',
    },
    settingButton: {
        backgroundColor:Color.background_color,
        padding:20,
        borderBottomColor:'#bebdbd',
        borderBottomWidth:1
    },
    settingText: {
        color: '#4d4e4e',
        fontSize: 16,
        fontWeight: 'normal',
    },
});

export default AccountScreen;
