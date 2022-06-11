import { Component, OnInit } from '@angular/core';
import { HardSkills } from 'src/app/models/hardskills';
import { HabilidadesService } from 'src/app/servicios/habilidades.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-habilidades',
  templateUrl: './habilidades.component.html',
  styleUrls: ['./habilidades.component.css']
})


export class HabilidadesComponent implements OnInit {

  public listaHardSkills: HardSkills[] = [];
  public editarHardSkills: HardSkills | undefined;
  public eliminarHardSkills: HardSkills | undefined;

  isAdmin = false;

roles: string[] = [];

  constructor(private hardskillsService: HabilidadesService, private tokenService: TokenService) { }

  ngOnInit(): void {
    this.getHardSkills();

    this.roles = this.tokenService.getAuthorities();
    this.roles.forEach(rol => {
      if (rol === 'ROLE_ADMIN') {
        this.isAdmin = true;
      }
    })
  }

  public getHardSkills(): void {
    this.hardskillsService.getHardSkills().subscribe({
      next: (Response: HardSkills[]) => {
        this.listaHardSkills = Response;
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    })
  }

  

  


  public onOpenModalH(mode: String, hardskills?: HardSkills): void {
    let container = document.getElementById('main-container');
    let button = document.createElement('button');

    button.style.display = 'none';

    button.setAttribute('data-toggle', 'modal');

    if (mode === 'add') {
      button.setAttribute('data-target', '#addHardSkillsModal');
    } else if (mode === 'delete') {
      this.eliminarHardSkills = hardskills;
      button.setAttribute('data-target', '#deleteHardSkillsModal')
    } else if (mode === 'edit') {
      this.editarHardSkills = hardskills;
      button.setAttribute('data-target', '#editHardSkillsModal')
    }

    container?.appendChild(button);
    button.click();
  }

  public onAddHardSkills(addForm: NgForm) {
    document.getElementById('add-hardskills-form')?.click();
    this.hardskillsService.addHardSkills(addForm.value).subscribe({
      next: (response: HardSkills) => {
        console.log(response);
        this.getHardSkills();
        addForm.resetForm();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message)
        this.getHardSkills();
      }
    })
  }

  public onUpdateHardSkills(hardskills: HardSkills) {
    this.editarHardSkills = hardskills;
    document.getElementById('add-hardskills-form')?.click();
    this.hardskillsService.updateHardSkills(hardskills).subscribe({
      next: (response: HardSkills) => {
        console.log(response);
        this.getHardSkills();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
        this.getHardSkills();
      }
    })
  }

  public onDeleteHardSkills(idh: number): void {
    this.hardskillsService.deleteHardSkills(idh).subscribe({
      next: (response: void) => {
        console.log(response);
        this.getHardSkills();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
        this.getHardSkills();
      }
  })
}
}