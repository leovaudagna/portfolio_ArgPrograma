import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Educacion } from 'src/app/models/educacion';
import { EducacionService } from 'src/app/servicios/educacion.service';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit {

  public listaEducacion: Educacion[] = [];
  public editarEducacion: Educacion | undefined;
  public eliminarEducacion: Educacion | undefined;

  isAdmin = false;

  roles: string[] = [];

  constructor(private educationService: EducacionService, private tokenService: TokenService) { }

  ngOnInit(): void {
    this.getEducacion();
    this.isAdmin = this.tokenService.isAdmin();
  }

  public getEducacion(): void {
    this.educationService.getEducacion().subscribe({
      next: (Response: Educacion[]) => {
        this.listaEducacion = Response;
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    })
  }


  public onOpenModal(mode: String, educacion?: Educacion): void {
    let container = document.getElementById('main-container');
    let button = document.createElement('button');

    button.style.display = 'none';

    button.setAttribute('data-toggle', 'modal');

    if (mode === 'add') {
      button.setAttribute('data-target', '#addEducacionModal');
    } else if (mode === 'delete') {
      this.eliminarEducacion = educacion;
      button.setAttribute('data-target', '#deleteEducationModal')
    } else if (mode === 'edit') {
      this.editarEducacion = educacion;
      button.setAttribute('data-target', '#editEducationModal')
    }

    container?.appendChild(button);
    button.click();
  }

  public onAddEducation(addForm: NgForm) {
    document.getElementById('add-education-form')?.click();
    this.educationService.addEducacion(addForm.value).subscribe({
      next: (response: Educacion) => {
        console.log(response);
        this.getEducacion();
        addForm.resetForm();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message)
        this.getEducacion();
      }
    })
  }

  public onUpdateEducation(education: Educacion) {
    this.editarEducacion = education;
    document.getElementById('add-education-form')?.click();
    this.educationService.updateEducacion(education).subscribe({
      next: (response: Educacion) => {
        console.log(response);
        this.getEducacion();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
        this.getEducacion();
      }
    })
  }

  public onDeleteEducation(id: number): void {
    this.educationService.deleteEducacion(id).subscribe({
      next: (response: void) => {
        console.log(response);
        this.getEducacion();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
        this.getEducacion();
      }
  })
}  

}
