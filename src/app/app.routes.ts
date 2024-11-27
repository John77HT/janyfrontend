import { Routes } from '@angular/router';
import{ UserComponent}from './components/user/user.component';

import path from 'path';
import { InicioComponent } from './components/inicio/inicio.component';
import{ContenidoComponent} from './components/contenido/contenido.component'
import { CreateComponent } from './components/create/create.component';

export const routes: Routes = [

{path:'usuario',component:UserComponent},
{path:'inico',component:InicioComponent},
{path:'contenido',component:ContenidoComponent},
{path:'create',component: CreateComponent}



];
