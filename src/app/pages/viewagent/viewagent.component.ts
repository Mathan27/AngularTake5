import { Component, OnInit } from '@angular/core';
import {IAlbum, IEvent, Lightbox, LIGHTBOX_EVENT, LightboxConfig, LightboxEvent} from 'ngx-lightbox';
import {Subscription} from 'rxjs';
import Swal from 'sweetalert2';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {
  Router,
  ActivatedRoute,
  ParamMap
} from '@angular/router';
import {NgbCalendar, NgbDateParserFormatter, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

import { GlobalService } from '../../services/global.service';

import { HttpHeaders } from '@angular/common/http';
import {  ViewChild, ElementRef } from '@angular/core'

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
  selector: 'app-viewagent',
  templateUrl: './viewagent.component.html',
  styleUrls: ['./viewagent.component.scss']
})
export class ViewagentComponent implements OnInit {
  @ViewChild('modalProject', {static: false}) modal: any;
  id:any;
  addloading:any;
  loading = false;
  tabledata: any = {};
  team: any = {};
  formdata: any = {};
  profile: any = {};

  count: any = {};
  public activeTab: string;

  public editProfile: boolean;
  public editProfileIcon: string;

  public editContact: boolean;
  public editContactIcon: string;

  public editOtherInfo: boolean;
  public editOtherInfoIcon: string;
  
  public albums: Array<IAlbum>;
  private subscription: Subscription;
  collapse :any ={};
  public model: any;
  modelCustomDay: any;
  filter: any;
  displayMonths = 2;
  navigation = 'select';
  showWeekNumbers = false;
  selectedtime: string;
  optionsloaded: boolean;

  hoveredDate: NgbDateStruct;
  fromDate: NgbDateStruct;
  toDate: NgbDateStruct;
  siteoptions : any = {};
  data : any = {};

  constructor(public parserFormatter: NgbDateParserFormatter, public calendar: NgbCalendar,public global: GlobalService,private route: ActivatedRoute,private router: Router,private lightbox: Lightbox, private lightboxEvent: LightboxEvent, private lighboxConfig: LightboxConfig) {

    this.activeTab = 'home';

    this.editProfile = false;
    this.editProfileIcon = 'icon-edit';

    this.editContact = false;
    this.editContactIcon = 'icon-edit';

    this.editOtherInfo = false;
    this.editOtherInfoIcon = 'icon-edit';

    this.albums = [];
    for (let i = 1; i <= 6; i++) {
      const album = {
        src: 'assets/images/light-box/l' + i + '.jpg',
        caption: 'Image ' + i + ' caption here',
        thumb: 'assets/images/light-box/sl' + i + '.jpg'
      };

      this.albums.push(album);
    }
    lighboxConfig.fadeDuration = 1;
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
      this.fromDate = { day: date.getUTCDate()-1, month: date.getUTCMonth() + 1, year: date.getUTCFullYear()};
      this.toDate = { day: date.getUTCDate()-1, month: date.getUTCMonth() + 1, year: date.getUTCFullYear()};
      if(type=='reload'){
        this.selectedtime='yesterday';
        this.filterbydate(this.parserFormatter.format(this.fromDate), this.parserFormatter.format(this.toDate));     
      }
  } 
   last7(type){
      var date = new Date();
      this.fromDate = { day: date.getUTCDate()-7, month: date.getUTCMonth() + 1, year: date.getUTCFullYear()};
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


  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.formdata.id=this.id;
    this.today('reload');
    this.leadoptions();
  }
  leadoptions() {


    this.optionsloaded=true;
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
    var link ='' ;
  
     link = 'listoptions'
    
    this.global.http.post(this.global.server + 'leads/listoptions.php', postData, httpOptions )
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
       this.optionsloaded=false;

     } else {
    //   alert();

     }
    }, error => {
     console.log(error);
     //this.loading = false;

   });
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
    this.formdata.id = this.id;
    console.log(this.formdata);


    this.loading = true;


    const token = localStorage.getItem('token');
    const headers = new Headers();
   
    const postData = this.formdata;
    
    
    // const postData = JSON.stringify({
    //   id: this.id
     
 


    // });
    
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: token
      })
    };


    this.global.http.post(this.global.server + 'agent/singleagent.php', postData, httpOptions )
    .subscribe(data => {
      console.log(data);
      // tslint:disable-next-line: triple-equals
      if (data['status']== 'success') {
        this.tabledata = data['data'].leads;
        console.log(this.tabledata);
        this.profile = data['data'].data[0];
        this.formdata = data['data'].data[0];
        this.count = data['data'].count;
        this.team = data['data'].team;
        this.formdata.password=null;
        this.loading = false;

      } else{
     //   alert();
     this.loading = false;

      }
     }, error => {
      console.log(error);
      //this.loading = false;

    });
   } 
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


    this.loading = true;


    const token = localStorage.getItem('token');
    const headers = new Headers();
   
    const postData = JSON.stringify({
      id: this.id
     
 


    });

    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: token
      })
    };


    this.global.http.post(this.global.server + 'agent/deleteagent.php', postData, httpOptions )
    .subscribe(data => {
      console.log(data);
      // tslint:disable-next-line: triple-equals
      if (data['status']== 'success') {
       
        this.global.addToast({title:'Deleted successfully', msg:'Agents details updated', timeout: 3000, theme:'default', position:'top-right', type:'Danger'})
        this.editProfile=null;
        this.loading = false;
        this.addloading = false;
        this.router.navigate(['/agents']);
   
       } else{
      //   alert();
             // tslint:disable-next-line
      this.addloading = false;
      this.global.addToast(
        {title:'failed',
         msg:data['statusmessage'],
          timeout: 8000,
           theme:'default',
           position:'top-right',
            type:'error'})
       }
      }, error => {
       console.log(error);
       //this.loading = false;
   
     });
    }

   addagent() {
   
    
    this.addloading= true; 
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

 
    this.global.http.post(this.global.server + 'agent/updateagent.php', postData, httpOptions )
  .subscribe(data => {
    console.log(data);
    // tslint:disable-next-line: triple-equals
    if (data['status']== 'success') {
     
     // tslint:disable-next-line
     this.global.addToast({title:'Updated successfully', msg:'Agents details updated', timeout: 3000, theme:'default', position:'top-right', type:'success'})
     this.editProfile=false;
     this.loading = false;
     this.addloading = false;
     this.ngOnInit();

    } else{
   //   alert();
          // tslint:disable-next-line
   this.addloading = false;
   this.global.addToast(
     {title:'failed',
      msg:data['statusmessage'],
       timeout: 8000,
        theme:'default',
        position:'top-right',
         type:'error'})
    }
   }, error => {
    console.log(error);
    //this.loading = false;

  });
 }
  

  open(index: number): void {
    this.subscription = this.lightboxEvent.lightboxEvent$.subscribe((event: IEvent) => this._onReceivedEvent(event));
    this.lightbox.open(this.albums, index, { wrapAround: true, showImageNumberLabel: true });
  }

  private _onReceivedEvent(event: IEvent): void {
    if (event.id === LIGHTBOX_EVENT.CLOSE) {
      this.subscription.unsubscribe();
    }
  }

}
