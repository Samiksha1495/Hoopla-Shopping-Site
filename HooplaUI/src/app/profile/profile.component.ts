import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/login/user';
import { RegisterService } from 'src/app/login/register.service';
import {InputTextModule} from 'primeng/inputtext';
import {Message} from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers:[MessageService]
})
export class ProfileComponent implements OnInit {
  loggedUser:User
  userdetails:any
  property:string
  count:Number
  constructor(private messageService: MessageService,private registerserv:RegisterService) { }

  ngOnInit() {
    this.ngDoCheck()
  if( this.loggedUser.uCredentials.uEmail!=null){
    this.registerserv.getUserDetail(this.loggedUser.uCredentials.uEmail).subscribe(
      data=>{this.userdetails=data; console.log(data)}
      
    )
    
  }
  }
  ngDoCheck(): void { 
    this.loggedUser = new User();
   
    this.loggedUser.uCredentials.uEmail = sessionStorage.getItem('uEmail');
    this.loggedUser.uCart = JSON.parse(sessionStorage.getItem('uCart'));
  }
  text: string;

  disabled: boolean = true;

  toggleDisabled() {
      this.disabled = !this.disabled;
  }
  showViaService() {
    this.messageService.add({severity:'success', summary:'Your Details', detail:'Verified!!'});
  }
}
