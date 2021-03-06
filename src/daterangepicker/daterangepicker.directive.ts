import {
  Directive,
  ViewContainerRef,
  ComponentFactoryResolver,
  ElementRef,
  HostListener,
  forwardRef,
  ChangeDetectorRef,
  OnInit,
  OnChanges,
  SimpleChanges,
  Input,
  DoCheck,
  KeyValueDiffer,
  KeyValueDiffers,
  Output,
  EventEmitter,
  Renderer2
} from '@angular/core';
import { DaterangepickerComponent } from './daterangepicker.component';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import * as _moment from 'moment';
import { LocaleConfig } from './daterangepicker.config';
import { LocaleService } from './locale.service';
const moment = _moment;

@Directive({
  selector: 'input[ngxDaterangepickerMd]',
  host: {
    '(keyup.esc)': 'hide()',
    '(blur)': 'onBlur()',
    '(click)': 'open()',
    '(keyup)': 'inputChanged($event)'
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DaterangepickerDirective), multi: true
    }
]
})
export class DaterangepickerDirective implements OnInit, OnChanges, DoCheck {
  public picker: DaterangepickerComponent;
  private _onChange = Function.prototype;
  private _onTouched = Function.prototype;
  private _validatorChange = Function.prototype;
  private _value: any;
  private localeDiffer: KeyValueDiffer<string, any>;

  // CALENDAR SETTINGS
  /** Flag to display only one datepicker */
  @Input() singleDatePicker = false;
  /** Flag to display month and year dropdowns */
  @Input() showDropdowns = false;
  /** Flag to display week numbers */
  @Input() showWeekNumbers = false;
  /** Flag to display ISO week numbers */
  @Input() showISOWeekNumbers = false;
  /** Position calendar vertically */
  @Input() drops: 'up' | 'down';
  /** Position calendar horizontally  */
  @Input() opens: 'right' | 'left' | 'center' | 'auto';
  /** Minimun selectable date */
  @Input() minDate: _moment.Moment = null;
  /** Maximum selectable date */
  @Input() maxDate: _moment.Moment = null;
  /** Start date of current selection */
  @Input() startDate = moment().startOf('day');
  /** End date of current selection */
  @Input() endDate = moment().endOf('day');
  /** Max number of dates a user can select */
  @Input() dateLimit: number = null;
  /** Flag to display custom range label on ranges */
  @Input() showCustomRangeLabel = false;
  /** Flag to display apply button */
  @Input() showCancelButton = false;
  /** Flag to display apply button */
  @Input() showApplyButton = false;
  /** Flag to display clear button */
  @Input() showClearButton = false;

  // CALENDAR BEHAVIOR
  /** Flag to keep the calendar open after choosing a range */
  @Input() keepCalendarOpeningWithRange = false;
  /** Flag to display the range label on input */
  @Input() showRangeLabelOnInput = false;
  /** Flag to allow selection range from end date first */
  @Input() customRangeDirection = false;
  /** Flag to lock start date and change only the end date */
  @Input() lockStartDate = false;
  /** Flag to update input when selecting a date/range  */
  @Input() autoUpdateInput = true;
  /** Flag to display the ranges with the calendar*/
  @Input() alwaysShowCalendars = false;
  /** Flag to link both calendars */
  @Input() linkedCalendars = false;
  /** Close datepicker when auto apply */
  @Input() closeOnAutoApply = true;
  /** Flag to auto apply changes on select */
  @Input() autoApplyChanges = false;

  @Input() maxSpan = false;

  // timepicker variables
  @Input() timePicker: Boolean = false;
  @Input() timePicker24Hour: Boolean = false;
  @Input() timePickerIncrement = 1;
  @Input() timePickerSeconds: Boolean = false;
  // end of timepicker variables

  /** Set calendar locale settings */
  private _locale: LocaleConfig = {};
  @Input() set locale(value) {
    this._locale = { ...this._localeService.config, ...value };
  }

