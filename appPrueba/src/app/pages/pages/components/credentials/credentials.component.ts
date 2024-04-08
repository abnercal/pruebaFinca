import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CredentialItem } from 'src/app/core/models/credential';
import { CredentialService } from 'src/app/core/services/credential.service';

@Component({
  selector: 'app-credentials',
  templateUrl: './credentials.component.html',
  styleUrls: ['./credentials.component.css']
})
export class CredentialsComponent implements OnInit {

  form: FormGroup;
  credential: CredentialItem;


  constructor(private _snackBar: MatSnackBar, private credentialService: CredentialService) { }

  ngOnInit(): void {

    this.form = new FormGroup( {
      key: new FormControl(null, Validators.required),
      sharedSecret: new FormControl( null, Validators.required)
    });
  }

  sendCredentials(): void {
    if (!this.form.valid) {
      this._snackBar.open('Llene todos los campos','',{duration: 2000});
      return;
    }

    this.credential = {key: this.form.value.key, shared_secret: this.form.value.sharedSecret }

    this.credentialService.sendCredentials(this.credential).subscribe((res: any) => {
      this._snackBar.open('Credenciales Registradas Correctamente StatusCode: 204' ,'',{duration: 2000});
      this.form.reset();
      sessionStorage.setItem('key', this.credential.key); 
      sessionStorage.setItem('shared_secret', this.credential.shared_secret);
    });
  }

}
