import { Component, OnInit } from "@angular/core";
import { CrudService } from "src/app/shared/services/crud.service";
import { Contact } from "src/app/shared/models/contact.model";
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl
} from "@angular/forms";
import { UniqueNumberValidators } from "src/app/shared/validators/Unique-phone.validator";

@Component({
  selector: "app-contacts",
  templateUrl: "./contacts.component.html",
  styleUrls: ["./contacts.component.scss"]
})
export class ContactsComponent implements OnInit {
  contacts: Contact[] = [];
  constructor(
    private crud: CrudService,
    private formBuilder: FormBuilder,
    private UniqueNumberValidators: UniqueNumberValidators
  ) {}
  searchModel;
  addContactForm: FormGroup;
  contactForm: FormGroup;
  ngOnInit() {
    this.crud.list().subscribe(res => {
      this.contacts = res;
    });
    this.addContactForm = this.formBuilder.group(
      {
        name: [
          "",
          [Validators.pattern("^[a-zA-Z ]*$"), Validators.minLength(3)]
        ],
        phone: ["", [Validators.pattern("^[0-9]*$")]]
      },
      {
        validator: this.UniqueNumberValidators.UniqueNumber.bind(
          this.UniqueNumberValidators
        )
      }
    );
  }
  UniqueNumber(c: AbstractControl) {
    const value = c.get("phone").value;
    if (this.contacts) {
      // console.log(
      //   this.contacts.find(m => m.phone === value)
      //     ? { uniquePhone: true }
      //     : null
      // );
      return this.contacts.find(m => m.phone === value)
        ? c.get("phone").setErrors({ uniquePhone: true })
        : null;
    }
  }

  get f() {
    return this.addContactForm.controls;
  }
  addContact(contact: Contact) {
    if (this.addContactForm.valid) {
      console.log(this.addContactForm.value);
      this.crud.add(this.addContactForm.value).subscribe(res => {
        this.contacts = res;
        this.addContactForm.reset();
      });
    }
  }

  search(e: any) {
    this.searchModel = (<HTMLInputElement>event.target).value;
  }
  UpdateContactsList(e) {
    // console.log(e);
    this.contacts = e;
  }
}
