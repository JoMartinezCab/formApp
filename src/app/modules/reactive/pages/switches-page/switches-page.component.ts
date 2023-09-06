import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './switches-page.component.html',
  styles: [
  ]
})
export class SwitchesPageComponent implements OnInit {

  public myForm:FormGroup = this.fb.group({
    gender: ['M', Validators.required],
    //Significa que siempre tiene que existir un valor seleccionado, no siempre tiene que ser true
    wantNotifcations: [true, Validators.required],
    //Siempe tiene que ser un valor verdadero
    termsAndConditions: [true, Validators.requiredTrue],
  })

  public person = {
    gender: 'F',
    wantNotifcations: false,
  }

  constructor(
    private fb:FormBuilder
  ){}

  ngOnInit(): void {
    this.myForm.reset( this.person );
  }

  isValidField( field:string ):boolean | null{
    return this.myForm.controls[field].errors && this.myForm.controls[field].touched;
  }

  onSave():void {
    if(this.myForm.invalid){
      this.myForm.markAllAsTouched();
      return;
    }

    const { termsAndCoditions, ...newPerson } = this.myForm.value;

    this.person = newPerson;
    console.log(this.myForm.value);
    console.log(this.person);
  }
}
