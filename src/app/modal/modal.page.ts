import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { RestService } from '../rest.service';



@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {

   // Data passed in by componentProps
   @Input() duzeltilen: any;
   @Input() id: any;
   @Input() eklenen: any;

  constructor(public restService:RestService, public modalController:ModalController) { }

  ngOnInit() {

    if (this.eklenen)
    console.log(this.eklenen);
    else
    {
    console.log(this.duzeltilen);
    console.log(this.id);
  }
  }

  kapat()
  {
    this.modalController.dismiss({
      'dissmissed': true
    });
  }

  duzelt()
  {
    this.restService.veriGonder('mesaj/guncelle/'+this.id,this.duzeltilen).subscribe((sonuc:any) =>{this.restService.mesaj(sonuc.text); this.kapat();},hata =>{console.log(hata)});
  }

  ekle()
  {
    this.restService.veriGonder('mesaj_ekle',this.eklenen).subscribe((sonuc:any) =>{this.restService.mesaj(sonuc.text); this.kapat();},hata =>{console.log(hata)});
  }

}
