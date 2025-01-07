export class UserQuizz {
    constructor(
    public user_code: number,
  
    public quiz_code: number,
  
    public user_answer: number,
  
    public is_correct: boolean,
  
    public created_at: Date,
  
    public course_name: string,
  
    public lesson_name: string){}
  }
  