import { Component, OnInit } from '@angular/core';
import { SocialAuthService, GoogleLoginProvider } from "angularx-social-login";
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private gAuthService: SocialAuthService, private authService: AuthService) { }

  ngOnInit(): void {
    this.gAuthService.authState.subscribe((user) => {
      console.log("user", user)
      if (user) {
        this.authService.login(user.idToken).subscribe((data) => {
          console.log(data)
          const { token } = data
          this.authService.setToken(token)
          this.router.navigate(['organization'], {});

        })
      }

    });
  }

  signIn(): void {
    this.gAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

}
