import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Proyectos } from '../models/proyectos';

@Injectable({
  providedIn: 'root'
})

export class ProyectosService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getProyectos(): Observable<Proyectos[]> {
    return this.http.get<Proyectos[]>(`${this.apiServerUrl}edicion/proyectos/ver`);
  }

  public addProyectos(proyectos: Proyectos): Observable<Proyectos> {
    return this.http.post<Proyectos>(`${this.apiServerUrl}edicion/proyectos/nueva/1`, proyectos);
  }

  public updateProyectos(proyectos: Proyectos): Observable<Proyectos> {
    return this.http.put<Proyectos>(`${this.apiServerUrl}edicion/proyectos/editar`, proyectos);
  }

  public deleteProyectos(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}edicion/proyectos/delete/${id}`);

  }
}
