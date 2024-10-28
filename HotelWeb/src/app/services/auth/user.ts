export class User {
    userId: string;
    token: string;
    userRole: string;
  
    constructor(userId: string, token: string, userRole: string) {
      this.userId = userId;
      this.token = token;
      this.userRole = userRole;
    }
  }