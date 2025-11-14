import { Component, signal } from '@angular/core';
import { ReviewDTO } from '../../models/review-dto';
import { TokenService } from '../../services/token-service';



@Component({
  selector: 'app-comments',
  imports: [],
  templateUrl: './comments.html',
  styleUrl: './comments.css',
})
export class Comments {

  isHost : boolean = false;
  

  rewiews = signal<any[]>([]);

  reviews: ReviewDTO | undefined;

  constructor(private tokenService:TokenService){

  }

  public comment(){
  }


  ngOnInit(): void  {
    
    const rol = this.tokenService.getRole();

    if(rol === 'HOST'){
      this.isHost= true;
    }


  }

  public reply(){

  }

  public discount(){

  }
  

}
