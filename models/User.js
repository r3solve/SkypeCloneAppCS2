export default class {
    constructor(email, username, bio, phoneNumber) {
        this.email = email
        this.username = username
        this.bio = bio 
        this.phoneNumber = phoneNumber
    }


    createUser() {
        return {username:this.username, email : this.email, bio : this.bio, number : this.phoneNumber}
    }
}