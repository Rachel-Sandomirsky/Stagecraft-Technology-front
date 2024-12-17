export class User {
  constructor(
    public id: string,
    public username: string,
    public email: string,
    public password_hash: string,
    public role: string,
    public is_approved: boolean,
    public code: number,
    public access_token?: string 
  ) {}
}
