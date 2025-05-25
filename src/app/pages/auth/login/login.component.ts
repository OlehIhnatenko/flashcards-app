import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private auth: AuthService, private router: Router) {}

  onLogin() {
    this.auth.login(this.email, this.password)
      .then(() => this.router.navigateByUrl('/'))
      .catch(err => alert(err.message));
  }

  googleLogin() {
    this.auth.loginWithGoogle()
      .then(() => this.router.navigateByUrl('/'))
      .catch(err => alert(err.message));
  }
}
