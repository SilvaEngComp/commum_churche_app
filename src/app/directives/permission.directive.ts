/* eslint-disable @angular-eslint/directive-selector */
/* eslint-disable @typescript-eslint/member-ordering */
import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { UiService } from '../services/ui.service';

@Directive({
  selector: '[permission]',
})
export class PermissionDirective {
  @Input() set permission(name: string) {
    console.log(name);
    const permissionResponse = UiService.validPermissions(name);
    console.log(permissionResponse);
    if (permissionResponse) {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainerRef.clear();
    }
  }

  constructor(
    private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>
  ) {}
}
