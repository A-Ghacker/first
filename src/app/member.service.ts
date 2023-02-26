import { Injectable } from '@angular/core';
import { Member } from './Models/Member';
import { GLOBALE } from './appconfig';
import { HttpClient } from '@angular/common/http';

@Injectable({ // le service accept d'etre inecter 
  providedIn: 'root' 
})
export class MemberService {
  tab:Member[] = GLOBALE._DB.members;
  constructor(private httpClient:HttpClient) {
    
  }
  //Promise : pour ouvrir un listener 
  SaveMember(memberToSave:any):Promise<void>{
    //envoyer une requette HTTP en mode POST vers backend 
    
    const newMember = {
      ...memberToSave,
      id : memberToSave.id ?? (this.tab.length+1).toString(),
      createDate : memberToSave.CreatedDate?? new Date().toISOString()
    }
    this.tab = [newMember,...this.tab.filter(item=>item.id!=newMember.id)];
    //return this.httpClient.post<void>('link',memberToSave).toPromise();
    return new Promise(resolve=> resolve()); //resolve(p) p => should be the same type as the return type of Promise in line 15 Promise<void> resolve(empty) 
    // Promise<Member> resolve(newMember) 
  }
  deleteById(id:any):Promise<void>{
    this.tab.forEach((element ,index ) => {
      if(element.id==id) {
        console.log(element.id);
        this.tab= this.tab.splice(index);
      }
    });
    return new Promise(resolve=> resolve());
  }
  memberToEdit!:Member;
  
  EditUser(id:string):Promise<Member>{
     this.tab.forEach(element =>{
      if(element.id == id) this.memberToEdit = element;
    });
    console.log(this.memberToEdit);
    return new Promise(resolve=> resolve(this.memberToEdit));
  }
  memberById!:Member;

  getMemberById(id:string):Promise<Member>{
    console.log(id);
      //return this.httpClient.get<Member>('link').toPromise();
      //this.tab.find(item => item.id == id);
      return new Promise<Member>(resolve=>resolve(this.tab.filter(item=>item.id==id)[0]?? null));
  }
}
