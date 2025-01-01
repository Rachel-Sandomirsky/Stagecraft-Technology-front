import { Component, OnInit, Input, OnChanges, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Lesson } from '../../models/lesson.model';

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.css'],
})
export class LessonsComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() lessons: Lesson[] = [];
  selectedLesson: Lesson | null = null;
  filteredTranscript: any[] = [];
  @ViewChild('video', { static: false }) videoElement!: ElementRef<HTMLIFrameElement>;

  constructor() {}

  ngOnInit(): void {
    this.setDefaultLesson();
  }

  ngAfterViewInit(): void {
    this.setupTimeUpdateListener();
  }

  ngOnChanges(): void {
    this.setDefaultLesson();
  }

  setDefaultLesson(): void {
    if (this.lessons.length > 0 && !this.selectedLesson) {
      const lesson = this.lessons[0];
      const videoId = this.extractYouTubeId(lesson.video_url);
      this.selectedLesson = {
        ...lesson,
        video_url: `https://www.youtube.com/embed/${videoId}`,
      };

      this.filteredTranscript = Array.isArray(this.selectedLesson.transcript)
        ? this.selectedLesson.transcript.map((line) => ({
            ...line,
            isActive: false,
          }))
        : [];
      console.log('Default lesson and transcript:', this.selectedLesson, this.filteredTranscript);
    }
  }

  selectLesson(lesson: Lesson): void {
    if (lesson && lesson.video_url) {
      const videoId = this.extractYouTubeId(lesson.video_url);
      this.selectedLesson = {
        ...lesson,
        video_url: `https://www.youtube.com/embed/${videoId}`,
      };

      this.filteredTranscript = Array.isArray(this.selectedLesson.transcript)
        ? this.selectedLesson.transcript.map((line) => ({
            ...line,
            isActive: false,
          }))
        : [];
      console.log('Selected lesson and transcript:', this.selectedLesson, this.filteredTranscript);
    } else {
      console.error('Invalid lesson selected:', lesson);
    }
  }

  extractYouTubeId(url: string): string {
    if (url.includes('studio.youtube.com')) {
      url = url.replace('studio.youtube.com', 'www.youtube.com');
    }
    const videoIdMatch = url.match(/(?:v=|\/embed\/|youtu\.be\/|\/v\/|\?vi=|&vi=|\/u\/\w\/|embed\/|v=|youtu\.be\/|\/embed\/|\/shorts\/|\/watch\?v=|\/watch\?vi=)([^#\&\?]*).*/);
    return videoIdMatch ? videoIdMatch[1] : '';
  }

  getSafeVideoUrl(): string {
    return this.selectedLesson?.video_url || '';
  }

  getThumbnailUrl(videoUrl: string): string {
    const videoId = this.extractYouTubeId(videoUrl);
    return `https://img.youtube.com/vi/${videoId}/default.jpg`;
  }

  updateTranscript(currentTime: number): void {
    this.filteredTranscript.forEach((line) => {
      const startTime = this.parseTime(line.start_time);
      const endTime = this.parseTime(line.end_time);
      line.isActive = currentTime >= startTime && currentTime <= endTime;
    });
  }

  parseTime(timeString: string): number {
    const parts = timeString.split(':').map((part) => parseFloat(part));
    return parts[0] * 60 + parts[1] + parts[2] / 1000;
  }

  setupTimeUpdateListener(): void {
    if (this.videoElement) {
      const iframe = this.videoElement.nativeElement;
      iframe.contentWindow?.addEventListener('message', (event) => {
        if (event.data?.event === 'infoDelivery' && event.data.info?.currentTime) {
          this.updateTranscript(event.data.info.currentTime);
        }
      });
    }
  }
}
