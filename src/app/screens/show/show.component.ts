import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user';
import { Video } from 'src/app/models/video';
import { AuthService } from 'src/app/services/auth/auth-service.service';
import { SnackBarService } from 'src/app/services/snackbar/snack-bar.service';
import { VideoService } from 'src/app/services/video/video.service';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnInit, OnDestroy {
  id: String = '';
  user: User;
  userSubscription: Subscription;
  video: Video;

  constructor(private route: ActivatedRoute,
              private videoService: VideoService,
              private authService: AuthService,
              private snackBarService: SnackBarService,
              private router: Router) { 

    this.user = new User('','');
    this.userSubscription = new Subscription();
    this.video= new Video('','','','');
  }

    ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.videoService.get(this.id).then(
      (value) => {
        if (value.status == 'OK') {
          this.video = value.video;
          console.log(this.video);
        }
      }
    )
    console.log(this.route.queryParams.subscribe(
      (observer) => {
        console.log(observer);
      }
    ));
    this.userSubscription = this.authService.userSubject.subscribe(
      (observer) => {
        this.user = observer;
        console.log(this.user.id);
      }
    );
    this.authService.emmitUserSubject();
    
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  async onDelete() {
    const result = await this.videoService.delete(this.id);
    const color = result.success ? 'mat-primary' : 'mat-warn';
    this.snackBarService.show(result.message,color);
    this.router.navigate(['/index']);
  } 

  async onEdit() {
    console.log('On edit');
    this.router.navigate([`/update/${this.id}`]);
  }

}
