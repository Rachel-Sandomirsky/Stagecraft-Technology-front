import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Pipe({
  name: 'safeUrl'
})
export class SafeUrlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(url: string): SafeResourceUrl {
    if (!url) {
      console.warn('Received empty URL for sanitization');
      return '';
    }

    console.log('Transforming URL:', url);
    if (url.includes('studio.youtube.com')) {
      url = url.replace('studio.youtube.com', 'www.youtube.com');
      console.log('Converted YouTube Studio URL to embeddable format:', url);
    }

    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
