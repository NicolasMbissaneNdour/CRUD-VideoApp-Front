import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { User } from 'src/app/models/user';
import { Video } from 'src/app/models/video';
import { AuthService } from '../auth/auth-service.service';
import { Response as ServerResponse } from 'src/app/models/response';


@Injectable({
  providedIn: 'root'
})
export class VideoService {
  videos: Video[];
  videosSubject: Subject<Video[]>;

  user: User;
  userSubscription: Subscription;

  constructor(private http: HttpClient,private authService: AuthService) {
    this.videos = [];
    this.videosSubject = new Subject<any[]>();
    this.user = new User('','');
    this.getAll();
    this.userSubscription = this.authService.userSubject.subscribe(
      (observer) => {
        this.user = observer;
      }
    );
    this.authService.emmitUserSubject();
  }

  emmitVideosSubject() {
    this.videosSubject.next(this.videos.slice());
  }

  public async create(data: any): Promise<ServerResponse> {
    try {
      const formData = new FormData();
      formData.append('title',data.title);
      formData.append('video',data.video);
      console.log(data);
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${this.user.token}`
      })
      const result = await <any>this.http.post('http://localhost:3000/videos',formData,{headers:headers}).toPromise();
      console.log(result);
      if (result.status == 'OK') {
        return new ServerResponse(true,'Vidéo ajouté');
      }
      return new ServerResponse(false,result.message);
    } catch (error) {
      console.log(error);
      return new ServerResponse(false,'Erreur interne réesayez ultérieurement');
    }
  }
  public async getAll() {
    try {
      const result = await <any>this.http.get('http://localhost:3000/videos').toPromise();
      if (result.status == 'OK') {
        this.videos = <Video[]>result.videos;
        console.log(this.videos);
        this.emmitVideosSubject();
      }
    } catch (error) {
      
    }
  }

  public async delete(id:String): Promise<ServerResponse> {
    try {
      if (!this.user.token) {
        return new ServerResponse(false,"Vous n'estes pas connecté");
      }
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${this.user.token}`
      });

      const result = await <any>this.http.delete('http://localhost:3000/videos/'+id,{headers:headers}).toPromise();
      console.log(result);
      const success = result.status == 'OK' ? true : false;
      return new ServerResponse(success,result.message);
    } catch (error) {
      console.log("Erreur interne réessayez plus tard");
      return new ServerResponse(false,'Erreur interne réessayez plus tard')
    }
  }

  public async get(id:String): Promise<any> {
    try {
      const result = await <any>this.http.get('http://localhost:3000/videos/'+id).toPromise();
      if (result.status == 'OK') {
        const video = <Video>result.video;
        return {status: 'OK',video }
      }
      return {status: 'ERROR',message:result.message };

    } catch (error) {
      return {status: 'ERROR',message: 'Erreur interne' };
    }
  }

  public async update(data: any):Promise<any> {
    try {
      const formData = new FormData();
      formData.append('title',data.title);
      formData.append('video',data.video);
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${this.user.token}`
      });
      const result = await <any>this.http.put('http://localhost:3000/videos/'+data.id,formData,{headers:headers}).toPromise();
      console.log(result);
      if (result.status == "OK") {
        const video = <Video>result.video;
        return {status:"OK",video};
      }
      return {status: 'ERROR',message:result.message };

    } catch (error) {
      return {status: 'ERROR',message: 'Erreur interne' };
    }
  }
}
