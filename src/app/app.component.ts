import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestService } from './rest.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(public router:Router, public restService:RestService) {}

  ngOnInit() {
    this.kontrol();
  }

  async kontrol()
  {
    const user = await this.restService.getObject();

    if (user == null)
      this.router.navigateByUrl('home');
    else
      this.router.navigateByUrl('anasayfa');
  }

}
