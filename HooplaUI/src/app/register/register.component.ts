import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from 'src/app/login/register.service';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Profile, User, Credentials } from 'src/app/login/user';
import {CaptchaModule} from 'primeng/captcha';
import {GrowlModule} from 'primeng/growl';
import {KeyFilterModule} from 'primeng/keyfilter';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {Message} from 'primeng/components/common/api';
import {MessageService} from 'primeng/components/common/messageservice';
import {CalendarModule} from 'primeng/calendar';
import {PasswordModule} from 'primeng/password';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [MessageService]
})
export class RegisterComponent implements OnInit {

  errorMessage: string;
  successMessage: string;
  registerForm: FormGroup;
  bool: boolean = false;
  msgs:Message[] = [];
  msg: Message[] = [];
  constructor( private messageService: MessageService,
    private fb: FormBuilder, 
    private registerService: RegisterService, private router: Router ) { }
 
  ngOnInit() {
    this.registerForm = this.fb.group({
      emailId: ['',[Validators.required,Validators.email]],
      password: ['',[Validators.required,this.ValidatePassword]],
      name: ['',[Validators.required,this.ValidateName]],
      date: ['',[Validators.required,this.ValidateDate]],
      phone: ['',[Validators.required,this.ValidatePhone]]
    })
  }

  ValidateName(control:FormControl){
    let regex = /^[a-zA-Z]+[a-zA-Z\s]*([a-zA-Z])+$/
    return regex.test(control.value) ? null : {
    nameError: {
      message: "Enter a valid name"
    }
  }
}

  ValidatePhone(phone:FormControl){
    let regex = /^[1-9]\d{9}$/
    return regex.test(phone.value) ? null : {
      phoneError: {
        message: "Enter a valid phone number"
      }
    } 
  }

  ValidatePassword(password:FormControl){
    let regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{7,20}$/
    return regex.test(password.value) ? null : {
      passwordError : {
        message : "Enter a valid password"
      }
    }
  }

  ValidateDate(date:FormControl){
    let enteredDate = new Date(date.value).setHours(0,0,0,0);
    let todaysDate = new Date().setHours(0,0,0,0);
    return (enteredDate < todaysDate) ? null : {
      dateError : {
        message : "Enter a date earlier than today"
      }
    }
  }

  register(){
    this.errorMessage = null;
    this.successMessage = null;
    let newUser:User = new User();
    newUser.uCredentials.uEmail = this.registerForm.controls.emailId.value;
    newUser.uCredentials.uPass = this.registerForm.controls.password.value;
    newUser.uProfile.uName = this.registerForm.controls.name.value;
    // newUser.uProfile.uDateJoined = this.registerForm.controls.date.value;
    newUser.uProfile.uPhone = this.registerForm.controls.phone.value;
    newUser.uProfile.uIsSeller = false;
    newUser.uProfile.uDOB=this.registerForm.controls.date.value
    newUser.uProfile.uLastLogin = new Date(new Date().getUTCDate());
    
    this.registerService.registerUser(newUser).subscribe(
      (response) => {
        console.log(response);
        this.successMessage = response.message;
        this.showViaService();
        if(this.successMessage){
        let user:Credentials=new Credentials();
      user.uPass=this.registerForm.value.password;
      user.uEmail=this.registerForm.value.emailId;
      this.registerService.login(user).subscribe(
      (response) => {
        this.successMessage = response.message;
        sessionStorage.setItem("uEmail", response.uCredentials.uEmail);
        sessionStorage.setItem("uRole", response.uProfile.uIsSeller.toString());
        sessionStorage.setItem("uCart", JSON.stringify(response.uCart));
        this.router.navigate(['/']); 
      },
      (errorResponse) => {
        this.errorMessage = errorResponse.error.message;
        this.showError();
        sessionStorage.clear();
      }
    );
        }
      },
      (errorResponse) => {
        this.errorMessage = errorResponse.error.message;
        this.showError();
        sessionStorage.clear();
      }
    )
  }

  public details;
  public len:number;

  find(){
    this.errorMessage = null;
    console.log(this.registerForm.get('emailId').value);
    if((this.registerForm.get('emailId').value).length>0){
      this.registerService.getUserDetail(this.registerForm.get('emailId').value).subscribe(
        
        (data) => {
          this.details = data.message,
          console.log(this.details)
          this.len = this.details.length
        }
      )
    }
  }

  showError() {
    this.msgs = [];
    this.msgs.push({severity:'error', summary:'Error Message', detail:'Validation failed'});
}
  
  showViaService() {
    this.bool=true;
    this.messageService.add({severity:'success', summary:'', detail:'Registered successfully'});
}

    
    showResponse(event) {
        this.msgs = [];
        this.msgs.push({severity:'info', summary:'Succees', detail: 'User Responded'});
    }
}