  get locale(): any {
    return this._locale;
  }

  /** Set custom ranges */
  @Input() ranges: any;

  /** Check if date is invalid */
  @Input() isInvalidDate: Function;
  /** Custom classes for a date */
  @Input() isCustomDate: Function;

  // CUSTOM CSS
  @Input() firstMonthDayClass: string = null;
  @Input() lastMonthDayClass: string = null;
  @Input() emptyWeekRowClass: string = null;
  @Input() firstDayOfNextMonthClass: string = null;
  @Input() lastDayOfPreviousMonthClass: string = null;

  @Input()
  private _endKey = 'endDate';
  private _startKey = 'startDate';

  @Input() set startKey(value) {
    if (value !== null) {
      this._startKey = value;
    } else {
      this._startKey = 'startDate';
    }
  }

  @Input() set endKey(value) {
    if (value !== null) {
      this._endKey = value;
    } else {
      this._endKey = 'endDate';
    }
  }

  notForChangesProperty: Array<string> = [
    'locale',
    'endKey',
    'startKey'
  ];

  get value() {
    return this._value || null;
  }
  set value(val) {
    this._value = val;
    this._onChange(val);
    this._changeDetectorRef.markForCheck();
  }

  /** Event on change */
  @Output('change') onChange: EventEmitter<Object> = new EventEmitter();
  /** Event on range clicked */
  @Output('rangeClicked') rangeClicked: EventEmitter<Object> = new EventEmitter();
  /** Event on dates updated */
  @Output('datesUpdated') datesUpdated: EventEmitter<Object> = new EventEmitter();
   /** Event on start date changed */
  @Output() startDateChanged: EventEmitter<Object> = new EventEmitter();
  /** Event on end date changed */
  @Output() endDateChanged: EventEmitter<Object> = new EventEmitter();
  /** Event when datepicker is shown */
  @Output() showDaterangepicker: EventEmitter<void> = new EventEmitter();
  /** Event when datepicker is hidden */
  @Output() hideDaterangepicker: EventEmitter<void> = new EventEmitter();

  constructor(
    public viewContainerRef: ViewContainerRef,
    public _changeDetectorRef: ChangeDetectorRef,
    private _componentFactoryResolver: ComponentFactoryResolver,
    private _el: ElementRef,
    private _renderer: Renderer2,
    private differs: KeyValueDiffers,
    private _localeService: LocaleService,
    private elementRef: ElementRef
  ) {
    this.drops = 'down';
    this.opens = 'auto';
    const componentFactory = this._componentFactoryResolver.resolveComponentFactory(DaterangepickerComponent);
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent(componentFactory);
    this.picker = (<DaterangepickerComponent>componentRef.instance);
    this.picker.inline = false; // set inline to false for all directive usage
  }
  ngOnInit() {
    this.picker.startDateChanged.asObservable().subscribe((itemChanged: any) => {
      this.startDateChanged.emit(itemChanged);
    });
    this.picker.endDateChanged.asObservable().subscribe((itemChanged: any) => {
      this.endDateChanged.emit(itemChanged);
    });
    this.picker.rangeClicked.asObservable().subscribe((range: any) => {
      this.rangeClicked.emit(range);
    });
    this.picker.datesUpdated.asObservable().subscribe((range: any) => {
      this.datesUpdated.emit(range);
    });
    this.picker.showDaterangepicker.asObservable().subscribe(() => {
      this.showDaterangepicker.emit();
    });
    this.picker.hideDaterangepicker.asObservable().subscribe(() => {
      this.hideDaterangepicker.emit();
    });
    this.picker.choosedDate.asObservable().subscribe((change: any) => {
      if (change) {
        const value = {};
        value[this._startKey] = change.startDate;
        value[this._endKey] = change.endDate;
        this.value = value;
        this.onChange.emit(value);
        if (typeof change.chosenLabel === 'string') {
          this._el.nativeElement.value = change.chosenLabel;
        }
      }
    });
    this.picker.firstMonthDayClass = this.firstMonthDayClass;
    this.picker.lastMonthDayClass = this.lastMonthDayClass;
    this.picker.emptyWeekRowClass = this.emptyWeekRowClass;
    this.picker.firstDayOfNextMonthClass = this.firstDayOfNextMonthClass;
    this.picker.lastDayOfPreviousMonthClass = this.lastDayOfPreviousMonthClass;
    this.picker.drops = this.drops;
    this.picker.opens = this.opens;
    this.localeDiffer = this.differs.find(this.locale).create();
    this.picker.closeOnAutoApply = this.closeOnAutoApply;
  }

