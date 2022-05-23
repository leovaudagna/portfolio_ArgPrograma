import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Redes } from 'src/app/models/redes';
import { HeaderService } from 'src/app/servicios/header.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public isMenuCollapsed = true;

  public listaRedes: Redes[] = [];
  public editarRedes: Redes | undefined;
  public eliminarRedes: Redes | undefined;


  constructor(private redesService: HeaderService) { }


  ngOnInit(): void {
    this.getRedes();
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


  public onOpenModal(mode: String, redes?: Redes): void {
    let container = document.getElementById('main-container');
    let button = document.createElement('button');

    button.style.display = 'none';

    button.setAttribute('data-toggle', 'modal');

    if (mode === 'add') {
      button.setAttribute('data-target', '#addRedesModal');
    } else if (mode === 'delete') {
      this.eliminarRedes = redes;
      button.setAttribute('data-target', '#deleteRedesModal')
    } else if (mode === 'edit') {
      this.editarRedes = redes;
      button.setAttribute('data-target', '#editRedesModal')
    }

    container?.appendChild(button);
    button.click();
  }

  public onAddRedes(addForm: NgForm) {
    document.getElementById('add-redes-form')?.click();
    this.redesService.addRedes(addForm.value).subscribe({
      next: (response: Redes) => {
        console.log(response);
        this.getRedes();
        addForm.resetForm();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message)
        this.getRedes();
      }
    })
  }

  public onUpdateRedes(redes: Redes) {
    this.editarRedes = redes;
    document.getElementById('add-redes-form')?.click();
    this.redesService.updateRedes(redes).subscribe({
      next: (response: Redes) => {
        console.log(response);
        this.getRedes();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
        this.getRedes();
      }
    })
  }

  public onDeleteRedes(id: number): void {
    this.redesService.deleteRedes(id).subscribe({
      next: (response: void) => {
        console.log(response);
        this.getRedes();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
        this.getRedes();
      }
  })
}

}
