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
  // pid: any;
  // lendername: any;
  // image: any;
  // link: any;
  // lid: any;

}

export class FormInput2{
  iname:any;
  desc:any;
  img:any;
  status:any;
}

@Component({
  selector: 'app-additems',
  templateUrl: './additems.component.html',
  styleUrls: ['./additems.component.scss']
})
export class AdditemsComponent implements OnInit {
  private filesControl = new FormControl(null, FileUploadValidators.filesLimit(1));

  @ViewChild('modalProject', {
    static: false
  }) modal: any;

  // dtExportButtonOptions: any = {};
  dtExportButtonOptions = {
    dom: 'Bfrtip',
  };
  formInput: FormInput2;
  formInput2: FormInput;
  form: any;
  option: any =[];
  type: any = 'add';
  public isSubmit: boolean;
  formdata: any = {};
  loading = false;
  editid:any;
  productdata:any;

  buttonloading = false;
  statusloading = [];
  tempoptions = [];

  tabledata: any = {};
  products: any = {};

  editdata: any = {};
  countdata: any = {};
 
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
  selectedOption = '3';
  public addform = new FormGroup({
    files: this.filesControl
  });
  public uploadedFiles: Array < File > = [];
  public uploadedFiles2: Array < File > = [];
  public uploadedFiles3: Array < File > = [];
  selectedsite : any; 
  error : any; 

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
    console.log("hello");
    this.error ='no';
    this.products ={};
//    this.options();
    
    // this.formInp
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

    this.formInput2 = {
      id: '',
      iname: '',
      img: '',
      desc: '',
      status: '',

    };

    this.dtExportButtonOptions = {
      dom: 'Bfrtip',
    };
    // this.lenders('yes');
  }



  dummy(form: any)
{
  console.log(this.products);
}
  addproduct(form: any) {
    const httpOptions = {};
    console.log(this.products);
    let formData: FormData = new FormData();
if((!this.products.levels || this.products.levels.length == 0) || !this.products.status || !this.products.iname ||!this.uploadedFiles3[0])
{
  this.error = 'yes';
  return;
}

   this.error='no'; 
//     if (!this.uploadedFiles[0]) {
//       this.isSubmit = true;
// alert('Select the image');
//       return;
//     }

    
    const file: File = this.uploadedFiles3[0];
  

    console.log(this.products);
    console.log(this.uploadedFiles3[0]);
    console.log(this.products);
    console.log(this.products.toString());
    formData.append('file', file, file.name);
    formData.append('data', JSON.stringify(this.products));
    formData.append('name', 'ss');
console.log(formData);
console.log("formData");
this.global.http.post(this.global.server2 + 'instruments/addinstruments.php', formData, httpOptions)
.subscribe(data => {
  console.log(data);
  // tslint:disable-next-line: triple-equals
  if (data['status'] == 'success') {
    // let lastid = data['last_id'];
    // tslint:disable-next-line
    //this.myvariants = [];

    this.ngOnInit();
    // this.myvariants = [];
    Swal.fire({
      title: 'Added Successfully',
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
