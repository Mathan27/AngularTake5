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

import { GlobalService } from '../../services/global.service';

import { HttpHeaders } from '@angular/common/http';
import {  ViewChild, ElementRef } from '@angular/core'


export class FormInput {
  email: any;
  password: any;
  confirmPassword: any;
  requiredInput: any;
  url: any;
  phone: any;
  cmbGear: any;
  address: any;
  file: any;
  switcher: any;
}

@Component({
  selector: 'app-lead',
  templateUrl: './lead.component.html',
  styleUrls: ['./lead.component.scss']
})
export class LeadComponent implements OnInit {
reduceheight='0';
formInput: FormInput;
  form: any;
  id:any;
  loading:any;
  addloading:any;
  data: any = {};
  comments: any = {};
  addcomments: any = {};
  siteoptions : any ={};

  public isSubmit: boolean;
 public options: any = [
    {value: '0', label: 'Alabama'},
    {value: '1', label: 'Wyoming'},
    {value: '2', label: 'Coming'},
    {value: '3', label: 'Henry Die'},
    {value: '4', label: 'John Doe'}
  ];
  selectedOption = '3';
  formdata: any= {};
  selectedlead: any ={} ;

  constructor(public global: GlobalService,private route: ActivatedRoute,private router: Router,private lightbox: Lightbox, private lightboxEvent: LightboxEvent, private lighboxConfig: LightboxConfig) { 
    this.isSubmit = false;
    this.id = this.route.snapshot.paramMap.get('id');

  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getdetails();
    this.leadoptions();
    this.formInput = {
      email: '',
      password: '',
      confirmPassword: '',
      requiredInput: '',
      url: '',
      phone: '',
      cmbGear: '',
      address: '',
      file: '',
      switcher: ''
    };

 
  }
  getdetails() {


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


    this.global.http.post(this.global.server + 'leads/singlelead.php', postData, httpOptions )
    .subscribe(data => {
      console.log(data);
      // tslint:disable-next-line: triple-equals
      if (data['status']== 'success') {
        
        
        this.data = data['data'].data[0];
        this.selectedlead.assignedto =this.data.assignedto;
        this.selectedlead.id =this.data.id;
        this.comments = data['data'].comments;
        
        console.log(this.data);
        console.log(this.comments);
        this.loading = false;
   
        setTimeout(() => {
          this.reduceheight = '1';
          let div = document.getElementById('last');
          console.log('div');
          console.log(div);
          div.scrollIntoView();
         // div.scrollTop = div.scrollHeight - div.clientHeight;
          window.scrollTo(0,0);
         // alert();
        }, 300);
      } else{
     //   alert();
     this.loading = false;

      }
     }, error => {
      console.log(error);
      //this.loading = false;

    });
   } 
   addagent(comment) {
   
    console.log(comment);
    this.addloading= true; 
  // this.formdata = this.formInput;
    
    const token = localStorage.getItem('token');
    const headers = new Headers();
    this.addcomments.id=this.id;
    this.addcomments.comment=comment;
    const postData =  this.addcomments;
    const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: token
    })
  };

 
    this.global.http.post(this.global.server + 'leads/addcomment.php', postData, httpOptions )
  .subscribe(data => {
    console.log(data);
    // tslint:disable-next-line: triple-equals
    if (data['status']== 'success') {
      this.ngOnInit();
      this.addcomments.comment='';
     // tslint:disable-next-line
     this.global.addToast({title:'Added successfully', msg:'Comment Added Successfully', timeout: 3000, theme:'default', position:'top-right', type:'success'})
    
     this.loading = false;
     this.addloading = false;

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
  save(form: any) {
    if (!form.valid) {
      this.isSubmit = true;
      return;
    }
  }

  leadoptions() {



    this.formdata = this.formInput;
   // console.log(this.formdata);
  
    const token = localStorage.getItem('token');
    const headers = new Headers();
   

    const postData =  {};
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: token
      })
    };
    this.global.http.post(this.global.server + 'leads/listoptions.php', postData, httpOptions )
    .subscribe(data => {
      console.log(data);
      // tslint:disable-next-line: triple-equals
      if (data['status']== 'success') {
let i;
this.siteoptions.agents=[];
this.siteoptions.site=[];
this.siteoptions.status=[];
this.siteoptions.banner=[];
console.log(data['data']);
for (i = 0; i < data['agents'].length; i++) {
        this.siteoptions.agents.push({'label': data['agents'][i].username + '  ' + 'P('+data['agents'][i].pending+')'  + '      ' + 'A('+data['agents'][i].attended+')'   + '      ' + 'W('+data['agents'][i].own+')' , 'value':data['agents'][i].id});
        }
for (i = 0; i < data['site'].length; i++) {
          this.siteoptions.site.push({'label': data['site'][i], 'value':data['site'][i]});

        }
for (i = 0; i < data['statuss'].length; i++) {
  if(data['statuss'][i]!='Won')
          this.siteoptions.status.push({'label': data['statuss'][i], 'value':data['statuss'][i]});
  

        }
        for (i = 0; i < data['banner'].length; i++) {
          this.siteoptions.banner.push({'label': data['banner'][i].name, 'value':data['banner'][i].id});

        }
console.log(this.siteoptions.agents);
        // this.siteoptions.agents = data['data'].agents;
        // this.siteoptions.sites = data['data'].site;
        // this.siteoptions.status = data['data'].status;
       // this.count = data['data'].count;

      } else{
     //   alert();

      }
     }, error => {
      console.log(error);
      //this.loading = false;

    });
   }

   assignlead(caseid,agentid) {
    this.addloading = true;
    console.log(caseid);
    console.log(agentid);
    this.formdata={};
    console.log(this.formdata);
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
    if (data['status']== 'success') {
     this.ngOnInit();
     // tslint:disable-next-line
     this.global.addToast({title:'Assigned successfully', msg:' ', timeout: 8000, theme:'default', position:'top-right', type:'success'})
     this.loading = false;
     this.addloading = false;

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
 complete(banner) {
  this.addloading = true;

  this.formdata={};
  console.log(this.formdata);
  this.formdata.id = this.id;
  this.formdata.banner = banner;
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


  this.global.http.post(this.global.server + 'leads/won.php', postData, httpOptions )
.subscribe(data => {
  console.log(data);
  // tslint:disable-next-line: triple-equals
  if (data['status']== 'success') {
   this.ngOnInit();
   // tslint:disable-next-line
   this.global.addToast({title:'Marked As Won', msg:' ', timeout: 8000, theme:'default', position:'top-right', type:'success'})
   this.loading = false;
   this.addloading = false;

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

   update(form: any) {

    if (!form.valid) {
      this.isSubmit = true;

      return;
    }



    this.addloading = true;

    console.log(this.formdata);
    const token = localStorage.getItem('token');
    const headers = new Headers();

    const postData =  this.data;
    const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: token
    })
  };


    this.global.http.post(this.global.server + 'leads/updatelead.php', postData, httpOptions )
  .subscribe(data => {
    console.log(data);
    // tslint:disable-next-line: triple-equals
    if (data['status']== 'success') {
     this.ngOnInit();
     // tslint:disable-next-line
     this.global.addToast({title:'Updated successfully', msg:' ', timeout: 8000, theme:'default', position:'top-right', type:'success'})
     this.addloading = false;

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
 updatestatus() {

   
   



    this.addloading = true;

    console.log(this.formdata);
    const token = localStorage.getItem('token');
    const headers = new Headers();

    const postData =  this.data;
    const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: token
    })
  };


    this.global.http.post(this.global.server + 'leads/updatelead.php', postData, httpOptions )
  .subscribe(data => {
    console.log(data);
    // tslint:disable-next-line: triple-equals
    if (data['status']== 'success') {
     this.ngOnInit();
     // tslint:disable-next-line
     this.global.addToast({title:'Updated successfully', msg:' ', timeout: 8000, theme:'default', position:'top-right', type:'success'})
     this.addloading = false;

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

}
