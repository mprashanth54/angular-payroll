import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocialAuthService } from 'angularx-social-login';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() title = ''
  constructor(private router: Router, private authService: AuthService, private gAuthService: SocialAuthService) { }

  ngOnInit(): void {
  }

  logout(): void {
    this.authService.logOut()
    this.authService.logOut()
    this.router.navigate([''])

  }

}
