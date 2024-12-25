export class TranscriptItem {
  constructor(
    public id: number, // מזהה השורה בתמלול
    public start_time: string, // זמן התחלה
    public end_time: string, // זמן סיום
    public text: string // טקסט התמלול
  ) {}
}

export class Lesson {
  constructor(
    public course_id: number,
    public title: string,
    public description: string,
    public video_url: string,
    public duration: string, // משך זמן הסרטון
    public lessonsNumber: number, // סדר הופעה בשיעור
    public transcript: TranscriptItem[] // תמלול הסרטון כמערך
  ) {}
}
