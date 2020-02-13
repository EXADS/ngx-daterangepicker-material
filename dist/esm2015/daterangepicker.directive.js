import * as tslib_1 from "tslib";
var DaterangepickerDirective_1;
import { Directive, ViewContainerRef, ComponentFactoryResolver, ElementRef, HostListener, forwardRef, ChangeDetectorRef, Input, KeyValueDiffers, Output, EventEmitter, Renderer2 } from '@angular/core';
import { DaterangepickerComponent } from './daterangepicker.component';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import * as _moment from 'moment';
import { LocaleService } from './locale.service';
const moment = _moment;
let DaterangepickerDirective = DaterangepickerDirective_1 = class DaterangepickerDirective {
    constructor(viewContainerRef, _changeDetectorRef, _componentFactoryResolver, _el, _renderer, differs, _localeService, elementRef) {
        this.viewContainerRef = viewContainerRef;
        this._changeDetectorRef = _changeDetectorRef;
        this._componentFactoryResolver = _componentFactoryResolver;
        this._el = _el;
        this._renderer = _renderer;
        this.differs = differs;
        this._localeService = _localeService;
        this.elementRef = elementRef;
        this._onChange = Function.prototype;
        this._onTouched = Function.prototype;
        this._validatorChange = Function.prototype;
        // CALENDAR SETTINGS
        /** Flag to display only one datepicker */
        this.singleDatePicker = false;
        /** Flag to display month and year dropdowns */
        this.showDropdowns = false;
        /** Flag to display week numbers */
        this.showWeekNumbers = false;
        /** Flag to display ISO week numbers */
        this.showISOWeekNumbers = false;
        /** Minimun selectable date */
        this.minDate = null;
        /** Maximum selectable date */
        this.maxDate = null;
        /** Start date of current selection */
        this.startDate = moment().startOf('day');
        /** End date of current selection */
        this.endDate = moment().endOf('day');
        /** Max number of dates a user can select */
        this.dateLimit = null;
        /** Flag to display custom range label on ranges */
        this.showCustomRangeLabel = false;
        /** Flag to display apply button */
        this.showCancelButton = false;
        /** Flag to display apply button */
        this.showApplyButton = false;
        /** Flag to display clear button */
        this.showClearButton = false;
        // CALENDAR BEHAVIOR
        /** Flag to keep the calendar open after choosing a range */
        this.keepCalendarOpeningWithRange = false;
        /** Flag to display the range label on input */
        this.showRangeLabelOnInput = false;
        /** Flag to allow selection range from end date first */
        this.customRangeDirection = false;
        /** Flag to lock start date and change only the end date */
        this.lockStartDate = false;
        /** Flag to update input when selecting a date/range  */
        this.autoUpdateInput = true;
        /** Flag to display the ranges with the calendar*/
        this.alwaysShowCalendars = false;
        /** Flag to link both calendars */
        this.linkedCalendars = false;
        /** Close datepicker when auto apply */
        this.closeOnAutoApply = true;
        /** Flag to auto apply changes on select */
        this.autoApplyChanges = false;
        this.maxSpan = false;
        // timepicker variables
        this.timePicker = false;
        this.timePicker24Hour = false;
        this.timePickerIncrement = 1;
        this.timePickerSeconds = false;
        // end of timepicker variables
        /** Set calendar locale settings */
        this._locale = {};
        // CUSTOM CSS
        this.firstMonthDayClass = null;
        this.lastMonthDayClass = null;
        this.emptyWeekRowClass = null;
        this.firstDayOfNextMonthClass = null;
        this.lastDayOfPreviousMonthClass = null;
        this._endKey = 'endDate';
        this._startKey = 'startDate';
        this.notForChangesProperty = [
            'locale',
            'endKey',
            'startKey'
        ];
        /** Event on change */
        this.onChange = new EventEmitter();
        /** Event on range clicked */
        this.rangeClicked = new EventEmitter();
        /** Event on dates updated */
        this.datesUpdated = new EventEmitter();
        /** Event on start date changed */
        this.startDateChanged = new EventEmitter();
        /** Event on end date changed */
        this.endDateChanged = new EventEmitter();
        /** Event when datepicker is shown */
        this.showDaterangepicker = new EventEmitter();
        /** Event when datepicker is hidden */
        this.hideDaterangepicker = new EventEmitter();
        this.drops = 'down';
        this.opens = 'auto';
        const componentFactory = this._componentFactoryResolver.resolveComponentFactory(DaterangepickerComponent);
        viewContainerRef.clear();
        const componentRef = viewContainerRef.createComponent(componentFactory);
        this.picker = componentRef.instance;
        this.picker.inline = false; // set inline to false for all directive usage
    }
    set locale(value) {
        this._locale = Object.assign({}, this._localeService.config, value);
    }
    get locale() {
        return this._locale;
    }
    set startKey(value) {
        if (value !== null) {
            this._startKey = value;
        }
        else {
            this._startKey = 'startDate';
        }
    }
    set endKey(value) {
        if (value !== null) {
            this._endKey = value;
        }
        else {
            this._endKey = 'endDate';
        }
    }
    get value() {
        return this._value || null;
    }
    set value(val) {
        this._value = val;
        this._onChange(val);
        this._changeDetectorRef.markForCheck();
    }
    ngOnInit() {
        this.picker.startDateChanged.asObservable().subscribe((itemChanged) => {
            this.startDateChanged.emit(itemChanged);
        });
        this.picker.endDateChanged.asObservable().subscribe((itemChanged) => {
            this.endDateChanged.emit(itemChanged);
        });
        this.picker.rangeClicked.asObservable().subscribe((range) => {
            this.rangeClicked.emit(range);
        });
        this.picker.datesUpdated.asObservable().subscribe((range) => {
            this.datesUpdated.emit(range);
        });
        this.picker.showDaterangepicker.asObservable().subscribe(() => {
            this.showDaterangepicker.emit();
        });
        this.picker.hideDaterangepicker.asObservable().subscribe(() => {
            this.hideDaterangepicker.emit();
        });
        this.picker.choosedDate.asObservable().subscribe((change) => {
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
    ngOnChanges(changes) {
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
    onBlur() {
        this._onTouched();
    }
    /**
     * Open picker
     *
     * @param event
     */
    open(event) {
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
    hide(e) {
        this.picker.hide(e);
        this.hideDaterangepicker.emit();
    }
    /**
     * Toggle picker
     *
     * @param e
     */
    toggle(e) {
        if (this.picker.isShown) {
            this.hide(e);
        }
        else {
            this.open(e);
        }
    }
    /**
     * Clear picker value
     */
    clear() {
        this.picker.clear();
    }
    /**
     * Set input value
     */
    writeValue(value) {
        this.setValue(value);
    }
    /**
     * Register change
     */
    registerOnChange(fn) {
        this._onChange = fn;
    }
    /**
     * Register on touch
     */
    registerOnTouched(fn) {
        this._onTouched = fn;
    }
    /**
     * Set input value
     */
    setValue(val) {
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
        }
        else {
            this.picker.clear();
        }
    }
    /**
     * Event on input change
     *
     * @param e
     */
    inputChanged(e) {
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
    outsideClick(event) {
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
};
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], DaterangepickerDirective.prototype, "singleDatePicker", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], DaterangepickerDirective.prototype, "showDropdowns", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], DaterangepickerDirective.prototype, "showWeekNumbers", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], DaterangepickerDirective.prototype, "showISOWeekNumbers", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", String)
], DaterangepickerDirective.prototype, "drops", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", String)
], DaterangepickerDirective.prototype, "opens", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], DaterangepickerDirective.prototype, "minDate", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], DaterangepickerDirective.prototype, "maxDate", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], DaterangepickerDirective.prototype, "startDate", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], DaterangepickerDirective.prototype, "endDate", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Number)
], DaterangepickerDirective.prototype, "dateLimit", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], DaterangepickerDirective.prototype, "showCustomRangeLabel", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], DaterangepickerDirective.prototype, "showCancelButton", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], DaterangepickerDirective.prototype, "showApplyButton", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], DaterangepickerDirective.prototype, "showClearButton", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], DaterangepickerDirective.prototype, "keepCalendarOpeningWithRange", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], DaterangepickerDirective.prototype, "showRangeLabelOnInput", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], DaterangepickerDirective.prototype, "customRangeDirection", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], DaterangepickerDirective.prototype, "lockStartDate", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], DaterangepickerDirective.prototype, "autoUpdateInput", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], DaterangepickerDirective.prototype, "alwaysShowCalendars", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], DaterangepickerDirective.prototype, "linkedCalendars", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], DaterangepickerDirective.prototype, "closeOnAutoApply", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], DaterangepickerDirective.prototype, "autoApplyChanges", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], DaterangepickerDirective.prototype, "maxSpan", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Boolean)
], DaterangepickerDirective.prototype, "timePicker", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Boolean)
], DaterangepickerDirective.prototype, "timePicker24Hour", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], DaterangepickerDirective.prototype, "timePickerIncrement", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Boolean)
], DaterangepickerDirective.prototype, "timePickerSeconds", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object),
    tslib_1.__metadata("design:paramtypes", [Object])
], DaterangepickerDirective.prototype, "locale", null);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], DaterangepickerDirective.prototype, "ranges", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Function)
], DaterangepickerDirective.prototype, "isInvalidDate", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Function)
], DaterangepickerDirective.prototype, "isCustomDate", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", String)
], DaterangepickerDirective.prototype, "firstMonthDayClass", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", String)
], DaterangepickerDirective.prototype, "lastMonthDayClass", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", String)
], DaterangepickerDirective.prototype, "emptyWeekRowClass", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", String)
], DaterangepickerDirective.prototype, "firstDayOfNextMonthClass", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", String)
], DaterangepickerDirective.prototype, "lastDayOfPreviousMonthClass", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], DaterangepickerDirective.prototype, "_endKey", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object),
    tslib_1.__metadata("design:paramtypes", [Object])
], DaterangepickerDirective.prototype, "startKey", null);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object),
    tslib_1.__metadata("design:paramtypes", [Object])
], DaterangepickerDirective.prototype, "endKey", null);
tslib_1.__decorate([
    Output('change'),
    tslib_1.__metadata("design:type", EventEmitter)
], DaterangepickerDirective.prototype, "onChange", void 0);
tslib_1.__decorate([
    Output('rangeClicked'),
    tslib_1.__metadata("design:type", EventEmitter)
], DaterangepickerDirective.prototype, "rangeClicked", void 0);
tslib_1.__decorate([
    Output('datesUpdated'),
    tslib_1.__metadata("design:type", EventEmitter)
], DaterangepickerDirective.prototype, "datesUpdated", void 0);
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", EventEmitter)
], DaterangepickerDirective.prototype, "startDateChanged", void 0);
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", EventEmitter)
], DaterangepickerDirective.prototype, "endDateChanged", void 0);
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", EventEmitter)
], DaterangepickerDirective.prototype, "showDaterangepicker", void 0);
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", EventEmitter)
], DaterangepickerDirective.prototype, "hideDaterangepicker", void 0);
tslib_1.__decorate([
    HostListener('document:click', ['$event']),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", void 0)
], DaterangepickerDirective.prototype, "outsideClick", null);
DaterangepickerDirective = DaterangepickerDirective_1 = tslib_1.__decorate([
    Directive({
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
                useExisting: forwardRef(() => DaterangepickerDirective_1), multi: true
            }
        ]
    }),
    tslib_1.__metadata("design:paramtypes", [ViewContainerRef,
        ChangeDetectorRef,
        ComponentFactoryResolver,
        ElementRef,
        Renderer2,
        KeyValueDiffers,
        LocaleService,
        ElementRef])
], DaterangepickerDirective);
export { DaterangepickerDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXJhbmdlcGlja2VyLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1kYXRlcmFuZ2VwaWNrZXItbWF0ZXJpYWwvIiwic291cmNlcyI6WyJkYXRlcmFuZ2VwaWNrZXIuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxnQkFBZ0IsRUFDaEIsd0JBQXdCLEVBQ3hCLFVBQVUsRUFDVixZQUFZLEVBQ1osVUFBVSxFQUNWLGlCQUFpQixFQUlqQixLQUFLLEVBR0wsZUFBZSxFQUNmLE1BQU0sRUFDTixZQUFZLEVBQ1osU0FBUyxFQUNWLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ25ELE9BQU8sS0FBSyxPQUFPLE1BQU0sUUFBUSxDQUFDO0FBRWxDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNqRCxNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUM7QUFpQnZCLElBQWEsd0JBQXdCLGdDQUFyQyxNQUFhLHdCQUF3QjtJQWdKbkMsWUFDUyxnQkFBa0MsRUFDbEMsa0JBQXFDLEVBQ3BDLHlCQUFtRCxFQUNuRCxHQUFlLEVBQ2YsU0FBb0IsRUFDcEIsT0FBd0IsRUFDeEIsY0FBNkIsRUFDN0IsVUFBc0I7UUFQdkIscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUNsQyx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW1CO1FBQ3BDLDhCQUF5QixHQUF6Qix5QkFBeUIsQ0FBMEI7UUFDbkQsUUFBRyxHQUFILEdBQUcsQ0FBWTtRQUNmLGNBQVMsR0FBVCxTQUFTLENBQVc7UUFDcEIsWUFBTyxHQUFQLE9BQU8sQ0FBaUI7UUFDeEIsbUJBQWMsR0FBZCxjQUFjLENBQWU7UUFDN0IsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQXRK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RSw2QkFBNkI7UUFDdkMsSUFBSSxFQUFFO1lBQ0osYUFBYSxFQUFFLFFBQVE7WUFDdkIsUUFBUSxFQUFFLFVBQVU7WUFDcEIsU0FBUyxFQUFFLFFBQVE7WUFDbkIsU0FBUyxFQUFFLHNCQUFzQjtTQUNsQztRQUNELFNBQVMsRUFBRTtZQUNUO2dCQUNFLE9BQU8sRUFBRSxpQkFBaUI7Z0JBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsMEJBQXdCLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSTthQUNyRTtTQUNKO0tBQ0EsQ0FBQzs2Q0FrSjJCLGdCQUFnQjtRQUNkLGlCQUFpQjtRQUNULHdCQUF3QjtRQUM5QyxVQUFVO1FBQ0osU0FBUztRQUNYLGVBQWU7UUFDUixhQUFhO1FBQ2pCLFVBQVU7R0F4SnJCLHdCQUF3QixDQTJXcEM7U0EzV1ksd0JBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgRGlyZWN0aXZlLFxuICBWaWV3Q29udGFpbmVyUmVmLFxuICBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gIEVsZW1lbnRSZWYsXG4gIEhvc3RMaXN0ZW5lcixcbiAgZm9yd2FyZFJlZixcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIE9uSW5pdCxcbiAgT25DaGFuZ2VzLFxuICBTaW1wbGVDaGFuZ2VzLFxuICBJbnB1dCxcbiAgRG9DaGVjayxcbiAgS2V5VmFsdWVEaWZmZXIsXG4gIEtleVZhbHVlRGlmZmVycyxcbiAgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXIsXG4gIFJlbmRlcmVyMlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERhdGVyYW5nZXBpY2tlckNvbXBvbmVudCB9IGZyb20gJy4vZGF0ZXJhbmdlcGlja2VyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCAqIGFzIF9tb21lbnQgZnJvbSAnbW9tZW50JztcbmltcG9ydCB7IExvY2FsZUNvbmZpZyB9IGZyb20gJy4vZGF0ZXJhbmdlcGlja2VyLmNvbmZpZyc7XG5pbXBvcnQgeyBMb2NhbGVTZXJ2aWNlIH0gZnJvbSAnLi9sb2NhbGUuc2VydmljZSc7XG5jb25zdCBtb21lbnQgPSBfbW9tZW50O1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdpbnB1dFtuZ3hEYXRlcmFuZ2VwaWNrZXJNZF0nLFxuICBob3N0OiB7XG4gICAgJyhrZXl1cC5lc2MpJzogJ2hpZGUoKScsXG4gICAgJyhibHVyKSc6ICdvbkJsdXIoKScsXG4gICAgJyhjbGljayknOiAnb3BlbigpJyxcbiAgICAnKGtleXVwKSc6ICdpbnB1dENoYW5nZWQoJGV2ZW50KSdcbiAgfSxcbiAgcHJvdmlkZXJzOiBbXG4gICAge1xuICAgICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBEYXRlcmFuZ2VwaWNrZXJEaXJlY3RpdmUpLCBtdWx0aTogdHJ1ZVxuICAgIH1cbl1cbn0pXG5leHBvcnQgY2xhc3MgRGF0ZXJhbmdlcGlja2VyRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMsIERvQ2hlY2sge1xuICBwdWJsaWMgcGlja2VyOiBEYXRlcmFuZ2VwaWNrZXJDb21wb25lbnQ7XG4gIHByaXZhdGUgX29uQ2hhbmdlID0gRnVuY3Rpb24ucHJvdG90eXBlO1xuICBwcml2YXRlIF9vblRvdWNoZWQgPSBGdW5jdGlvbi5wcm90b3R5cGU7XG4gIHByaXZhdGUgX3ZhbGlkYXRvckNoYW5nZSA9IEZ1bmN0aW9uLnByb3RvdHlwZTtcbiAgcHJpdmF0ZSBfdmFsdWU6IGFueTtcbiAgcHJpdmF0ZSBsb2NhbGVEaWZmZXI6IEtleVZhbHVlRGlmZmVyPHN0cmluZywgYW55PjtcblxuICAvLyBDQUxFTkRBUiBTRVRUSU5HU1xuICAvKiogRmxhZyB0byBkaXNwbGF5IG9ubHkgb25lIGRhdGVwaWNrZXIgKi9cbiAgQElucHV0KCkgc2luZ2xlRGF0ZVBpY2tlciA9IGZhbHNlO1xuICAvKiogRmxhZyB0byBkaXNwbGF5IG1vbnRoIGFuZCB5ZWFyIGRyb3Bkb3ducyAqL1xuICBASW5wdXQoKSBzaG93RHJvcGRvd25zID0gZmFsc2U7XG4gIC8qKiBGbGFnIHRvIGRpc3BsYXkgd2VlayBudW1iZXJzICovXG4gIEBJbnB1dCgpIHNob3dXZWVrTnVtYmVycyA9IGZhbHNlO1xuICAvKiogRmxhZyB0byBkaXNwbGF5IElTTyB3ZWVrIG51bWJlcnMgKi9cbiAgQElucHV0KCkgc2hvd0lTT1dlZWtOdW1iZXJzID0gZmFsc2U7XG4gIC8qKiBQb3NpdGlvbiBjYWxlbmRhciB2ZXJ0aWNhbGx5ICovXG4gIEBJbnB1dCgpIGRyb3BzOiAndXAnIHwgJ2Rvd24nO1xuICAvKiogUG9zaXRpb24gY2FsZW5kYXIgaG9yaXpvbnRhbGx5ICAqL1xuICBASW5wdXQoKSBvcGVuczogJ3JpZ2h0JyB8ICdsZWZ0JyB8ICdjZW50ZXInIHwgJ2F1dG8nO1xuICAvKiogTWluaW11biBzZWxlY3RhYmxlIGRhdGUgKi9cbiAgQElucHV0KCkgbWluRGF0ZTogX21vbWVudC5Nb21lbnQgPSBudWxsO1xuICAvKiogTWF4aW11bSBzZWxlY3RhYmxlIGRhdGUgKi9cbiAgQElucHV0KCkgbWF4RGF0ZTogX21vbWVudC5Nb21lbnQgPSBudWxsO1xuICAvKiogU3RhcnQgZGF0ZSBvZiBjdXJyZW50IHNlbGVjdGlvbiAqL1xuICBASW5wdXQoKSBzdGFydERhdGUgPSBtb21lbnQoKS5zdGFydE9mKCdkYXknKTtcbiAgLyoqIEVuZCBkYXRlIG9mIGN1cnJlbnQgc2VsZWN0aW9uICovXG4gIEBJbnB1dCgpIGVuZERhdGUgPSBtb21lbnQoKS5lbmRPZignZGF5Jyk7XG4gIC8qKiBNYXggbnVtYmVyIG9mIGRhdGVzIGEgdXNlciBjYW4gc2VsZWN0ICovXG4gIEBJbnB1dCgpIGRhdGVMaW1pdDogbnVtYmVyID0gbnVsbDtcbiAgLyoqIEZsYWcgdG8gZGlzcGxheSBjdXN0b20gcmFuZ2UgbGFiZWwgb24gcmFuZ2VzICovXG4gIEBJbnB1dCgpIHNob3dDdXN0b21SYW5nZUxhYmVsID0gZmFsc2U7XG4gIC8qKiBGbGFnIHRvIGRpc3BsYXkgYXBwbHkgYnV0dG9uICovXG4gIEBJbnB1dCgpIHNob3dDYW5jZWxCdXR0b24gPSBmYWxzZTtcbiAgLyoqIEZsYWcgdG8gZGlzcGxheSBhcHBseSBidXR0b24gKi9cbiAgQElucHV0KCkgc2hvd0FwcGx5QnV0dG9uID0gZmFsc2U7XG4gIC8qKiBGbGFnIHRvIGRpc3BsYXkgY2xlYXIgYnV0dG9uICovXG4gIEBJbnB1dCgpIHNob3dDbGVhckJ1dHRvbiA9IGZhbHNlO1xuXG4gIC8vIENBTEVOREFSIEJFSEFWSU9SXG4gIC8qKiBGbGFnIHRvIGtlZXAgdGhlIGNhbGVuZGFyIG9wZW4gYWZ0ZXIgY2hvb3NpbmcgYSByYW5nZSAqL1xuICBASW5wdXQoKSBrZWVwQ2FsZW5kYXJPcGVuaW5nV2l0aFJhbmdlID0gZmFsc2U7XG4gIC8qKiBGbGFnIHRvIGRpc3BsYXkgdGhlIHJhbmdlIGxhYmVsIG9uIGlucHV0ICovXG4gIEBJbnB1dCgpIHNob3dSYW5nZUxhYmVsT25JbnB1dCA9IGZhbHNlO1xuICAvKiogRmxhZyB0byBhbGxvdyBzZWxlY3Rpb24gcmFuZ2UgZnJvbSBlbmQgZGF0ZSBmaXJzdCAqL1xuICBASW5wdXQoKSBjdXN0b21SYW5nZURpcmVjdGlvbiA9IGZhbHNlO1xuICAvKiogRmxhZyB0byBsb2NrIHN0YXJ0IGRhdGUgYW5kIGNoYW5nZSBvbmx5IHRoZSBlbmQgZGF0ZSAqL1xuICBASW5wdXQoKSBsb2NrU3RhcnREYXRlID0gZmFsc2U7XG4gIC8qKiBGbGFnIHRvIHVwZGF0ZSBpbnB1dCB3aGVuIHNlbGVjdGluZyBhIGRhdGUvcmFuZ2UgICovXG4gIEBJbnB1dCgpIGF1dG9VcGRhdGVJbnB1dCA9IHRydWU7XG4gIC8qKiBGbGFnIHRvIGRpc3BsYXkgdGhlIHJhbmdlcyB3aXRoIHRoZSBjYWxlbmRhciovXG4gIEBJbnB1dCgpIGFsd2F5c1Nob3dDYWxlbmRhcnMgPSBmYWxzZTtcbiAgLyoqIEZsYWcgdG8gbGluayBib3RoIGNhbGVuZGFycyAqL1xuICBASW5wdXQoKSBsaW5rZWRDYWxlbmRhcnMgPSBmYWxzZTtcbiAgLyoqIENsb3NlIGRhdGVwaWNrZXIgd2hlbiBhdXRvIGFwcGx5ICovXG4gIEBJbnB1dCgpIGNsb3NlT25BdXRvQXBwbHkgPSB0cnVlO1xuICAvKiogRmxhZyB0byBhdXRvIGFwcGx5IGNoYW5nZXMgb24gc2VsZWN0ICovXG4gIEBJbnB1dCgpIGF1dG9BcHBseUNoYW5nZXMgPSBmYWxzZTtcblxuICBASW5wdXQoKSBtYXhTcGFuID0gZmFsc2U7XG5cbiAgLy8gdGltZXBpY2tlciB2YXJpYWJsZXNcbiAgQElucHV0KCkgdGltZVBpY2tlcjogQm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKSB0aW1lUGlja2VyMjRIb3VyOiBCb29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpIHRpbWVQaWNrZXJJbmNyZW1lbnQgPSAxO1xuICBASW5wdXQoKSB0aW1lUGlja2VyU2Vjb25kczogQm9vbGVhbiA9IGZhbHNlO1xuICAvLyBlbmQgb2YgdGltZXBpY2tlciB2YXJpYWJsZXNcblxuICAvKiogU2V0IGNhbGVuZGFyIGxvY2FsZSBzZXR0aW5ncyAqL1xuICBwcml2YXRlIF9sb2NhbGU6IExvY2FsZUNvbmZpZyA9IHt9O1xuICBASW5wdXQoKSBzZXQgbG9jYWxlKHZhbHVlKSB7XG4gICAgdGhpcy5fbG9jYWxlID0geyAuLi50aGlzLl9sb2NhbGVTZXJ2aWNlLmNvbmZpZywgLi4udmFsdWUgfTtcbiAgfVxuXG4gIGdldCBsb2NhbGUoKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5fbG9jYWxlO1xuICB9XG5cbiAgLyoqIFNldCBjdXN0b20gcmFuZ2VzICovXG4gIEBJbnB1dCgpIHJhbmdlczogYW55O1xuXG4gIC8qKiBDaGVjayBpZiBkYXRlIGlzIGludmFsaWQgKi9cbiAgQElucHV0KCkgaXNJbnZhbGlkRGF0ZTogRnVuY3Rpb247XG4gIC8qKiBDdXN0b20gY2xhc3NlcyBmb3IgYSBkYXRlICovXG4gIEBJbnB1dCgpIGlzQ3VzdG9tRGF0ZTogRnVuY3Rpb247XG5cbiAgLy8gQ1VTVE9NIENTU1xuICBASW5wdXQoKSBmaXJzdE1vbnRoRGF5Q2xhc3M6IHN0cmluZyA9IG51bGw7XG4gIEBJbnB1dCgpIGxhc3RNb250aERheUNsYXNzOiBzdHJpbmcgPSBudWxsO1xuICBASW5wdXQoKSBlbXB0eVdlZWtSb3dDbGFzczogc3RyaW5nID0gbnVsbDtcbiAgQElucHV0KCkgZmlyc3REYXlPZk5leHRNb250aENsYXNzOiBzdHJpbmcgPSBudWxsO1xuICBASW5wdXQoKSBsYXN0RGF5T2ZQcmV2aW91c01vbnRoQ2xhc3M6IHN0cmluZyA9IG51bGw7XG5cbiAgQElucHV0KClcbiAgcHJpdmF0ZSBfZW5kS2V5ID0gJ2VuZERhdGUnO1xuICBwcml2YXRlIF9zdGFydEtleSA9ICdzdGFydERhdGUnO1xuXG4gIEBJbnB1dCgpIHNldCBzdGFydEtleSh2YWx1ZSkge1xuICAgIGlmICh2YWx1ZSAhPT0gbnVsbCkge1xuICAgICAgdGhpcy5fc3RhcnRLZXkgPSB2YWx1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fc3RhcnRLZXkgPSAnc3RhcnREYXRlJztcbiAgICB9XG4gIH1cblxuICBASW5wdXQoKSBzZXQgZW5kS2V5KHZhbHVlKSB7XG4gICAgaWYgKHZhbHVlICE9PSBudWxsKSB7XG4gICAgICB0aGlzLl9lbmRLZXkgPSB2YWx1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fZW5kS2V5ID0gJ2VuZERhdGUnO1xuICAgIH1cbiAgfVxuXG4gIG5vdEZvckNoYW5nZXNQcm9wZXJ0eTogQXJyYXk8c3RyaW5nPiA9IFtcbiAgICAnbG9jYWxlJyxcbiAgICAnZW5kS2V5JyxcbiAgICAnc3RhcnRLZXknXG4gIF07XG5cbiAgZ2V0IHZhbHVlKCkge1xuICAgIHJldHVybiB0aGlzLl92YWx1ZSB8fCBudWxsO1xuICB9XG4gIHNldCB2YWx1ZSh2YWwpIHtcbiAgICB0aGlzLl92YWx1ZSA9IHZhbDtcbiAgICB0aGlzLl9vbkNoYW5nZSh2YWwpO1xuICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgLyoqIEV2ZW50IG9uIGNoYW5nZSAqL1xuICBAT3V0cHV0KCdjaGFuZ2UnKSBvbkNoYW5nZTogRXZlbnRFbWl0dGVyPE9iamVjdD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIC8qKiBFdmVudCBvbiByYW5nZSBjbGlja2VkICovXG4gIEBPdXRwdXQoJ3JhbmdlQ2xpY2tlZCcpIHJhbmdlQ2xpY2tlZDogRXZlbnRFbWl0dGVyPE9iamVjdD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIC8qKiBFdmVudCBvbiBkYXRlcyB1cGRhdGVkICovXG4gIEBPdXRwdXQoJ2RhdGVzVXBkYXRlZCcpIGRhdGVzVXBkYXRlZDogRXZlbnRFbWl0dGVyPE9iamVjdD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAvKiogRXZlbnQgb24gc3RhcnQgZGF0ZSBjaGFuZ2VkICovXG4gIEBPdXRwdXQoKSBzdGFydERhdGVDaGFuZ2VkOiBFdmVudEVtaXR0ZXI8T2JqZWN0PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgLyoqIEV2ZW50IG9uIGVuZCBkYXRlIGNoYW5nZWQgKi9cbiAgQE91dHB1dCgpIGVuZERhdGVDaGFuZ2VkOiBFdmVudEVtaXR0ZXI8T2JqZWN0PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgLyoqIEV2ZW50IHdoZW4gZGF0ZXBpY2tlciBpcyBzaG93biAqL1xuICBAT3V0cHV0KCkgc2hvd0RhdGVyYW5nZXBpY2tlcjogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAvKiogRXZlbnQgd2hlbiBkYXRlcGlja2VyIGlzIGhpZGRlbiAqL1xuICBAT3V0cHV0KCkgaGlkZURhdGVyYW5nZXBpY2tlcjogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyB2aWV3Q29udGFpbmVyUmVmOiBWaWV3Q29udGFpbmVyUmVmLFxuICAgIHB1YmxpYyBfY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIHByaXZhdGUgX2NvbXBvbmVudEZhY3RvcnlSZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICAgIHByaXZhdGUgX2VsOiBFbGVtZW50UmVmLFxuICAgIHByaXZhdGUgX3JlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgcHJpdmF0ZSBkaWZmZXJzOiBLZXlWYWx1ZURpZmZlcnMsXG4gICAgcHJpdmF0ZSBfbG9jYWxlU2VydmljZTogTG9jYWxlU2VydmljZSxcbiAgICBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWZcbiAgKSB7XG4gICAgdGhpcy5kcm9wcyA9ICdkb3duJztcbiAgICB0aGlzLm9wZW5zID0gJ2F1dG8nO1xuICAgIGNvbnN0IGNvbXBvbmVudEZhY3RvcnkgPSB0aGlzLl9jb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoRGF0ZXJhbmdlcGlja2VyQ29tcG9uZW50KTtcbiAgICB2aWV3Q29udGFpbmVyUmVmLmNsZWFyKCk7XG4gICAgY29uc3QgY29tcG9uZW50UmVmID0gdmlld0NvbnRhaW5lclJlZi5jcmVhdGVDb21wb25lbnQoY29tcG9uZW50RmFjdG9yeSk7XG4gICAgdGhpcy5waWNrZXIgPSAoPERhdGVyYW5nZXBpY2tlckNvbXBvbmVudD5jb21wb25lbnRSZWYuaW5zdGFuY2UpO1xuICAgIHRoaXMucGlja2VyLmlubGluZSA9IGZhbHNlOyAvLyBzZXQgaW5saW5lIHRvIGZhbHNlIGZvciBhbGwgZGlyZWN0aXZlIHVzYWdlXG4gIH1cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5waWNrZXIuc3RhcnREYXRlQ2hhbmdlZC5hc09ic2VydmFibGUoKS5zdWJzY3JpYmUoKGl0ZW1DaGFuZ2VkOiBhbnkpID0+IHtcbiAgICAgIHRoaXMuc3RhcnREYXRlQ2hhbmdlZC5lbWl0KGl0ZW1DaGFuZ2VkKTtcbiAgICB9KTtcbiAgICB0aGlzLnBpY2tlci5lbmREYXRlQ2hhbmdlZC5hc09ic2VydmFibGUoKS5zdWJzY3JpYmUoKGl0ZW1DaGFuZ2VkOiBhbnkpID0+IHtcbiAgICAgIHRoaXMuZW5kRGF0ZUNoYW5nZWQuZW1pdChpdGVtQ2hhbmdlZCk7XG4gICAgfSk7XG4gICAgdGhpcy5waWNrZXIucmFuZ2VDbGlja2VkLmFzT2JzZXJ2YWJsZSgpLnN1YnNjcmliZSgocmFuZ2U6IGFueSkgPT4ge1xuICAgICAgdGhpcy5yYW5nZUNsaWNrZWQuZW1pdChyYW5nZSk7XG4gICAgfSk7XG4gICAgdGhpcy5waWNrZXIuZGF0ZXNVcGRhdGVkLmFzT2JzZXJ2YWJsZSgpLnN1YnNjcmliZSgocmFuZ2U6IGFueSkgPT4ge1xuICAgICAgdGhpcy5kYXRlc1VwZGF0ZWQuZW1pdChyYW5nZSk7XG4gICAgfSk7XG4gICAgdGhpcy5waWNrZXIuc2hvd0RhdGVyYW5nZXBpY2tlci5hc09ic2VydmFibGUoKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgdGhpcy5zaG93RGF0ZXJhbmdlcGlja2VyLmVtaXQoKTtcbiAgICB9KTtcbiAgICB0aGlzLnBpY2tlci5oaWRlRGF0ZXJhbmdlcGlja2VyLmFzT2JzZXJ2YWJsZSgpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICB0aGlzLmhpZGVEYXRlcmFuZ2VwaWNrZXIuZW1pdCgpO1xuICAgIH0pO1xuICAgIHRoaXMucGlja2VyLmNob29zZWREYXRlLmFzT2JzZXJ2YWJsZSgpLnN1YnNjcmliZSgoY2hhbmdlOiBhbnkpID0+IHtcbiAgICAgIGlmIChjaGFuZ2UpIHtcbiAgICAgICAgY29uc3QgdmFsdWUgPSB7fTtcbiAgICAgICAgdmFsdWVbdGhpcy5fc3RhcnRLZXldID0gY2hhbmdlLnN0YXJ0RGF0ZTtcbiAgICAgICAgdmFsdWVbdGhpcy5fZW5kS2V5XSA9IGNoYW5nZS5lbmREYXRlO1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICAgIHRoaXMub25DaGFuZ2UuZW1pdCh2YWx1ZSk7XG4gICAgICAgIGlmICh0eXBlb2YgY2hhbmdlLmNob3NlbkxhYmVsID09PSAnc3RyaW5nJykge1xuICAgICAgICAgIHRoaXMuX2VsLm5hdGl2ZUVsZW1lbnQudmFsdWUgPSBjaGFuZ2UuY2hvc2VuTGFiZWw7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgICB0aGlzLnBpY2tlci5maXJzdE1vbnRoRGF5Q2xhc3MgPSB0aGlzLmZpcnN0TW9udGhEYXlDbGFzcztcbiAgICB0aGlzLnBpY2tlci5sYXN0TW9udGhEYXlDbGFzcyA9IHRoaXMubGFzdE1vbnRoRGF5Q2xhc3M7XG4gICAgdGhpcy5waWNrZXIuZW1wdHlXZWVrUm93Q2xhc3MgPSB0aGlzLmVtcHR5V2Vla1Jvd0NsYXNzO1xuICAgIHRoaXMucGlja2VyLmZpcnN0RGF5T2ZOZXh0TW9udGhDbGFzcyA9IHRoaXMuZmlyc3REYXlPZk5leHRNb250aENsYXNzO1xuICAgIHRoaXMucGlja2VyLmxhc3REYXlPZlByZXZpb3VzTW9udGhDbGFzcyA9IHRoaXMubGFzdERheU9mUHJldmlvdXNNb250aENsYXNzO1xuICAgIHRoaXMucGlja2VyLmRyb3BzID0gdGhpcy5kcm9wcztcbiAgICB0aGlzLnBpY2tlci5vcGVucyA9IHRoaXMub3BlbnM7XG4gICAgdGhpcy5sb2NhbGVEaWZmZXIgPSB0aGlzLmRpZmZlcnMuZmluZCh0aGlzLmxvY2FsZSkuY3JlYXRlKCk7XG4gICAgdGhpcy5waWNrZXIuY2xvc2VPbkF1dG9BcHBseSA9IHRoaXMuY2xvc2VPbkF1dG9BcHBseTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkICB7XG4gICAgZm9yIChjb25zdCBjaGFuZ2UgaW4gY2hhbmdlcykge1xuICAgICAgaWYgKGNoYW5nZXMuaGFzT3duUHJvcGVydHkoY2hhbmdlKSkge1xuICAgICAgICBpZiAodGhpcy5ub3RGb3JDaGFuZ2VzUHJvcGVydHkuaW5kZXhPZihjaGFuZ2UpID09PSAtMSkge1xuICAgICAgICAgIHRoaXMucGlja2VyW2NoYW5nZV0gPSBjaGFuZ2VzW2NoYW5nZV0uY3VycmVudFZhbHVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgbmdEb0NoZWNrKCkge1xuICAgIGlmICh0aGlzLmxvY2FsZURpZmZlcikge1xuICAgICAgY29uc3QgY2hhbmdlcyA9IHRoaXMubG9jYWxlRGlmZmVyLmRpZmYodGhpcy5sb2NhbGUpO1xuICAgICAgaWYgKGNoYW5nZXMpIHtcbiAgICAgICAgdGhpcy5waWNrZXIudXBkYXRlTG9jYWxlKHRoaXMubG9jYWxlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRXZlbnQgb24gYmx1clxuICAgKi9cbiAgb25CbHVyKCk6IHZvaWQge1xuICAgIHRoaXMuX29uVG91Y2hlZCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIE9wZW4gcGlja2VyXG4gICAqXG4gICAqIEBwYXJhbSBldmVudFxuICAgKi9cbiAgb3BlbihldmVudD86IGFueSk6IHZvaWQge1xuICAgIHRoaXMucGlja2VyLnNob3coZXZlbnQpO1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5zaG93RGF0ZXJhbmdlcGlja2VyLmVtaXQoKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBIaWRlIHBpY2tlclxuICAgKlxuICAgKiBAcGFyYW0gZVxuICAgKi9cbiAgaGlkZShlPyk6IHZvaWQge1xuICAgIHRoaXMucGlja2VyLmhpZGUoZSk7XG4gICAgdGhpcy5oaWRlRGF0ZXJhbmdlcGlja2VyLmVtaXQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUb2dnbGUgcGlja2VyXG4gICAqXG4gICAqIEBwYXJhbSBlXG4gICAqL1xuICB0b2dnbGUoZT8pOiB2b2lkIHtcbiAgICBpZiAodGhpcy5waWNrZXIuaXNTaG93bikge1xuICAgICAgdGhpcy5oaWRlKGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm9wZW4oZSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENsZWFyIHBpY2tlciB2YWx1ZVxuICAgKi9cbiAgY2xlYXIoKTogdm9pZCB7XG4gICAgdGhpcy5waWNrZXIuY2xlYXIoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgaW5wdXQgdmFsdWVcbiAgICovXG4gIHdyaXRlVmFsdWUodmFsdWUpOiB2b2lkIHtcbiAgICB0aGlzLnNldFZhbHVlKHZhbHVlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZWdpc3RlciBjaGFuZ2VcbiAgICovXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm4pOiB2b2lkIHtcbiAgICB0aGlzLl9vbkNoYW5nZSA9IGZuO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlZ2lzdGVyIG9uIHRvdWNoXG4gICAqL1xuICByZWdpc3Rlck9uVG91Y2hlZChmbik6IHZvaWQge1xuICAgIHRoaXMuX29uVG91Y2hlZCA9IGZuO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCBpbnB1dCB2YWx1ZVxuICAgKi9cbiAgcHJpdmF0ZSBzZXRWYWx1ZSh2YWw6IGFueSk6IHZvaWQge1xuICAgIGlmICh2YWwpIHtcbiAgICAgIHRoaXMudmFsdWUgPSB2YWw7XG4gICAgICBpZiAodmFsW3RoaXMuX3N0YXJ0S2V5XSkge1xuICAgICAgICB0aGlzLnBpY2tlci5zZXRTdGFydERhdGUodmFsW3RoaXMuX3N0YXJ0S2V5XSk7XG4gICAgICB9XG4gICAgICBpZiAodmFsW3RoaXMuX2VuZEtleV0pIHtcbiAgICAgICAgdGhpcy5waWNrZXIuc2V0RW5kRGF0ZSh2YWxbdGhpcy5fZW5kS2V5XSk7XG4gICAgICB9XG4gICAgICB0aGlzLnBpY2tlci5jYWxjdWxhdGVDaG9zZW5MYWJlbCgpO1xuICAgICAgaWYgKHRoaXMucGlja2VyLmNob3NlbkxhYmVsKSB7XG4gICAgICAgIHRoaXMuX2VsLm5hdGl2ZUVsZW1lbnQudmFsdWUgPSB0aGlzLnBpY2tlci5jaG9zZW5MYWJlbDtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5waWNrZXIuY2xlYXIoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRXZlbnQgb24gaW5wdXQgY2hhbmdlXG4gICAqXG4gICAqIEBwYXJhbSBlXG4gICAqL1xuICBpbnB1dENoYW5nZWQoZSk6IHZvaWQge1xuICAgIGlmIChlLnRhcmdldC50YWdOYW1lLnRvTG93ZXJDYXNlKCkgIT09ICdpbnB1dCcpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKCFlLnRhcmdldC52YWx1ZS5sZW5ndGgpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgZGF0ZVN0cmluZyA9IGUudGFyZ2V0LnZhbHVlLnNwbGl0KHRoaXMucGlja2VyLmxvY2FsZS5zZXBhcmF0b3IpO1xuICAgIGxldCBzdGFydCA9IG51bGwsIGVuZCA9IG51bGw7XG4gICAgaWYgKGRhdGVTdHJpbmcubGVuZ3RoID09PSAyKSB7XG4gICAgICBzdGFydCA9IG1vbWVudChkYXRlU3RyaW5nWzBdLCB0aGlzLnBpY2tlci5sb2NhbGUuZm9ybWF0KTtcbiAgICAgIGVuZCA9IG1vbWVudChkYXRlU3RyaW5nWzFdLCB0aGlzLnBpY2tlci5sb2NhbGUuZm9ybWF0KTtcbiAgICB9XG4gICAgaWYgKHRoaXMuc2luZ2xlRGF0ZVBpY2tlciB8fCBzdGFydCA9PT0gbnVsbCB8fCBlbmQgPT09IG51bGwpIHtcbiAgICAgIHN0YXJ0ID0gbW9tZW50KGUudGFyZ2V0LnZhbHVlLCB0aGlzLnBpY2tlci5sb2NhbGUuZm9ybWF0KTtcbiAgICAgIGVuZCA9IHN0YXJ0O1xuICAgIH1cbiAgICBpZiAoIXN0YXJ0LmlzVmFsaWQoKSB8fCAhZW5kLmlzVmFsaWQoKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLnBpY2tlci5zZXRTdGFydERhdGUoc3RhcnQpO1xuICAgIHRoaXMucGlja2VyLnNldEVuZERhdGUoZW5kKTtcbiAgICB0aGlzLnBpY2tlci51cGRhdGVWaWV3KCk7XG4gIH1cblxuICAvKipcbiAgICogRm9yIGNsaWNrIG91dHNpZGUgb2YgdGhlIGNhbGVuZGFyJ3MgY29udGFpbmVyXG4gICAqXG4gICAqIEBwYXJhbSBldmVudCBldmVudCBvYmplY3RcbiAgICovXG4gIEBIb3N0TGlzdGVuZXIoJ2RvY3VtZW50OmNsaWNrJywgWyckZXZlbnQnXSlcbiAgb3V0c2lkZUNsaWNrKGV2ZW50KTogdm9pZCB7XG4gICAgaWYgKCFldmVudC50YXJnZXQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnbmd4LWRhdGVyYW5nZXBpY2tlci1hY3Rpb24nKSB8fCBldmVudC50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdjZGstb3ZlcmxheS1iYWNrZHJvcCcpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5jb250YWlucyhldmVudC50YXJnZXQpKSB7XG4gICAgICB0aGlzLmhpZGUoKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==