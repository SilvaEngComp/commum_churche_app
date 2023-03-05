/* eslint-disable @angular-eslint/directive-selector */
/* eslint-disable @typescript-eslint/member-ordering */
import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { Constants } from '../models/constants';
import { UiService } from '../services/ui.service';

@Directive({
  selector: '[noPermission]',
})
export class NoPermissionDirective {
  @Input() set noPermission(name: string) {
    let permissionResponse;
    const user = UiService.localGet(Constants.TOKEN)?.user;
    const exist = user.roles.includes(Constants.ROLE_SUPER_ADMIN);
    if (exist) {
      permissionResponse = true;
    } else {
      permissionResponse = !UiService.validPermissions(name);
    }

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
