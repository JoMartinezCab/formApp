import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

const product = {
  name: '',
  price: 0,
  inStorage: 0
}

@Component({
  templateUrl: './basic-page.component.html',
  styles: [
  ]
})
export class BasicPageComponent implements OnInit{
  public myForm:FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    price: [0, [Validators.required, Validators.min(0)]],
    inStorage: [0, [Validators.required, Validators.min(0)]]
  });

  constructor(
    private fb: FormBuilder
  ){}

  ngOnInit(): void {
    this.myForm.reset(product)
  }

  isValidField( field:string ):boolean | null{
    return this.myForm.controls[field].errors && this.myForm.controls[field].touched;
  }

  getFieldError(field: string): string | null{
    if(!this.myForm.controls[field]) return null;

    const errors = this.myForm.controls[field].errors || {};

    for (const error of Object.keys(errors)){
      switch(error){
        case 'required':
          return 'este campo es requerido';

        case 'minlength':
          return `Minimo ${ errors['minlength'].requiredLength } caracteres`
      }
    }

    return null;
  }

  onSave(){
    if(this.myForm.invalid){
      this.myForm.markAllAsTouched();
      return;
    }

    this.myForm.reset(product);
  }
}
