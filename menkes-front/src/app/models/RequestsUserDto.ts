export class RequestsUserDto {
    
    constructor(
   
        public user_name: string,

        public password_hash: string,
    
        public email: string,
    
        public user_code: number,
    
        public course_code: number,
    
        public title: string,
) {}}