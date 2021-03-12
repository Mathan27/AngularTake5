import {Component, Input, OnInit} from '@angular/core';
import { GlobalService } from '../../services/global.service';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import {  ViewChild, ElementRef } from '@angular/core';
import {NgbCalendar, NgbDateParserFormatter, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { trigger } from '@angular/animations';
import Swal from 'sweetalert2';

export class FormInput {
  firstname: any;
  lastname: any;
  agentid: any;
  username: any;
  team: any;
  password: any;
  confirmpassword: any;
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

export class Cmyk {
  constructor(public c: number, public m: number, public y: number, public k: number) { }
}

@Component({
  selector: 'app-leads',
  templateUrl: './leads.component.html',
  styleUrls: ['./leads.component.scss']
})
export class LeadsComponent implements OnInit {
collapse : any = {};
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

  modelDisabled: NgbDateStruct = {
    year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()
  };

  public cmyk: Cmyk = new Cmyk(0, 0, 0, 0);



  
  @ViewChild('modalProject', {static: false}) modal: any;
  @ViewChild('modalProjectt', {static: false}) assignmodal: any;

  dtExportButtonOptions: any = {
    "displayLength": 2,

  };



  tableoptions = {
    dom: 'f',
    // dom: '<"top"f>rt<"bottom"lp><"clear">',
     select: true,
     displayLength: 100,
   };
  formInput: FormInput;
  countdata: any = {};
  form: any;
  public isSubmit: boolean;
  formdata: any = {};
  loading = false;
  addloading = false;
  tabledata: any = {};
  newselected: any = {};
  siteoptions : any = {};
  data : any = {};
  count: any = {};
 public options: any = [
    {value: '0', label: 'Alabama'},
    {value: '1', label: 'Wyoming'},
    {value: '2', label: 'Coming'},
    {value: '3', label: 'Henry Die'},
    {value: '4', label: 'John Doe'}
  ];
  selectedOption = '3';
  selectedassigne ;
  selectedlead: any = {} ;
  sites = [
    {value: 'speedyloanonline.com', label : 'speedyloanonlie.com'},
    {value: 'usaonlineloan', label : 'usaonlineloan.com'}
  ];
  agents = [
    {value: '1', label : 'ravi'},
    {value: '2', label : 'sankar'}
  ];
  statuses = [
    {value: '1', label : 'Won'},
    {value: '2', label : 'Lost'}
  ];
 selected = [];
  optionsloaded: boolean;
  selectedtime: string;
  constructor(public parserFormatter: NgbDateParserFormatter, public calendar: NgbCalendar, public global: GlobalService, public router: Router) {
    this.isSubmit = false;
    console.log(this.global.userdata.role);
  }
   selectall() {
   this.all = !this.all;
   let i;
   for (i = 0; i < this.tabledata.length; i++) {
      this.selected[i] = this.all;
      console.log('gg');
    }
   this.multicount();
   // this.selected[id] = !this.selected[id];
   console.log(this.selected);
   }
  selectit(id, event) {
      event.stopPropagation();
      this.selected[id] = !this.selected[id];
      console.log(this.selected);
      this.multicount();

  }
  selectToday() {
    this.modelPopup = {year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()};
  }
assign(caseid, agentid) {
 // alert(caseid+agentid);

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
      if (type == 'reload'){
        this.selectedtime = 'today';
        this.filterbydate(this.parserFormatter.format(this.fromDate), this.parserFormatter.format(this.toDate));     
      }
       // tslint:disable-next-line: align
       if (type == 'ws'){
        this.selectedtime = 'today';
        this.filterbydatews(this.parserFormatter.format(this.fromDate), this.parserFormatter.format(this.toDate));     
      }
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
      if (type == 'reload'){
        this.selectedtime = 'yesterday';
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
      if (type == 'reload'){
        this.selectedtime = 'last7';
        this.filterbydate(this.parserFormatter.format(this.fromDate), this.parserFormatter.format(this.toDate));     
      }
  } 
   last30(type){
      var date = new Date();
      this.fromDate = { day: date.getUTCDate(), month: date.getUTCMonth() , year: date.getUTCFullYear()};
      this.toDate = { day: date.getUTCDate(), month: date.getUTCMonth() + 1, year: date.getUTCFullYear()};
      if (type == 'reload'){
        this.selectedtime = 'last30';
        this.filterbydate(this.parserFormatter.format(this.fromDate), this.parserFormatter.format(this.toDate));     
      }
  }
   alldata(type){
    
    var date = new Date();
    this.fromDate = { day: date.getUTCDate(), month: date.getUTCMonth() , year: date.getUTCFullYear() - 3};
    this.toDate = { day: date.getUTCDate(), month: date.getUTCMonth() + 1, year: date.getUTCFullYear()};
    if (type == 'reload'){
        this.selectedtime = 'all';
        this.filterbydate(this.parserFormatter.format(this.fromDate), this.parserFormatter.format(this.toDate));     
        }
  }

  ngOnInit() {

    this.global.storage.get('userdata').then((data) => {
      this.global.userdata = data;
      console.log(data);
      this.leadoptions();
      this.today('reload');
    //  this.filterbydate('', '');

        });
    this.newselected = [];
    this.formInput = {
      firstname: '',
      lastname: '',
      agentid:  '',
      username:  '',
      team:  '',
      password:  '',
      confirmpassword:  ''
    };

    this.dtExportButtonOptions = {
     dom: 'Bfrtipl',
     // dom: '<"top"f>rt<"bottom"lp><"clear">',
      select: true,
      buttons: [
        'copy', 'csv', 'excel', 'pdf', 'print'
    ]
      // displayLength: 2,
    };
   // this.listleads();
   // this.filterbydate('', '');
    this.global.events.subscribe('lead:received', (data: any) => {
      //this.ngOnInit();
      this.today('ws');

  });
  }
  save(form: any) {
    if (!form.valid) {
      this.isSubmit = true;
      return;

    }
  }

golead(id) {
  this.router.navigateByUrl('/lead/' + id);
}


searchh(){
  let arr = [];
  for (var i = 0; i < this.data.agents.length; i++){
// console.log(this.data.agents[i]);
console.log('this');
console.log(this.searchstring);
if (this.data.agents[i].username.toUpperCase().indexOf(this.searchstring) > -1) {
  console.log('sjhs');
  console.log(arr.push(this.data.agents[i]));
  arr.push(this.data.agents[i]); 
    } 

    // if(this.data.agents[i].search(this.searchstring) > -1){
    //    arr.push(this.data.agents[i]); 
    // }

    
}
  this.data.agents = arr;
  console.log('jj');
}

search(){
  let arr = [];
  this.data.agents = this.data.agents.filter(item => {
    return item.title.toLowerCase().indexOf(this.searchstring.toLowerCase()) > -1;
  });
}
  listleads() {


    this.loading = true;

    // this.formdata = this.formInput;
    console.log(this.formdata);
    const token = localStorage.getItem('token');
    const headers = new Headers();
   

    const postData =  this.formdata;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: token
      })
    };
    this.global.http.post(this.global.server + 'leads/listleads.php', postData, httpOptions )
    .subscribe(data => {
      console.log(data);
      // tslint:disable-next-line: triple-equals
      if (data['status'] == 'success') {
        this.tabledata = data['data'].list;
        this.count = data['data'].count;
        this.loading = false;

      } else {
     //   alert();
     this.loading = false;

      }
     }, error => {
      console.log(error);
      // this.loading = false;

    });
   }
   stop(event) {
    event.stopPropagation();
   }
  filterbydate(from, to) {


    this.loading = true;
    // this.fromDate = { day: date.getUTCDate(), month: date.getUTCMonth() + 1, year: date.getUTCFullYear()};
    // this.toDate = { day: date.getUTCDate(), month: date.getUTCMonth() + 1, year: date.getUTCFullYear()};
    if (from && !to ){
  to = from;
    }
    // this.formdata = this.formInput;
    console.log(this.formdata);
    this.formdata.from = from;
    this.formdata.to = to;
    console.log(this.formdata);
    if (this.formdata.bysites) {
    if (this.formdata.bysites.length == 0 ) {
      this.formdata.bysites = undefined;

    }
  } 
    if (this.formdata.byagents) {
    if (this.formdata.byagents.length == 0 ) {
      this.formdata.byagents = undefined;

    }
  } 
    if (this.formdata.bystatus) {
    if (this.formdata.bystatus.length == 0 ) {
      this.formdata.bystatus = undefined;

    }
  }
   // tslint:disable-next-line: align
   if (this.formdata.byteam) {
    if (this.formdata.byteam.length == 0 ) {
      this.formdata.byteam = undefined;

    }
  }
    const token = localStorage.getItem('token');
    const headers = new Headers();
   

    const postData =  this.formdata;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: token
      })
    };
    // alert();
    var link = '' ;
    if (this.global.userdata.role == 'admin'){
     link = 'leadadmin'
    }
    if (this.global.userdata.role == 'superadmin'){
      link = 'sortlead'
    }
     // tslint:disable-next-line: align
     if (this.global.userdata.role == 'agent'){
      link = 'agentlead'

    }
   // this.global.userdata.role=='admin'
    this.global.http.post(this.global.server + 'leads/' + link + '.php', postData, httpOptions )
    .subscribe(data => {
      console.log(data);
      // tslint:disable-next-line: triple-equals
      if (data['status'] == 'success') {
        this.tabledata = data['data'].list;
        this.countdata = data['data'].count;
        this.selected = [];
        this.newselected = [];
        this.all = false;

       // this.count = data['data'].count;
        this.loading = false;

        setTimeout(() => {
          //  this.dtTrigger.next();

              }, 1000);
        
      } else {
     //   alert();
     this.loading = false;

      }
     }, error => {
      console.log(error);
      // this.loading = false;

    });
   }

   filterbydatews(from, to) {


    // this.fromDate = { day: date.getUTCDate(), month: date.getUTCMonth() + 1, year: date.getUTCFullYear()};
    // this.toDate = { day: date.getUTCDate(), month: date.getUTCMonth() + 1, year: date.getUTCFullYear()};
    if (from && !to ){
  to = from;
    }
    // this.formdata = this.formInput;
    console.log(this.formdata);
    this.formdata.from = from;
    this.formdata.to = to;
    console.log(this.formdata);
    if (this.formdata.bysites) {
    if (this.formdata.bysites.length == 0 ) {
      this.formdata.bysites = undefined;

    }
  } 
    if (this.formdata.byagents) {
    if (this.formdata.byagents.length == 0 ) {
      this.formdata.byagents = undefined;

    }
  } 
    if (this.formdata.bystatus) {
    if (this.formdata.bystatus.length == 0 ) {
      this.formdata.bystatus = undefined;

    }
  }
   // tslint:disable-next-line: align
   if (this.formdata.byteam) {
    if (this.formdata.byteam.length == 0 ) {
      this.formdata.byteam = undefined;

    }
  }
    const token = localStorage.getItem('token');
    const headers = new Headers();
   

    const postData =  this.formdata;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: token
      })
    };
    // alert();
    var link = '' ;
    if (this.global.userdata.role == 'admin'){
     link = 'leadadmin'
    }
    if (this.global.userdata.role == 'superadmin'){
      link = 'sortlead'
    }
     // tslint:disable-next-line: align
     if (this.global.userdata.role == 'agent'){
      link = 'agentlead'

    }
   // this.global.userdata.role=='admin'
    this.global.http.post(this.global.server + 'leads/' + link + '.php', postData, httpOptions )
    .subscribe(data => {
      console.log(data);
      // tslint:disable-next-line: triple-equals
      if (data['status'] == 'success') {
        this.tabledata = data['data'].list;
        this.countdata = data['data'].count;
       
     

       // this.count = data['data'].count;

        setTimeout(() => {
          //  this.dtTrigger.next();

              }, 1000);
        
      } else {
     //   alert();

      }
     }, error => {
      console.log(error);
      // this.loading = false;

    });
   }

   leadoptions() {


     this.optionsloaded = true;
    // this.formdata = this.formInput;
     console.log(this.formdata);
  
     const token = localStorage.getItem('token');
     const headers = new Headers();
   

     const postData =  this.formdata;
     const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: token
      })
    };
     var link = '' ;
     if (this.global.userdata.role == 'admin'){
     link = 'adminoption'
    }
     if (this.global.userdata.role == 'superadmin'){
      link = 'listoptions'
    }
     if (this.global.userdata.role == 'agent'){
      link = 'listoptions'
     }
     this.global.http.post(this.global.server + 'leads/' + link + '.php', postData, httpOptions )
    .subscribe(data => {
      console.log(data);
      // tslint:disable-next-line: triple-equals
      if (data['status'] == 'success') {
        this.data = data;
        let i;
        this.siteoptions.agents = [];
        this.siteoptions.site = [];
        this.siteoptions.status = [];
        this.siteoptions.team = [];
        console.log(data['data']);
        for (i = 0; i < data['agents'].length; i++) {
        this.siteoptions.agents.push({'label': data['agents'][i].username + '  ' + 'P(' + data['agents'][i].pending + ')'  + '      ' + 'A(' + data['agents'][i].attended + ')'   + '      ' + 'W(' + data['agents'][i].own + ')' , 'value': data['agents'][i].id});
        }
        for (i = 0; i < data['site'].length; i++) {
          this.siteoptions.site.push({'label': data['site'][i].name, 'value': data['site'][i].id});

        }
        for (i = 0; i < data['statuss'].length; i++) {
          this.siteoptions.status.push({'label': data['statuss'][i], 'value': data['statuss'][i]});

        }
        for (i = 0; i < data['team'].length; i++) {
          this.siteoptions.team.push({'label': data['team'][i].name, 'value': data['team'][i].id});

        }
        console.log(this.siteoptions.agents);
        // this.siteoptions.agents = data['data'].agents;
        // this.siteoptions.sites = data['data'].site;
        // this.siteoptions.status = data['data'].status;
       // this.count = data['data'].count;
        this.optionsloaded = false;

      } else {
     //   alert();

      }
     }, error => {
      console.log(error);
      // this.loading = false;

    });
   }

   multicount(){
    var i ;
    let newselected = [];
    for (i = 0; i < this.tabledata.length; i++) {
      console.log(this.selected[i]);
      if (this.selected[i] == true){
        console.log('hssgh');
        console.log(i);
        newselected.push(this.tabledata[i].id);
        // var result = this.tabledata.find(obj => {
        //   console.log(obj.id,'-',i);
        //   if(obj.id==i){

        //     newselected.push(i);
        //   }
        //   //return obj.id === i
        // });

        // console.log("result");
        // console.log(result);
       // newselected.push(this.tabledata[i].id);
       }
    }
    console.log(newselected);
    console.log(newselected.length);
    this.newselected = newselected;
  }
