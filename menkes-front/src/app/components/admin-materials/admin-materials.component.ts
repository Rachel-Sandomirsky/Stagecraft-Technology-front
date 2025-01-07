import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Material } from 'src/app/models/material';
import { MaterialsService } from 'src/app/services/materials.service';

@Component({
  selector: 'app-admin-materials',
  templateUrl: './admin-materials.component.html',
  styleUrls: ['./admin-materials.component.css']
})
export class AdminMaterialsComponent implements OnInit {
  materials: Material[] = []; // רשימת החומרים
  selectedMaterial: Material | null = null; // חומר שנבחר

  constructor(private materialsService: MaterialsService) {}

  ngOnInit(): void {
    this.fetchMaterials();
  }

  // שליפת החומרים
  fetchMaterials(): void {
    this.materialsService.getAllMaterials().subscribe(
      (data: Material[]) => {
        this.materials = data;
      },
      (error) => {
        console.error('Failed to fetch materials', error);
      }
    );
  }

  // בחירת חומר להצגת פרטים
  onSelectMaterial(material: Material): void {
    this.selectedMaterial = material;
  }

  // הוספת חומר חדש
  onAddMaterial(): void {
    console.log('הוספת חומר חדש');
    // ניתן להוסיף כאן לוגיקה לפתיחת מודאל או פעולה אחרת
  }

  // מחיקת חומר
  onDeleteMaterial(materialCode: number, event: MouseEvent): void {
    event.stopPropagation(); // מניעת בחירת חומר בזמן לחיצה על מחיקה

    Swal.fire({
      title: 'אישור מחיקה',
      text: 'האם את בטוחה שברצונך למחוק את החומר?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#007bff', // צבע כפתור אישור
      cancelButtonColor: '#dc3545', // צבע כפתור ביטול
      confirmButtonText: 'כן, מחק!',
      cancelButtonText: 'ביטול',
      customClass: {
        popup: 'small-popup', // הוספת קלאס מותאם אישית
        title: 'custom-title',
        confirmButton: 'custom-confirm-button',
        cancelButton: 'custom-cancel-button',
      }
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.materialsService.deleteMaterial(materialCode).subscribe(
          () => {
            this.materials = this.materials.filter(
              (m) => m.material_code !== materialCode
            );
            this.selectedMaterial = null;
            Swal.fire('נמחק!', 'החומר נמחק בהצלחה.', 'success');
          },
          (error) => {
            Swal.fire('שגיאה!', 'לא הצלחנו למחוק את החומר. נסי שוב מאוחר יותר.', 'error');
            console.error('Failed to delete material', error);
          }
        );
      }
    });
  }
}
