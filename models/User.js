export default class User {
    constructor(email, username, bio, phoneNumber) {
        this.email = email;
        this.username = username;
        this.bio = bio;
        this.phoneNumber = phoneNumber;
        this.avatarUrl = 'https://placehold.co/300x300/png';
        this.contacts = [];
    }

    createUser() {
        return {
            username: this.username,
            email: this.email,
            bio: this.bio,
            phoneNumber: this.phoneNumber,
            avatarUrl: this.avatarUrl,
            contacts: this.contacts
        };
    }
}
