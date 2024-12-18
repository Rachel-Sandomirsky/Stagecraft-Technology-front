import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.css']
})
export class RecommendationsComponent implements OnInit {
  recommendations = [
    { course: 'קורס תאורה דינאמית', feedback: 'הקורס היה מצוין, ברמה גבוהה ואיכותית', student: 'אלישבע כהן' },
    { course: 'קורס טכנאות במה מתקדמים', feedback: 'ההוראה ברמה גבוהה!', student: 'מיכל לוי' },
    { course: 'קורס בטיחות ובקרת סיכונים', feedback: 'הקורס עזר לי מאד לפתור מצבים בעבודה שנתקלתי בעבר', student: 'בתיה ישראלי' },
    { course: 'קורס טכנאות במה בסיסי', feedback: ',מורה מקצועית,הייתה חוויה מעולה!', student: 'חיה ברוך' },
    { course:'קורס תאורה דינאמית', feedback: 'קורס מעשיר ומפתח, קיבלתי כלים רבים שיעזרו לי בהמשך העבודה', student: 'שרית כהן' }
  ];

  currentRecommendations: any[] = [];

  ngOnInit(): void {
    this.setRecommendations();
    setInterval(() => {
      this.setRecommendations();
    }, 2000); 
  }

  setRecommendations(): void {
    const startIndex = Math.floor(Math.random() * (this.recommendations.length - 3)); // בוחר אקראית שלוש המלצות
    this.currentRecommendations = this.recommendations.slice(startIndex, startIndex + 3);
  }
}
