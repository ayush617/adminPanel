import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router) {}

    canActivate() {
        if (localStorage.getItem('_profile')) {
            return true;
        }

        this.router.navigate(['/auth']);
        return false;
    }
}
