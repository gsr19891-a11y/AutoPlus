import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Menu } from './pages/menu/menu';
import { Details } from './pages/details/details';
import { Auth } from './authPages/auth/auth';
import { Login } from './authPages/login/login';
import { Register } from './authPages/register/register';
import { Profile } from './userProfile/profile/profile';
import { ProfileRentCars } from './userProfile/profile-rent-cars/profile-rent-cars';
import { ProfileMyCars } from './userProfile/profile-my-cars/profile-my-cars';
import { ProfileMyFavorites } from './userProfile/profile-my-favorites/profile-my-favorites';
import { AddMyCars } from './userProfile/add-my-cars/add-my-cars';
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
    },
    {
        path: 'auth',
        component: Auth,
        children: [
            {
                path: 'login',
                component: Login
            },
            {
                path: 'register',
                component: Register
            }
        ]
    }


];
