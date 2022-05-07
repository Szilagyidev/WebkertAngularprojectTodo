import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(public authService: AuthenticationService, private router: Router){
    
  }

  logout(){
    this.authService.logout().subscribe(() =>{
      this.router.navigate(['login']);
    })
  }
  user$ = this.authService.currentUser$

  ngOnInit(): void {
  }

}
