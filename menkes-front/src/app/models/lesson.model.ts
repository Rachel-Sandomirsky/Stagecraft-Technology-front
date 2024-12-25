export class Lesson {
    constructor(
      public course_code:number,
      public title: string,
      public description: string,
      public video_url: string,
      public duration: string, // משך זמן הסרטון
      public order: number,    // סדר הופעה בשיעור
      public transcript: string // תמלול הסרטון
    ) {}
  }
  