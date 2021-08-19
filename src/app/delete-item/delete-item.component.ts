import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-delete-item',
  templateUrl: './delete-item.component.html',
  styleUrls: ['./delete-item.component.css']
})
export class DeleteItemComponent implements OnInit {

  items:any;

  deleteItem(event:any) {
    event.preventDefault();
    let itemName = (<HTMLInputElement>document.getElementById('item')).value;


    let itemID:any;

    for(let item of this.items) {
      if(item.itemName == itemName) {
        itemID = item.id;
        break;
      }
    }

    this.http.delete('http://localhost:62044/api/Items/' + itemID).subscribe(data => window.location.href = "http://localhost:4200/");


  }

  constructor(private http: HttpClient) {
    
  }

  ngOnInit(): void {
    this.http.get('http://localhost:62044/api/Items').subscribe((data:any) => this.items = data)
  }

}
