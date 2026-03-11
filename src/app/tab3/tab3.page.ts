import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { heart } from 'ionicons/icons';
import { PhotoService } from '../services/photo.service';
import type { UserPhoto } from '../services/photo.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  imports: [CommonModule, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonIcon],
})
export class Tab3Page implements OnInit {
  constructor(public photoService: PhotoService) {
    addIcons({ heart });
  }

  ngOnInit(): void {
    void this.photoService.loadSaved();
  }

  onUnfavorite(event: Event, photo: UserPhoto) {
    event.preventDefault();
    event.stopPropagation();
    void this.photoService.toggleFavorite(photo);
  }
}
