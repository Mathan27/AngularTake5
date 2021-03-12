import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../services/global.service';
import { Router } from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';
import { FileUploadValidators } from '@iplab/ngx-file-upload';
import { HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';



export class FormInput {
  pid: any;
  lendername: any;
  image: any;
  link: any;
  lid: any;

}
@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.scss']
})
export class AdduserComponent implements OnInit {

  private filesControl = new FormControl(null, FileUploadValidators.filesLimit(1));

  formInput: any={};
  buttonloading:any;
  selectedsite:any;
  public isSubmit: boolean;
  formdata: any = {};

form:any;
public status: any = [{
  value: '0',
  label: 'Active'
},
{
  value: '1',
  label: 'Inactive'
}
];
selectedOption = '0';
public addform = new FormGroup({
  files: this.filesControl
});

public uploadedFiles: Array < File > = [];
  public uploadedFiles2: Array < File > = [];
  constructor(public global: GlobalService, public router: Router) {
    this.isSubmit = false;

   }

  ngOnInit() {
  }
  adduser(form: any) {
    console.log(this.formInput.user);
    console.log(form.valid);
    if (!form.valid) {
      this.isSubmit = true;
      return;
    }
//     if (!this.uploadedFiles[0]) {
//       this.isSubmit = true;
// alert('Select the image');
//       return;
//     }



    this.buttonloading = true;
    // this.formdata = this.formInput;
    console.log(this.formdata);
    const token = localStorage.getItem('token');
    const headers = new Headers();
    this.formInput.sid = this.selectedsite ;
    const postData = this.formInput;
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     Accept: 'application/json',
    //     Authorization: token
    //   })
    // }; 
    const httpOptions = {};
    let formData: FormData = new FormData();
    // console.log(this.uploadedFiles);

    // const file: File = this.uploadedFiles[0];
    // console.log(file);
    // formData.append('file', file, file.name);
    console.log(this.formInput);
    console.log(this.formInput.toString());
     this.formInput=JSON.stringify(this.formInput);
// console.log(formData);
// console.log("formData");


    this.global.http.post(this.global.server + 'user/userpanel/adduser.php', this.formInput, httpOptions)
      .subscribe(data => {
        console.log(data);
        // tslint:disable-next-line: triple-equals
        if (data['status'] == 'success') {
          let lastid = data['last_id'];
          // tslint:disable-next-line
          this.ngOnInit();
          this.uploadedFiles = [];
          Swal.fire({
            title: 'Category Uploaded',
            text: 'You can update or edit now.',
            type: 'success',
            showCloseButton: true,
            // showCancelButton: true
          }).then((willDelete) => {
            // this.router.navigate(['product/' + lastid]);
            if (willDelete.dismiss) {
              // Swal.fire('', 'Your imaginary file is safe!', 'error');
            } else {
            }
          });
          this.buttonloading = false;

        } else {
          //   alert();
          // tslint:disable-next-line
          this.buttonloading = false;
          Swal.fire({
            title: 'category Upload Failed',
            text: 'Try agian',
            type: 'error',
            showCloseButton: true,
            // showCancelButton: true
          }).then((willDelete) => {
            if (willDelete.dismiss) {
              // Swal.fire('', 'Your imaginary file is safe!', 'error');
            } else {
            }
          });
        }
      }, error => {
        console.log(error);
        //this.loading = false;

      });
  }

}
