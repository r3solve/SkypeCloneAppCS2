import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';
import * as Contacts from 'expo-contacts';
import Color from '../../constants/Color';

const ChatsScreen = () => {
    const [contacts, setContacts] = useState([]);
    const [hasPermission, setHasPermission] = useState(null);

    useEffect(() => {
        (async () => {
            const { status } = await Contacts.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const fetchContacts = async () => {
        if (hasPermission) {
            try {
                const { data } = await Contacts.getContactsAsync({
                    fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers],
                });
                if (data.length > 0) {
                    setContacts(data);
                }
            } catch (error) {
                console.error(error);
            }
        } else {
            alert('Permission to access contacts is required!');
        }
    };

    if (hasPermission === null) {
        return <Text style={styles.message}>Requesting for permissions...</Text>;
    }

    if (hasPermission === false) {
        return <Text style={styles.message}>No access to contacts</Text>;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Chats</Text>
            <Button title="Load Contacts" onPress={fetchContacts} />
            <FlatList
                data={contacts}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.contactItem}>
                        <Text style={styles.contactName}>{item.name}</Text>
                        {item.phoneNumbers && item.phoneNumbers.map((phone, index) => (
                            <Text key={index} style={styles.contactPhone}>
                                {phone.number}
                            </Text>
                        ))}
                    </View>
                )}
                ListEmptyComponent={<Text style={styles.message}>No contacts available.</Text>}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: Color.background_color,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    contactItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    contactName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    contactPhone: {
        fontSize: 16,
        color: '#666',
    },
    message: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginTop: 20,
    },
});

export default ChatsScreen;
