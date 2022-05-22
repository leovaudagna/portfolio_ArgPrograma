import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Proyectos } from 'src/app/models/proyectos';
import { ProyectosService } from 'src/app/servicios/proyectos.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {

  public listaProyectos: Proyectos[] = [];
  public editarProyectos: Proyectos | undefined;
  public eliminarProyectos: Proyectos | undefined;

  constructor(private proyectosService: ProyectosService) { }

  ngOnInit(): void {
    this.getProyectos();
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
