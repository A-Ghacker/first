import { MemberService } from './../member.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Member } from '../Models/Member';

@Component({
  selector: 'app-member-form',
  templateUrl: './member-form.component.html',
  styleUrls: ['./member-form.component.css']
})
export class MemberFormComponent implements OnInit{

  form !:FormGroup;
  constructor(private MS:MemberService,private router:Router,private activatedRoute:ActivatedRoute){// Injection de dependance : le faite de crree une Instance priver une instance pour pouvoir l'utiliser les fonction 

  }
  initForm():void{
    this.form = new FormGroup({
      cin : new FormControl(null,[Validators.required]),
      name : new FormControl(null,[Validators.required]),
      cv : new FormControl(null,[Validators.required]),
      type : new FormControl(null,[Validators.required])
    });
  }
  currentItemId!:string;
  memberrecuperer:any;
  ngOnInit():void{
    // 1 recupere id a partire de la route active *
    this.currentItemId = this.activatedRoute.snapshot.params['id'];
    if(!!this.currentItemId){
      //2 tester sir id, si ID exist=>je suis dans edit 
      this.MS.getMemberById(this.currentItemId)
      .then((x) => {
        this.memberrecuperer = x;
        this.initForm2(x);
        console.log(this.memberrecuperer);
      });
      
    }
    // {getMemberById(id)=> Membrerecuperer
  //this.initForm()(memberRecupere)
    //this.initForm();  
  }
  initForm2(m:any):void{
      this.form = new FormGroup({
        cin : new FormControl(m?.cin,[Validators.required]),
        name : new FormControl(m?.name,[Validators.required]),
        cv : new FormControl(m?.cv,[Validators.required]),
        type : new FormControl(m?.type,[Validators.required])
      });
  }
  onSubmit():void{
    // 
      const memberToSave = {...this.memberrecuperer,...this.form.value};

      this.MS.SaveMember(memberToSave).then(()=>{this.router.navigate(['/members'])}); // if saveMember() is Promise , when I call it I should use .then((return type of promis)=>{action}) 
      console.log(this.form.value);

  }
}
