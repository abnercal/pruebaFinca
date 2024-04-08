import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PagesRoutes } from './pages.routing';
import { CredentialsComponent } from './components/credentials/credentials.component';
import { MessageComponent } from './components/message/message.component';
import { MaterialModule } from '../../material.module';
import { FlexModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { AddMessageComponent } from './components/add-message/add-message.component';



@NgModule({
  declarations: [
    CredentialsComponent,
    MessageComponent,
    AddMessageComponent
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild(PagesRoutes),
    MaterialModule,
    FlexModule
  ]
})
export class PagesModule { }
