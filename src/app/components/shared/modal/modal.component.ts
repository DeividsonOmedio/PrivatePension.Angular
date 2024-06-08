import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  @Input() Id?: number = 0;
  @Input() Title: string = '';
  @Input() BtnConfirm: string = '';
  @Input() BtnCancel: string = 'Cancelar';
  @Input() Amount: number = 0;
  @Input() Delete: boolean = false;

  @Output() amountChange = new EventEmitter<number>();

  onAmountInput(event: any) {
    const amount = parseFloat(event.target.value);
    this.Amount = amount;
    }
    
    submit() {
      this.amountChange.emit(this.Amount);
  }
}
