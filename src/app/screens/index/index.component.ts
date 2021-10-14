import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user';
import { Video } from 'src/app/models/video';
import { AuthService } from 'src/app/services/auth/auth-service.service';
import { VideoService } from 'src/app/services/video/video.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit,OnDestroy {
  videos: Video[];
  videosSubscription: Subscription;
  user: User ;
  userSubscription: Subscription;

  constructor(private videoService: VideoService,private router: Router,private authService: AuthService) {
    this.videos = []
    this.videosSubscription = new Subscription();
    this.user = new User('','');
    this.userSubscription = new Subscription();
   }

  ngOnInit(): void {
    this.videoService.getAll();
    this.videosSubscription = this.videoService.videosSubject.subscribe(
      (observer)=> {
        this.videos = observer;
      }
    );
    this.videoService.emmitVideosSubject();
    console.log(this.videos);
    this.authService.userSubject.subscribe(
      (observer) => {
        this.user = observer;
      }
    );
    this.authService.emmitUserSubject();
  }

  ngOnDestroy(): void {
    this.videosSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }

  onShowVideo(video: Video) {
    console.log(video);

    this.router.navigate([`/show/${video._id}`]);
  }

  onEdit(id: String) {
    this.router.navigate([`/update/${id}`]);
  }

  async onDelete(id: String) {
    console.log(id);
    const result = await this.videoService.delete(id);
    if (result.success) {
      console.log(result.message);
      this.videoService.getAll();
    }
    else {
      console.log(result.message);
    }
  }
}
