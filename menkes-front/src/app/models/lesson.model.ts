export class Lesson {
  constructor(
    public course_id: number,
    public title: string,
    public description: string,
    public video_url: string,
    public duration: string,
    public lessons_number: number,
    public transcript: string,
    public quiz_code? : boolean,
    public lessone_code?: number,
  ) {}
}
