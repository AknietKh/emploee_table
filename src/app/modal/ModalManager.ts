import { Injectable, ComponentFactoryResolver } from '@angular/core';
import { ModalService } from '../service/modal.service';

@Injectable({
  providedIn: 'root'
})
export class ModalManager {

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private modalService: ModalService,
  ) { }

  public showModal(refDir, component: {new (...args: any[])}, { title, buttonText, person, type }) {
    this.createComponent(refDir, component, { title, buttonText, person, type });

    const subject = this.modalService.getModalState();

    const sub = subject.subscribe(x => {
      refDir.viewContainerRef.clear();
      sub.unsubscribe();
    });

    return subject;
  }

  private createComponent(refDir, component: {new (...args: any[])}, { title, buttonText, person, type }) {
    const modalFactory = this.componentFactoryResolver.resolveComponentFactory(component);

    refDir.viewContainerRef.clear();

    const componentRef = refDir.viewContainerRef.createComponent(modalFactory);

    componentRef.instance.title = title;
    componentRef.instance.buttonText = buttonText;
    componentRef.instance.person = person;
    componentRef.instance.type = type;
  }
}
