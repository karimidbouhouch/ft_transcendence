import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { io } from 'socket.io-client';


@Injectable({
  providedIn: 'root'
})
export class StatusService {

  public current_status = new BehaviorSubject<any>([]);
  socket : any;
  constructor() { 
    this.socket = io('http://localhost:3000/current_status',   {
      withCredentials: true, 
    },  )
    this.socket.on("status", (data : any) => {
      this.current_status.next(data);
    });
  }

   
  online()
  {
    this.socket.emit('Online', (...args: any[]) => {console.log(args);});
  }
  inGame()
  {
    this.socket.emit('InGame', (...args: any[]) => {console.log(args);}) 
  }

  Offline()
  {
    this.socket.emit('Disconnect', (...args: any[]) => {console.log(args); console.log(args);}) 
  }
  getState()
  {

  }
  // socket = io('ws://localhost:3000/current_status')

}
