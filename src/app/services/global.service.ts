import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Storage } from '@ionic/storage';
import {ToastData, ToastOptions, ToastyService} from 'ng2-toasty';
import {EventsService } from './events.service';
@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  position = 'bottom-right';
  title: string;
  msg: string;
  showClose = true;
  theme = 'bootstrap';
  type = 'default';
  closeOther = false;

  userdata: any = {};
  server: any = 'http://backend.onstep.in/wowapi/wow/';
  server2: any= 'https://backend.onstep.in/take5app1/admin/';
  constructor(public events: EventsService,private toastyService: ToastyService, public http: HttpClient, public storage: Storage) {
  // this.userdata.role = 'admin';


   this.storage.get('userdata').then((data) => {
console.log(data);
// this.socket(data.id);
  });

}
  socket(id){
    var ws = new WebSocket('wss://onlinespeedyloan.com/ws/?user=' + id);
    ws.onmessage = (evt) => { 
          //  alert(evt.data);
            var audio = new Audio('/assets/tru.mp3');
            audio.play();
            let mydata = JSON.parse(evt.data);
            this.addToast(
             {title:mydata.message.message,
               timeout: 8000,
                theme:'default',
                position:'bottom-right',
                 type:'success'});
            this.events.publish('lead:received', {
                  user: '',
                  time: ''
              });
 
            };
 
    ws.onopen = function (event) { ws.send('test'); }
  }
  addToast(options) {
    console.log('ss');
    if (options.closeOther) {
      this.toastyService.clearAll();
    }
    this.position = options.position ? options.position : this.position;
    const toastOptions: ToastOptions = {
      title: options.title,
      msg: options.msg,
      showClose: options.showClose,
      timeout: options.timeout,
      theme: options.theme,
      onAdd: (toast: ToastData) => {
        /* added */
      },
      onRemove: (toast: ToastData) => {
        /* removed */
      }
    };

    switch (options.type) {
      case 'default': this.toastyService.default(toastOptions); break;
      case 'info': this.toastyService.info(toastOptions); break;
      case 'success': this.toastyService.success(toastOptions); break;
      case 'wait': this.toastyService.wait(toastOptions); break;
      case 'error': this.toastyService.error(toastOptions); break;
      case 'warning': this.toastyService.warning(toastOptions); break;
    }
  }
}
