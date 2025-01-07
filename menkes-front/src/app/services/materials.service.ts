import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Material } from '../models/material'; // מודל החומרים
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MaterialsService {
  private apiUrl = `${environment.apiUrl}/materials`;

  constructor(private http: HttpClient) {}

  // שליפת כל החומרים
  getAllMaterials(): Observable<Material[]> {
    return this.http.get<Material[]>(`${this.apiUrl}/all`);
  }

  // מחיקת חומר לפי material_code
  deleteMaterial(materialCode: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete-material/${materialCode}`);
  }

  // ניתן להוסיף כאן פונקציות נוספות כמו יצירה ועדכון חומרים
}
