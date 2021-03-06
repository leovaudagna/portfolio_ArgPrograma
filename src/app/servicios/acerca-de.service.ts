import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Persona } from '../models/persona';

@Injectable({
  providedIn: 'root'
})
export class AcercaDeService {

  private apiServerUrl = environment.apiBaseUrl;
  
  constructor(private http: HttpClient) { }
  
  public addPersona(persona: Persona): Observable<Persona> {
    return this.http.post<Persona>(`${this.apiServerUrl}edicion/persona/nueva`, persona);
  }

  public getPersona():Observable<Persona>{
     return this.http.get<Persona>(`${this.apiServerUrl}edicion/persona/buscar/1`);
  }

  public updatePersona(persona: Persona): Observable<Persona> {
    return this.http.put<Persona>(`${this.apiServerUrl}edicion/persona/editar`, persona);
  }

}
