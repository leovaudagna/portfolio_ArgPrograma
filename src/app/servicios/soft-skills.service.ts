import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SoftSkills } from '../models/softskills';

@Injectable({
  providedIn: 'root'
})
export class SoftSkillsService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getSoftSkills(): Observable<SoftSkills[]> {
    return this.http.get<SoftSkills[]>(`${this.apiServerUrl}edicion/softskills/ver`);
  }

  public addSoftSkills(softskills: SoftSkills): Observable<SoftSkills> {
    return this.http.post<SoftSkills>(`${this.apiServerUrl}edicion/softskills/nueva/1`, softskills);
  }

  public updateSoftSkills(softskills: SoftSkills): Observable<SoftSkills> {
    return this.http.put<SoftSkills>(`${this.apiServerUrl}edicion/softskills/editar`, softskills);
  }

  public deleteSoftSkills(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}edicion/softskills/delete/${id}`);

  }
}
