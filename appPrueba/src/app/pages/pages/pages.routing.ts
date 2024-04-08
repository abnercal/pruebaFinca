import { Routes } from '@angular/router';
import { CredentialsComponent } from './components/credentials/credentials.component';
import { MessageComponent } from './components/message/message.component';

export const PagesRoutes: Routes = [
  {
    path: 'credential',
    component: CredentialsComponent,
  },
  {
    path: 'messages',
    component: MessageComponent,
  },
];
