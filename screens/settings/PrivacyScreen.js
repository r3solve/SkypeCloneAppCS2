import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PrivacyScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Privacy</Text>
            <Text style={styles.content}>This is the Privacy screen.</Text>
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

export default PrivacyScreen;
