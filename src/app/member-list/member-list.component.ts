import { ConfirmDialogComponent } from './../confirm-dialog/confirm-dialog.component';
import { Router } from '@angular/router';
import { MemberService } from './../member.service';
import { GLOBALE } from './../appconfig';
import { Component } from '@angular/core';
import { Member } from '../Models/Member';
import { DialogRef } from '@angular/cdk/dialog';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent {
  searchTerm = "";
    constructor(private ms:MemberService,private router:Router,private dialog:MatDialog){

    }
    id:any;
    //dataSource :Member[] = this.ms.tab;
  // using global variable in appconfig.ts inside app Folder 
  dataSource = new MatTableDataSource(this.ms.tab);
  displayedColumns: string[] = ['id', 'cin', 'name', 'createDate', 'cv', 'type','icon'];
   onDelete(id:any):void{
    const dialogRef = this.dialog.open(ConfirmDialogComponent,{
      
    });
    dialogRef.afterClosed().pipe().subscribe((x)=>{if(x) {this.ms.deleteById(id).then(()=>{this.dataSource.data=this.ms.tab});}});
     // if saveMember() is Promise , when I call it I should use .then((return type of promis)=>{action}) 
  }
  onEdit(id:string):void{
      this.ms.EditUser(id).then((x)=>{this.router.navigate(['/create'])});
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
