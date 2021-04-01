import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from './services/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title: string = 'payroll';
  homePage: Boolean = false
  onlyOrgEnabled: Boolean = true


  constructor(private router: Router, private authService: AuthService) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        let url = event['url']
        if (url && url === '/') {
          this.homePage = false
        } else this.homePage = true
      }

    });

    this.authService.getOrgValid().subscribe((val) => {
      console.log("Org ", val)
      this.onlyOrgEnabled = !val
    })

  }

  ngOnChange() { }

}
