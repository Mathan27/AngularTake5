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
export class FormInsInput{
  Iid: any;
  name: any;
  image: any;
  desc: any;
}






@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
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
  fromInput3: FormInsInput;
  form: any;
  type: any = 'add';
  public isSubmit: boolean;
  formdata: any = {};
  loading = false;
  buttonloading = false;
  statusloading = [];
  tabledata: any = {};
  instrumentdata: any = {};
  countinstrument: any ={};
  editdata: any = {};
  countdata: any = {};
  change: any = {};

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
    this.fromInput3={
      Iid:'',
      name:'',
      image:'',
      desc:'',
    }

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

    this.global.http.get(this.global.server2 + 'instruments/getinstruments.php').subscribe(data =>{
      console.log("Hello");
      console.log(data);
      if(data['status'] == true)
      {
      this.instrumentdata=data['data'];
      this.countinstrument=data['count'];
      console.log(this.countinstrument);
      console.log(this.countinstrument[0]);
      this.countdata=this.countinstrument[0];
      console.log("Hello Data");
      console.log(this.instrumentdata);
      console.log("Mathan");
      this.loading = false;
      }
      else
      {
        this.loading = false;
      }
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
    this.formInput.sid = this.selectedsite ;
    const postData = this.formInput;
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        Authorization: token
      })
    };
    let formData: FormData = new FormData();
    console.log(this.uploadedFiles);

    const file: File = this.uploadedFiles[0];
    formData.append('file', file, file.name);
    console.log(this.formInput);
    console.log(this.formInput.toString());
    formData.append('data', JSON.stringify(this.formInput));
    formData.append('name', 'ss');



    this.global.http.post(this.global.server + 'banners/addbanner.php', formData, httpOptions)
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

  edititems(id)
  {
  this.router.navigate(['edititems/'+id]);
  }


  updatelender(form: any) {
    console.log(this.formInput);
    console.log(form.valid);
    if (!form.valid) {
      this.isSubmit = true;

      return;
    }




    this.buttonloading = true;
    // this.formdata = this.formInput;
    console.log("123");
    console.log(this.formdata);
    const token = localStorage.getItem('token');
    const headers = new Headers();
    console.log("12345");
    const postData = this.formInput;
    console.log(postData);
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        Authorization: token
      })
    };
    let formData: FormData = new FormData();
    console.log(this.uploadedFiles2);
    if (this.uploadedFiles2[0]) {


      const file: File = this.uploadedFiles2[0];
      formData.append('file', file, file.name);
    }
    console.log(this.formInput);
    console.log(this.formInput.toString());
    formData.append('data', JSON.stringify(this.formInput2));

    this.global.http.post(this.global.server + 'banners/updatebanner.php', formData, httpOptions)
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
    this.change.id=id;
    console.log(this.formdata);
    const token = localStorage.getItem('token');
    const headers = new Headers();

    const postData = this.change.id;
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json',
    //     Authorization: token
    //   })
    // };


    this.global.http.post(this.global.server2 + 'instruments/delete.php', postData, {})
      .subscribe(data => {
        console.log(data);
        // tslint:disable-next-line: triple-equals
        if (data['status'] == 'success') {
          //this.modal.hide();
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

    this.change.id=id;
    console.log(this.change);
    console.log(this.change.id);
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


  chnagestatus(id, status) {


    this.statusloading[id] = 1;
    
   
    this.change.id = id;
    this.change.status = status;
    //this.formdata.type = 'product';
    console.log(this.change);
    const token = localStorage.getItem('token');
    const headers = new Headers();
    const postData = this.change;
    //const postData = this.formdata;
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json',
    //     Authorization: token
    //   })
    // };
    const httpOptions = {};
    let formData: FormData = new FormData();

    this.global.http.post(this.global.server2 + 'instruments/updateinstruments.php', postData, {})
      .subscribe(data => {
        console.log(data);
        // tslint:disable-next-line: triple-equals
        if (data['status'] == 'success') {
        
          // tslint:disable-next-line
         this.ngOnInit();
          // this.lenders('no');
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
