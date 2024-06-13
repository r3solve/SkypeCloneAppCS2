import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Color from '../../constants/Color';

const AboutScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>About</Text>
            <Text style={styles.content}>This is the About screen.</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Color.background_color,
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

export default AboutScreen;
