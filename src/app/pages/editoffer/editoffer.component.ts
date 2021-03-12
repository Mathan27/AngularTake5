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
  selector: 'app-editoffer',
  templateUrl: './editoffer.component.html',
  styleUrls: ['./editoffer.component.scss']
})
export class EditofferComponent implements OnInit {

  dtExportButtonOptions = {
    dom: 'Bfrtip',
  };
  @ViewChild('modalProject', {
    static: false
  }) modal: any;
  @ViewChild('modals', {
    static: false
  }) modals: any;
  formInput: any={};
  formInput1: any={};
  formInput2: any={};
  formInput3: any={};
  statusloading = [];
  option = [];
  productdata:any;

  loading = true;
  formloading = true;
  buttonloading:any;
  id:any;
  tempid:any;
  tempname:any;
  type:any;
  subcatid:any;
  tabledata:any;
  tabledata1:any;
  tabledata2:any;
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
    // this.product();
  }

  product(){
    this.formloading=true;
    console.log(this.formdata);
    const token = localStorage.getItem('token');
    const headers = new Headers();
  
    this.formdata.name = "test";
    const postData = this.formdata;
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json',
    //     Authorization: token
    //   })
    // };
  
  
    this.global.http.post(this.global.server + 'offers/options.php', postData, {})
      .subscribe(data => {
        console.log(data);
        // tslint:disable-next-line: triple-equals
        if (data['status'] == 'success') {
  
          // console.log(data['products'][0].name);
          this.option = [];
  
          let i;
          for (i = 0; i < data['products'].length; i++) {
            this.option.push({'label': data['products'][i].name, 'value':data['products'][i].pid});
            // if(!this.option || this.option== null){
              // this.option = data['options'][0].sid;
  
            // }
            
          }
          // this.modal.show();
          console.log(this.option);
          // this.countdata = data['data'].count;
          // this.siteoptions = [];
           
          this.formInput.category = '0';
          // this.formInput.color = '1';
  
          // for (i = 0; i < data['data'].list.length; i++) {
          //   this.siteoptions.push({'label': data['data'].list[i].name, 'value':data['data'].list[i].id});
          //   if(!this.selectedsite || this.selectedsite== null){
              // this.selectedsite = data['list'][0].id;
  
          //   }
            
          // }
          
          this.loading = false;
  
        } else {
          //   alert();
          this.loading = false;
  
        }
      }, error => {
        console.log(error);
        //this.loading = false;
  
      });
  }

  // showw(){
  //   console.log('gygygygygygygygygygygygy'); 
  //   this.modal.show();
  //   this.type='add';
  // }
