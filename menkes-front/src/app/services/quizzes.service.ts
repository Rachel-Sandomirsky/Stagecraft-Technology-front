import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
  private apiUrl = 'http://localhost:3000/quizzes';  

  constructor(private http: HttpClient) {}

  getQuizByClassCode(classCode: number): Observable<Quiz> {
    return this.http.get<Quiz>(`${this.apiUrl}/${classCode}`);
  }
  // Get correct answer
  getCorrectAnswer(class_code: number): Observable<{ correctOption: number }> {
    return this.http.get<{ correctOption: number }>(`${this.apiUrl}/correct-answer?class_code=${class_code}`);
  }

  // Submit the user's answer
  submitAnswer(quizCode: number, userEmail: string, userAnswer: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/answer`, { quizz_code: quizCode, user_email: userEmail, userAnswer: userAnswer });
  }
  checkIfAnswered(classCode: number, userEmail: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/answered/${classCode}/${userEmail}`);
  }
}
