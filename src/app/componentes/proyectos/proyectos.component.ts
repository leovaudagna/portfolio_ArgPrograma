import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Proyectos } from 'src/app/models/proyectos';
import { ProyectosService } from 'src/app/servicios/proyectos.service';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {

  public listaProyectos: Proyectos[] = [];
  public editarProyectos: Proyectos | undefined;
  public eliminarProyectos: Proyectos | undefined;

  isAdmin = false;

  roles: string[] = [];


  constructor(private proyectosService: ProyectosService, private tokenService: TokenService) { }

  ngOnInit(): void {
    this.getProyectos();

    this.roles = this.tokenService.getAuthorities();
    this.roles.forEach(rol => {
      if (rol === 'ROLE_ADMIN') {
        this.isAdmin = true;
      }
    })
  }

  public getProyectos(): void {
    this.proyectosService.getProyectos().subscribe({
      next: (Response: Proyectos[]) => {
        this.listaProyectos = Response;
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    })
  }






  public onOpenModal(mode: String, proyectos?: Proyectos): void {
    let container = document.getElementById('main-container');
    let button = document.createElement('button');

    button.style.display = 'none';

    button.setAttribute('data-toggle', 'modal');

    if (mode === 'add') {
      button.setAttribute('data-target', '#addProyectosModal');
    } else if (mode === 'delete') {
      this.eliminarProyectos = proyectos;
      button.setAttribute('data-target', '#deleteProyectosModal')
    } else if (mode === 'edit') {
      this.editarProyectos = proyectos;
      button.setAttribute('data-target', '#editProyectosModal')
    }

    container?.appendChild(button);
    button.click();
  }

  public onAddProyectos(addForm: NgForm) {
    document.getElementById('add-proyectos-form')?.click();
    this.proyectosService.addProyectos(addForm.value).subscribe({
      next: (response: Proyectos) => {
        console.log(response);
        this.getProyectos();
        addForm.resetForm();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message)
        this.getProyectos();
      }
    })
  }

  public onUpdateProyectos(proyectos: Proyectos) {
    this.editarProyectos = proyectos;
    document.getElementById('add-proyectos-form')?.click();
    this.proyectosService.updateProyectos(proyectos).subscribe({
      next: (response: Proyectos) => {
        console.log(response);
        this.getProyectos();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
        this.getProyectos();
      }
    })
  }

  public onDeleteProyectos(id: number): void {
    this.proyectosService.deleteProyectos(id).subscribe({
      next: (response: void) => {
        console.log(response);
        this.getProyectos();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
        this.getProyectos();
      }
    })
  }
}
