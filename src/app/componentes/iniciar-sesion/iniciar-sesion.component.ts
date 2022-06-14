import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginUsuario } from 'src/app/models/login-usuario';
import { AuthService } from 'src/app/servicios/auth.service';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.css']
})
export class IniciarSesionComponent implements OnInit {

  isLoginFail = false;
  loginUsuario!: LoginUsuario;

  loginForm!: FormGroup;

  nombreUsuario!: string;
  password!: string;

  roles: string[] = [];

  errMsj!: string;

  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // if (this.tokenService.getToken()) {
    //   this.isLogged = true;
    //   this.isLoginFail = false;
    //   this.roles = this.tokenService.getAuthorities();
    // }
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

  onLogin(): void {
    this.loginUsuario = new LoginUsuario(this.nombreUsuario, this.password);
    this.authService.login(this.loginUsuario).subscribe(
      data => {

        this.isLoginFail = false;
        
        this.tokenService.setToken(data.token!);
        
        this.router.navigate(['/portfolio']);
      },
      err => {
        this.isLoginFail = true;
        this.errMsj = err.error.mensaje;
        // console.log(err.error.message);
      }      
    );
  }

}
