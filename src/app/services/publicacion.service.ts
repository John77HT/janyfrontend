// publicacion.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PublicacionService {
  private apiUrl = 'http://localhost:3000/api/publicacion'; // Cambia la URL según tu configuración

  constructor(private http: HttpClient) {}

  // Método para obtener todas las publicaciones
  fetchPublicacion(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Método para crear una nueva publicación
  postPublicacion(publicacion: any): Observable<any> {
    return this.http.post(this.apiUrl, publicacion);
  }

  // Método para actualizar una publicación
  updatePublicacion(id: string, publicacion: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, publicacion);
  }

  // Método para eliminar una publicación
  deletePublicacion(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // Método para obtener una publicación por ID
  getPublicacionById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // Método para obtener la última publicación ID
  getLastId(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/last-id`); // Asegúrate de que tu API tenga este endpoint
  }
}
