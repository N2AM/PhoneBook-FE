import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ContactsComponent } from "./pages/contacts/contacts.component";
import { HttpClientModule } from "@angular/common/http";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { PrefixInterceptor } from "./core/interceptors/prefix-interceptors";
import { FilterPipe } from "./shared/pipes/filter.pipe";
import { ContactComponent } from "./components/contact/contact.component";
@NgModule({
  declarations: [AppComponent, ContactsComponent, FilterPipe, ContactComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: PrefixInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
