import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router) { }
  showPass = false;

  user: string = "";
  pass: string = "";

  ngOnInit(): void {
  }

  async login(){
    try{
      let user = await this.auth.login(this.user, this.pass);
      if(user){
        this.router.navigate(["/admin"]);
      }
    }catch(error){
      console.log(error);
    }
  }
}
