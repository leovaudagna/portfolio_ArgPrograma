import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Redes } from 'src/app/models/redes';
import { Persona } from 'src/app/models/persona';
import { AcercaDeService } from 'src/app/servicios/acerca-de.service';
import { HeaderService } from 'src/app/servicios/header.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  public listaRedes: Redes[] | undefined;
  public persona: Persona | undefined;

  constructor(private redesService: HeaderService, private personaService: AcercaDeService) { }

  ngOnInit(): void {
    this.getRedes()
    this.getPersona()
  }

  public getRedes(): void {
    this.redesService.getRedes().subscribe({
      next: (Response: Redes[]) => {
        this.listaRedes = Response;
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    })
  }

  public getPersona(): void {
    this.personaService.getPersona().subscribe({
      next: (response: Persona) => {
        this.persona = response;
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    })
  }

}
