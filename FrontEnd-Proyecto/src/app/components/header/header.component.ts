import { Component, OnDestroy } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Usuario } from '../../interfaces/Usuario';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnDestroy{
  currentUser? : Usuario;
  private userSubscription: Subscription;
  
  constructor(private _userService: UserService){ 
    this.userSubscription = this._userService.currentUser$.subscribe((user) => {
      this.currentUser = user!;
    });
  }
  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }



}
