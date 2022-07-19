import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {}

  login() {
    //Ir al backend
    //un usuario

    this.authService.login().subscribe((response) => {
      if (response.id) {
        this.router.navigate(['/heroes']);
      }
    });
  }
}
