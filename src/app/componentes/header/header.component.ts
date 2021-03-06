import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Persona } from 'src/app/models/persona';
import { AcercaDeService } from 'src/app/servicios/acerca-de.service';
import { TokenService } from 'src/app/servicios/token.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public persona: Persona | undefined;
  public editarPersona: Persona | undefined;

  isAdmin = false;

  roles: string[] = [];

  constructor(private personaService: AcercaDeService, private tokenService: TokenService) { }

  ngOnInit(): void {
    this.getPersona();
    this.isAdmin = this.tokenService.isAdmin();
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

  public onOpenModalH(mode: String, persona?: Persona): void {
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

  public onAddPersona(addForm: NgForm) {
    document.getElementById('add-persona-form')?.click();
    this.personaService.addPersona(addForm.value).subscribe({
      next: (response: Persona) => {
        console.log(response);
        this.getPersona();
        addForm.resetForm();
        window.location.reload();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message)
        this.getPersona();        
      }
    })
  }

  public onUpdatePersona(persona: Persona) {
    this.editarPersona = persona;
    document.getElementById('add-persona-form')?.click();
    this.personaService.updatePersona(persona).subscribe({
      next: (response: Persona) => {
        console.log(response);
        this.getPersona();
        window.location.reload();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
        this.getPersona();
      }
    })
  }

  // public onDeletePersona(id: number): void {
  //   this.personanService.deletePersona(id).subscribe({
  //     next: (response: void) => {
  //       console.log(response);
  //       this.getPersona();
  //     },
  //     error: (error: HttpErrorResponse) => {
  //       alert(error.message);
  //       this.getPersona();
  //     }
  // })
  // }  

}





