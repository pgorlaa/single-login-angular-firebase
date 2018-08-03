import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { AppRoutes } from '../app-routes.enum'

@Injectable()
export class AuthService {
  USER_LOGGED = 'user';
  user: Observable<firebase.User>;

  private userDetails: firebase.User = null;
  constructor(private _firebaseAuth: AngularFireAuth, private router: Router) {
    this.user = _firebaseAuth.authState;

    _firebaseAuth.auth.onAuthStateChanged((user) => {
      this.changeUserSession(user);
    });
  }

  private changeUserSession(user) {
    if (user) {
      sessionStorage.removeItem(this.USER_LOGGED);
      user.getIdToken().then((value) => {
        sessionStorage.setItem(this.USER_LOGGED, value);
      });

    } else {
      sessionStorage.removeItem(this.USER_LOGGED);
    }
  }

  signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({
      hd: "entelgy.com"
    });

    this._firebaseAuth.auth.signInWithPopup(provider)
      .then((result) => {
        this.changeUserSession(result.user);
        this.router.navigate(['/'])
      })
      .catch((error) => {
        console.log("Error signing in:", error);
        throw error;
      });

  }

  isLoggedIn() {
    const token = sessionStorage.getItem(this.USER_LOGGED);
    if (token == null) {
      this.router.navigate([`/${AppRoutes.LOGIN}`]);

      return false;
    } else {
      return true;
    }
  }

  logout() {
    this._firebaseAuth.auth.signOut().then((res) => this.router.navigate(['/']));
  }
}