import { Injectable } from '@angular/core';
import { Experiencia } from '../models/experiencia';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExperienciaService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getExperiencia():Observable<Experiencia[]>{
    return this.http.get<Experiencia[]>(`${this.apiServerUrl}edicion/experiencia/ver`);
  }

  public addExperiencia(experiencia: Experiencia):Observable<Experiencia>{
    return this.http.post<Experiencia>(`${this.apiServerUrl}edicion/experiencia/nueva/1`, experiencia);
  }

  public updateExperiencia(experiencia: Experiencia):Observable<Experiencia>{
    return this.http.put<Experiencia>(`${this.apiServerUrl}edicion/experiencia/editar`, experiencia);
  }

  public deleteExperiencia(id: number):Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}edicion/experiencia/delete/${id}`);
  }
}
