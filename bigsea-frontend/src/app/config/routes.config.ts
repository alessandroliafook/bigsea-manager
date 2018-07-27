import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from  '../components/login/login.component';
import { NotFoundComponent } from '../components/not-found/not-found.component';
import { SubmissionsComponent } from '../components/submissions/submissions.component';


const appRoutes: Routes = [
    { path: '', component: LoginComponent},
    { path: 'submissions', component: SubmissionsComponent},
    { path: '**', component: NotFoundComponent}
  ];

export const routing = RouterModule.forRoot(appRoutes);