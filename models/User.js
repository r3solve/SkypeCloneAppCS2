export default class {
    constructor(id, creator, reciever, chats) {
        this.id = id 
        this.creator = creator
        this.reciever = reciever
        this.chats = chats
    }

    setCreator(name) {
        this.creator = name
    }
    
    setReciver(name){
        this.reciever = name
    }
    setLink(){
        this.link = `cloud/chat/${this.id}`
    }


    createUser() {
        this.setLink()
        return {id: this.id, createdBy:this.creator, reciever:this.reciever,link:this.link, chats:[]}
    }
}