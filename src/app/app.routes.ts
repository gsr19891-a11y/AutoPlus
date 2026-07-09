import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Menu } from './pages/menu/menu';
import { Details } from './pages/details/details';
import { Tech } from './pages/tech/tech';

export const routes: Routes = [
    {
        path: '',
        component: Home
    },
    {
        path: 'menu',
        component: Menu
    },
    { path: "tech",
        component: Tech

    },
    {
        path: 'details/:id',
        component: Details
    }


];
