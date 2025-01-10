import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { PostService } from '../post.service';
import { CreatePostDto } from '../CreatePostDto';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css'
})
export class CreatePostComponent implements OnInit {
  createPostForm!: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';
  imagePreview: string | ArrayBuffer | null = null;

  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private router: Router
  ) { }

  ngOnInit() {
    this.createPostForm = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(5)]],
      imagen: [null]
    });
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.createPostForm.get('imagen')?.setValue(file);
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  private showError(message: string) {
    this.errorMessage = message;
    setTimeout(() => {
      this.errorMessage = '';
    }, 2000);
  }

  onSubmit() {
    if (this.createPostForm.valid) {
      const formData = new FormData();
      formData.append('titulo', this.createPostForm.get('titulo')?.value);
      const file: File = this.createPostForm.get('imagen')?.value;
      if (file) {
        formData.append('imageFile', file, file.name);
      } else {
        this.showError('Seleccione una imagen por favor.');
        return;
      }

      this.postService.createPost(formData).subscribe({
        next: () => {
          this.successMessage = 'Post creado exitosamente!';
          this.createPostForm.reset();
          this.imagePreview = null;
          setTimeout(() => {
            this.successMessage = '';
            this.router.navigate(['/dashboard']);
          }, 3000);
        },
        error: (error) => {
          if (error.error && error.error.error) {
            this.handleBackendError(error.error.error);
          } else {
            this.errorMessage = 'Error al crear el post: ' + error.message;
          }
        }
      });
    }
  }

  private handleBackendError(message: string) {
    this.errorMessage = message;
    // Limpiamos la imagen seleccionada para errores específicos de imagen
    if (message.includes('formato') || message.includes('tamaño') || message.includes('imagen')) {
      this.clearImage();
    }
    setTimeout(() => {
      this.errorMessage = '';
    }, 2000);
  }

  private clearImage() {
    this.imagePreview = null;
    this.createPostForm.get('imagen')?.setValue(null);
    document.getElementById('imagen')?.setAttribute('value', '');
  }

}