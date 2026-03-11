import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonFab, IonFabButton, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { camera } from 'ionicons/icons';
import { PhotoService } from '../services/photo.service';
import type { UserPhoto } from '../services/photo.service';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [CommonModule, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonFab, IonFabButton, IonIcon],
})
export class Tab2Page implements OnInit {
  constructor(public photoService: PhotoService, public actionSheetController: ActionSheetController) {
    addIcons({ camera });
  }

  // CHANGE: Add call to `loadSaved()` when navigating to the Photos tab
  ngOnInit(): void {
    void this.photoService.loadSaved();
  }

  addPhotoToGallery() {
    this.photoService.addNewToGallery();
  }

  onPhotoInteraction(event: Event, photo: UserPhoto, position: number) {
    event.preventDefault();
    event.stopPropagation();
    void this.showActionSheet(photo, position);
  }

  onDeleteButtonInteraction(event: Event, photo: UserPhoto, position: number) {
    event.preventDefault();
    event.stopPropagation();

    if (window.confirm('Delete this photo?')) {
      void this.photoService.deletePhoto(photo, position);
    }
  }

  public async showActionSheet(photo: UserPhoto, position: number) {
    try {
      const actionSheet = await this.actionSheetController.create({
        header: 'Photos',
        buttons: [
          {
            text: 'Delete',
            role: 'destructive',
            icon: 'trash',
            handler: () => {
              this.photoService.deletePhoto(photo, position);
            },
          },
          {
            text: 'Cancel',
            icon: 'close',
            role: 'cancel',
            handler: () => {
              // Nothing to do, action sheet closes automatically.
            },
          },
        ],
      });

      await actionSheet.present();
    } catch {
      if (window.confirm('Delete this photo?')) {
        this.photoService.deletePhoto(photo, position);
      }
    }
  }
}