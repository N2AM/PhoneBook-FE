import { Injectable } from "@angular/core";
import { Contact } from "../models/contact.model";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class CrudService {
  constructor(private http: HttpClient) {}
  add(contact: Contact): Observable<[Contact]> {
    return this.http.post<[Contact]>("http://localhost:3000/contacts", contact);
  }
  update(contact: Contact) {
    return this.http.put(
      "http://localhost:3000/contacts/" + contact.id,
      contact
    );
  }
  delete(id: number) {
    return this.http.delete("http://localhost:3000/contacts/" + id);
  }
  list() {
    return this.http.get<[Contact]>("http://localhost:3000/contacts");
  }
}
