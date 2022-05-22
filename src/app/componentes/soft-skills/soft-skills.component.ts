import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SoftSkills } from 'src/app/models/softskills';
import { SoftSkillsService } from 'src/app/servicios/soft-skills.service';

@Component({
  selector: 'app-soft-skills',
  templateUrl: './soft-skills.component.html',
  styleUrls: ['./soft-skills.component.css']
})
export class SoftSkillsComponent implements OnInit {

  public listaSoftSkills: SoftSkills[] = [];
  public editarSoftSkills: SoftSkills | undefined;
  public eliminarSoftSkills: SoftSkills | undefined;

  constructor(private softskillsService: SoftSkillsService) { }

  ngOnInit(): void {    
    this.getSoftSkills();
  }

  public getSoftSkills(): void {
    this.softskillsService.getSoftSkills().subscribe({
      next: (Response: SoftSkills[]) => {
        this.listaSoftSkills = Response;
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    })
  }

  public onOpenModalS(mode: String, softskills?: SoftSkills): void {
    let container = document.getElementById('main-container');
    let button = document.createElement('button');
  
    button.style.display = 'none';
  
    button.setAttribute('data-toggle', 'modal');
  
    if (mode === 'add') {
      button.setAttribute('data-target', '#addSoftSkillsModal');
    } else if (mode === 'delete') {
      this.eliminarSoftSkills = softskills;
      button.setAttribute('data-target', '#deleteSoftSkillsModal')
    } else if (mode === 'edit') {
      this.editarSoftSkills = softskills;
      button.setAttribute('data-target', '#editSoftSkillsModal')
    }
  
    container?.appendChild(button);
    button.click();
  }
  
  public onAddSoftSkills(addFormS: NgForm) {
    document.getElementById('add-softskills-form')?.click();
    this.softskillsService.addSoftSkills(addFormS.value).subscribe({
      next: (response: SoftSkills) => {
        console.log(response);
        this.getSoftSkills();
        addFormS.resetForm();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message)
        this.getSoftSkills();
      }
    })
  }
  
  public onUpdateSoftSkills(softskills: SoftSkills) {
    this.editarSoftSkills = softskills;
    document.getElementById('add-softskills-form')?.click();
    this.softskillsService.updateSoftSkills(softskills).subscribe({
      next: (response: SoftSkills) => {
        console.log(response);
        this.getSoftSkills();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
        this.getSoftSkills();
      }
    })
  }
  
  public onDeleteSoftSkills(ids: number): void {
    this.softskillsService.deleteSoftSkills(ids).subscribe({
      next: (response: void) => {
        console.log(response);
        this.getSoftSkills();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
        this.getSoftSkills();
      }
  })
  }

}
