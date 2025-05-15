class Accounts {
    constructor(id, id_role, imgUrl, user_name, email, pass_word) {
        this.id = id;
        this.id_role = id_role;
        this.imgUrl = imgUrl;
        this.user_name = user_name;
        this.email = email;
        this.pass_word = pass_word;
    }

    toFirestore() {
        return {
            id_role: this.id_role,
            imgUrl: this.imgUrl,
            user_name: this.user_name,
            email: this.email,
            pass_word: this.pass_word,
        };
    }

    static fromFirestore(doc) {
        const data = doc.data();
        return new Accounts(doc.id, data.id_role, data.imgUrl, data.user_name, data.email, data.pass_word);
    }
}
module.exports = Accounts;