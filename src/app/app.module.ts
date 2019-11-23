import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { MDBBootstrapModule } from "angular-bootstrap-md";

import { AppComponent } from "./app.component";
import { ContactFormComponent } from "./components/contact-form/contact-form.component";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [AppComponent, ContactFormComponent],
  imports: [
    BrowserModule,
    MDBBootstrapModule.forRoot(),
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
