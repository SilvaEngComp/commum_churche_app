/* eslint-disable @typescript-eslint/no-unused-expressions */
import { ExceptionService } from './../../../services/exception-service.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CaixaCategory } from 'src/app/models/caixaCategory';
import { CaixaType } from 'src/app/models/caixaType';
import { CaixaCategoryService } from 'src/app/services/caixa-category.service';
import { CaixaTypeService } from 'src/app/services/caixa-type.service';
import { CaixaTypeRegisterComponent } from '../caixa/caixa-type-register/caixa-type-register.component';
import { CaixaCategoryRegisterComponent } from '../caixa/caixa-group-register/caixa-group-register.component';
import { AlertController, PopoverController } from '@ionic/angular';
import { ConstantMessages } from 'src/app/models/messages';
import { Constants } from 'src/app/models/constants';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-category-manager',
  templateUrl: './category-manager.component.html',
  styleUrls: ['./category-manager.component.scss'],
})
export class CategoryManagerComponent implements OnInit {
  @Output()
  sessionPage: EventEmitter<string> = new EventEmitter<string>();
  noContent = 'Nenhum Registro';
  categories: CaixaCategory[];
  subcategories: CaixaType[];

  constructor(
    private categoryService: CaixaCategoryService,
    private caixaTypeService: CaixaTypeService,
    private popCtrl: PopoverController,
    private exceptionService: ExceptionService,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    UiService.localSet(
      Constants.BACK_PAGE,
      Constants.MENU_FINANCY_OPTION_SUMMARY
    );
    UiService.subPageTitle.emit(Constants.TITLE_SUMMARY_MANAGER_CATEGORY);
    this.load();
  }

  load() {
    this.loadCategory();
    this.loadSubcategory();
  }

  async loadCategory() {
    const responser2 = await this.categoryService.get();
    this.categories = responser2.data;
  }
  async loadSubcategory() {
    const responser3 = await this.caixaTypeService.get();
    this.subcategories = responser3.data;
  }

  deleteCategory(category: CaixaCategory) {
    this.categoryService
      .delete(category)
      .then(() => {
        this.exceptionService.alertDialog(
          ConstantMessages.ACTION_SUCCESS_PERFORMED,
          'Exclusão de Categoria'
        );
        this.loadCategory();
      })
      .catch((error) => this.exceptionService.error(error));
  }
  alterCategory(category: CaixaCategory) {
    this.categoryService
      .update(category)
      .then(() => {
        this.exceptionService.alertDialog(
          ConstantMessages.ACTION_SUCCESS_PERFORMED,
          'Alteração de Categoria'
        );
        this.loadCategory();
      })
      .catch((error) => this.exceptionService.error(error));
  }
  prepareAlterCategory(category: CaixaCategory) {
    this.categories.filter((obj) => {
      if (obj.id === category?.id) {
        obj.show = !obj?.show;
      }
    });
  }

  prepareAlterSubcategory(category: CaixaType) {
    this.subcategories.filter((obj) => {
      if (obj.id === category?.id) {
        obj.show = !obj?.show;
      }
    });
  }
  deleteSubcategory(subcategory: CaixaType) {
    this.caixaTypeService
      .delete(subcategory)
      .then(() => {
        this.exceptionService.alertDialog(
          ConstantMessages.ACTION_SUCCESS_PERFORMED,
          'Exclusão de Subcategoria'
        );
        this.loadSubcategory();
      })
      .catch((error) => this.exceptionService.error(error));
  }
  alterSubcategory(subcategory: CaixaType) {
    this.caixaTypeService
      .update(subcategory)
      .then(() => {
        this.exceptionService.alertDialog(
          ConstantMessages.ACTION_SUCCESS_PERFORMED,
          'Alteração de Subcategoria'
        );
        this.loadSubcategory();
      })
      .catch((error) => this.exceptionService.error(error));
  }

  async createNew(op: number) {
    let apiResponse;
    let component = null;
    if (op === 1) {
      component = CaixaCategoryRegisterComponent;
      apiResponse = this.categories;
    } else if (op === 2) {
      component = CaixaTypeRegisterComponent;
      apiResponse = this.subcategories;
    }
    const modal = await this.popCtrl.create({
      component,
      componentProps: { apiResponse },
      event,
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();

    if (data) {
      this.load();
    }
  }

  async checkDelete(obj: any, op: number) {
    const alertCtrl = await this.alertCtrl.create({
      message: ConstantMessages.CONFIRM_DELETE,
      buttons: [
        {
          text: 'Não',
          handler: () => {},
        },
        {
          text: 'Sim',
          handler: () => {
            if (op === 1) {
              this.deleteCategory(obj);
            } else if (op === 2) {
              this.deleteSubcategory(obj);
            }
          },
        },
      ],
    });

    alertCtrl.present();
  }
}
