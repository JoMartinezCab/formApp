import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './dynamic-page.component.html',
  styles: [
  ]
})
export class DynamicPageComponent {

  public myForm:FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    favoriteGames: this.fb.array([
      ['Metal Gear', Validators.required],
      ['Death Stranding', Validators.required]
    ])
  });

  public newFavorite:FormControl = new FormControl('', Validators.required);

  constructor(private fb: FormBuilder) {}

  get favoriteGames(){
    return this.myForm.get('favoriteGames') as FormArray;
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

  isValidFieldInArray( formArray: FormArray, index:number ){
    return formArray.controls[index].errors
      && formArray.controls[index].touched;
  }

  addToFavorites(){
    if(this.newFavorite.invalid) return;

    const newGame = this.newFavorite.value;

    // this.favoriteGames.push( new FormControl( newGame, Validators.required ) )
    this.favoriteGames.push(
      this.fb.control(newGame, Validators.required)
    )

    this.newFavorite.reset();
  }

  onDeleteFavorite( index: number ):void{
    this.favoriteGames.removeAt(index);
  }

  onSubmit():void{
    if(this.myForm.invalid){
      this.myForm.markAllAsTouched();
      return;
    }

    this.myForm.reset();
  }
}