  ngOnChanges(changes: SimpleChanges): void  {
    for (const change in changes) {
      if (changes.hasOwnProperty(change)) {
        if (this.notForChangesProperty.indexOf(change) === -1) {
          this.picker[change] = changes[change].currentValue;
        }
      }
    }
  }

  ngDoCheck() {
    if (this.localeDiffer) {
      const changes = this.localeDiffer.diff(this.locale);
      if (changes) {
        this.picker.updateLocale(this.locale);
      }
    }
  }

  /**
   * Event on blur
   */
  onBlur(): void {
    this._onTouched();
  }

  /**
   * Open picker
   *
   * @param event
   */
  open(event?: any): void {
    this.picker.show(event);
    setTimeout(() => {
      this.showDaterangepicker.emit();
    });
  }

  /**
   * Hide picker
   *
   * @param e
   */
  hide(e?): void {
    this.picker.hide(e);
    this.hideDaterangepicker.emit();
  }

  /**
   * Toggle picker
   *
   * @param e
   */
  toggle(e?): void {
    if (this.picker.isShown) {
      this.hide(e);
    } else {
      this.open(e);
    }
  }

  /**
   * Clear picker value
   */
  clear(): void {
    this.picker.clear();
  }

  /**
   * Set input value
   */
  writeValue(value): void {
    this.setValue(value);
  }

  /**
   * Register change
   */
  registerOnChange(fn): void {
    this._onChange = fn;
  }

  /**
   * Register on touch
   */
  registerOnTouched(fn): void {
    this._onTouched = fn;
  }

  /**
   * Set input value
   */
  private setValue(val: any): void {
    if (val) {
      this.value = val;
      if (val[this._startKey]) {
        this.picker.setStartDate(val[this._startKey]);
      }
      if (val[this._endKey]) {
        this.picker.setEndDate(val[this._endKey]);
      }
      this.picker.calculateChosenLabel();
      if (this.picker.chosenLabel) {
        this._el.nativeElement.value = this.picker.chosenLabel;
      }
    } else {
      this.picker.clear();
    }
  }

  /**
   * Event on input change
   *
   * @param e
   */
  inputChanged(e): void {
    if (e.target.tagName.toLowerCase() !== 'input') {
      return;
    }
    if (!e.target.value.length) {
      return;
    }
    const dateString = e.target.value.split(this.picker.locale.separator);
    let start = null, end = null;
    if (dateString.length === 2) {
      start = moment(dateString[0], this.picker.locale.format);
      end = moment(dateString[1], this.picker.locale.format);
    }
    if (this.singleDatePicker || start === null || end === null) {
      start = moment(e.target.value, this.picker.locale.format);
      end = start;
    }
    if (!start.isValid() || !end.isValid()) {
      return;
    }
    this.picker.setStartDate(start);
    this.picker.setEndDate(end);
    this.picker.updateView();
  }

  /**
   * For click outside of the calendar's container
   *
   * @param event event object
   */
  @HostListener('document:click', ['$event'])
  outsideClick(event): void {
    if (!event.target) {
      return;
    }

    if (event.target.classList.contains('ngx-daterangepicker-action') || event.target.classList.contains('cdk-overlay-backdrop')) {
      return;
    }

    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.hide();
    }
  }
}
