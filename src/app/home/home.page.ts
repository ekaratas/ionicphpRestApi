import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RestService } from '../rest.service';

// Şifreyi Sha256'ya dönüştürmek için kullanıldı npm i crypto-js komutu ile kurmalısınız
import sha256 from 'crypto-js/sha256';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  userData = {'username':'', 'password':''};

  constructor(public restService:RestService, public router:Router) {}

  giris()
  {
    this.userData.password = sha256(this.userData.password).toString();
    //console.log(this.userData.password);

    this.restService.veriGonder("giris", this.userData).subscribe(sonuc=>{
      //console.log(sonuc);
      this.restService.setItem(sonuc);
      this.router.navigateByUrl('anasayfa');
    }, hata=>{
      //console.log(hata.error.error.text);
      this.restService.presentAlert(hata.error.error.text);
    });
  }

  

}
