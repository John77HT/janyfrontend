// publicacion.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PublicacionService {
  private apiUrl = 'https://backendjany.onrender.com/api/mascotas'; // Cambia la URL según tu configuración

  constructor(private http: HttpClient) { }

  // Método para obtener todas las mascotas
  fetchMascotas(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Método para crear una nueva mascota
  postMascota(mascota: any): Observable<any> {
    return this.http.post(this.apiUrl, mascota);
  }

  // Método para actualizar una mascota
  updateMascota(id: string, mascota: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, mascota);
  }

  // Método para eliminar una mascota
  deleteMascota(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // Método para obtener una mascota por ID
  getMascotaById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
}