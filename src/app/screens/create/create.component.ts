import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SnackBarService } from 'src/app/services/snackbar/snack-bar.service';
import { VideoService } from 'src/app/services/video/video.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  form: FormGroup;

  constructor(private formBuilder: FormBuilder,private videoService: VideoService,private snackBarService: SnackBarService) { 
    this.form = formBuilder.group({
      title: ['',[Validators.required,Validators.minLength(5)]],
      video: ['',[Validators.required]]
    });
  }

  ngOnInit(): void {
  }

  async onSubmit() {
    console.log(this.form.get('title')?.value);
    console.log(this.form.get('video')?.value);
    const result = await this.videoService.create({title:this.form.get('title')?.value,video:this.form.get('video')?.value});
    const color = result.success ? 'mat-primary' : 'mat-warn';
    this.snackBarService.show(result.message,color); 
    this.form.reset();
  }

}
