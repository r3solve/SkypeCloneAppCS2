import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import Color from '../../constants/Color';

const settingsData = [
    { id: '1', title: 'Change Email' },
    { id: '2', title: 'Change Phone Number' },
    { id: '3', title: 'Change Password' },
    { id: '4', title: 'Manage Socials' },
];

const AccountScreen = () => {
    const handlePress = (setting) => {
        // Implement navigation or actions based on the setting pressed
        console.log(`Setting pressed: ${setting}`);
    };

    const renderSettingItem = ({ item }) => (
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
        fontWeight: 'bold',
    },
});

export default AccountScreen;
