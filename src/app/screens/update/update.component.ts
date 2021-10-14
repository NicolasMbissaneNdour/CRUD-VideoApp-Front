import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user';
import { Video } from 'src/app/models/video';
import { AuthService } from 'src/app/services/auth/auth-service.service';
import { SnackBarService } from 'src/app/services/snackbar/snack-bar.service';
import { VideoService } from 'src/app/services/video/video.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit, OnDestroy {
  user: User;
  userSubscription: Subscription;
  videoId: String;
  video: Video;
  form: FormGroup;
  constructor(private authService: AuthService,private videoService: VideoService,private route: ActivatedRoute,private formBuilder: FormBuilder,private snackBarService: SnackBarService) {
    this.user = new User('','');
    this.userSubscription = new Subscription();
    this.videoId = this.route.snapshot.params.id;
    this.video = new Video('','','','');
    this.form = this.formBuilder.group({
      title: ['',[Validators.required,Validators.minLength(5)]],
      videoLink: ['',]
    });
   }

  ngOnInit(): void {
    this.userSubscription = this.authService.userSubject.subscribe(
      (observer)=>{
        this.user = observer;
      }
    );
    this.authService.emmitUserSubject();
    console.log(this.videoId);
    this.videoService.get(this.videoId).then(
      (value)=>{
        if (value.status == "OK") {
          this.video = value.video;
          this.form.setValue({
            title: this.video.title,
            videoLink: ''
          });
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  async onSubmit() {
    const titleSubmit = this.form.get('title')?.value;
    const videoLinkSubmit = this.form.get('videoLink')?.value;

    
    const data = {
      title: titleSubmit,
      video: videoLinkSubmit,
      id: this.videoId
    };

    try {
      const result = await this.videoService.update(data);
      if(result.status == "OK"){
        this.video = result.video;
        this.form.setValue({
          title: this.video.title,
          videoLink: ''
        });
        this.snackBarService.show("Vidéo modifié",'mat-primary'); 
      }
      else {
        this.snackBarService.show(result.message,'mat-warn');
      }
    } catch (error) {
      console.log(error);
      this.snackBarService.show("Erreur interne réessayez ultérieurement",'mat-warn'); 
    }
      
    
    
  }
}
