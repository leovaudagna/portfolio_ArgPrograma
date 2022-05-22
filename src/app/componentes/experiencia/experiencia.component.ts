import { Component, OnInit } from '@angular/core';
import { Experiencia } from 'src/app/models/experiencia';
import { ExperienciaService } from 'src/app/servicios/experiencia.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit {

  public listaExperiencia: Experiencia[] = [];
  public editarExperiencia: Experiencia | undefined;
  public eliminarExperiencia: Experiencia | undefined;

  constructor(private experienciaService: ExperienciaService) { }

  ngOnInit(): void {
    this.getExperiencia();
  }

  public getExperiencia(): void {
    this.experienciaService.getExperiencia().subscribe({
      next: (Response: Experiencia[]) => {
        this.listaExperiencia = Response;
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    })
  }


  public onOpenModal(mode: String, experiencia?: Experiencia): void {
    let container = document.getElementById('main-container');
    let button = document.createElement('button');

    button.style.display = 'none';

    button.setAttribute('data-toggle', 'modal');

    if (mode === 'add') {
      button.setAttribute('data-target', '#addExperienciaModal');
    } else if (mode === 'delete') {
      this.eliminarExperiencia = experiencia;
      button.setAttribute('data-target', '#deleteExperienciaModal')
    } else if (mode === 'edit') {
      this.editarExperiencia = experiencia;
      button.setAttribute('data-target', '#editExperienciaModal')
    }

    container?.appendChild(button);
    button.click();
  }

  public onAddExperiencia(addForm: NgForm) {
    document.getElementById('add-experiencia-form')?.click();
    this.experienciaService.addExperiencia(addForm.value).subscribe({
      next: (response: Experiencia) => {
        console.log(response);
        this.getExperiencia();
        addForm.resetForm();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message)
        this.getExperiencia();
      }
    })
  }

  public onUpdateExperiencia(experiencia: Experiencia) {
    this.editarExperiencia = experiencia;
    document.getElementById('add-experiencia-form')?.click();
    this.experienciaService.updateExperiencia(experiencia).subscribe({
      next: (response: Experiencia) => {
        console.log(response);
        this.getExperiencia();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
        this.getExperiencia();
      }
    })
  }

  public onDeleteExperiencia(id: number): void {
    this.experienciaService.deleteExperiencia(id).subscribe({
      next: (response: void) => {
        console.log(response);
        this.getExperiencia();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
        this.getExperiencia();
      }
  })
}  

}
