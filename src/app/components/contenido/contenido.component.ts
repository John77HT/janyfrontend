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
  arrayMascotas: any[] = [];
  mascotaEnEdicion: any = null;
  nuevoMascotaForm: FormGroup; 
  formVisible: boolean = false;
  constructor(private publicacionService: PublicacionService, private fb: FormBuilder) {
    this.nuevoMascotaForm = this.fb.group({
      id_mascota: [{ value: '', disabled: true }],
      nombre: [''],
      edad: [''],
      raza: [''],
      especie: ['']
    });
  }

  ngOnInit(): void {
    this.fetch(); 
  }

  fetch(): void {
    this.publicacionService.fetchMascotas().subscribe(result => {
      this.arrayMascotas = result;
    });
  }

  crearMascota(): void {
    const nuevaMascota = this.nuevoMascotaForm.value;
    this.publicacionService.postMascota(nuevaMascota).subscribe(
      (result) => {
        this.arrayMascotas.push(result);
        this.nuevoMascotaForm.reset();
        alert('Mascota creada con éxito.');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
      (error) => {
        console.error('Error al crear mascota:', error);
        alert('Error al crear la mascota.');
      }
    );
  }

  editarMascota(mascota: any): void {
    this.mascotaEnEdicion = mascota;
    this.nuevoMascotaForm.patchValue(mascota);
    this.formVisible = true;

    setTimeout(() => {
      const formElement = document.getElementById('formularioEdicion');
      if (formElement) {
        formElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 0);
  }

  actualizarMascota(): void {
    const id = this.nuevoMascotaForm.get('id_mascota')?.value;
    const mascotaActualizada = this.nuevoMascotaForm.value;

    this.publicacionService.updateMascota(id, mascotaActualizada).subscribe(
      (result) => {
        const index = this.arrayMascotas.findIndex(m => m.id_mascota === id);
        if (index !== -1) {
          this.arrayMascotas[index] = result;
        }
        this.cancelarEdicion();
        alert('Mascota actualizada con éxito.');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
      (error) => {
        console.error('Error actualizando mascota:', error);
        alert('Error al actualizar la mascota.');
      }
    );
  }

  deleteMascota(id_mascota: string): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta mascota?')) {
      this.publicacionService.deleteMascota(id_mascota).subscribe(
        () => {
          this.arrayMascotas = this.arrayMascotas.filter(m => m.id_mascota !== id_mascota);
          alert('Mascota eliminada con éxito.');
        },
        error => {
          console.error('Error al eliminar la mascota:', error);
          alert('Error al eliminar la mascota. Por favor, intenta de nuevo.');
        }
      );
    }
  }

  cancelarEdicion(): void {
    this.mascotaEnEdicion = null;
    this.nuevoMascotaForm.reset();
    this.formVisible = false;
  }
}