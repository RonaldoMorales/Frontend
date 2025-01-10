// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PrincipalComponent } from './principal/principal.component';
import { CreatePostComponent } from './post/create-post/create-post.component';
import { PostListComponent } from './post/post-list/post-list.component';
import { RegisterComponent } from './register/register.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'principal', component: PrincipalComponent },
  { path: 'create-post', component: CreatePostComponent },
  { path: 'posts', component: PostListComponent },
  { path: 'register', component: RegisterComponent }
];