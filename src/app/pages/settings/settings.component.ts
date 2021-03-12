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
  name: any;

}
export class FormInput1 {
 
  name: any;

}






@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class SettingsComponent implements OnInit {
  private filesControl = new FormControl(null, FileUploadValidators.filesLimit(1));

  @ViewChild('modalProject', {
    static: false
  }) modal: any;
  
  public editProfile: boolean;
  public editProfile2: boolean;
  public editProfileIcon = 'icon-edit'
  public editProfileIcon2 = 'icon-edit';

  public editContact: boolean;
  public editContactIcon: string;

  public editOtherInfo: boolean;
  public editOtherInfoIcon: string;
  dtExportButtonOptions: any = {};
  formInput: FormInput;
  formInput2: FormInput1;
  form: any;
  passcode: any;
  sms: any={};
  tname: any='team';
  sname: any='website';
  type: any = 'add';
  public isSubmit: boolean;

  formdata: any = {};
  update: any = {};
  postdata: any = {};
  loading = false;
  buttonloading = false;
  statusloading = [];
  team: any = {};
  editdata: any = {};
  sites: any = {};
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
      name: '',
      pid: '',
      lendername: '',
      image: '',
      link: '',
      lid: '',
    };
    this.formInput2 = {
      name: '',
      

    };

    this.dtExportButtonOptions = {
      dom: 'Bfrtip',
    };
    this.lenders();
  }
  save(form: any) {
    if (!form.valid) {
      this.isSubmit = true;
      return;

    }
  }
  openupdate(index) {
    
    //this.editdata = this.tabledata[index];
   
   this.update.id=index.id;
   
    this.type = 'update';
    this.modal.show();
  }
  openupdate1(index) {
    console.log(index);
    this.update.id=index.id;
    //this.editdata = this.tabledata[index];
   this.update.name=index.url;
   this.update.team=index.teamid;
   
    this.type = 'update';
    this.modal.show();
  }

  lenders() {


    this.loading = true;

    // this.formdata = this.formInput;
    console.log(this.formdata);
    const token = localStorage.getItem('token');
    const headers = new Headers();


    const postData = this.formdata;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: token
      })
    };


    this.global.http.post(this.global.server + 'settings/viewteams.php', postData, httpOptions)
      .subscribe(data => {
        console.log(data);
        // tslint:disable-next-line: triple-equals
        if (data['status'] == 'success') {
          this.team = data['data'];
         
          this.loading = false;

        } else {
          //   alert();
          this.loading = false;

        }
      }, error => {
        console.log(error);
        //this.loading = false;

      });
      this.global.http.post(this.global.server + 'settings/viewsites.php', postData, httpOptions)
      .subscribe(data => {
        console.log(data);
        // tslint:disable-next-line: triple-equals
        if (data['status'] == 'success') {
          this.sites = data['data'];
          this.sms = data['sms'][0];
          this.passcode = data['passcode'];
         console.log(this.sms);
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




    this.buttonloading = true;
    // this.formdata = this.formInput;
    console.log(this.formdata);
    const token = localStorage.getItem('token');
    const headers = new Headers();

    const postData =  this.formInput2;
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        Authorization: token
      })
    };
    let formData: FormData = new FormData();


    
    
   

