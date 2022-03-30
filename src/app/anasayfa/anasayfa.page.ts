import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { RestService } from '../rest.service';
import { ModalPage } from '../modal/modal.page';





@Component({
  selector: 'app-anasayfa',
  templateUrl: './anasayfa.page.html',
  styleUrls: ['./anasayfa.page.scss'],
})
export class AnasayfaPage implements OnInit {

  veriler;

  constructor(public alertController:AlertController, public restService:RestService, public router:Router, public modalController:ModalController) { }

  ngOnInit() {
    this.listele();
  }

  async listele() {

    const user = await this.restService.getObject();

    if (user==null)
      this.router.navigateByUrl('home');
    else
    {
    
    this.restService.presentLoading();
    this.restService.veriGetir('mesajlar/'+user.user_id).subscribe(sonuc=> {
      //console.log(sonuc);
      this.veriler = sonuc;
      this.restService.dismissAllLoaders();
    }, hata=>{
      console.log(hata.erorr.error.text);
      this.restService.dismissAllLoaders();
    });
  }
  }

  zamanDonustur(zaman)
  {
    let a = new Date(zaman*1000).toLocaleDateString();
    return a;
  }

  logout()
  {
    this.restService.removeItem();
    this.router.navigateByUrl('home');
  }

  async duzenle(mesaj, id) {
    const user = await this.restService.getObject();
    if (user==null)
      this.router.navigateByUrl('home');
    else
    {

    let userData = {'username':'', 'feed':'' ,'token':''};

    userData.username = user.username;
    userData.token = user.token;
    userData.feed = mesaj;

    const modal = await this.modalController.create({
      component:ModalPage,
      swipeToClose:true,
      initialBreakpoint:1,
      breakpoints:[0.1 ,0.5, 1 ],
      componentProps: {
        'duzeltilen':userData,
        'id':id
      }
    });

    modal.onDidDismiss().then(sonuc=>{this.listele()});

    //modal açmak için tıklandığında sliding item'ın açık kalmaması için
    const slidingItem = document.getElementById('slidingItem'+id) as HTMLIonItemSlidingElement;
    slidingItem.close();

    return await modal.present();
  }
  }

  async ekle() {
    const user = await this.restService.getObject();
    if (user==null)
      this.router.navigateByUrl('home');
    else
    {

    let userData = {'username':'','token':''};

    userData.username = user.username;
    userData.token = user.token;

    const modal = await this.modalController.create({
      component:ModalPage,
      swipeToClose:true,
      initialBreakpoint:1,
      breakpoints:[0.1 ,0.5, 1 ],
      componentProps: {
        'eklenen':userData,
      }
    });

    modal.onDidDismiss().then(sonuc=>{this.listele()});

    return await modal.present();
  }
  }

  async sil(id) {

    this.silOnay(id);

    //modal açmak için tıklandığında sliding item'ın açık kalmaması için
    const slidingItem = document.getElementById('slidingItem'+id) as HTMLIonItemSlidingElement;
    slidingItem.close();

  }

  async silOnay(id) {

    const user = await this.restService.getObject();
    if (user==null)
      this.router.navigateByUrl('home');
    else
    {

    let userData = {'username':'' ,'token':''};

    userData.username = user.username;
    userData.token = user.token;

    const alert = await this.alertController.create({
      header: 'Uyarı!',
      message: 'Mesajı silmek istediğinize emin misiniz?',
      buttons: [
        {
          text: 'Vazgeç',
          role: 'cancel',
          cssClass: 'secondary',
          id: 'cancel-button',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Sil',
          id: 'confirm-button',
          handler: () => {
            this.restService.veriGonder('sil/'+id,userData).subscribe((sonuc:any)=>{this.restService.mesaj(sonuc.text); this.listele();}, hata=>{console.log(hata);});
          }
        }
      ]
    });

    await alert.present();
  }
  }

  doRefresh(event) {
    console.log('Begin async operation');
    this.listele();

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 1000);
  }


}
