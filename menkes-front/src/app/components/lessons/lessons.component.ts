import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Lesson } from '../../models/lesson.model';

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.css'],
})
export class LessonsComponent implements OnInit, OnChanges {
  @Input() lessons: Lesson[] = [];
  selectedLesson: Lesson | null = null;

  constructor() {}

  ngOnInit(): void {
    this.setDefaultLesson();
  }

  ngOnChanges(): void {
    // כאשר משתנה מערך השיעורים
    this.setDefaultLesson();
  }

  setDefaultLesson(): void {
    if (this.lessons.length > 0 && !this.selectedLesson) {
      this.selectedLesson = this.lessons[0];
      console.log('Default lesson set:', this.selectedLesson); 
      this.selectLesson(this.selectedLesson);
    }
  }
  

  selectLesson(lesson: Lesson): void {
    if (lesson && lesson.video_url) {
      const videoId = this.extractYouTubeId(lesson.video_url);
      this.selectedLesson = {
        ...lesson,
        video_url: `https://www.youtube.com/embed/${videoId}`,
      };
      console.log('Selected lesson:', this.selectedLesson); 
    } else {
      console.error('Invalid lesson selected:', lesson);
    }
  }
  

  extractYouTubeId(url: string): string {
    const videoIdMatch = url.match(/v=([^&]+)/);
    return videoIdMatch ? videoIdMatch[1] : '';
  }

  getSafeVideoUrl(): string {
    return this.selectedLesson?.video_url || '';
  }

  getThumbnailUrl(videoUrl: string): string {
    const videoId = this.extractYouTubeId(videoUrl);
    return `https://img.youtube.com/vi/${videoId}/default.jpg`;
  }
}
