import { Injectable } from '@angular/core';
import { HardSkills } from '../models/hardskills';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HabilidadesService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getHardSkills(): Observable<HardSkills[]> {
    return this.http.get<HardSkills[]>(`${this.apiServerUrl}edicion/hardskills/ver`);
  }

  public addHardSkills(hardskills: HardSkills): Observable<HardSkills> {
    return this.http.post<HardSkills>(`${this.apiServerUrl}edicion/hardskills/nueva/1`, hardskills);
  }

  public updateHardSkills(hardskills: HardSkills): Observable<HardSkills> {
    return this.http.put<HardSkills>(`${this.apiServerUrl}edicion/hardskills/editar`, hardskills);
  }

  public deleteHardSkills(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}edicion/hardskills/delete/${id}`);

  }
}
