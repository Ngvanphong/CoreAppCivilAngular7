import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {Router} from '@angular/router';
import {UrlConstant} from '../common/url.constant' ;
declare var alertify: any;
@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private _notify: any = alertify;
  constructor(private _router:Router) {
    alertify.defaults = {
      // dialogs defaults
      autoReset: true,
      basic: false,
      closable: true,
      closableByDimmer: true,
      frameless: false,
      maintainFocus: true, // <== global default not per instance, applies to all dialogs
      maximizable: true,
      modal: true,
      movable: true,
      moveBounded: false,
      overflow: true,
      padding: true,
      pinnable: true,
      pinned: true,
      preventBodyShift: false, // <== global default not per instance, applies to all dialogs
      resizable: true,
      startMaximized: false,
      transition: 'pulse',

      // notifier defaults
      notifier: {
        // auto-dismiss wait time (in seconds)  
        delay: 5,
        // default position
        position: 'bottom-right',
        // adds a close button to notifier messages
        closeButton: false
      },

      // language resources 
      glossary: {
        // dialogs default title
        title: 'Xác nhận',
        // ok button text
        ok: 'Đồng ý',
        // cancel button text
        cancel: 'Hủy'
      },

      // theme settings
      theme: {
        // class name attached to prompt dialog input textbox.
        input: 'ajs-input',
        // class name attached to ok button
        ok: 'ajs-ok',
        // class name attached to cancel button 
        cancel: 'ajs-cancel'
      }
    };
  }
  public printSuccesMessage(message: string) {
    this._notify.success(message);
  };
  public printErrorMessage(message: string) {
    this._notify.error(message);
  };

  public handleError<T>(message: string, result?: T) {
    return (error: any): Observable<T> => {
      this.printErrorMessage(message);
      if(error.error=="Forbidden") {
       this._router.navigate([UrlConstant.lOGIN])
      }
      return of(result as T);
    };
  }

  public printConfirmationDialog(message: string, okCallback: () => any) {
    this._notify.confirm(message, function (e) {
      if (e) {
        okCallback();
      }
      else {

      };
    })
  }
}
