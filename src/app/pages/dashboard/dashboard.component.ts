import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import { Input } from '@angular/core';

import { GlobalService } from '../../services/global.service';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import {  ViewChild, ElementRef } from '@angular/core';
import 'sweetalert2/src/sweetalert2.scss';
import Swal from 'sweetalert2';
import { FileUploadValidators } from '@iplab/ngx-file-upload';
import {FormControl, FormGroup} from '@angular/forms';
import {NgbCalendar, NgbDateParserFormatter, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

export class FormInput {
  pid: any;
  lendername: any;
  image: any;
  link: any;
  lid: any;

}


const equals = (one: NgbDateStruct, two: NgbDateStruct) =>
  one && two && two.year === one.year && two.month === one.month && two.day === one.day;

const before = (one: NgbDateStruct, two: NgbDateStruct) =>
  !one || !two ? false : one.year === two.year ? one.month === two.month ? one.day === two.day
    ? false : one.day < two.day : one.month < two.month : one.year < two.year;

const after = (one: NgbDateStruct, two: NgbDateStruct) =>
  !one || !two ? false : one.year === two.year ? one.month === two.month ? one.day === two.day
    ? false : one.day > two.day : one.month > two.month : one.year > two.year;



const now = new Date();




@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  private filesControl = new FormControl(null, FileUploadValidators.filesLimit(1));

  @ViewChild('modalProject', {
    static: false
  }) modal: any;

  collapse :any ={};
  public model: any;
  modelCustomDay: any;
  filter: any;
  displayMonths = 2;
  navigation = 'select';
  showWeekNumbers = false;

  hoveredDate: NgbDateStruct;
  fromDate: NgbDateStruct;
  toDate: NgbDateStruct;

  disabled = true;
  searchstring : any;
all = false;
  @Input() testRangeDate: Date;

  modelPopup: NgbDateStruct;
  public date: {year: number, month: number};
  selectedtime: string;

  modelDisabled: NgbDateStruct = {
    year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()
  };

  dtExportButtonOptions: any = {};
  formInput: FormInput;
  formInput2: FormInput;
  form: any;
  type: any = 'add';
  public isSubmit: boolean;
  formdata: any = {};
  loading = false;
  buttonloading = false;
  statusloading = [];
  tabledata: any = {};
  editdata: any = {};
  countdata: any = {};
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

  public  bar = {
    chart: {
      height: 350,
      type: 'bar',
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        endingShape: 'rounded'
      },
    },
    dataLabels: {
      enabled: false
    },
    colors: ['#4680ff', '#0e9e4a'],
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent']
    },
    series: [{
      name: 'Total',
      data: []
    },  {
      name: 'won',
      data: []
    }],
    xaxis: {
      categories: [],
    },
    yaxis: {
      title: {
        text: 'Leads'
      }
    },
    fill: {
      opacity: 1

    },
    tooltip: {
      y: {
        formatter: (val) =>  val + ' leads'
      }
    }
  };

  public  teambar = {
    chart: {
      height: 350,
      type: 'bar',
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        endingShape: 'rounded'
      },
    },
    dataLabels: {
      enabled: false
    },
    colors: ['#4680ff', '#0e9e4a'],
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent']
    },
    series: [{
      name: 'Total',
      data: []
    },  {
      name: 'won',
      data: []
    }],
    xaxis: {
      categories: [],
    },
    yaxis: {
      title: {
        text: 'Leads'
      }
    },
    fill: {
      opacity: 1

    },
    tooltip: {
      y: {
        formatter: (val) =>  val + ' leads'
      }
    }
  };

  public  area = {
    chart: {
      height: 350,
      type: 'area',
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth'
    },
    colors: ['#ffa21d', '#ff5252'],
    series: [{
      name: 'series1',
      data: [31, 40, 28, 51, 42, 109, 100]
    }, {
      name: 'series2',
      data: [11, 32, 45, 32, 34, 52, 41]
    }],

    xaxis: {
      type: 'datetime',
      categories: [
        '2018-09-19T00:00:00',
        '2018-09-19T01:30:00',
        '2018-09-19T02:30:00',
        '2018-09-19T03:30:00',
        '2018-09-19T04:30:00',
        '2018-09-19T05:30:00',
        '2018-09-19T06:30:00'
      ],
    },
    tooltip: {
      x: {
        format: 'dd/MM/yy HH:mm'
      },
    }
  };

  constructor(public parserFormatter: NgbDateParserFormatter, public calendar: NgbCalendar,public global: GlobalService, public router: Router) {
    this.isSubmit = false;

  }



  onDateChange(date: NgbDateStruct) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && after(date, this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isHovered = date => this.fromDate && !this.toDate && this.hoveredDate && after(date, this.fromDate) && before(date, this.hoveredDate);
  isInside = date => after(date, this.fromDate) && before(date, this.toDate);
  isFrom = date => equals(date, this.fromDate);
  isTo = date => equals(date, this.toDate);
  today(type){
      var date = new Date();
      this.fromDate = { day: date.getUTCDate(), month: date.getUTCMonth() + 1, year: date.getUTCFullYear()};
      this.toDate = { day: date.getUTCDate(), month: date.getUTCMonth() + 1, year: date.getUTCFullYear()};
      console.log('ssfs');
      console.log(this.fromDate);
      if(type=='reload'){
        this.selectedtime='today';
        this.filterbydate(this.parserFormatter.format(this.fromDate), this.parserFormatter.format(this.toDate));     
      }
      //console.log(i);
  } 
  yesterday(type){
    var date = new Date();
    var today = new Date();

    console.log(today); // # => Fri Apr 01 2011 11:14:50 GMT+0200 (CEST)

    today.setDate(date.getDate() - 1);
    console.log(today); // # => Fri Apr 01 2011 11:14:50 GMT+0200 (CEST)


// # => Thu Mar 31 2011 11:14:50 GMT+0200 (CEST)
    this.fromDate = { day: today.getUTCDate(), month: today.getUTCMonth() + 1, year: today.getUTCFullYear()};
    this.toDate = { day: today.getUTCDate(), month: date.getUTCMonth() + 1, year: date.getUTCFullYear()};
    if(type=='reload'){
      this.selectedtime='yesterday';
      this.filterbydate(this.parserFormatter.format(this.fromDate), this.parserFormatter.format(this.toDate));     
    }
} 
 last7(type){
    var date = new Date();
    var today = new Date();

    console.log(today); // # => Fri Apr 01 2011 11:14:50 GMT+0200 (CEST)

    today.setDate(date.getDate() - 7);
    console.log(today); // # => Fri Apr 01 2011 11:14:50 GMT+0200 (CEST)

    this.fromDate = { day: today.getUTCDate(), month: today.getUTCMonth() + 1, year: today.getUTCFullYear()};
    this.toDate = { day: date.getUTCDate(), month: date.getUTCMonth() + 1, year: date.getUTCFullYear()};
    if(type=='reload'){
      this.selectedtime='last7';
      this.filterbydate(this.parserFormatter.format(this.fromDate), this.parserFormatter.format(this.toDate));     
    }
} 
 last30(type){
    var date = new Date();
    this.fromDate = { day: date.getUTCDate(), month: date.getUTCMonth() , year: date.getUTCFullYear()};
    this.toDate = { day: date.getUTCDate(), month: date.getUTCMonth() + 1, year: date.getUTCFullYear()};
    if(type=='reload'){
      this.selectedtime='last30';
      this.filterbydate(this.parserFormatter.format(this.fromDate), this.parserFormatter.format(this.toDate));     
    }
}
 alldata(type){
  
  var date = new Date();
  this.fromDate = { day: date.getUTCDate(), month: date.getUTCMonth() , year: date.getUTCFullYear()-3};
  this.toDate = { day: date.getUTCDate(), month: date.getUTCMonth() + 1, year: date.getUTCFullYear()};
  if(type=='reload'){
      this.selectedtime='all';
      this.filterbydate(this.parserFormatter.format(this.fromDate), this.parserFormatter.format(this.toDate));     
      }
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
    this.today('reload');
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

  filterbydate(from, to) {


    this.loading = true;
    // this.fromDate = { day: date.getUTCDate(), month: date.getUTCMonth() + 1, year: date.getUTCFullYear()};
    // this.toDate = { day: date.getUTCDate(), month: date.getUTCMonth() + 1, year: date.getUTCFullYear()};
    if(from && !to ){
  to=from;
    }
    // this.formdata = this.formInput;
    console.log('this.formdata');
    console.log(this.formdata);
    this.formdata.from = from;
    this.formdata.to = to;
    console.log(this.formdata);
 
    console.log(this.formdata);
    const token = localStorage.getItem('token');
    const headers = new Headers();

    // this.formdata.from = '';
    // this.formdata.to = '';
    const postData = this.formdata;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: token
      })
    };


    this.global.http.post(this.global.server + 'dashboard/superadmin.php', postData, httpOptions)
      .subscribe(data => {
        console.log(data);
        // tslint:disable-next-line: triple-equals
        if (data['status'] == 'success') {
          this.tabledata = data['data'].agents;
          this.countdata = data['data'].count;
          console.log(this.countdata);
          //let i = 0;
          // for(i; i < data['site'].length; i++;){
          // this.bar.xaxis.categories.push(data['site'][i].url);
          // }
          this.bar.xaxis.categories=[];
          this.bar.series[0].data=[];
          this.bar.series[1].data=[];
          this.teambar.xaxis.categories=[];
          this.teambar.series[0].data=[];
          this.teambar.series[1].data=[];
          var i;
          for (i = 0; i <= data['data'].site.length-1; i++) {
        //    console.log(data['data'].site.length);
        //  console.log(data['data'].site[i]);
            this.bar.xaxis.categories.push(data['data'].site[i].url);
            this.bar.series[0].data.push(data['data'].site[i].total);
            this.bar.series[1].data.push(data['data'].site[i].won);
           // this.bar.series[2].data.push(data['data'].site[i].lost);
          } 
          
          var i;
          for (i = 0; i <= data['data'].team.length-1; i++) {
        //    console.log(data['data'].site.length);
        //  console.log(data['data'].site[i]);
            this.teambar.xaxis.categories.push(data['data'].team[i].name);
            this.teambar.series[0].data.push(data['data'].team[i].total);
            this.teambar.series[1].data.push(data['data'].team[i].won);
 //           this.teambar.series[2].data.push(data['data'].team[i].lost);
          }

          console.log(this.bar);
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

    const postData = this.formInput;
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


    this.global.http.post(this.global.server + 'banners/deletebanner.php', postData, httpOptions)
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


  chnagestatus(id, status) {

    this.statusloading[id] = 1;

    this.formdata.id = id;
    this.formdata.status = status;
    this.formdata.type = 'banner';
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



}