assignmultiple(id){
  console.log(this.selected);
  // var i ;
  // let newselected = [];
  // for (i = 0; i < this.tabledata.length; i++) {
  //   console.log(this.selected[i+1], i);
  //   if(this.selected[i+1] == true){
  //   newselected.push(this.tabledata[i].id);
  //   }
  // }
  this.multiassign( this.newselected, id);
  // console.log(newselected);
}
   addagent(form: any) {
      if (!form.valid) {
        this.isSubmit = true;

        return;
      }
      
      this.addloading = true; 
    // this.formdata = this.formInput;
      console.log(this.formdata);
      const token = localStorage.getItem('token');
      const headers = new Headers();

      const postData =  this.formInput;
      const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: token
      })
    };


      this.global.http.post(this.global.server + 'agent/addagent.php', postData, httpOptions )
    .subscribe(data => {
      console.log(data);
      // tslint:disable-next-line: triple-equals
      if (data['status'] == 'success') {
       this.modal.hide();
       // tslint:disable-next-line
       this.global.addToast({title:'Agent added successfully', msg:' ', timeout: 8000, theme:'default', position:'top-right', type:'success'});


      } else {
     //   alert();
            // tslint:disable-next-line
     this.addloading = false;
     this.global.addToast(
       {title: 'failed',
        msg: data['statusmessage'],
         timeout: 8000,
          theme: 'default',
          position: 'top-right',
           type: 'error'})
      }
     }, error => {
      console.log(error);
      // this.loading = false;

    });
   }

