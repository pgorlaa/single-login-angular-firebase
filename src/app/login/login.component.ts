import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: Observable<firebase.User>;
  service: AuthService;

  constructor(db: AngularFirestore, service: AuthService, private router: Router) {
    this.service = service;
  }

  signInWithGoogle() {
    try {
      this.service.signInWithGoogle()
    } catch (err) {
      console.log(err)
    }
  }

  ngOnInit() {
  }

}
