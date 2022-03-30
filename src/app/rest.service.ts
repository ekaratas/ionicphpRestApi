import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';


// Sunucudan gelen token vb. bilgileri storage'a saklamak için npm install @capacitor/storage komutu ile kurmalısınız
import { Storage } from '@capacitor/storage';


@Injectable({
  providedIn: 'root'
})
export class RestService {

  // Yükleniyor Loading Controller'ı için kontrol değeri
  isLoading = false;

  //Sunucu adresi Google ve Apple https olmadan kullanılmasına izin vermez.
  //apiURL = 'http://localhost/php-slim-rest-master/slimapp/api/';
  apiURL = 'http://192.168.1.96/php-slim-rest-master/slimapp/api/';


  constructor(public toastController:ToastController, public httpClient:HttpClient, public alertController:AlertController, public loadingController:LoadingController) { }

  veriGonder(talep,veri)
  {
    return this.httpClient.post(this.apiURL+talep, veri);
  }

  veriGetir(talep)
  {
    return this.httpClient.get(this.apiURL+talep);
  }

  //Hata mesajlarını göstermek için
  async presentAlert(mesaj)
  {
    const alert = await this.alertController.create({
      header: 'Hata',
      message: mesaj,
      buttons: ['Kapat']
    });
    await alert.present();

    const {role} = await alert.onDidDismiss();

    }


  //Storage'da saklamak için
    async setItem(value)
  {
    await Storage.set({
      key: 'ionicphprest_kullanici',
      value: JSON.stringify(value)
    });
  }

  //Storage'dan ilgili key'i silmek için
  async removeItem()
  {
    await Storage.remove({key:'ionicphprest_kullanici'});
  }

  //Storage'dan ilgili key'e ait değerleri okumak için
  async getObject()
  {
    const ret = await Storage.get({key: 'ionicphprest_kullanici'});
    const user = JSON.parse(ret.value);
     return user;
  }

  // Yükleniyor yazısını ekranda gösterir
  async presentLoading() {
    this.isLoading = true;
    return await this.loadingController.create({
      message: 'Yükleniyor...',
      spinner: 'circles' 
    }).then(a => {
      a.present().then(() => {
        //console.log('loading presented');
        if (!this.isLoading) {
          a.dismiss().then(() => console.log(''));
        }
      });
    });
    
  }

  //İşlem bittiğinde yükleniyor yazısını kaldırır
  async dismissAllLoaders() {
    let topLoader = await this.loadingController.getTop();
    this.isLoading = false;
    while (topLoader) {
      if (!(await topLoader.dismiss())) {
        throw new Error('Could not dismiss the topmost loader. Aborting...');
      }
      topLoader = await this.loadingController.getTop();
    }
  }

  async mesaj(txt)
  {
    const toast = await this.toastController.create({
      message:txt,
      duration:2000,
      position:'top',
      color:'dark'
    });
    toast.present();
  }


}
