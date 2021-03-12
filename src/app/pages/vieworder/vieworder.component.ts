import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../services/global.service';
import { Router } from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';
import { FileUploadValidators } from '@iplab/ngx-file-upload';
import { HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';
import {
  ActivatedRoute,
  ParamMap
} from '@angular/router';

import {  ViewChild, ElementRef } from '@angular/core';




export class FormInput {
  pid: any;
  lendername: any;
  image: any;
  link: any;
  lid: any;

}
export class FormInput1 {
  pid: any;
  lendername: any;
  image: any;
  link: any;
  lid: any;
  sname: any;

}



@Component({
  selector: 'app-vieworder',
  templateUrl: './vieworder.component.html',
  styleUrls: ['./vieworder.component.scss']
})
export class VieworderComponent implements OnInit {

  dtExportButtonOptions = {
    dom: 'Bfrtip',
  };
  @ViewChild('modalProject', {
    static: false
  }) modal: any;
  @ViewChild('modalProject2', {
    static: false
  }) modal2: any;
  formInput: any={};
  formInput1: any={};
  statusloading = [];
  total=0;
  loading = true;
  formloading = true;
  buttonloading:any;
  id:any;
  type:any;
  subcatid:any;
  tabledata:any;
  tabledata1:any;
  editid:any;
  selectedsite:any;
  public isSubmit: boolean;
  formdata: any = {};
  formdata1: any = {};
  public status: any = [{
    value: '0',
    label: 'Inactive'
  },
  {
    value: '1',
    label: 'Active'
  }
  ];
  public uploadedFiles: Array < File > = [];
  public uploadedFiles2: Array < File > = [];
  constructor(private route: ActivatedRoute,public global: GlobalService, public router: Router) {
    this.id = this.route.snapshot.paramMap.get('id');
console.log(this.id);
   }

  ngOnInit() {
    this.initial(this.id);
    // this.subcat(this.id);
    this.dtExportButtonOptions = {
      dom: 'Bfrtip',
    };
  }
  // showw(){
  //   console.log('gygygygygygygygygygygygy'); 
  //   this.modal.show();
  //   this.type='add';
  // }
initial(id)
{
  this.formloading=true;
  console.log(this.formInput);
  this.formInput.id=id;
console.log(this.formInput.id);
  this.editid=JSON.stringify(this.formInput);

  const postData = this.editid;
  this.global.http.post(this.global.server + 'orders/vieworder.php', postData, {})
  .subscribe(data => {
    console.log(data);
    // tslint:disable-next-line: triple-equals
    if (data['status'] == 'success') {
      this.tabledata = data['records'][0];
      this.tabledata1 = data['product'];
      this.formInput = this.tabledata;
      this.loading=false;
      console.log(this.tabledata1.pid);
      let i;
      console.log(this.tabledata);
      // for (i = 0; i < data['site'].length; i++) {
      //   this.siteoptions.push({'label': data['site'][i].url, 'value':data['site'][i].id});
      //   if(!this.selectedsite || this.selectedsite== null){
      //     this.selectedsite = data['site'][0].id;

      //   }
      // }
      this.formloading=false;
      

    } else {
      //   alert();
      

    }
  }, error => {
    console.log(error);
    //this.loading = false;

  });
  
}

updatestatus(status){
  console.log(this.id);
  this.formInput1.id=this.id;
  this.formInput1.status=status;
  this.subcatid=JSON.stringify(this.formInput1);
  const postData = this.subcatid;
  this.global.http.post(this.global.server + 'orders/updatestatus.php', postData, {})
  .subscribe(data => {
    console.log(data);
    // tslint:disable-next-line: triple-equals
    if (data['status'] == 'success') {
      this.ngOnInit();  
      this.tabledata1 = data['records'];
      let i;
      console.log(this.tabledata1);
      // for (i = 0; i < data['site'].length; i++) {
      //   this.siteoptions.push({'label': data['site'][i].url, 'value':data['site'][i].id});
      //   if(!this.selectedsite || this.selectedsite== null){
      //     this.selectedsite = data['site'][0].id;

      //   }
      // }
      
this.loading=false;
    } else {
      //   alert();
      

    }
  }, error => {
    console.log(error);
    this.loading = false;

  });
}

subcat(sid)
{
  this.loading= true;
  this.formInput1.id=sid;

  this.subcatid=JSON.stringify(this.formInput1);

  const postData = this.subcatid;
  this.global.http.post(this.global.server + 'subcategory/view.php', postData, {})
  .subscribe(data => {
    console.log(data);
    // tslint:disable-next-line: triple-equals
    if (data['status'] == 'success') {
      this.tabledata1 = data['records'];
      let i;
      console.log(this.tabledata1);
      // for (i = 0; i < data['site'].length; i++) {
      //   this.siteoptions.push({'label': data['site'][i].url, 'value':data['site'][i].id});
      //   if(!this.selectedsite || this.selectedsite== null){
      //     this.selectedsite = data['site'][0].id;

      //   }
      // }
      
this.loading=false;
    } else {
      //   alert();
      

    }
  }, error => {
    console.log(error);
    this.loading = false;

  });
}
chnagestatus(id, status) {
  this.statusloading[id] = 1;
  this.formdata.id = id;
  console.log(this.formdata.id);
  this.formdata.status = status;
  this.formdata.type = 'category';
  console.log(this.formdata);
  // const token = localStorage.getItem('token');
  // const headers = new Headers();

  const postData = this.formdata;
  // const httpOptions = {
  //   headers: new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     Authorization: token
  //   })
  // };


  this.global.http.post(this.global.server + 'subcategory/update.php', postData, {})
    .subscribe(data => {
      console.log(data);
      // tslint:disable-next-line: triple-equals
      if (data['status'] == 'success') {
        this.ngOnInit();
        this.modal.hide();
        // tslint:disable-next-line
       // this.ngOnInit();
        this.global.addToast({
          title: 'Updated successfully',
          msg: ' ',
          timeout: 8000,
          theme: 'default',
          position: 'top-right',
          type: 'success'
        })
        this.statusloading[id] = 0;

      } else {
        this.statusloading[id] = 0;

        //   alert();
        // tslint:disable-next-line
        this.buttonloading = false;
        this.global.addToast({
          title: 'failed',
          msg: data['statusmessage'],
          timeout: 8000,
          theme: 'default',
          position: 'top-right',
          type: 'error'
        })
      }
    }, error => {
      console.log(error);
      //this.loading = false;

    });
}

  edituser(form: any) {
    console.log(this.formInput);
    console.log(form.valid);
    // if (!form.valid) {
    //   this.isSubmit = true;
    //   return;
    // }



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
    // if (this.uploadedFiles[0]) {
    //   const file: File = this.uploadedFiles[0];
    //   console.log(file);
    //   formData.append('file', file, file.name);
    // }


    
    console.log(this.formInput);
    console.log(this.formInput.toString());
    formData.append('data', JSON.stringify(this.formInput));
    formData.append('name', 'ss');
console.log(formData);
console.log("formData");


    this.global.http.post(this.global.server + 'user/userpanel/update.php', formData, httpOptions)
      .subscribe(data => {
        console.log(data);
        // tslint:disable-next-line: triple-equals
        if (data['status'] == 'success') {
          let lastid = data['last_id'];
          // tslint:disable-next-line
          this.ngOnInit();
          this.uploadedFiles = [];
          Swal.fire({
            title: 'Updated Successfully',
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



  addsubcat(form: any)
  
  {
    console.log("-----------------------");
    console.log(this.formInput1.sname);
    var formData2: any = new FormData();

    console.log(this.id);
    console.log(this.formInput1);
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
    console.log(this.formInput);
    const postData = this.formInput;
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     Accept: 'application/json',
    //     Authorization: token
    //   })
    // }; 
    const httpOptions = {};
    let formData: FormData = new FormData();
    console.log(this.uploadedFiles);

    const file: File = this.uploadedFiles[0];
    console.log(file);
    formData.append('file', file, file.name);
    console.log(this.formInput);
    console.log(this.formInput.toString());
    formData.append('data', JSON.stringify(this.formInput));
    formData.append('name', 'ss');
console.log(formData);
console.log("formData");


    this.global.http.post(this.global.server + 'category/.php', formData, httpOptions)
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

  deletesubcat(sid)
  {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover!',
      type: 'warning',
      showCloseButton: true,
      showCancelButton: true
    }).then((willDelete) => {
      if (willDelete.dismiss) {
        // Swal.fire('', 'Your imaginary file is safe!', 'error');
      } else {
        this.delete(sid);
      }
    });
  }
  delete(sid)
  {
    this.buttonloading = true;
    this.formdata.sid = sid;
    console.log(this.formdata);
    // const token = localStorage.getItem('token');
    // const headers = new Headers();

    const postData = this.formdata;
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json',
    //     Authorization: token
    //   })
    // };


    this.global.http.post(this.global.server + 'subcategory/delete.php', postData, {})
      .subscribe(data => {
        console.log(data);
        // tslint:disable-next-line: triple-equals
        if (data['status'] == 'success') {
          this.modal.hide();
          // tslint:disable-next-line
          this.ngOnInit();
          this.global.addToast({
            title: 'Deleted successfully',
            msg: ' ',
            timeout: 8000,
            theme: 'default',
            position: 'top-right',
            type: 'success'
          })
          this.buttonloading = false;

        } else {
          //   alert();
          // tslint:disable-next-line
          this.buttonloading = false;
          this.global.addToast({
            title: 'failed',
            msg: data['statusmessage'],
            timeout: 8000,
            theme: 'default',
            position: 'top-right',
            type: 'error'
          })
        }
      }, error => {
        console.log(error);
        //this.loading = false;

      });
  }

}
