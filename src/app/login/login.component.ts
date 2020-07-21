import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router, private toastr: ToastrService) { }
  showPass = false;

  user: string = "";
  pass: string = "";
  err = null;

  ngOnInit(): void {
  }

  loading = false;
  async login(){
    this.err = null;
    this.loading = true;
    try{
      let user = await this.auth.login(this.user, this.pass);
      if(user){
        this.router.navigate(["/admin/publicaciones"]);
      }
      this.loading = false;
    }catch(error){
      this.loading = false;
      this.err = "Usuario y/o contraseña incorrecta";
    }
  }

  setPass(){
    this.showPass = !this.showPass;
  }
}