initial(id)
{
  this.loading=true;
  console.log(this.formInput);
  this.formInput.id=id;

  this.editid=JSON.stringify(this.formInput);

  const postData = this.editid;
  this.global.http.post(this.global.server + 'offers/singleoffer.php', postData, {})
  .subscribe(data => {
    console.log(data);
    // tslint:disable-next-line: triple-equals
    if (data['status'] == 'success') {
      this.tabledata = data['records'][0]; 
      this.productdata=data['products']; 
      this.formInput = this.tabledata;
      console.log(this.tabledata);
      let i;
      console.log(this.formInput.name);
      let tempoptions = [];
      for (i = 0; i < data['products'].length; i++) {
        tempoptions.push(data['products'][i].pid);
        // if(!this.selectedsite || this.selectedsite== null){
        //   this.selectedsite = data['site'][0].id;

        // }
      }
      console.log(this.option);
      this.formInput.products=tempoptions;
      console.log(this.formInput.products);
      console.log("------------------");
      this.product();
      
      

    } else {
      //   alert();
      

    }
  }, error => {
    console.log(error);
    //this.loading = false;

  });
  
}
showw(id,name)
{
 console.log(id+name)
 this.formInput3.id=id;
 this.formInput3.sname=name;

   
      this.modals.show();
     
}
updatesub(form:any) {
  

 
  


  this.buttonloading = true;
  // this.formdata = this.formInput;
  console.log(this.formdata);
  const token = localStorage.getItem('token');
  const headers = new Headers();
  this.formInput.sid = this.selectedsite ;
  const postData = this.formInput3;
  // const httpOptions = {
  //   headers: new HttpHeaders({
  //     Accept: 'application/json',
  //     Authorization: token
  //   })
  // }; 
  const httpOptions = {};
  let formData: FormData = new FormData();
  if (this.uploadedFiles[0]) {
    const file: File = this.uploadedFiles[0];
    console.log(file);
    formData.append('file', file, file.name);
  }


  
  console.log(this.formInput3);
  console.log(this.formInput3.toString());
  formData.append('data', JSON.stringify(this.formInput3));
  formData.append('name', 'ss');
console.log(formData);
console.log("formData");


  this.global.http.post(this.global.server + 'subcategory/update.php', formData, httpOptions)
    .subscribe(data => {
      console.log(data);
      // tslint:disable-next-line: triple-equals
      if (data['status'] == 'success') {
        let lastid = data['last_id'];
        this.modals.hide();
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
// subcat(sid)
// {
//   this.loading= true;
//   this.formInput1.id=sid;

//   this.subcatid=JSON.stringify(this.formInput1);

//   const postData = this.subcatid;
//   this.global.http.post(this.global.server + 'subcategory/view.php', postData, {})
//   .subscribe(data => {
//     console.log(data);
//     // tslint:disable-next-line: triple-equals
//     if (data['status'] == 'success') {
//       this.tabledata1 = data['records'];
//       let i;
//       console.log(this.tabledata1);
//       // for (i = 0; i < data['site'].length; i++) {
//       //   this.siteoptions.push({'label': data['site'][i].url, 'value':data['site'][i].id});
//       //   if(!this.selectedsite || this.selectedsite== null){
//       //     this.selectedsite = data['site'][0].id;

//       //   }
//       // }
      
// this.loading=false;
//     } else {
//       //   alert();
      

//     }
//   }, error => {
//     console.log(error);
//     this.loading = false;

//   });
// }
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

  editoffer(form: any) {
    console.log(this.formInput);
    console.log(form.valid);
    if (!form.valid) {
      this.isSubmit = true;
      return;
    }



    this.buttonloading = true;
    // this.formdata = this.formInput;
    console.log(this.formdata);
    // const token = localStorage.getItem('token');
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
    if (this.uploadedFiles[0]) {
      const file: File = this.uploadedFiles[0];
      console.log(file);
      formData.append('file', file, file.name);
    }


    
    console.log(this.formInput);
    console.log(this.formInput.toString());
    formData.append('data', JSON.stringify(this.formInput));
    formData.append('name', 'ss');
console.log(formData);
console.log("formData");
// return;

    this.global.http.post(this.global.server + 'offers/update.php', formData, httpOptions)
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
    console.log(this.formInput2);
    var formData2: any = new FormData();

    console.log(this.id);
    console.log(this.formInput2);
    console.log(form.valid);
    // if (!form.valid) {
    //   this.isSubmit = true;
    //   return;
    // }
    if (!this.uploadedFiles2[0]) {
      this.isSubmit = true;
alert('Select the image');
      return;
    }



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
    console.log(this.uploadedFiles2);

    const file: File = this.uploadedFiles2[0];
    console.log(file);
    formData.append('file', file, file.name);
    this.formInput2.id=this.id;
    console.log(this.formInput2);
    console.log(this.formInput2.toString());
    formData.append('data', JSON.stringify(this.formInput2));
    formData.append('name', 'ss');
console.log(formData);
console.log("formData");


    this.global.http.post(this.global.server + 'subcategory/addnew.php', formData, httpOptions)
      .subscribe(data => {
        console.log(data);
        // tslint:disable-next-line: triple-equals
        if (data['status'] == 'success') {
          let lastid = data['last_id'];
          this.modal.hide();
          // tslint:disable-next-line
          this.ngOnInit();
          this.uploadedFiles = [];
          Swal.fire({
            title: 'Subcategory Uploaded',
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
            title: 'Subcategory Upload Failed',
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
