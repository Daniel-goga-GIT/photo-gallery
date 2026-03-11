import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import * as LiveUpdates from '@capacitor/live-updates';
import { SplashScreen } from '@capacitor/splash-screen';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  constructor() {
    this.initializeApp();
  }

  private getLiveUpdatesRuntimeConfig() {
    // These values can come from your backend after user sign-in.
    const channel = localStorage.getItem('liveUpdatesChannel') ?? 'production';
    const maxVersions = Number(localStorage.getItem('liveUpdatesMaxVersions') ?? '2');

    return {
      appId: 'b51d420f',
      channel,
      maxVersions: Number.isFinite(maxVersions) && maxVersions > 0 ? maxVersions : 2,
    };
  }

  async initializeApp() {
    await LiveUpdates.setConfig(this.getLiveUpdatesRuntimeConfig());

    const result = await LiveUpdates.sync();
    if (result.activeApplicationPathChanged) {
      await LiveUpdates.reload();
    } else {
      await SplashScreen.hide();
    }
  }
}
