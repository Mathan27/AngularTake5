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
import { post } from 'jquery';




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
  selector: 'app-edititems',
  templateUrl: './edititems.component.html',
  styleUrls: ['./edititems.component.scss']
})
export class EdititemsComponent implements OnInit {

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
  InsInput: any ={};
  LevelInput: any =[];
  formInput1: any={};
  formInput2: any={};
  formInput3: any={};
  statusloading = [];
  category = [];
  tempoptions = [];
  option: any =[];

  loading = false;
  formloading = true;
  buttonloading:any;
  productdata:any;
  id:any;
  tempid:any;
  tempname:any;
  type:any;
  subcatid:any;
  tabledata:any;
  myvariants:any;
  tabledata1:any;
  tabledata2:any;
  editid:any;
  selectedsite:any;
  public isSubmit: boolean;
  formdata: any = {};
  formdata1: any = {};
  public levels: any = [
    {
      value: 'Beginner',
      label: 'Beginner'
    },
    {
      value: 'Beginner 2',
      label: 'Beginner 2'
    },
    {
      value: 'Beginner 3',
      label: 'Beginner 3'
    },
    {
      value: 'Beginner 4',
      label: 'Beginner 4'
    },
    {
      value: 'Beginner 5',
      label: 'Beginner 5'
    },
    {
      value: 'Intermediate 1',
      label: 'Intermediate 1'
    },
    {
      value: 'Intermediate 2',
      label: 'Intermediate 2'
    },
    {
      value: 'Intermediate 3',
      label: 'Intermediate 3'
    },
    {
      value: 'Intermediate 4',
      label: 'Intermediate 4'
    },
    {
      value: 'Intermediate 5',
      label: 'Intermediate 5'
    },
    {
      value: 'Advanced 1',
      label: 'Advanced 1'
    },
    {
      value: 'Advanced 2',
      label: 'Advanced 2'
    },
    {
      value: 'Advanced 3',
      label: 'Advanced 3'
    },
    {
      value: 'Advanced 4',
      label: 'Advanced 4'
    },
    {
      value: 'Advanced 5',
      label: 'Advanced 5'
    },
  ];
 
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
  public uploadedFiles3: Array < File > = [];
  constructor(private route: ActivatedRoute,public global: GlobalService, public router: Router) {
    this.id = this.route.snapshot.paramMap.get('id');
console.log(this.id);
   }

