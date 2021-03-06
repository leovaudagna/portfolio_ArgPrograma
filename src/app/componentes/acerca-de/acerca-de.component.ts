import { Component, OnInit } from '@angular/core';
import { AcercaDeService } from 'src/app/servicios/acerca-de.service';
import { Persona } from 'src/app/models/persona';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-acerca-de',
  templateUrl: './acerca-de.component.html',
  styleUrls: ['./acerca-de.component.css']
})

export class AcercaDeComponent implements OnInit {

  public persona: Persona | undefined;
  public editarPersona: Persona | undefined;
  
  isAdmin = false;
 

  constructor(
    private personaService: AcercaDeService,
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {
    this.getPersona();
    this.isAdmin = this.tokenService.isAdmin();

  }

  public getPersona():void {
    this.personaService.getPersona().subscribe({
      next: (response: Persona) => {
        this.persona = response;
      },
      error:(error:HttpErrorResponse) => {
        alert(error.message);
      }
    })
  }

  public onOpenModal(mode: String, persona?: Persona): void {
    let container = document.getElementById('main-container');
    let button = document.createElement('button');

    button.style.display = 'none';

    button.setAttribute('data-toggle', 'modal');

    if (mode === 'add') {
      button.setAttribute('data-target', '#addPersonaModal');
    } else if (mode === 'edit') {
      this.editarPersona = persona;
      button.setAttribute('data-target', '#editPersonaModal')
    }

    container?.appendChild(button);
    button.click();
  }



  public onUpdatePersona(persona: Persona) {
    this.editarPersona = persona;
    document.getElementById('add-persona-form')?.click();
    this.personaService.updatePersona(persona).subscribe({
      next: (response: Persona) => {
        console.log(response);
        this.getPersona();        
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
        this.getPersona();
      }
    })
  }

}
