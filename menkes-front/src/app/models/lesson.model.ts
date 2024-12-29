export class Lesson {
  constructor(
    public course_id: number,
    public title: string,
    public description: string,
    public video_url: string,
    public duration: string, // משך זמן הסרטון
    public lessonsNumber: number, // סדר הופעה בשיעור
    public transcript: string
  ) {}
}
