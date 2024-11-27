import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms'; 
import { UsuarioService } from '../../services/usuario.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  arrayUser: any[] = [];
  nuevoUsuarioForm: FormGroup; 
  showPassword: boolean = false; // Nueva propiedad para controlar visibilidad de la contraseña
  
  constructor(private usuarioService: UsuarioService, private fb: FormBuilder) {
    this.nuevoUsuarioForm = this.fb.group({
      id_usuario: [],
      nombre: [''],
      apellido:[],
      correo: [''],
      edad: [''],
      ciudad: [''],
      password:['']
     
      
    });
  }

  ngOnInit(): void {
    this.fetch();
  }

  fetch(): void {
    this.usuarioService.fetchUser().subscribe(
      (result: any) => {
        this.arrayUser = result;
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }
  createUser(): void {
    this.usuarioService.getLastId().subscribe(
      (response: any) => {
        const lastId = response.lastId;
        this.nuevoUsuarioForm.patchValue({ id_usuario: lastId + 1 }); // Asigna el nuevo ID
        const usuario = this.nuevoUsuarioForm.value; 
        this.usuarioService.postUser(usuario).subscribe(
          (result) => {
            console.log('Usuario creado:', result);
            this.arrayUser.push(result); 
            this.nuevoUsuarioForm.reset(); 
          },
          (error) => {
            console.error('Error creando usuario:', error);
          }
        );
      },
      (error) => {
        console.error('Error obteniendo el último ID:', error);
      }
    );
  }
  togglePasswordVisibility(): void { 
    this.showPassword = !this.showPassword;
  }
  
  
}