  ngOnInit() {
    this.myvariants=[];
    this.uploadedFiles3 = [];

    this.initial();
    
    

    this.dtExportButtonOptions = {
      dom: 'Bfrtip',
    };
  }
  // showw(){
  //   console.log('gygygygygygygygygygygygy'); 
  //   this.modal.show();
  //   this.type='add';
  // }
initial()
{
  console.log("Hello");
  console.log(this.id);
  console.log("Mathan");
  this.myvariants=[];
  this.formloading=true;
  console.log(this.formInput);
  console.log("Mathan2");
  this.formInput.id=this.id;
  console.log(this.formInput.id);
  this.editid=JSON.stringify(this.formInput);

  const postData = this.editid;
  console.log("Postdata");
  console.log(postData);
  console.log("h11");
  this.global.http.post(this.global.server2 + 'instruments/singleinstrument.php', postData, {})
  .subscribe(data => {
    console.log("Get By id Instruments");
    console.log(data);
    if (data['status'] == true) {
    console.log('levels');
    console.log(data['levels']);
    this.tempoptions = [];
    for (let i = 0; i < data['levels'].length; i++) { 
      this.tempoptions.push( data['levels'][i].name);
    }
    console.log(this.tempoptions);
    console.log("levels");
    // console.log(this.LevelInput[0].name);
    this.InsInput = data['data'][0];
    console.log('Ins Record');
    console.log(this.InsInput);
    this.formloading = false;
    }
    else {
    this.formloading = false;

      //   alert();
      

    }
  }, error => {
    console.log(error);
  });
  
  
}

lenders(loading) {

  if(loading=='yes'){
    this.loading = true;
   }

  // this.formdata = this.formInput;
  console.log(this.formdata);
  const token = localStorage.getItem('token');
  const headers = new Headers();

  this.formdata.sid = this.selectedsite;
  const postData = this.formdata;
  // const httpOptions = {
  //   headers: new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     Authorization: token
  //   })
  // };


  this.global.http.post(this.global.server + 'products/subcatname.php', postData, {})
    .subscribe(data => {
      console.log(data);
      // tslint:disable-next-line: triple-equals
      if (data['status'] == 'success') {

        console.log(data['options'][0].sname);
        this.option = [];

        let i;
        for (i = 0; i < data['options'].length; i++) {
          this.option.push({'label': data['options'][i].sname, 'value':data['options'][i].sid});
          // if(!this.option || this.option== null){
            // this.option = data['options'][0].sid;

          // }
          
        }
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
        
        this.formloading = false;

      } else {
        //   alert();
        this.formloading = false;

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
options() {
  this.loading=true;
  console.log(this.formInput);
  this.formInput.id='id';

  this.editid=JSON.stringify(this.formInput);

  const postData = this.editid;
  this.global.http.post(this.global.server + 'products/view.php', postData, {})
  .subscribe(data => {
    console.log(data);
    // tslint:disable-next-line: triple-equals
    if (data['status'] == 'success') {
      this.tabledata = data['records'][0]; 
      this.productdata=data['records']; 
      this.formInput = this.tabledata;
      console.log(this.tabledata);
      let i;
      console.log(this.formInput.name);
      for (i = 0; i < data['records'].length; i++) {
        this.tempoptions.push({'label': data['records'][i].name + '-'+ data['records'][i].finalunit, 'value':data['records'][i].pid});
        // if(!this.selectedsite || this.selectedsite== null){
        //   this.selectedsite = data['site'][0].id;

        // }
      }
      console.log(this.tempoptions);
    
      console.log("------------------");
      // this.product();x 
      // this.lenders('yes');
      

    } else {
      //   alert();
      

    }
  }, error => {
    console.log(error);
    //this.loading = false;

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
// chnagestatus(id, status) {
//   this.statusloading[id] = 1;
//   this.formdata.id = id;
//   console.log(this.formdata.id);
//   this.formdata.status = status;
//   this.formdata.type = 'category';
//   console.log(this.formdata);
//   // const token = localStorage.getItem('token');
//   // const headers = new Headers();

//   const postData = this.formdata;
//   // const httpOptions = {
//   //   headers: new HttpHeaders({
//   //     'Content-Type': 'application/json',
//   //     Authorization: token
//   //   })
//   // };


//   this.global.http.post(this.global.server + 'subcategory/update.php', postData, {})
//     .subscribe(data => {
//       console.log(data);
//       // tslint:disable-next-line: triple-equals
//       if (data['status'] == 'success') {
//         this.ngOnInit();
//         this.modal.hide();
//         // tslint:disable-next-line
//        // this.ngOnInit();
//         this.global.addToast({
//           title: 'Updated successfully',
//           msg: ' ',
//           timeout: 8000,
//           theme: 'default',
//           position: 'top-right',
//           type: 'success'
//         })
//         this.statusloading[id] = 0;

//       } else {
//         this.statusloading[id] = 0;

//         //   alert();
//         // tslint:disable-next-line
//         this.buttonloading = false;
//         this.global.addToast({
//           title: 'failed',
//           msg: data['statusmessage'],
//           timeout: 8000,
//           theme: 'default',
//           position: 'top-right',
//           type: 'error'
//         })
//       }
//     }, error => {
//       console.log(error);
//       //this.loading = false;

//     });
// }
/*Update Instrument*/ 
updateproduct(form: any) {
    console.log(this.InsInput);
    console.log(this.tempoptions);

    console.log(this.uploadedFiles3[0]);

    console.log(form.valid);
    
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     Accept: 'application/json',
    //     Authorization: token
    //   })
    // }; 
    const httpOptions = {};
    let formData: FormData = new FormData();

    
//     if (!this.uploadedFiles[0]) {
//       this.isSubmit = true;
// alert('Select the image');
//       return;
//     }

    
    const file: File = this.uploadedFiles3[0];
    
    /* if(file)
    {
      formData.append('file', file, file.name);

    }
    if(file2)
    {
      formData.append('file2', file2, file2.name);

    }
     */
   if(this.uploadedFiles3[0])
   {
    formData.append('file', file, file.name);

   }

    console.log(this.tempoptions);
console.log("Hello Insinput");
    console.log(this.InsInput);
    console.log(this.InsInput.toString());
    formData.append('data', JSON.stringify(this.InsInput));
    formData.append('levels',JSON.stringify(this.tempoptions));
    formData.append('name', 'ss');
console.log(formData);
console.log("formData");


    this.global.http.post(this.global.server2 + 'instruments/updateinstruments.php', formData, httpOptions)
      .subscribe(data => {
        console.log(data);
        // tslint:disable-next-line: triple-equals
        if (data['status'] == 'success') {
          let lastid = data['last_id'];
          // tslint:disable-next-line
          this.myvariants = [];

          this.ngOnInit();
          // this.myvariants = [];
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
        // this.delete(sid);
      }
    });
  }
  delete(imagename)
  {
    this.buttonloading = true;
    this.formdata.id = this.id;
    // this.formdata.image = image;
    this.formdata.imagename = imagename;
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


    this.global.http.post(this.global.server + 'products/deleteimage.php', postData, {})
      .subscribe(data => {
        console.log(data);
        // tslint:disable-next-line: triple-equals
        if (data['status'] == 'success') {
          if (imagename == 'image2')
          {
            this.formInput.image2 = 'no';
          }
          if (imagename == 'image3')
          {
            this.formInput.image3 = 'no';
          }
          // this.modal.hide();
          // tslint:disable-next-line
          // this.ngOnInit();
          // this.global.addToast({
          //   title: 'Deleted successfully',
          //   msg: ' ',
          //   timeout: 8000,
          //   theme: 'default',
          //   position: 'top-right',
          //   type: 'success'
          // })
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
