import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/admin/admin.service';
import {ChartModule} from 'primeng/chart';

// var removeDuplicates = require('removeDuplicates');
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  obj:any={}
  tableArr:any[]=[]
  adminArr:any[];
  aArr:any[];
  total:number;
  email:string;
  dbdate:Date;
  data: any;
  bool1:boolean=false;;
  constructor( public adminService: AdminService ) { }

  ngOnInit() {
  }

  check(from,to){
    this.aArr=[]
    this.adminService.getAdminData(from,to)
    .subscribe(
      data => {
        this.adminArr=data;
        console.log(this.adminArr);
        for (let i=0;i<this.adminArr.length;i++){
          let dbDate = new Date(this.adminArr[i].date);
          let fDate = new Date(from);
          let tDate = new Date(to);
          dbDate.setHours(0,0,0,0);
          fDate.setHours(0,0,0,0);
          tDate.setHours(0,0,0,0)
          if( dbDate>=fDate  && dbDate<=tDate){
            this.aArr.push(this.adminArr[i]);
            console.log(this.aArr);
          }
          else{
            console.log("admin data not found")
          }
        }
        
          for(let j=0;j<this.aArr.length;j++){
            this.total=0
              for(let k=0;k<this.aArr.length;k++){

                if(this.aArr[j].email == this.aArr[k].email){
                  this.total += this.aArr[k].amount;
                  this.email = this.aArr[j].email;
                  this.dbdate = this.aArr[j].date;
                  
              }
            }
            this.obj.total=this.total;
            this.obj.email=this.aArr[j].email;
            this.obj.dbdate = this.aArr[j].date;
            this.tableArr.push(this.obj);
            this.obj={}

          }
          // this.tableArr = Object.values(this.tableArr.reduce((acc,cur)=>Object.assign(acc,{[cur.email]:cur}),{}));
          
          // this.tableArr = this.tableArr.sort(function(a,b){
          //   return b.total-a.total;
          // })
          
          this.tableArr=this.cleanup(this.tableArr, 'email');
  })

  }
cleanup(arr, prop) {
    var new_arr = [];
    var lookup  = {};
 
    for (var i in arr) {
        lookup[arr[i][prop]] = arr[i];
    }
 
    for (i in lookup) {
        new_arr.push(lookup[i]);
    }
    this.tableArr=[]
    return new_arr;
}
 


generate(){
  this.bool1=true;
this.data = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'My First dataset',
                    backgroundColor: '#42A5F5',
                    borderColor: '#1E88E5',
                    data: [65, 59, 80, 81, 56, 55, 40]
                },
                {
                    label: 'My Second dataset',
                    backgroundColor: '#9CCC65',
                    borderColor: '#7CB342',
                    data: [28, 48, 40, 19, 86, 27, 90]
                }
            ]
        }
    }
  }