console.log(formData);

    this.global.http.post(this.global.server + 'settings/addteams.php', postData, httpOptions)
      .subscribe(data => {
        console.log(data);
        // tslint:disable-next-line: triple-equals
        if (data['status'] == 'success') {
          this.modal.hide();
          // tslint:disable-next-line
          this.ngOnInit();
          this.uploadedFiles = [];
          this.global.addToast({
            title: 'Team added successfully',
            msg: ' ',
            timeout: 8000,
            theme: 'default',
            position: 'top-right',
            type: 'success'
          })
          this.loading = false;
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

  addsite(name,team) {
    this.update.name=name;
    this.update.id=team;
console.log(team);
console.log(this.update.id);


    this.buttonloading = true;
    // this.formdata = this.formInput;
    
    const token = localStorage.getItem('token');
    const headers = new Headers();

    const postData =  this.update;
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        Authorization: token
      })
    };
  

    this.global.http.post(this.global.server + 'settings/addsite.php', postData, httpOptions)
      .subscribe(data => {
        console.log(data);
        // tslint:disable-next-line: triple-equals
        if (data['status'] == 'success') {
          this.modal.hide();
          // tslint:disable-next-line
          this.ngOnInit();
          this.uploadedFiles = [];
          this.global.addToast({
            title: 'Website added successfully',
            msg: ' ',
            timeout: 8000,
            theme: 'default',
            position: 'top-right',
            type: 'success'
          })
          this.loading = false;
          this.buttonloading = false;
          this.update.name=null;
          this.update.team=null;

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
//////////////////////////////////update sms/////////////////////////////////////////////////////
updatesms() {
 

  // this.formdata = this.formInput;
 
  const token = localStorage.getItem('token');
  const headers = new Headers();

  const postData = this.sms;
  const httpOptions = {
    headers: new HttpHeaders({
      Accept: 'application/json',
      Authorization: token
    })
  };
 

  this.global.http.post(this.global.server + 'settings/updatesms.php', postData, httpOptions)
    .subscribe(data => {
      console.log(data);
      // tslint:disable-next-line: triple-equals
      if (data['status'] == 'success') {
       
        this.modal.hide();
        // tslint:disable-next-line
        this.ngOnInit();
        this.uploadedFiles2 = [];
        this.global.addToast({
          title: ' Updated successfully',
          msg: ' ',
          timeout: 8000,
          theme: 'default',
          position: 'top-right',
          type: 'success'
        })
        this.loading = false;
        this.buttonloading = false;
        this.update.name=null;

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




////////////////////////////////////update SMS///////////////////////////////////////



//////////////////////////////////update sms/////////////////////////////////////////////////////
updatepasscode() {
 

  // this.formdata = this.formInput;
 
  const token = localStorage.getItem('token');
  const headers = new Headers();

  const postData = this.passcode;
  const httpOptions = {
    headers: new HttpHeaders({
      Accept: 'application/json',
      Authorization: token
    })
  };
 

  this.global.http.post(this.global.server + 'settings/updatepasscode.php', postData, httpOptions)
    .subscribe(data => {
      console.log(data);
      // tslint:disable-next-line: triple-equals
      if (data['status'] == 'success') {
       
        this.modal.hide();
        // tslint:disable-next-line
        this.ngOnInit();
        this.uploadedFiles2 = [];
        this.global.addToast({
          title: ' Updated successfully',
          msg: ' ',
          timeout: 8000,
          theme: 'default',
          position: 'top-right',
          type: 'success'
        })
        this.loading = false;
        this.buttonloading = false;
        this.update.name=null;

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




////////////////////////////////////update SMS///////////////////////////////////////
  updatelender(form: any) {
    console.log(this.formInput);
    console.log(form.valid);
    if (!form.valid) {
      this.isSubmit = true;

      return;
    }




    this.buttonloading = true;
    // this.formdata = this.formInput;
    console.log(this.formdata);
    const token = localStorage.getItem('token');
    const headers = new Headers();

    const postData = this.update;
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        Authorization: token
      })
    };
   

    this.global.http.post(this.global.server + 'settings/updateteam.php', postData, httpOptions)
      .subscribe(data => {
        console.log(data);
        // tslint:disable-next-line: triple-equals
        if (data['status'] == 'success') {
         
          this.modal.hide();
          // tslint:disable-next-line
          this.ngOnInit();
          this.uploadedFiles2 = [];
          this.global.addToast({
            title: 'Agent added successfully',
            msg: ' ',
            timeout: 8000,
            theme: 'default',
            position: 'top-right',
            type: 'success'
          })
          this.loading = false;
          this.buttonloading = false;
          this.update.name=null;

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

  updatesite(form: any) {
    console.log(this.formInput);
    console.log(form.valid);
    if (!form.valid) {
      this.isSubmit = true;

      return;
    }




    this.buttonloading = true;
    // this.formdata = this.formInput;
    console.log(this.formdata);
    const token = localStorage.getItem('token');
    const headers = new Headers();

    const postData = this.update;
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        Authorization: token
      })
    };
   

    this.global.http.post(this.global.server + 'settings/updatesite.php', postData, httpOptions)
      .subscribe(data => {
        console.log(data);
        // tslint:disable-next-line: triple-equals
        if (data['status'] == 'success') {
         
          this.modal.hide();
          // tslint:disable-next-line
          this.ngOnInit();
          this.uploadedFiles2 = [];
          this.global.addToast({
            title: 'Agent added successfully',
            msg: ' ',
            timeout: 8000,
            theme: 'default',
            position: 'top-right',
            type: 'success'
          })
          this.loading = false;
          this.buttonloading = false;
          this.update.name=null;

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



  delete(id,type) {


    this.buttonloading = true;
    this.formdata.id = id;
    this.formdata.type = type;
    console.log(this.formdata);
    const token = localStorage.getItem('token');
    const headers = new Headers();

    const postData = this.formdata;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: token
      })
    };


    this.global.http.post(this.global.server + 'settings/delete.php', postData, httpOptions)
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
          this.loading = false;
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
  deleteconfirm(id,type) {
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
        this.delete(id,type);
      }
    });
  }


  chnagestatus(id, status) {

    this.statusloading[id] = 1;

    this.buttonloading = true;
    this.formdata.id = id;
    this.formdata.status = status;
    this.formdata.type = 'lender';
    console.log(this.formdata);
    const token = localStorage.getItem('token');
    const headers = new Headers();

    const postData = this.formdata;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: token
      })
    };


    this.global.http.post(this.global.server + 'updatestatus.php', postData, httpOptions)
      .subscribe(data => {
        console.log(data);
        // tslint:disable-next-line: triple-equals
        if (data['status'] == 'success') {
          this.modal.hide();
          // tslint:disable-next-line
          this.ngOnInit();
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
