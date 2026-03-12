import { Component, OnInit } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import * as LiveUpdates from '@capacitor/live-updates';
import { SplashScreen } from '@capacitor/splash-screen';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    this.initializeApp();
  }

  private async syncWithTimeout(timeoutMs: number) {
    const timeoutPromise = new Promise<null>((resolve) => {
      setTimeout(() => resolve(null), timeoutMs);
    });

    return Promise.race([LiveUpdates.sync(), timeoutPromise]);
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
    try {
      await LiveUpdates.setConfig(this.getLiveUpdatesRuntimeConfig());

      const result = await this.syncWithTimeout(12000);
      if (result?.activeApplicationPathChanged) {
        await LiveUpdates.reload();
        return;
      }
    } catch (error) {
      console.error('LiveUpdates sync failed', error);
    }

    await SplashScreen.hide();
  }
}
