import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TinyMceComponent } from './tiny-mce.component';

@NgModule({
  imports: [
    CommonModule
  ], 
  declarations: [TinyMceComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
    TinyMceComponent
]
})
export class TinyMceModule { }
