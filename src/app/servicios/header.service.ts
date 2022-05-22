import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Redes } from '../models/redes';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  private apiServerUrl = environment.apiBaseUrl;



  constructor(private http: HttpClient) { }

  public getRedes(): Observable<Redes[]> {
    return this.http.get<Redes[]>(`${this.apiServerUrl}edicion/redes/ver`);
  }

  public addRedes(redes: Redes): Observable<Redes> {
    return this.http.post<Redes>(`${this.apiServerUrl}edicion/redes/nueva/1`, redes);
  }

  public updateRedes(redes: Redes): Observable<Redes> {
    return this.http.put<Redes>(`${this.apiServerUrl}edicion/redes/editar`, redes);
  }

  public deleteRedes(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}edicion/redes/delete/${id}`);

  }
}
