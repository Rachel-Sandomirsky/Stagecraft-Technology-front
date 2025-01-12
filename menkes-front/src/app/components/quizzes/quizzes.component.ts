import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Observable } from "rxjs";
import { QuizzesService } from "src/app/services/quizzes.service";
import { UserService } from "src/app/services/user.service";
import { Location } from '@angular/common';  

@Component({
  selector: 'app-quizzes',
  templateUrl: './quizzes.component.html',
  styleUrls: ['./quizzes.component.css']
})
export class QuizzesComponent implements OnInit
 {
  quiz: any;
  userAnswer: number = 0;
  isCorrect: boolean | null = null;
  hasAnswered: boolean = false;
  classCode: number = 0;
  userEmail: string | null = null;
  currentUser$!: Observable<any>; // הגדרה של currentUser$ כ-Observable
  quizAnswered: boolean = false;  // חדש: משתנה שמחסן אם המשתמש ענה כבר


  constructor(
    private quizzesService: QuizzesService,
    private route: ActivatedRoute,
    private userService: UserService,
    private location: Location  
  ) {}

  ngOnInit() {
    this.currentUser$ = this.userService.user$; // קבלת המשתמש הנוכחי

    this.route.paramMap.subscribe((params: ParamMap) => {
      const classCodeParam = params.get('class_code');
      if (classCodeParam) {
        this.classCode = +classCodeParam;
      } else {
        this.classCode = 0;
      }
    });

    this.currentUser$.subscribe(currentUser => {
      if (currentUser)
      {
        this.userEmail = currentUser.email;
        this.checkIfAnswered();
      }

    });
    
    
      
    if (!this.quizAnswered) {
      this.getQuiz();
    }
  
  }

   // פונקציה שמבצע את הבדיקה אם המשתמש ענה על הבוחן
   checkIfAnswered() {
    if (this.userEmail) {
      this.quizzesService.checkIfAnswered(this.classCode).subscribe(
        (answered) => {
          this.quizAnswered = answered;
        },
        (error) => {
          alert("error"+JSON.stringify(error))
          console.error('Error checking if answered:', error);
        }
      );
    }
  }

  getQuiz() {
    this.quizzesService.getQuizByClassCode(this.classCode).subscribe(
      (data: any) => {
        this.quiz = data;
        if (this.quiz && this.quiz.options) {
          this.quiz.options = this.quiz.options.split('\n');
        }
      },
      error => {
        console.error('Error fetching quiz:', error);
      }
    );
  }

  // בחירת תשובה
  selectAnswer(index: number): void {
    if (!this.hasAnswered) {
      this.userAnswer = index;
    }
  }

  // בדיקה אם תשובה נכונה
  isCorrectAnswer(index: number): boolean {
    return this.quiz && index === this.quiz.correctAnswer;
  }

  // פונקציה לשליחת תשובה
  submitAnswer() {
    if(this.userEmail!= null)
    {
      this.quizzesService.submitAnswer(this.quiz.code, this.userEmail, this.userAnswer).subscribe(
        (result: any) => {
          this.isCorrect = result.isCorrect;
          this.hasAnswered = true;
        },
        error => {
          console.error('Error submitting answer:', error);
        }
      );
  }
  }
  goBack() {
    this.location.back();  // חזרה לדף הקודם
  }
  
}
