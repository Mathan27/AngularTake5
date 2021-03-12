import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public storage: Storage, public jwtHelper: JwtHelperService) {}
  public isAuthenticated(): boolean {
    let token ;
   
      const userid = localStorage.getItem('userid');
// alert(userid);
      if(userid){
        return true;
      }else{
        return false;
      }
  
    
    }
    // Check whether the token is expired and return
    // true or false
  }



