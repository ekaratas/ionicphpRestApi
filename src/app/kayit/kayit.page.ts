import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestService } from '../rest.service';

// Şifreyi Sha256'ya dönüştürmek için kullanıldı npm i crypto-js komutu ile kurmalısınız
import sha256 from 'crypto-js/sha256';

@Component({
  selector: 'app-kayit',
  templateUrl: './kayit.page.html',
  styleUrls: ['./kayit.page.scss'],
})
export class KayitPage implements OnInit {

  userData = {'name':'', 'email':'', 'username':'', 'password':''};

  constructor(public router:Router, public restService:RestService) { }

  ngOnInit() {
  }

  kayit()
  {
    this.userData.password = sha256(this.userData.password).toString();

    this.restService.veriGonder('kayit', this.userData).subscribe(sonuc=> {
      //console.log(sonuc);
      this.restService.setItem(sonuc);
      this.router.navigateByUrl('anasayfa');
    }, hata=>{
      //console.log(hata.error.error.text);
      this.restService.presentAlert(hata.error.error.text);
    });
  }

}
