import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginUsuario } from 'src/app/models/login-usuario';
import { Redes } from 'src/app/models/redes';
import { AuthService } from 'src/app/servicios/auth.service';
import { HeaderService } from 'src/app/servicios/header.service';
import { TokenService } from 'src/app/servicios/token.service';

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

  // Tutorial LuigiCode
  isLogged = false;

  // Modal 
  title = 'bootstrap-popup';
  loginForm!: FormGroup;

  //PRUEBAS
  // isLogged = false;
  isLoginFail = false;
  loginUsuario!: LoginUsuario;

  nombreUsuario!: string;
  password!: string;

  isAdmin = false;

  roles: string[] = [];

  errMsj!: string;


  constructor(
    private redesService: HeaderService,
    private tokenService: TokenService,

    //PRUEBAS
    private authService: AuthService,
    private router: Router

  ) { }


  ngOnInit(): void {
    this.getRedes();
    this.isAdmin = this.tokenService.isAdmin();

    // Modal
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    })

    //PRUEBAS
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.isLoginFail = false;
      // this.roles = this.tokenService.getAuthorities();
    }
  }

  get emailField(): any {
    return this.loginForm.get('email');
  }
  get passwordField(): any {
    return this.loginForm.get('password');
  }
  loginFormSubmit(): void {
    console.log(this.loginForm.value);
    // Call Api
  }

  //PRUEBAS
  onLogin(): void {
    this.loginUsuario = new LoginUsuario(this.nombreUsuario, this.password);
    this.authService.login(this.loginUsuario).subscribe(
      data => {
        this.isLogged = true;
        this.isLoginFail = false;

        this.tokenService.setToken(data.token!);
        // this.tokenService.setUserName(data.nombreUsuario);
        // this.tokenService.setAuthorities(data.authorities);
        // this.roles = data.authorities;
        window.location.reload();
      },
      err => {
        this.isLogged = false;
        this.isLoginFail = true;
        this.errMsj = err.error.mensaje;
        // console.log(err.error.message);
      }
    );
  }

  onLogOut(): void {
    this.tokenService.logOut();
    // window.location.reload();
    this.router.navigate(['/']);
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
        // console.log(response);
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
