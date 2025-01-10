import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../jwt/auth.service';

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css'
})
export class PrincipalComponent {
  constructor(private router: Router, private authService: AuthService) {}

  navigateToCreatePost() {
    this.router.navigate(['/create-post']);
  }

  navigateToPostList() 
  {
    this.router.navigate(['/post-list']);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}