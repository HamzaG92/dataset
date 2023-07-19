import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css'],
})
export class AppHeaderComponent implements OnInit {
  constructor(private authservice: AuthService) {
    this.identite = this.authservice.fullName;
  }
  ngOnInit(): void {}

  public identite: string;
  isDoneLoading = this.authservice.isDoneLoading$;
  logout() {
    this.authservice.logout();
  }
}
