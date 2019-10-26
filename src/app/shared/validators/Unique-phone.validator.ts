import { AbstractControl } from "@angular/forms";
import { CrudService } from "../services/crud.service";
import { Contact } from "../models/contact.model";
import { Injectable } from "@angular/core";
@Injectable()
export class UniqueNumberValidators {
  constructor(private crud: CrudService) {}
  UniqueNumber(control: AbstractControl) {
    const value = control.get("phone").value;
    this.crud.list().subscribe((res: Contact[]) => {
      if (res) {
        return res.find(m => m.phone === value)
          ? control.get("phone").setErrors({ uniquePhone: true })
          : null;
      }
    });
  }
}
