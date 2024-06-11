import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ChatsScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Chats</Text>
            <Text style={styles.content}>This is the Chats screen.</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8f8f8',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    content: {
        fontSize: 16,
        marginTop: 10,
    },
});

export default ChatsScreen;