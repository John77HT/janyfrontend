import { Component, OnInit } from '@angular/core';
import { PublicacionService } from '../../services/publicacion.service'; // Asegúrate de que este servicio existe
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-publicacion',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contenido.component.html',
  styleUrl: './contenido.component.css'
})
export class ContenidoComponent implements OnInit {
  arrayPublicaciones: any[] = []; // Cambia 'any' a 'Publicacion' si tienes un modelo
  publicacionEnEdicion: any = null; // Publicación en edición
  nuevoPublicacionForm: FormGroup; 
  formVisible: boolean = false; // Controla la visibilidad del formulario

  constructor(private publicacionService: PublicacionService, private fb: FormBuilder) {
    this.nuevoPublicacionForm = this.fb.group({
      id_publicacion: [{ value: '', disabled: true }], // Deshabilitado por defecto
      texto: ['']
    });
  }

  ngOnInit(): void {
    this.fetch(); // Cargar las publicaciones al iniciar
  }

  fetch(): void {
    this.publicacionService.fetchPublicacion().subscribe(result => {
      this.arrayPublicaciones = result; // Asegúrate de que result sea del tipo Publicacion[]
    });
  }

  crearPublicacion(): void {
    const nuevaPublicacion = this.nuevoPublicacionForm.value;
    this.publicacionService.postPublicacion(nuevaPublicacion).subscribe(
      (result) => {
        console.log('Publicación creada:', result);
        this.arrayPublicaciones.push(result); // Agrega la nueva publicación a la lista
        this.nuevoPublicacionForm.reset(); // Limpia el formulario
        alert('Publicación creada con éxito.');

        // Desplazarse hacia la parte superior
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
      (error) => {
        console.error('Error al crear publicación:', error);
        alert('Error al crear la publicación.');
      }
    );
  }

  editarPublicacion(publicacion: any): void {
    this.publicacionEnEdicion = publicacion;
    this.nuevoPublicacionForm.patchValue(publicacion);
    this.formVisible = true;

    // Desplazarse hacia el formulario
    setTimeout(() => {
      const formElement = document.getElementById('formularioEdicion');
      if (formElement) {
        formElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 0);
  }

  actualizarPublicacion(): void {
    const id = this.nuevoPublicacionForm.get('id_publicacion')?.value;
    const publicacionActualizada = this.nuevoPublicacionForm.value;

    this.publicacionService.updatePublicacion(id, publicacionActualizada).subscribe(
      (result) => {
        console.log('Publicación actualizada:', result);
        const index = this.arrayPublicaciones.findIndex(pub => pub.id_publicacion === id);
        if (index !== -1) {
          this.arrayPublicaciones[index] = result; // Actualiza la publicación en la lista
        }
        this.cancelarEdicion(); // Cierra el formulario de edición
        alert('Publicación actualizada con éxito.');

        // Desplazarse hacia la parte superior
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
      (error) => {
        console.error('Error actualizando publicación:', error);
        alert('Error al actualizar la publicación.');
      }
    );
  }

  deletePublicacion(id_publicacion: string): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta publicación?')) {
      this.publicacionService.deletePublicacion(id_publicacion).subscribe(
        () => {
          this.arrayPublicaciones = this.arrayPublicaciones.filter(pub => pub.id_publicacion !== id_publicacion);
          alert('Publicación eliminada con éxito.');
        },
        error => {
          console.error('Error al eliminar la publicación:', error);
          alert('Error al eliminar la publicación. Por favor, intenta de nuevo.');
        }
      );
    }
  }

  cancelarEdicion(): void {
    this.publicacionEnEdicion = null;
    this.nuevoPublicacionForm.reset();
    this.formVisible = false; // Oculta el formulario al cancelar
  }
}
