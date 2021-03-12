import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../services/global.service';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import {  ViewChild, ElementRef } from '@angular/core';

export class FormInput {
  firstname: any;
  lastname: any;
  agentid: any;
  username: any;
  role: any;
  team: any;
  password: any;
  confirmpassword: any;
}

@Component({
  selector: 'app-agents',
  templateUrl: './agents.component.html',
  styleUrls: ['./agents.component.scss']
})
export class AgentsComponent implements OnInit {
  @ViewChild('modalProject', {static: false}) modal: any;

  dtExportButtonOptions: any = {};
  formInput: FormInput;
  countdata: any = {};
  form: any;
  teams: any = {};
  public isSubmit: boolean;
  formdata: any = {};
  loading = false;
  addloading = false;
  tabledata: any = {};
  count: any = {};
 public options: any = [
    {value: '0', label: 'Alabama'},
    {value: '1', label: 'Wyoming'},
    {value: '2', label: 'Coming'},
    {value: '3', label: 'Henry Die'},
    {value: '4', label: 'John Doe'}
  ];
  selectedOption = '3';
   data : any ={}; 
   siteoptions : any ={};
   optionsloaded =true;
  constructor(public global: GlobalService, public router: Router) {
    this.isSubmit = false;

  }

  ngOnInit() {
    this.formInput = {
      firstname: '',
      lastname: '',
      agentid:  '',
      username:  '',
      team:  '',
      role:  '',
      password:  '',
      confirmpassword:  ''
    };

    this.dtExportButtonOptions = {
      dom: 'Bfrtip',
    };
    this.getagents();
   // alert();
    this.leadoptions();
  }
  save(form: any) {
    if (!form.valid) {
      this.isSubmit = true;
      return;

    }
  }


  getagents() {


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


    this.global.http.post(this.global.server + 'agent/listagents.php', postData, httpOptions )
    .subscribe(data => {
      console.log(data);
      // tslint:disable-next-line: triple-equals
      if (data['status']== 'success') {
        this.tabledata = data['data'].list;
        this.count = data['data'].count;
        this.teams = data['data'].team;
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
   addagent(form: any) {
      if (!form.valid) {
        this.isSubmit = true;

        return;
      }
      
      this.addloading= true; 
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
      if (data['status']== 'success') {
       this.modal.hide();
       // tslint:disable-next-line
       this.global.addToast({title:'Agent added successfully', msg:' ', timeout: 8000, theme:'default', position:'top-right', type:'success'})

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
           type:'error'});
      }
     }, error => {
      console.log(error);
      //this.loading = false;

    });
   }

   leadoptions() {


    this.optionsloaded=true;
   // this.formdata = this.formInput;
    console.log('optionss');
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
    if(this.global.userdata.role=='admin'){
    link = 'adminoption'
   }
    if(this.global.userdata.role=='superadmin'){
     link = 'listoptions'
   }
    if(this.global.userdata.role=='agent'){
     link = 'listoptions'
    }
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

}
