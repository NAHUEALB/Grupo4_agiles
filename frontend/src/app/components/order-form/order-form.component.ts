import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'orderform',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent implements OnInit {
  user:User;
  medicos:any=[];

  order:Order = {
    id: 0,
    data: '',
    estado: '',
    user_id:0,
    tipo: '',
  }
  constructor(private http: HttpClient, private router:Router, private activedRoute:ActivatedRoute, private userService:UserService) { }

  ngOnInit() {
    this.getMedicos();
  }

  selectedFile: File = null;
  onFileSelected(event){
    this.selectedFile = <File>event.target.files[0];
    }

  onUpload(){
    const fd = new FormData();
    fd.append('image', this.selectedFile, this.selectedFile.name);
    fd.append('tipo', this.order.tipo)
    this.user = JSON.parse(localStorage.getItem("user"));
    fd.append('user_id', (this.user.id).toString());
    this.http.post('http://localhost:5000/api/order', fd).subscribe (res =>{
      alert("Orden agregada correctamente");
      this.router.navigate(["/verorden"]);
    },
      err => console.error(err)
    );
  }

  getMedicos(){
    this.userService.getMedicos().subscribe(res => {
      this.medicos = res
    },
    err => console.error(err)
    )
  }
}

