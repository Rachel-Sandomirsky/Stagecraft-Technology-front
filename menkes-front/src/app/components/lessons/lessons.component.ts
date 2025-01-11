import {
  Component,
  OnInit,
  Input,
  OnChanges,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { Lesson } from '../../models/lesson.model';
import { LessonsService } from 'src/app/services/lessons.service';
import { Router } from '@angular/router';

declare var YT: any; // YouTube API

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.css'],
})
export class LessonsComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() lessons: Lesson[] = [];
  selectedLesson: Lesson | null = null;
  filteredTranscript: {
    start_time: string;
    end_time: string;
    text: string;
    isActive: boolean;
    isVisible: boolean;
  }[] = [];
  @ViewChild('video', { static: false }) videoElement!: ElementRef<HTMLDivElement>;
  @ViewChild('transcriptContainer', { static: false })
  transcriptContainer!: ElementRef<HTMLDivElement>;

  private player: any;

  constructor(private lessonService: LessonsService, private router: Router) {}

  ngOnInit(): void {
    this.sortLessonsByNumber();
    this.setDefaultLesson();
  }

  ngAfterViewInit(): void {
    this.loadYouTubeAPI();
  }

  ngOnChanges(): void {
    this.sortLessonsByNumber();
    this.setDefaultLesson();
  }

  setDefaultLesson(): void {
    const fullLesson = this.lessons.find(
      (lesson) => lesson.video_url !== null && lesson.video_url !== undefined
    );

    this.selectedLesson = fullLesson || this.lessons[0] || null;

    this.filteredTranscript = this.selectedLesson?.transcript
      ? this.parseTranscript(this.selectedLesson.transcript)
      : [];
  }

  selectLesson(lesson: Lesson): void {
    this.selectedLesson = lesson;
    this.filteredTranscript = lesson.transcript
      ? this.parseTranscript(lesson.transcript)
      : [];

    const videoId = lesson.video_url ? this.extractYouTubeId(lesson.video_url) : null;

    if (videoId) {
      if (this.player) {
        this.loadVideo(videoId);
      } else {
        this.initPlayer(videoId);
      }
    } else {
      console.log('אין סרטון זמין לשיעור זה.');
    }
  }

  getThumbnailUrl(videoUrl: string): string {
    const videoId = this.extractYouTubeId(videoUrl);
    return `https://img.youtube.com/vi/${videoId}/default.jpg`;
  }


  extractYouTubeId(url: string): string {
    const videoIdMatch = url.match(
      /(?:v=|\/embed\/|youtu\.be\/|\/v\/|\?vi=|&vi=|\/u\/\w\/|embed\/|v=|youtu\.be\/|\/embed\/|\/shorts\/|\/watch\?v=|\/watch\?vi=)([^#\&\?]*).*/
    );
    return videoIdMatch ? videoIdMatch[1] : '';
  }

  loadYouTubeAPI(): void {
    if (typeof YT === 'undefined' || typeof YT.Player === 'undefined') {
      const script = document.createElement('script');
      script.src = 'https://www.youtube.com/iframe_api';
      script.onload = () => this.initPlayer();
      document.body.appendChild(script);
    } else {
      this.initPlayer();
    }
  }
  
  
  waitForYTReady(): void {
    const interval = setInterval(() => {
      if (typeof YT !== 'undefined' && typeof YT.Player !== 'undefined') {
        console.log('YouTube API is ready.');
        clearInterval(interval);
        this.initPlayer(); // אתחל את הנגן כאשר ה-API מוכן
      }
    }, 2000);
  }
  
  
  initPlayer(videoId?: string): void {
    if (!this.videoElement || !this.videoElement.nativeElement) {
      console.error('Video element is not available yet.');
      return;
    }
  
    const idToLoad = videoId || this.extractYouTubeId(this.selectedLesson?.video_url || '');
  
      console.log('Initializing new YouTube player...');
      this.player = new YT.Player(this.videoElement.nativeElement, {
        height: '100%',
        width: '100%',
        videoId: idToLoad,
        playerVars: {
          autoplay: 0,
          controls: 1,
          rel: 0,
          modestbranding: 1,
        },
        events: {
          onReady: () => this.onPlayerReady(),
          onStateChange: (event: any) => this.onPlayerStateChange(event),
        },
      });
  }  
  
  parseTranscript(transcript: any): { start_time: string; end_time: string; text: string; isActive: boolean; isVisible: boolean }[] {
    if (!transcript || typeof transcript !== 'string' || transcript.trim() === '') {
      console.warn('Transcript is empty, invalid, or not a string.');
      return [];
    }
  
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
  
  sortLessonsByNumber(): void {
    if (this.lessons && this.lessons.length > 0) {
      this.lessons.sort((a, b) => a.lessons_number - b.lessons_number);
    }
  }

  loadVideo(videoId: string): void {
    if (this.player && this.player.loadVideoById) {
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
    if (event.data === YT.PlayerState.ENDED) {
      this.handleVideoEnd();
    }
  }

  handleVideoEnd(): void {
    const userConfirmed = confirm('סיימת את השיעור! האם ברצונך לעבור לבוחן?');
    if (userConfirmed) {
      this.updateUserQuizStatus();
      this.navigateToQuiz();
    }
  }

  startUpdatingTranscript(): void {
    const update = () => {
      const currentTime = this.player?.getCurrentTime();
      if (currentTime !== undefined) {
        this.updateTranscript(currentTime);
      }
      requestAnimationFrame(update);
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

  updateUserQuizStatus(): void {
    this.lessonService.updateUserQuizStatus(this.selectedLesson?.course_id || 0).subscribe({
      next: () => {
        console.log('User quiz status updated successfully.');
      },
      error: (err) => {
        console.error('Failed to update user quiz status:', err);
      },
    });
  }

  navigateToQuiz(): void {
    const lessonCode = this.selectedLesson?.lessone_code;
    this.router.navigate([`/quizzes/${lessonCode}`]);
  }
}
