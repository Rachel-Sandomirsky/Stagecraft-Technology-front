export class UserDetails {
    constructor(
      public username: string,
      public email: string,
      public role: string,
      public is_approved: boolean,
      public access_token: string 
    ) {}
  }
  