import { Component, OnInit, Input, OnChanges, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Lesson } from '../../models/lesson.model';

declare var YT: any; // YouTube API

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.css'],
})
export class LessonsComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() lessons: Lesson[] = [];
  selectedLesson: Lesson | null = null;
  filteredTranscript: { start_time: string; end_time: string; text: string; isActive: boolean; isVisible: boolean }[] = [];
  @ViewChild('video', { static: false }) videoElement!: ElementRef<HTMLDivElement>;
  @ViewChild('transcriptContainer', { static: false }) transcriptContainer!: ElementRef<HTMLDivElement>;

  private player: any;

  constructor() {}

  ngOnInit(): void {
    this.setDefaultLesson(); // ווידוא שיעור ברירת מחדל
  }

  ngAfterViewInit(): void {
    this.loadYouTubeAPI(); // טען את API של YouTube
    if (this.selectedLesson) {
      const videoId = this.extractYouTubeId(this.selectedLesson.video_url || '');
      this.loadVideo(videoId); // טען וידאו כברירת מחדל
    }
  }

  ngOnChanges(): void {
    this.setDefaultLesson(); // וידוא שיעור ברירת מחדל בכל שינוי
  }

  setDefaultLesson(): void {
    const savedLesson = localStorage.getItem('selectedLesson');
    if (savedLesson) {
      const lesson = JSON.parse(savedLesson);
      const videoId = this.extractYouTubeId(lesson.video_url || '');
      this.selectedLesson = {
        ...lesson,
        video_url: videoId ? `https://www.youtube.com/embed/${videoId}` : '',
      };
  
      this.filteredTranscript = this.selectedLesson?.transcript
        ? this.parseTranscript(this.selectedLesson.transcript)
        : [];
  
      if (!this.player && videoId) {
        this.initPlayer(videoId);
      }
    } else if (this.lessons.length > 0) {
      const lesson = this.lessons[0];
      const videoId = this.extractYouTubeId(lesson.video_url || '');
      this.selectedLesson = {
        ...lesson,
        video_url: videoId ? `https://www.youtube.com/embed/${videoId}` : '',
      };
  
      this.filteredTranscript = this.selectedLesson?.transcript
        ? this.parseTranscript(this.selectedLesson.transcript)
        : [];
  
      if (!this.player && videoId) {
        this.initPlayer(videoId);
      }
    }
  }
  

  selectLesson(lesson: Lesson): void {
    if (lesson && lesson.video_url) {
      const videoId = this.extractYouTubeId(lesson.video_url);
      this.selectedLesson = {
        ...lesson,
        video_url: `https://www.youtube.com/embed/${videoId}`,
      };
  
      this.filteredTranscript = this.selectedLesson?.transcript
        ? this.parseTranscript(this.selectedLesson.transcript)
        : [];
  
      localStorage.setItem('selectedLesson', JSON.stringify(this.selectedLesson)); // שמירת השיעור ב-localStorage
  
      this.loadVideo(videoId);
    }
  }
  
  

  getThumbnailUrl(videoUrl: string): string {
    const videoId = this.extractYouTubeId(videoUrl);
    return `https://img.youtube.com/vi/${videoId}/default.jpg`;
  }

  parseTranscript(transcript: string): { start_time: string; end_time: string; text: string; isActive: boolean; isVisible: boolean }[] {
    try {
      return JSON.parse(transcript).map((line: any) => ({
        start_time: line.start_time || '',
        end_time: line.end_time || '',
        text: line.text || '',
        isActive: false,
        isVisible: false,
      }));
    } catch (error) {
      console.error('Error parsing transcript JSON:', error);
      return [];
    }
  }

  extractYouTubeId(url: string): string {
    const videoIdMatch = url.match(/(?:v=|\/embed\/|youtu\.be\/|\/v\/|\?vi=|&vi=|\/u\/\w\/|embed\/|v=|youtu\.be\/|\/embed\/|\/shorts\/|\/watch\?v=|\/watch\?vi=)([^#\&\?]*).*/);
    return videoIdMatch ? videoIdMatch[1] : '';
  }

  loadYouTubeAPI(): void {
    if (typeof YT === 'undefined' || typeof YT.Player === 'undefined') {
      const script = document.createElement('script');
      script.src = 'https://www.youtube.com/iframe_api';
      script.onload = () => {
        this.initPlayer();
      };
      document.body.appendChild(script);
    } else {
      this.initPlayer();
    }
  }

  initPlayer(videoId?: string): void {
    const idToLoad = videoId || this.extractYouTubeId(this.selectedLesson?.video_url || '');
    this.player = new YT.Player(this.videoElement.nativeElement, {
      height: '100%', // ווידוא גובה מלא
      width: '100%', // ווידוא רוחב מלא
      videoId: idToLoad,
      playerVars: {
        autoplay: 0, // ביטול הפעלה אוטומטית
        controls: 1, // הצגת כפתורי שליטה
        rel: 0, // לא להציג סרטונים קשורים
        modestbranding: 1 // הפחתת מיתוג יוטיוב
      },
      events: {
        onReady: () => this.onPlayerReady(),
        onStateChange: (event: any) => this.onPlayerStateChange(event),
      },
    });
  }
  

  loadVideo(videoId: string): void {
    if (this.player) {
      this.player.loadVideoById(videoId);
    } else {
      this.initPlayer(videoId);
    }
  }

  onPlayerReady(): void {
    console.log('YouTube Player is ready');
  }

  onPlayerStateChange(event: any): void {
    if (event.data === YT.PlayerState.PLAYING) {
      this.startUpdatingTranscript();
    }
  }

  startUpdatingTranscript(): void {
    const update = () => {
      const currentTime = this.player?.getCurrentTime();
      if (currentTime !== undefined) {
        this.updateTranscript(currentTime);
      }
      requestAnimationFrame(update); // עדכון מתמשך
    };
    requestAnimationFrame(update);
  }

  updateTranscript(currentTime: number): void {
    this.filteredTranscript = this.filteredTranscript.map((line) => {
      const startTime = this.parseTime(line.start_time);
      const endTime = this.parseTime(line.end_time);
      return {
        ...line,
        isActive: currentTime >= startTime && currentTime <= endTime,
        isVisible: currentTime >= startTime,
      };
    });

    const activeLineIndex = this.filteredTranscript.findIndex((line) => line.isActive);
    if (activeLineIndex !== -1) {
      this.scrollToActiveLine(activeLineIndex);
    }
  }

  parseTime(timeString: string): number {
    const parts = timeString.split(':').map((part) => parseFloat(part));
    if (parts.length === 3) {
      return parts[0] * 3600 + parts[1] * 60 + parts[2];
    } else if (parts.length === 2) {
      return parts[0] * 60 + parts[1];
    }
    return 0;
  }

  scrollToActiveLine(activeLineIndex: number): void {
    const container = this.transcriptContainer.nativeElement;
    const activeLine = container.querySelectorAll('.transcript-line')[activeLineIndex] as HTMLElement;

    if (activeLine && this.isTranscriptInView()) {
      activeLine.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }

  isTranscriptInView(): boolean {
    const container = this.transcriptContainer.nativeElement;
    const rect = container.getBoundingClientRect();
    return rect.bottom <= window.innerHeight && rect.top >= 0;
  }
}
