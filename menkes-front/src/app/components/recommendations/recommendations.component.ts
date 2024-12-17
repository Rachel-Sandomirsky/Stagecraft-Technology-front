import { Component } from '@angular/core';

@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.css']
})
export class RecommendationsComponent {
  recommendations = [
    {
      student: 'עדי כהן',
      feedback: 'מירי מנקס היא מורה מדהימה! בזכותה הבנתי את כל היסודות של טכנאות במה!',
      course: 'טכנאות תאורה והגברה'
    },
    {
      student: 'יובל לוי',
      feedback: 'הקורס היה מקצועי ומעניין. ממליץ לכולם!',
      course: 'עיצוב במה לתיאטרון'
    },
    {
      student: 'נועה ישראלי',
      feedback: 'לא רק שלמדתי, נהניתי מכל רגע! מירי היא פשוט השראה.',
      course: 'יסודות הסאונד לטכנאי במה'
    }
  ];
}
