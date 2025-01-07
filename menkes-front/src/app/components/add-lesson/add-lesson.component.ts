import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Lesson } from 'src/app/models/lesson.model';
import { LessonsService } from 'src/app/services/lessons.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-add-lesson',
  templateUrl: './add-lesson.component.html',
  styleUrls: ['./add-lesson.component.css']
})
export class AddLessonComponent implements OnInit, OnChanges {
  @Input() courseId!: number; 
  lesson: Lesson = {
    course_id: 0,
    title: '',
    description: '',
    video_url: '',
    duration: '',
    lessons_number: 0,
    transcript: ''
  };
  videoUrlError: string | null = null; 
  transcriptError: string | null = null; 
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(
    private lessonsService: LessonsService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    console.log('AddLessonComponent initialized'); 
    console.log('Initial lesson data:', this.lesson); 
    if (!this.courseId || this.courseId === 0) {
      console.error('AddLessonComponent: Invalid or missing courseId:', this.courseId);
    } else {
      console.log('Received courseId:', this.courseId); 
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['courseId']) {
      console.log('AddLessonComponent: courseId changed:', changes['courseId'].currentValue);
    }
  }

  validateYouTubeUrl(): void {
    console.log('Validating YouTube URL:', this.lesson.video_url);
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;
    if (!youtubeRegex.test(this.lesson.video_url)) {
      this.videoUrlError = 'יש להזין קישור תקין מיוטיוב';
      console.error('Invalid YouTube URL:', this.lesson.video_url);
    } else {
      try {
        const convertedUrl = this.convertToEmbedUrl(this.lesson.video_url);
        this.lesson.video_url = convertedUrl;
        console.log('Converted video URL:', convertedUrl); 
        this.videoUrlError = null;
      } catch (error) {
        this.videoUrlError = 'קישור לא תקין מיוטיוב';
        console.error('Error converting YouTube URL:', error);
      }
    }
  }

  validateTranscriptFormat(): void {
    console.log('Validating transcript format:', this.lesson.transcript);
    try {
      const parsed = JSON.parse(this.lesson.transcript);
      if (typeof parsed !== 'string') {
        this.transcriptError = 'יש לוודא שהכתוביות הן מחרוזת JSON בלבד.';
        console.error('Invalid transcript format:', this.lesson.transcript);
      } else {
        this.transcriptError = null;
      }
    } catch (error) {
      this.transcriptError = 'פורמט JSON לא תקין.';
      console.error('Error parsing transcript JSON:', error);
    }
  }

  convertToEmbedUrl(url: string): string {
    const youtubeRegex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/|.+\?v=)|youtu\.be\/)([\w-]{11})/;
    const match = url.match(youtubeRegex);

    if (match && match[1]) {
      return `https://www.youtube.com/embed/${match[1]}`;
    } else {
      console.error('Failed to convert YouTube URL to embed format:', url);
      throw new Error('קישור לא תקין מיוטיוב');
    }
  }

  showMessage(type: 'success' | 'error', message: string) {
    console.log(`showMessage called with type: ${type} and message: ${message}`);
    if (type === 'success') {
      this.successMessage = message;
      this.errorMessage = null;
    } else {
      this.errorMessage = message;
      this.successMessage = null;
    }

    setTimeout(() => {
      console.log('Clearing messages');
      this.successMessage = null;
      this.errorMessage = null;
    }, 5000); 
  }

  onSubmit(): void {
    console.log('onSubmit called'); 
    console.log('Lesson data before validation:', this.lesson); 

    if (!this.courseId || this.courseId === 0) {
      console.error('Course ID is missing or invalid in onSubmit:', this.courseId);
      this.showMessage('error', 'שגיאה: קוד קורס חסר או לא תקין.');
      return;
    }

    if (!this.videoUrlError && !this.transcriptError) {
      console.log('Course ID is valid:', this.courseId); 

      if (!this.lesson.lessons_number || this.lesson.lessons_number < 0) {
        this.lesson.lessons_number = -1;
        console.log('Lesson will be added to the end of the list.');
      }

      this.lesson.course_id = this.courseId;

      console.log(
        'Adding lesson at position:',
        this.lesson.lessons_number === -1 ? 'Last' : this.lesson.lessons_number
      );

      this.lessonsService.addLesson(this.lesson).subscribe(
        (response) => {
          console.log('Lesson successfully added:', response);
          this.showMessage('success', 'השיעור נוסף בהצלחה!');
          this.modalService.closeModal(); 
        },
        (error) => {
          console.error('Error adding lesson:', error); 
          this.showMessage('error', 'שגיאה בהוספת השיעור.');
        }
      );
    } else {
      console.log('Validation failed or missing courseId');
      if (this.videoUrlError) {
        console.error('Video URL Error:', this.videoUrlError);
      }
      if (this.transcriptError) {
        console.error('Transcript Error:', this.transcriptError);
      }
    }
  }

  onClose(): void {
    console.log('Modal closed');
    this.modalService.closeModal(); 
  }
}
