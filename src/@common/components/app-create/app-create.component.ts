import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  Output,
  EventEmitter,
  HostListener,
  Input
} from '@angular/core'
import { FormBuilder } from '@angular/forms'

@Component({
  selector: 'main-create',
  templateUrl: './app-create.component.html',
  styleUrls: ['./app-create.component.scss']
})
export class AppCreateComponent implements OnInit, AfterViewInit {

  @HostListener('window:keyup', ['$event']) keyEvent(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.onClose()
    }
  }

  @ViewChild('searchElement') searchElement: ElementRef
  @Output() close = new EventEmitter()
  @Output() create = new EventEmitter()
  @Input() theme: string = 'light'

  public loading: boolean = true
  formGroup

  constructor(private _fb: FormBuilder,) {
  }

  ngOnInit(): void {
    const form = {
      title: [''],
      start: [''],
      end: ['']
    }
    this.formGroup = this._fb.group(form);
  }

  ngAfterViewInit(): void {
    // setTimeout(() => {
    //   // this.searchElement.nativeElement.focus()
    // }, 200)
    // setTimeout(() => {
    //   this.loading = false
    // }, 700)
  }

  onClose() {
    this.close.next(true)
  }

  createEvent(){
    this.create.emit(this.formGroup.value)
  }

}
