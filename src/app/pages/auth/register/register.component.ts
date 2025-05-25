import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  email = '';
  password = '';

  constructor(private auth: AuthService, private router: Router) { }

  onRegister() {
    this.auth.register(this.email, this.password)
      .then(() => this.router.navigateByUrl('/'))
      .catch((err: { message: any; }) => alert(err.message));
  }

  googleLogin() {
    this.auth.loginWithGoogle()
      .then(() => this.router.navigateByUrl('/'))
      .catch((err: { message: any; }) => alert(err.message));
  }
}
