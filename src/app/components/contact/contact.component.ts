import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Contact } from "src/app/shared/models/contact.model";
import {
  FormBuilder,
  Validators,
  FormGroup,
  AbstractControl
} from "@angular/forms";
import { CrudService } from "src/app/shared/services/crud.service";

@Component({
  selector: "[app-contact]",
  templateUrl: "./contact.component.html",
  styleUrls: ["./contact.component.scss"]
})
export class ContactComponent implements OnInit {
  @Input() contact: Contact;
  @Input() resContacts: Contact[];
  @Output() contacts: EventEmitter<Contact[]> = new EventEmitter<Contact[]>();

  edit: boolean = false;
  contactFormName: FormGroup;
  contactFormPhone: FormGroup;
  constructor(private crud: CrudService, private formBuilder: FormBuilder) {}

  ngOnInit() {
    // console.log(this.contact);
    this.contactFormName = this.formBuilder.group({
      name: [
        this.contact.name,
        [Validators.pattern("^[a-zA-Z ]*$"), Validators.minLength(3)]
      ]
    });
    this.contactFormPhone = this.formBuilder.group(
      {
        phone: [this.contact.phone, [Validators.pattern("^[0-9]*$")]]
      },
      {
        validator: this.UniqueNumber.bind(this)
      }
    );
  }
  get fc() {
    return this.contactFormName.controls;
  }
  get f() {
    return this.contactFormPhone.controls;
  }

  editContact(id) {
    console.log(id);
  }
  removeItem(id) {
    this.crud.delete(id).subscribe((res: Contact[]) => {
      console.log(res);
      this.contacts.emit(res);
    });
  }

  save(id) {
    this.edit = !this.edit;
    if (this.contactFormName.valid && this.contactFormPhone.valid) {
      this.crud
        .update({
          id: id,
          name: this.contactFormName.controls["name"].value,
          phone: this.contactFormPhone.controls["phone"].value
        })
        .subscribe((res: Contact[]) => {
          this.contacts.emit(res);
        });
    }
  }
  UniqueNumber(c: AbstractControl) {
    const value = c.get("phone").value;
    if (this.contacts) {
      return this.resContacts.find(m => m.phone === value)
        ? c.get("phone").setErrors({ uniquePhone: true })
        : null;
    }
  }
}
