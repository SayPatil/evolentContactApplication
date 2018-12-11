import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactListComponent } from './contact-list/contact-list.component';
import { CreateContactComponent } from './create-contact/create-contact.component';
import { EditContactComponent } from './edit-contact/edit-contact.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', redirectTo: '/contactList', pathMatch: 'full' },
  { path: 'contactList', component: ContactListComponent },
  { path: 'createContact', component: CreateContactComponent },
  { path: 'editContact', component: EditContactComponent },
  { path: '**',   component: PageNotFoundComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [ContactListComponent,
                                  CreateContactComponent,
                                  EditContactComponent,
                                  PageNotFoundComponent]