// trigger(){
//   this.global.events.subscribe('user:created', () => {
//     // user and time are the same arguments passed in `events.publish(user, time)`
// this.filterbydate('','');
//   });
// }

   assignlead(caseid, agentid) {
    this.addloading = true;
    this.formdata.id = caseid;
    this.formdata.agentid = agentid;
    console.log(this.formdata);
    const token = localStorage.getItem('token');
    const headers = new Headers();

    const postData =  this.formdata;
    const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: token
    })
  };


    this.global.http.post(this.global.server + 'leads/assign.php', postData, httpOptions )
  .subscribe(data => {
    console.log(data);
    // tslint:disable-next-line: triple-equals
    if (data['status'] == 'success') {
     this.assignmodal.hide();
     this.ngOnInit();
     // tslint:disable-next-line
     this.global.addToast({title:'Assigned successfully', msg:' ', timeout: 8000, theme:'default', position:'top-right', type:'success'})
     this.loading = false;
     this.addloading = false;

    } else {
   //   alert();
          // tslint:disable-next-line
   this.addloading = false;
   this.global.addToast(
     {title: 'failed',
      msg: data['statusmessage'],
       timeout: 8000,
        theme: 'default',
        position: 'top-right',
         type: 'error'})
    }
   }, error => {
    console.log(error);
    // this.loading = false;

  });
 }
  multiassign(caseid, agentid) {
    this.formdata.id = caseid;
    this.formdata.agentid = agentid;
    console.log(this.formdata);
    const token = localStorage.getItem('token');
    const headers = new Headers();

    const postData =  this.formdata;
    const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: token
    })
  };


    this.global.http.post(this.global.server + 'leads/multiassign.php', postData, httpOptions )
  .subscribe(data => {
    console.log(data);
    // tslint:disable-next-line: triple-equals
    if (data['status'] == 'success') {
     this.assignmodal.hide();
     this.ngOnInit();
     // tslint:disable-next-line
     this.global.addToast({title:'Assigned successfully', msg:' ', timeout: 8000, theme:'default', position:'top-right', type:'success'})

    } else {
   //   alert();
          // tslint:disable-next-line
   this.global.addToast(
     {title: 'failed',
      msg: data['statusmessage'],
       timeout: 8000,
        theme: 'default',
        position: 'top-right',
         type: 'error'})
    }
   }, error => {
    console.log(error);
    // this.loading = false;

  });
 }



 //// delete

 deleteconfirm() {
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
      this.delete();
    }
  });
}



 delete() {




  const token = localStorage.getItem('token');
  const headers = new Headers();
 
  const postData = JSON.stringify({
    id: this.newselected
   



  });

  
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: token
    })
  };


  this.global.http.post(this.global.server + 'leads/deletelead.php', postData, httpOptions )
  .subscribe(data => {
    console.log(data);
    // tslint:disable-next-line: triple-equals
    if (data['status'] == 'success') {
     
      this.global.addToast({title: 'Deleted successfully', msg: 'Agents details updated', timeout: 3000, theme: 'default', position: 'top-right', type: 'Danger'})
      this.ngOnInit();
 
     } else{
    //   alert();
           // tslint:disable-next-line
    this.addloading = false;
    this.global.addToast(
      {title: 'failed',
       msg: data['statusmessage'],
        timeout: 8000,
         theme: 'default',
         position: 'top-right',
          type: 'error'})
     }
    }, error => {
     console.log(error);
     // this.loading = false;
 
   });
  }

}
