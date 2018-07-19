import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from  '../components/login/login.component';
import { NotFoundComponent } from '../components/not-found/not-found.component';


const appRoutes: Routes = [
    { path: '', component: LoginComponent},
    { path: '**', component: NotFoundComponent}
  ];

export const routing = RouterModule.forRoot(appRoutes);