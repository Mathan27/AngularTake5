import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import { GlobalService } from '../../services/global.service';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import {  ViewChild, ElementRef } from '@angular/core';
import 'sweetalert2/src/sweetalert2.scss';
import Swal from 'sweetalert2';
import { FileUploadValidators } from '@iplab/ngx-file-upload';
import {FormControl, FormGroup} from '@angular/forms';

export class FormInput {
  pid: any;
  lendername: any;
  image: any;
  link: any;
  lid: any;

}


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  private filesControl = new FormControl(null, FileUploadValidators.filesLimit(1));

  @ViewChild('modalProject', {
    static: false
  }) modal: any;

  // dtExportButtonOptions: any = {};
  dtExportButtonOptions = {
    dom: 'Bfrtip',
  };
  formInput: any={};
  formInput2: FormInput;
  form: any;
  subcatid: any;
  type: any = 'add';
  public isSubmit: boolean;
  formdata: any = {};
  loading = false;
  buttonloading = false;
  statusloading = [];
  tabledata: any = {};
  editdata: any = {};
  countdata: any = {};
  public status: any = [{
    value: '0',
    label: 'Inactive'
  },
  {
    value: '1',
    label: 'Active'
  }
  ];
  public options: any = [{
      value: '0',
      label: 'Alabama'
    },
    {
      value: '1',
      label: 'Wyoming'
    },
    {
      value: '2',
      label: 'Coming'
    },
    {
      value: '3',
      label: 'Henry Die'
    },
    {
      value: '4',
      label: 'John Doe'
    }
  ];
  selectedOption = '3';
  public addform = new FormGroup({
    files: this.filesControl
  });
  public uploadedFiles: Array < File > = [];
  public uploadedFiles2: Array < File > = [];
  selectedsite : any; 
  siteoptions: any[];
  constructor(public global: GlobalService, public router: Router) {
    this.isSubmit = false;

  }
  addagent(aa) {
    console.log(this.filesControl.value);
    console.log(this.formInput);
    console.log(this.uploadedFiles);

  }
  ngOnInit() {
    //this.filesControl.enable();
    //     this.filesControl.valueChanges.subscribe(() => {
    //       console.log(this.filesControl);
    //       if(this.filesControl.value.length == 0) {
    //          this.filesControl.enable();
    //         } else{
    //             this.filesControl.disable();
    //            }
    //     }

    // );

    this.formInput = {
      pid: '',
      lendername: '',
      image: '',
      link: '',
      lid: '',
    };
    this.formInput2 = {
      pid: '',
      lendername: '',
      image: '',
      link: '',
      lid: '',

    };

    this.dtExportButtonOptions = {
      dom: 'Bfrtip',
    };
    this.lenders('yes');
  }
  save(form: any) {
    if (!form.valid) {
      this.isSubmit = true;
      return;

    }
  }
  openupdate(index) {
    //this.editdata = this.tabledata[index];
    this.formInput2 = {
      pid: this.tabledata[index].pid,
      lendername: this.tabledata[index].name,
      image: this.tabledata[index].img,
      link: this.tabledata[index].url,
      lid: this.tabledata[index].id,
    };
    console.log(this.editdata);
    this.type = 'update';
    this.modal.show();
  }

  lenders(loading) {

    if(loading=='yes'){
      this.loading = true;
     }
    // this.formdata = this.formInput;
    console.log(this.formdata);
    // const token = localStorage.getItem('token');
    // const headers = new Headers();

    this.formdata.sid = this.selectedsite;
    const postData = this.formdata;
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json',
    //     Authorization: token
    //   })
    // };


    this.global.http.post(this.global.server + 'user/userpanel/listusers.php', postData, {})
      .subscribe(data => {
        console.log(data);
        // tslint:disable-next-line: triple-equals
        if (data['status'] == 'success') {
          this.tabledata = data['records'];
          this.countdata = data['count'];
          this.siteoptions = [];
          let i;
          console.log(this.tabledata);
          // for (i = 0; i < data['site'].length; i++) {
          //   this.siteoptions.push({'label': data['site'][i].url, 'value':data['site'][i].id});
          //   if(!this.selectedsite || this.selectedsite== null){
          //     this.selectedsite = data['site'][0].id;

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


  addlender(form: any) {
    console.log(this.formInput);
    console.log(form.valid);
    if (!form.valid) {
      this.isSubmit = true;

      return;
    }
    if (!this.uploadedFiles[0]) {
      this.isSubmit = true;
alert('Select the image');
      return;
    }



    this.buttonloading = true;
    // this.formdata = this.formInput;
    console.log(this.formdata);
    // const token = localStorage.getItem('token');
    // const headers = new Headers();
    this.formInput.sid = this.selectedsite ;
    const postData = this.formInput;
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     Accept: 'application/json',
    //     Authorization: token
    //   })
    // };
    let formData: FormData = new FormData();
    console.log(this.uploadedFiles);

    const file: File = this.uploadedFiles[0];
    formData.append('file', file, file.name);
    console.log(this.formInput);
    console.log(this.formInput.toString());
    formData.append('data', JSON.stringify(this.formInput));
    formData.append('name', 'ss');



    this.global.http.post(this.global.server + 'category/addnew.php', formData, {})
      .subscribe(data => {
        console.log(data);
        // tslint:disable-next-line: triple-equals
        if (data['status'] == 'success') {
          this.modal.hide();
          // tslint:disable-next-line
          this.ngOnInit();
          this.uploadedFiles = [];
          this.global.addToast({
            title: 'Lender added successfully',
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

adduser()
{
  this.router.navigate(['adduser']);
}

editpage(id)
{
  this.router.navigate(['editcategory/'+id]);
}
  
updatelender(form: any) {
    console.log(this.formInput);
    console.log(form.valid);
    if (!form.valid) {
      this.isSubmit = true;

      return;
    }




    this.buttonloading = true;
    this.formdata = this.formInput;
    console.log(this.formdata);
    // const token = localStorage.getItem('token');
    const headers = new Headers();

    // const postData = this.formInput;
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     Accept: 'application/json',
    //     Authorization: token
    //   })
    // };
    let formData: FormData = new FormData();
    console.log(this.uploadedFiles2);
    if (this.uploadedFiles2[0]) {


      const file: File = this.uploadedFiles2[0];
      formData.append('file', file, file.name);
    }
    console.log(this.formInput);
    console.log(this.formInput.toString());
    formData.append('data', JSON.stringify(this.formInput2));

    this.global.http.post(this.global.server + 'category/update.php', formData, {})
      .subscribe(data => {
        console.log(data);
        // tslint:disable-next-line: triple-equals
        if (data['status'] == 'success') {
          this.modal.hide();
          // tslint:disable-next-line
          this.ngOnInit();
          this.uploadedFiles2 = [];
          this.global.addToast({
            title: 'Category added successfully',
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




  delete(id) {


    this.buttonloading = true;
    this.formdata.id = id;
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


    this.global.http.post(this.global.server + 'user/userpanel/delete.php', postData, {})
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
  deleteconfirm(id) {
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
        this.delete(id);
      }
    });
  }
viewuser(id)
{
  this.router.navigate(['viewuser/'+id]);
  return;
  this.loading= true;
  this.formdata.id=id;

  this.subcatid=JSON.stringify(this.formdata);

  const postData = this.subcatid;
  this.global.http.post(this.global.server + 'user/view.php', postData, {})
  .subscribe(data => {
    console.log(data);
    // tslint:disable-next-line: triple-equals
    if (data['status'] == 'success') {
      this.tabledata = data['records'];
      let i;
      console.log(this.tabledata);
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


    this.global.http.post(this.global.server + 'user/userpanel/update.php', postData, {})
      .subscribe(data => {
        console.log(data);
        // tslint:disable-next-line: triple-equals
        if (data['status'] == 'success') {
          this.modal.hide();
          // tslint:disable-next-line
         // this.ngOnInit();
          this.lenders('no');
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


}
