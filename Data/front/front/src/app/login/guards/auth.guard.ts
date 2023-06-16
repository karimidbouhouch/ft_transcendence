import {  Injectable, inject } from '@angular/core';
import { CanActivateFn, Route, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { firstValueFrom } from 'rxjs';

export  const authGuard: CanActivateFn = async (route, state) => {

    
    const authService : AuthService = inject(AuthService);
    const switchRoute : Router = inject(Router);
    const replay = await firstValueFrom(authService.getCurrentUser());
    console.log(replay);
    if (replay.statusCode == 403)
    {
        switchRoute.navigateByUrl('login');
        return false;
    }
    if (replay.username)
        switchRoute.navigateByUrl('twoFactor');
    return true;
};
