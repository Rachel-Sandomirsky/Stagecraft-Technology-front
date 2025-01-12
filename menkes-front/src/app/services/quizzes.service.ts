import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

// Interface for the request body
interface SubmitAnswerRequest {
  quizz_code: number;
  user_code: number;
  userAnswer: number;
}

// Interface for the response
interface SubmitAnswerResponse {
  isCorrect: boolean;
}

// Interface for the quiz data (question and options)
interface Quiz {
  code: number;
  question: string;
  options: string;
  correct_option: number;
}

@Injectable({
  providedIn: 'root'
})
export class QuizzesService {
  private apiUrl = `${environment.apiUrl}/lessons`;
  private quizzesApiUrl = `${environment.apiUrl}/quizzes`;

  constructor(private http: HttpClient) {}

  getQuizByClassCode(classCode: number): Observable<Quiz> {
    return this.http.get<Quiz>(`${this.quizzesApiUrl}/${classCode}`);
  }
  // Get correct answer
  getCorrectAnswer(class_code: number): Observable<{ correctOption: number }> {
    return this.http.get<{ correctOption: number }>(`${this.quizzesApiUrl}/correct-answer?class_code=${class_code}`);
  }

  // Submit the user's answer
  submitAnswer(quizCode: number, userEmail: string, userAnswer: number): Observable<any> {
    return this.http.post(`${this.quizzesApiUrl}/answer`, { quizz_code: quizCode, userAnswer: userAnswer });
  }
  checkIfAnswered(classCode: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.quizzesApiUrl}/answered/${classCode}`);
  }
}
