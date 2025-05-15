class Chat {
    constructor(account, sender, text, timestamp = Date.now()) {
      this.account = account;
      this.sender = sender;
      this.text = text;
      this.timestamp = timestamp;
    }
  }
 module.exports =  Chat;