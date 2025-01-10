import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { Post } from '../Post'; 
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [NgIf,NgFor],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css'
})
export class PostListComponent implements OnInit {
  posts: Post[] = [];
  noPostsMessage = 'No hay posts';

  constructor(private postService: PostService) { }

  ngOnInit() {
    this.loadPosts();
  }

  loadPosts() {
    this.postService.getPosts().subscribe({
      next: (data) => {
        this.posts = data;
      },
      error: (error) => {
        console.error('Error al obtener posts', error);
      }
    });
  }

  formatDate(date: Date): string {
    const d = new Date(date);
    return `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getFullYear()} ${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`;
  }
}