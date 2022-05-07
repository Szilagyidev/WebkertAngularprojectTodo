import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { TodoComponent } from './todo/todo.component';
import { canActivate, redirectUnauthorizedTo, redirectLoggedInTo} from '@angular/fire/auth-guard'

const redirectToLogin = () => redirectUnauthorizedTo(['login']);
const redirectToTodo = () => redirectLoggedInTo(['']);

const routes: Routes = [
  {path:'', component:TodoComponent,
  ...canActivate(redirectToLogin)
  },
  {path:'login',component:LoginComponent,
  ...canActivate(redirectToTodo)
  },
  {path:'sign-up',component:SignUpComponent,
  ...canActivate(redirectToTodo)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
