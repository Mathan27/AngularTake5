import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../services/global.service';
import { Router } from '@angular/router';
export class FormInput {
  username: any;
  password: any;
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public isSubmit: boolean;
  formInput: FormInput;
  formdata: any = {};
  loading = false;
  invalid = false;
  constructor(public global: GlobalService, public router: Router) { }

  ngOnInit() {
    this.formInput = {
      username:  '',
      password:  '',
    };
    // this.global.storage.get('userdata').then((data) => {
    //   console.log('this is user data');
    //   console.log(data);
      
    //     });
  }
  save(form: any) {
    if (!form.valid) {
      this.isSubmit = true;
      return;

    }
  }

  login(form: any) {
    this.invalid = false;
    this.loading = true;

    if (!form.valid) {
      this.isSubmit = true;
      return;

    }
    this.formdata = this.formInput;
    console.log(this.formdata);

    const headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json' ); 
    const postData =  this.formdata;
    this.global.http.post(this.global.server+'login/login.php', postData, { observe: 'response'} )
    .subscribe(data => {
      console.log(data.body);
      // tslint:disable-next-line: triple-equals
      if (data.body['status']== 'success'){
        this.global.storage.set('userdata', data.body['records'][0]);
        this.global.userdata = data.body['records'][0];
        this.global.storage.set('userid', data.body['records'][0].id);
        localStorage.setItem('userid', data.body['records'][0].id);
        // this.global.socket(data.body['records'][0].id);
        this.loading = false;
        this.router.navigate(['products']);

      } else{
     //   alert();
     this.invalid = true;
     this.loading = false;

      }
     }, error => {
      console.log(error);
      //this.loading = false;

    });
   }
}
