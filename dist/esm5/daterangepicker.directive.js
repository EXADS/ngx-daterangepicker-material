import * as tslib_1 from "tslib";
import { Directive, ViewContainerRef, ComponentFactoryResolver, ElementRef, HostListener, forwardRef, ChangeDetectorRef, Input, KeyValueDiffers, Output, EventEmitter, Renderer2 } from '@angular/core';
import { DaterangepickerComponent } from './daterangepicker.component';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import * as _moment from 'moment';
import { LocaleService } from './locale.service';
var moment = _moment;
var DaterangepickerDirective = /** @class */ (function () {
    function DaterangepickerDirective(viewContainerRef, _changeDetectorRef, _componentFactoryResolver, _el, _renderer, differs, _localeService, elementRef) {
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
        var componentFactory = this._componentFactoryResolver.resolveComponentFactory(DaterangepickerComponent);
        viewContainerRef.clear();
        var componentRef = viewContainerRef.createComponent(componentFactory);
        this.picker = componentRef.instance;
        this.picker.inline = false; // set inline to false for all directive usage
    }
    DaterangepickerDirective_1 = DaterangepickerDirective;
    Object.defineProperty(DaterangepickerDirective.prototype, "locale", {
        get: function () {
            return this._locale;
        },
        set: function (value) {
            this._locale = tslib_1.__assign({}, this._localeService.config, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DaterangepickerDirective.prototype, "startKey", {
        set: function (value) {
            if (value !== null) {
                this._startKey = value;
            }
            else {
                this._startKey = 'startDate';
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DaterangepickerDirective.prototype, "endKey", {
        set: function (value) {
            if (value !== null) {
                this._endKey = value;
            }
            else {
                this._endKey = 'endDate';
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DaterangepickerDirective.prototype, "value", {
        get: function () {
            return this._value || null;
        },
        set: function (val) {
            this._value = val;
            this._onChange(val);
            this._changeDetectorRef.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    DaterangepickerDirective.prototype.ngOnInit = function () {
        var _this = this;
        this.picker.startDateChanged.asObservable().subscribe(function (itemChanged) {
            _this.startDateChanged.emit(itemChanged);
        });
        this.picker.endDateChanged.asObservable().subscribe(function (itemChanged) {
            _this.endDateChanged.emit(itemChanged);
        });
        this.picker.rangeClicked.asObservable().subscribe(function (range) {
            _this.rangeClicked.emit(range);
        });
        this.picker.datesUpdated.asObservable().subscribe(function (range) {
            _this.datesUpdated.emit(range);
        });
        this.picker.showDaterangepicker.asObservable().subscribe(function () {
            _this.showDaterangepicker.emit();
        });
        this.picker.hideDaterangepicker.asObservable().subscribe(function () {
            _this.hideDaterangepicker.emit();
        });
        this.picker.choosedDate.asObservable().subscribe(function (change) {
            if (change) {
                var value = {};
                value[_this._startKey] = change.startDate;
                value[_this._endKey] = change.endDate;
                _this.value = value;
                _this.onChange.emit(value);
                if (typeof change.chosenLabel === 'string') {
                    _this._el.nativeElement.value = change.chosenLabel;
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
    };
    DaterangepickerDirective.prototype.ngOnChanges = function (changes) {
        for (var change in changes) {
            if (changes.hasOwnProperty(change)) {
                if (this.notForChangesProperty.indexOf(change) === -1) {
                    this.picker[change] = changes[change].currentValue;
                }
            }
        }
    };
    DaterangepickerDirective.prototype.ngDoCheck = function () {
        if (this.localeDiffer) {
            var changes = this.localeDiffer.diff(this.locale);
            if (changes) {
                this.picker.updateLocale(this.locale);
            }
        }
    };
    /**
     * Event on blur
     */
    DaterangepickerDirective.prototype.onBlur = function () {
        this._onTouched();
    };
    /**
     * Open picker
     *
     * @param event
     */
    DaterangepickerDirective.prototype.open = function (event) {
        var _this = this;
        this.picker.show(event);
        setTimeout(function () {
            _this.showDaterangepicker.emit();
        });
    };
    /**
     * Hide picker
     *
     * @param e
     */
    DaterangepickerDirective.prototype.hide = function (e) {
        this.picker.hide(e);
        this.hideDaterangepicker.emit();
    };
    /**
     * Toggle picker
     *
     * @param e
     */
    DaterangepickerDirective.prototype.toggle = function (e) {
        if (this.picker.isShown) {
            this.hide(e);
        }
        else {
            this.open(e);
        }
    };
    /**
     * Clear picker value
     */
    DaterangepickerDirective.prototype.clear = function () {
        this.picker.clear();
    };
    /**
     * Set input value
     */
    DaterangepickerDirective.prototype.writeValue = function (value) {
        this.setValue(value);
    };
    /**
     * Register change
     */
    DaterangepickerDirective.prototype.registerOnChange = function (fn) {
        this._onChange = fn;
    };
    /**
     * Register on touch
     */
    DaterangepickerDirective.prototype.registerOnTouched = function (fn) {
        this._onTouched = fn;
    };
    /**
     * Set input value
     */
    DaterangepickerDirective.prototype.setValue = function (val) {
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
    };
    /**
     * Event on input change
     *
     * @param e
     */
    DaterangepickerDirective.prototype.inputChanged = function (e) {
        if (e.target.tagName.toLowerCase() !== 'input') {
            return;
        }
        if (!e.target.value.length) {
            return;
        }
        var dateString = e.target.value.split(this.picker.locale.separator);
        var start = null, end = null;
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
    };
    /**
     * For click outside of the calendar's container
     *
     * @param event event object
     */
    DaterangepickerDirective.prototype.outsideClick = function (event) {
        if (!event.target) {
            return;
        }
        if (event.target.classList.contains('ngx-daterangepicker-action') || event.target.classList.contains('cdk-overlay-backdrop')) {
            return;
        }
        if (!this.elementRef.nativeElement.contains(event.target)) {
            this.hide();
        }
    };
    var DaterangepickerDirective_1;
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
                    useExisting: forwardRef(function () { return DaterangepickerDirective_1; }), multi: true
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
    return DaterangepickerDirective;
}());
export { DaterangepickerDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXJhbmdlcGlja2VyLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1kYXRlcmFuZ2VwaWNrZXItbWF0ZXJpYWwvIiwic291cmNlcyI6WyJkYXRlcmFuZ2VwaWNrZXIuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULGdCQUFnQixFQUNoQix3QkFBd0IsRUFDeEIsVUFBVSxFQUNWLFlBQVksRUFDWixVQUFVLEVBQ1YsaUJBQWlCLEVBSWpCLEtBQUssRUFHTCxlQUFlLEVBQ2YsTUFBTSxFQUNOLFlBQVksRUFDWixTQUFTLEVBQ1YsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDdkUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDbkQsT0FBTyxLQUFLLE9BQU8sTUFBTSxRQUFRLENBQUM7QUFFbEMsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ2pELElBQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQztBQWlCdkI7SUFnSkUsa0NBQ1MsZ0JBQWtDLEVBQ2xDLGtCQUFxQyxFQUNwQyx5QkFBbUQsRUFDbkQsR0FBZSxFQUNmLFNBQW9CLEVBQ3BCLE9BQXdCLEVBQ3hCLGNBQTZCLEVBQzdCLFVBQXNCO1FBUHZCLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDbEMsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFtQjtRQUNwQyw4QkFBeUIsR0FBekIseUJBQXlCLENBQTBCO1FBQ25ELFFBQUcsR0FBSCxHQUFHLENBQVk7UUFDZixjQUFTLEdBQVQsU0FBUyxDQUFXO1FBQ3BCLFlBQU8sR0FBUCxPQUFPLENBQWlCO1FBQ3hCLG1CQUFjLEdBQWQsY0FBYyxDQUFlO1FBQzdCLGVBQVUsR0FBVixVQUFVLENBQVk7UUF0SnhCLGNBQVMsR0FBRyxRQUFRLENBQUMsU0FBUyxDQUFD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O2dFQWExQztJQTFXVSx3QkFBd0I7UUFmcEMsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLDZCQUE2QjtZQUN2QyxJQUFJLEVBQUU7Z0JBQ0osYUFBYSxFQUFFLFFBQVE7Z0JBQ3ZCLFFBQVEsRUFBRSxVQUFVO2dCQUNwQixTQUFTLEVBQUUsUUFBUTtnQkFDbkIsU0FBUyxFQUFFLHNCQUFzQjthQUNsQztZQUNELFNBQVMsRUFBRTtnQkFDVDtvQkFDRSxPQUFPLEVBQUUsaUJBQWlCO29CQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLGNBQU0sT0FBQSwwQkFBd0IsRUFBeEIsQ0FBd0IsQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJO2lCQUNyRTthQUNKO1NBQ0EsQ0FBQztpREFrSjJCLGdCQUFnQjtZQUNkLGlCQUFpQjtZQUNULHdCQUF3QjtZQUM5QyxVQUFVO1lBQ0osU0FBUztZQUNYLGVBQWU7WUFDUixhQUFhO1lBQ2pCLFVBQVU7T0F4SnJCLHdCQUF3QixDQTJXcEM7SUFBRCwrQkFBQztDQUFBLEFBM1dELElBMldDO1NBM1dZLHdCQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIERpcmVjdGl2ZSxcbiAgVmlld0NvbnRhaW5lclJlZixcbiAgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICBFbGVtZW50UmVmLFxuICBIb3N0TGlzdGVuZXIsXG4gIGZvcndhcmRSZWYsXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBPbkluaXQsXG4gIE9uQ2hhbmdlcyxcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgSW5wdXQsXG4gIERvQ2hlY2ssXG4gIEtleVZhbHVlRGlmZmVyLFxuICBLZXlWYWx1ZURpZmZlcnMsXG4gIE91dHB1dCxcbiAgRXZlbnRFbWl0dGVyLFxuICBSZW5kZXJlcjJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEYXRlcmFuZ2VwaWNrZXJDb21wb25lbnQgfSBmcm9tICcuL2RhdGVyYW5nZXBpY2tlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgKiBhcyBfbW9tZW50IGZyb20gJ21vbWVudCc7XG5pbXBvcnQgeyBMb2NhbGVDb25maWcgfSBmcm9tICcuL2RhdGVyYW5nZXBpY2tlci5jb25maWcnO1xuaW1wb3J0IHsgTG9jYWxlU2VydmljZSB9IGZyb20gJy4vbG9jYWxlLnNlcnZpY2UnO1xuY29uc3QgbW9tZW50ID0gX21vbWVudDtcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnaW5wdXRbbmd4RGF0ZXJhbmdlcGlja2VyTWRdJyxcbiAgaG9zdDoge1xuICAgICcoa2V5dXAuZXNjKSc6ICdoaWRlKCknLFxuICAgICcoYmx1ciknOiAnb25CbHVyKCknLFxuICAgICcoY2xpY2spJzogJ29wZW4oKScsXG4gICAgJyhrZXl1cCknOiAnaW5wdXRDaGFuZ2VkKCRldmVudCknXG4gIH0sXG4gIHByb3ZpZGVyczogW1xuICAgIHtcbiAgICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gRGF0ZXJhbmdlcGlja2VyRGlyZWN0aXZlKSwgbXVsdGk6IHRydWVcbiAgICB9XG5dXG59KVxuZXhwb3J0IGNsYXNzIERhdGVyYW5nZXBpY2tlckRpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzLCBEb0NoZWNrIHtcbiAgcHVibGljIHBpY2tlcjogRGF0ZXJhbmdlcGlja2VyQ29tcG9uZW50O1xuICBwcml2YXRlIF9vbkNoYW5nZSA9IEZ1bmN0aW9uLnByb3RvdHlwZTtcbiAgcHJpdmF0ZSBfb25Ub3VjaGVkID0gRnVuY3Rpb24ucHJvdG90eXBlO1xuICBwcml2YXRlIF92YWxpZGF0b3JDaGFuZ2UgPSBGdW5jdGlvbi5wcm90b3R5cGU7XG4gIHByaXZhdGUgX3ZhbHVlOiBhbnk7XG4gIHByaXZhdGUgbG9jYWxlRGlmZmVyOiBLZXlWYWx1ZURpZmZlcjxzdHJpbmcsIGFueT47XG5cbiAgLy8gQ0FMRU5EQVIgU0VUVElOR1NcbiAgLyoqIEZsYWcgdG8gZGlzcGxheSBvbmx5IG9uZSBkYXRlcGlja2VyICovXG4gIEBJbnB1dCgpIHNpbmdsZURhdGVQaWNrZXIgPSBmYWxzZTtcbiAgLyoqIEZsYWcgdG8gZGlzcGxheSBtb250aCBhbmQgeWVhciBkcm9wZG93bnMgKi9cbiAgQElucHV0KCkgc2hvd0Ryb3Bkb3ducyA9IGZhbHNlO1xuICAvKiogRmxhZyB0byBkaXNwbGF5IHdlZWsgbnVtYmVycyAqL1xuICBASW5wdXQoKSBzaG93V2Vla051bWJlcnMgPSBmYWxzZTtcbiAgLyoqIEZsYWcgdG8gZGlzcGxheSBJU08gd2VlayBudW1iZXJzICovXG4gIEBJbnB1dCgpIHNob3dJU09XZWVrTnVtYmVycyA9IGZhbHNlO1xuICAvKiogUG9zaXRpb24gY2FsZW5kYXIgdmVydGljYWxseSAqL1xuICBASW5wdXQoKSBkcm9wczogJ3VwJyB8ICdkb3duJztcbiAgLyoqIFBvc2l0aW9uIGNhbGVuZGFyIGhvcml6b250YWxseSAgKi9cbiAgQElucHV0KCkgb3BlbnM6ICdyaWdodCcgfCAnbGVmdCcgfCAnY2VudGVyJyB8ICdhdXRvJztcbiAgLyoqIE1pbmltdW4gc2VsZWN0YWJsZSBkYXRlICovXG4gIEBJbnB1dCgpIG1pbkRhdGU6IF9tb21lbnQuTW9tZW50ID0gbnVsbDtcbiAgLyoqIE1heGltdW0gc2VsZWN0YWJsZSBkYXRlICovXG4gIEBJbnB1dCgpIG1heERhdGU6IF9tb21lbnQuTW9tZW50ID0gbnVsbDtcbiAgLyoqIFN0YXJ0IGRhdGUgb2YgY3VycmVudCBzZWxlY3Rpb24gKi9cbiAgQElucHV0KCkgc3RhcnREYXRlID0gbW9tZW50KCkuc3RhcnRPZignZGF5Jyk7XG4gIC8qKiBFbmQgZGF0ZSBvZiBjdXJyZW50IHNlbGVjdGlvbiAqL1xuICBASW5wdXQoKSBlbmREYXRlID0gbW9tZW50KCkuZW5kT2YoJ2RheScpO1xuICAvKiogTWF4IG51bWJlciBvZiBkYXRlcyBhIHVzZXIgY2FuIHNlbGVjdCAqL1xuICBASW5wdXQoKSBkYXRlTGltaXQ6IG51bWJlciA9IG51bGw7XG4gIC8qKiBGbGFnIHRvIGRpc3BsYXkgY3VzdG9tIHJhbmdlIGxhYmVsIG9uIHJhbmdlcyAqL1xuICBASW5wdXQoKSBzaG93Q3VzdG9tUmFuZ2VMYWJlbCA9IGZhbHNlO1xuICAvKiogRmxhZyB0byBkaXNwbGF5IGFwcGx5IGJ1dHRvbiAqL1xuICBASW5wdXQoKSBzaG93Q2FuY2VsQnV0dG9uID0gZmFsc2U7XG4gIC8qKiBGbGFnIHRvIGRpc3BsYXkgYXBwbHkgYnV0dG9uICovXG4gIEBJbnB1dCgpIHNob3dBcHBseUJ1dHRvbiA9IGZhbHNlO1xuICAvKiogRmxhZyB0byBkaXNwbGF5IGNsZWFyIGJ1dHRvbiAqL1xuICBASW5wdXQoKSBzaG93Q2xlYXJCdXR0b24gPSBmYWxzZTtcblxuICAvLyBDQUxFTkRBUiBCRUhBVklPUlxuICAvKiogRmxhZyB0byBrZWVwIHRoZSBjYWxlbmRhciBvcGVuIGFmdGVyIGNob29zaW5nIGEgcmFuZ2UgKi9cbiAgQElucHV0KCkga2VlcENhbGVuZGFyT3BlbmluZ1dpdGhSYW5nZSA9IGZhbHNlO1xuICAvKiogRmxhZyB0byBkaXNwbGF5IHRoZSByYW5nZSBsYWJlbCBvbiBpbnB1dCAqL1xuICBASW5wdXQoKSBzaG93UmFuZ2VMYWJlbE9uSW5wdXQgPSBmYWxzZTtcbiAgLyoqIEZsYWcgdG8gYWxsb3cgc2VsZWN0aW9uIHJhbmdlIGZyb20gZW5kIGRhdGUgZmlyc3QgKi9cbiAgQElucHV0KCkgY3VzdG9tUmFuZ2VEaXJlY3Rpb24gPSBmYWxzZTtcbiAgLyoqIEZsYWcgdG8gbG9jayBzdGFydCBkYXRlIGFuZCBjaGFuZ2Ugb25seSB0aGUgZW5kIGRhdGUgKi9cbiAgQElucHV0KCkgbG9ja1N0YXJ0RGF0ZSA9IGZhbHNlO1xuICAvKiogRmxhZyB0byB1cGRhdGUgaW5wdXQgd2hlbiBzZWxlY3RpbmcgYSBkYXRlL3JhbmdlICAqL1xuICBASW5wdXQoKSBhdXRvVXBkYXRlSW5wdXQgPSB0cnVlO1xuICAvKiogRmxhZyB0byBkaXNwbGF5IHRoZSByYW5nZXMgd2l0aCB0aGUgY2FsZW5kYXIqL1xuICBASW5wdXQoKSBhbHdheXNTaG93Q2FsZW5kYXJzID0gZmFsc2U7XG4gIC8qKiBGbGFnIHRvIGxpbmsgYm90aCBjYWxlbmRhcnMgKi9cbiAgQElucHV0KCkgbGlua2VkQ2FsZW5kYXJzID0gZmFsc2U7XG4gIC8qKiBDbG9zZSBkYXRlcGlja2VyIHdoZW4gYXV0byBhcHBseSAqL1xuICBASW5wdXQoKSBjbG9zZU9uQXV0b0FwcGx5ID0gdHJ1ZTtcbiAgLyoqIEZsYWcgdG8gYXV0byBhcHBseSBjaGFuZ2VzIG9uIHNlbGVjdCAqL1xuICBASW5wdXQoKSBhdXRvQXBwbHlDaGFuZ2VzID0gZmFsc2U7XG5cbiAgQElucHV0KCkgbWF4U3BhbiA9IGZhbHNlO1xuXG4gIC8vIHRpbWVwaWNrZXIgdmFyaWFibGVzXG4gIEBJbnB1dCgpIHRpbWVQaWNrZXI6IEJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCkgdGltZVBpY2tlcjI0SG91cjogQm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKSB0aW1lUGlja2VySW5jcmVtZW50ID0gMTtcbiAgQElucHV0KCkgdGltZVBpY2tlclNlY29uZHM6IEJvb2xlYW4gPSBmYWxzZTtcbiAgLy8gZW5kIG9mIHRpbWVwaWNrZXIgdmFyaWFibGVzXG5cbiAgLyoqIFNldCBjYWxlbmRhciBsb2NhbGUgc2V0dGluZ3MgKi9cbiAgcHJpdmF0ZSBfbG9jYWxlOiBMb2NhbGVDb25maWcgPSB7fTtcbiAgQElucHV0KCkgc2V0IGxvY2FsZSh2YWx1ZSkge1xuICAgIHRoaXMuX2xvY2FsZSA9IHsgLi4udGhpcy5fbG9jYWxlU2VydmljZS5jb25maWcsIC4uLnZhbHVlIH07XG4gIH1cblxuICBnZXQgbG9jYWxlKCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuX2xvY2FsZTtcbiAgfVxuXG4gIC8qKiBTZXQgY3VzdG9tIHJhbmdlcyAqL1xuICBASW5wdXQoKSByYW5nZXM6IGFueTtcblxuICAvKiogQ2hlY2sgaWYgZGF0ZSBpcyBpbnZhbGlkICovXG4gIEBJbnB1dCgpIGlzSW52YWxpZERhdGU6IEZ1bmN0aW9uO1xuICAvKiogQ3VzdG9tIGNsYXNzZXMgZm9yIGEgZGF0ZSAqL1xuICBASW5wdXQoKSBpc0N1c3RvbURhdGU6IEZ1bmN0aW9uO1xuXG4gIC8vIENVU1RPTSBDU1NcbiAgQElucHV0KCkgZmlyc3RNb250aERheUNsYXNzOiBzdHJpbmcgPSBudWxsO1xuICBASW5wdXQoKSBsYXN0TW9udGhEYXlDbGFzczogc3RyaW5nID0gbnVsbDtcbiAgQElucHV0KCkgZW1wdHlXZWVrUm93Q2xhc3M6IHN0cmluZyA9IG51bGw7XG4gIEBJbnB1dCgpIGZpcnN0RGF5T2ZOZXh0TW9udGhDbGFzczogc3RyaW5nID0gbnVsbDtcbiAgQElucHV0KCkgbGFzdERheU9mUHJldmlvdXNNb250aENsYXNzOiBzdHJpbmcgPSBudWxsO1xuXG4gIEBJbnB1dCgpXG4gIHByaXZhdGUgX2VuZEtleSA9ICdlbmREYXRlJztcbiAgcHJpdmF0ZSBfc3RhcnRLZXkgPSAnc3RhcnREYXRlJztcblxuICBASW5wdXQoKSBzZXQgc3RhcnRLZXkodmFsdWUpIHtcbiAgICBpZiAodmFsdWUgIT09IG51bGwpIHtcbiAgICAgIHRoaXMuX3N0YXJ0S2V5ID0gdmFsdWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX3N0YXJ0S2V5ID0gJ3N0YXJ0RGF0ZSc7XG4gICAgfVxuICB9XG5cbiAgQElucHV0KCkgc2V0IGVuZEtleSh2YWx1ZSkge1xuICAgIGlmICh2YWx1ZSAhPT0gbnVsbCkge1xuICAgICAgdGhpcy5fZW5kS2V5ID0gdmFsdWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2VuZEtleSA9ICdlbmREYXRlJztcbiAgICB9XG4gIH1cblxuICBub3RGb3JDaGFuZ2VzUHJvcGVydHk6IEFycmF5PHN0cmluZz4gPSBbXG4gICAgJ2xvY2FsZScsXG4gICAgJ2VuZEtleScsXG4gICAgJ3N0YXJ0S2V5J1xuICBdO1xuXG4gIGdldCB2YWx1ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fdmFsdWUgfHwgbnVsbDtcbiAgfVxuICBzZXQgdmFsdWUodmFsKSB7XG4gICAgdGhpcy5fdmFsdWUgPSB2YWw7XG4gICAgdGhpcy5fb25DaGFuZ2UodmFsKTtcbiAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIC8qKiBFdmVudCBvbiBjaGFuZ2UgKi9cbiAgQE91dHB1dCgnY2hhbmdlJykgb25DaGFuZ2U6IEV2ZW50RW1pdHRlcjxPYmplY3Q+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAvKiogRXZlbnQgb24gcmFuZ2UgY2xpY2tlZCAqL1xuICBAT3V0cHV0KCdyYW5nZUNsaWNrZWQnKSByYW5nZUNsaWNrZWQ6IEV2ZW50RW1pdHRlcjxPYmplY3Q+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAvKiogRXZlbnQgb24gZGF0ZXMgdXBkYXRlZCAqL1xuICBAT3V0cHV0KCdkYXRlc1VwZGF0ZWQnKSBkYXRlc1VwZGF0ZWQ6IEV2ZW50RW1pdHRlcjxPYmplY3Q+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgLyoqIEV2ZW50IG9uIHN0YXJ0IGRhdGUgY2hhbmdlZCAqL1xuICBAT3V0cHV0KCkgc3RhcnREYXRlQ2hhbmdlZDogRXZlbnRFbWl0dGVyPE9iamVjdD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIC8qKiBFdmVudCBvbiBlbmQgZGF0ZSBjaGFuZ2VkICovXG4gIEBPdXRwdXQoKSBlbmREYXRlQ2hhbmdlZDogRXZlbnRFbWl0dGVyPE9iamVjdD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIC8qKiBFdmVudCB3aGVuIGRhdGVwaWNrZXIgaXMgc2hvd24gKi9cbiAgQE91dHB1dCgpIHNob3dEYXRlcmFuZ2VwaWNrZXI6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgLyoqIEV2ZW50IHdoZW4gZGF0ZXBpY2tlciBpcyBoaWRkZW4gKi9cbiAgQE91dHB1dCgpIGhpZGVEYXRlcmFuZ2VwaWNrZXI6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgdmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZixcbiAgICBwdWJsaWMgX2NoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBwcml2YXRlIF9jb21wb25lbnRGYWN0b3J5UmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgICBwcml2YXRlIF9lbDogRWxlbWVudFJlZixcbiAgICBwcml2YXRlIF9yZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgIHByaXZhdGUgZGlmZmVyczogS2V5VmFsdWVEaWZmZXJzLFxuICAgIHByaXZhdGUgX2xvY2FsZVNlcnZpY2U6IExvY2FsZVNlcnZpY2UsXG4gICAgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmXG4gICkge1xuICAgIHRoaXMuZHJvcHMgPSAnZG93bic7XG4gICAgdGhpcy5vcGVucyA9ICdhdXRvJztcbiAgICBjb25zdCBjb21wb25lbnRGYWN0b3J5ID0gdGhpcy5fY29tcG9uZW50RmFjdG9yeVJlc29sdmVyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KERhdGVyYW5nZXBpY2tlckNvbXBvbmVudCk7XG4gICAgdmlld0NvbnRhaW5lclJlZi5jbGVhcigpO1xuICAgIGNvbnN0IGNvbXBvbmVudFJlZiA9IHZpZXdDb250YWluZXJSZWYuY3JlYXRlQ29tcG9uZW50KGNvbXBvbmVudEZhY3RvcnkpO1xuICAgIHRoaXMucGlja2VyID0gKDxEYXRlcmFuZ2VwaWNrZXJDb21wb25lbnQ+Y29tcG9uZW50UmVmLmluc3RhbmNlKTtcbiAgICB0aGlzLnBpY2tlci5pbmxpbmUgPSBmYWxzZTsgLy8gc2V0IGlubGluZSB0byBmYWxzZSBmb3IgYWxsIGRpcmVjdGl2ZSB1c2FnZVxuICB9XG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMucGlja2VyLnN0YXJ0RGF0ZUNoYW5nZWQuYXNPYnNlcnZhYmxlKCkuc3Vic2NyaWJlKChpdGVtQ2hhbmdlZDogYW55KSA9PiB7XG4gICAgICB0aGlzLnN0YXJ0RGF0ZUNoYW5nZWQuZW1pdChpdGVtQ2hhbmdlZCk7XG4gICAgfSk7XG4gICAgdGhpcy5waWNrZXIuZW5kRGF0ZUNoYW5nZWQuYXNPYnNlcnZhYmxlKCkuc3Vic2NyaWJlKChpdGVtQ2hhbmdlZDogYW55KSA9PiB7XG4gICAgICB0aGlzLmVuZERhdGVDaGFuZ2VkLmVtaXQoaXRlbUNoYW5nZWQpO1xuICAgIH0pO1xuICAgIHRoaXMucGlja2VyLnJhbmdlQ2xpY2tlZC5hc09ic2VydmFibGUoKS5zdWJzY3JpYmUoKHJhbmdlOiBhbnkpID0+IHtcbiAgICAgIHRoaXMucmFuZ2VDbGlja2VkLmVtaXQocmFuZ2UpO1xuICAgIH0pO1xuICAgIHRoaXMucGlja2VyLmRhdGVzVXBkYXRlZC5hc09ic2VydmFibGUoKS5zdWJzY3JpYmUoKHJhbmdlOiBhbnkpID0+IHtcbiAgICAgIHRoaXMuZGF0ZXNVcGRhdGVkLmVtaXQocmFuZ2UpO1xuICAgIH0pO1xuICAgIHRoaXMucGlja2VyLnNob3dEYXRlcmFuZ2VwaWNrZXIuYXNPYnNlcnZhYmxlKCkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMuc2hvd0RhdGVyYW5nZXBpY2tlci5lbWl0KCk7XG4gICAgfSk7XG4gICAgdGhpcy5waWNrZXIuaGlkZURhdGVyYW5nZXBpY2tlci5hc09ic2VydmFibGUoKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgdGhpcy5oaWRlRGF0ZXJhbmdlcGlja2VyLmVtaXQoKTtcbiAgICB9KTtcbiAgICB0aGlzLnBpY2tlci5jaG9vc2VkRGF0ZS5hc09ic2VydmFibGUoKS5zdWJzY3JpYmUoKGNoYW5nZTogYW55KSA9PiB7XG4gICAgICBpZiAoY2hhbmdlKSB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0ge307XG4gICAgICAgIHZhbHVlW3RoaXMuX3N0YXJ0S2V5XSA9IGNoYW5nZS5zdGFydERhdGU7XG4gICAgICAgIHZhbHVlW3RoaXMuX2VuZEtleV0gPSBjaGFuZ2UuZW5kRGF0ZTtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgICAgICB0aGlzLm9uQ2hhbmdlLmVtaXQodmFsdWUpO1xuICAgICAgICBpZiAodHlwZW9mIGNoYW5nZS5jaG9zZW5MYWJlbCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICB0aGlzLl9lbC5uYXRpdmVFbGVtZW50LnZhbHVlID0gY2hhbmdlLmNob3NlbkxhYmVsO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy5waWNrZXIuZmlyc3RNb250aERheUNsYXNzID0gdGhpcy5maXJzdE1vbnRoRGF5Q2xhc3M7XG4gICAgdGhpcy5waWNrZXIubGFzdE1vbnRoRGF5Q2xhc3MgPSB0aGlzLmxhc3RNb250aERheUNsYXNzO1xuICAgIHRoaXMucGlja2VyLmVtcHR5V2Vla1Jvd0NsYXNzID0gdGhpcy5lbXB0eVdlZWtSb3dDbGFzcztcbiAgICB0aGlzLnBpY2tlci5maXJzdERheU9mTmV4dE1vbnRoQ2xhc3MgPSB0aGlzLmZpcnN0RGF5T2ZOZXh0TW9udGhDbGFzcztcbiAgICB0aGlzLnBpY2tlci5sYXN0RGF5T2ZQcmV2aW91c01vbnRoQ2xhc3MgPSB0aGlzLmxhc3REYXlPZlByZXZpb3VzTW9udGhDbGFzcztcbiAgICB0aGlzLnBpY2tlci5kcm9wcyA9IHRoaXMuZHJvcHM7XG4gICAgdGhpcy5waWNrZXIub3BlbnMgPSB0aGlzLm9wZW5zO1xuICAgIHRoaXMubG9jYWxlRGlmZmVyID0gdGhpcy5kaWZmZXJzLmZpbmQodGhpcy5sb2NhbGUpLmNyZWF0ZSgpO1xuICAgIHRoaXMucGlja2VyLmNsb3NlT25BdXRvQXBwbHkgPSB0aGlzLmNsb3NlT25BdXRvQXBwbHk7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCAge1xuICAgIGZvciAoY29uc3QgY2hhbmdlIGluIGNoYW5nZXMpIHtcbiAgICAgIGlmIChjaGFuZ2VzLmhhc093blByb3BlcnR5KGNoYW5nZSkpIHtcbiAgICAgICAgaWYgKHRoaXMubm90Rm9yQ2hhbmdlc1Byb3BlcnR5LmluZGV4T2YoY2hhbmdlKSA9PT0gLTEpIHtcbiAgICAgICAgICB0aGlzLnBpY2tlcltjaGFuZ2VdID0gY2hhbmdlc1tjaGFuZ2VdLmN1cnJlbnRWYWx1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG5nRG9DaGVjaygpIHtcbiAgICBpZiAodGhpcy5sb2NhbGVEaWZmZXIpIHtcbiAgICAgIGNvbnN0IGNoYW5nZXMgPSB0aGlzLmxvY2FsZURpZmZlci5kaWZmKHRoaXMubG9jYWxlKTtcbiAgICAgIGlmIChjaGFuZ2VzKSB7XG4gICAgICAgIHRoaXMucGlja2VyLnVwZGF0ZUxvY2FsZSh0aGlzLmxvY2FsZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEV2ZW50IG9uIGJsdXJcbiAgICovXG4gIG9uQmx1cigpOiB2b2lkIHtcbiAgICB0aGlzLl9vblRvdWNoZWQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBPcGVuIHBpY2tlclxuICAgKlxuICAgKiBAcGFyYW0gZXZlbnRcbiAgICovXG4gIG9wZW4oZXZlbnQ/OiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLnBpY2tlci5zaG93KGV2ZW50KTtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuc2hvd0RhdGVyYW5nZXBpY2tlci5lbWl0KCk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogSGlkZSBwaWNrZXJcbiAgICpcbiAgICogQHBhcmFtIGVcbiAgICovXG4gIGhpZGUoZT8pOiB2b2lkIHtcbiAgICB0aGlzLnBpY2tlci5oaWRlKGUpO1xuICAgIHRoaXMuaGlkZURhdGVyYW5nZXBpY2tlci5lbWl0KCk7XG4gIH1cblxuICAvKipcbiAgICogVG9nZ2xlIHBpY2tlclxuICAgKlxuICAgKiBAcGFyYW0gZVxuICAgKi9cbiAgdG9nZ2xlKGU/KTogdm9pZCB7XG4gICAgaWYgKHRoaXMucGlja2VyLmlzU2hvd24pIHtcbiAgICAgIHRoaXMuaGlkZShlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5vcGVuKGUpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDbGVhciBwaWNrZXIgdmFsdWVcbiAgICovXG4gIGNsZWFyKCk6IHZvaWQge1xuICAgIHRoaXMucGlja2VyLmNsZWFyKCk7XG4gIH1cblxuICAvKipcbiAgICogU2V0IGlucHV0IHZhbHVlXG4gICAqL1xuICB3cml0ZVZhbHVlKHZhbHVlKTogdm9pZCB7XG4gICAgdGhpcy5zZXRWYWx1ZSh2YWx1ZSk7XG4gIH1cblxuICAvKipcbiAgICogUmVnaXN0ZXIgY2hhbmdlXG4gICAqL1xuICByZWdpc3Rlck9uQ2hhbmdlKGZuKTogdm9pZCB7XG4gICAgdGhpcy5fb25DaGFuZ2UgPSBmbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZWdpc3RlciBvbiB0b3VjaFxuICAgKi9cbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm4pOiB2b2lkIHtcbiAgICB0aGlzLl9vblRvdWNoZWQgPSBmbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgaW5wdXQgdmFsdWVcbiAgICovXG4gIHByaXZhdGUgc2V0VmFsdWUodmFsOiBhbnkpOiB2b2lkIHtcbiAgICBpZiAodmFsKSB7XG4gICAgICB0aGlzLnZhbHVlID0gdmFsO1xuICAgICAgaWYgKHZhbFt0aGlzLl9zdGFydEtleV0pIHtcbiAgICAgICAgdGhpcy5waWNrZXIuc2V0U3RhcnREYXRlKHZhbFt0aGlzLl9zdGFydEtleV0pO1xuICAgICAgfVxuICAgICAgaWYgKHZhbFt0aGlzLl9lbmRLZXldKSB7XG4gICAgICAgIHRoaXMucGlja2VyLnNldEVuZERhdGUodmFsW3RoaXMuX2VuZEtleV0pO1xuICAgICAgfVxuICAgICAgdGhpcy5waWNrZXIuY2FsY3VsYXRlQ2hvc2VuTGFiZWwoKTtcbiAgICAgIGlmICh0aGlzLnBpY2tlci5jaG9zZW5MYWJlbCkge1xuICAgICAgICB0aGlzLl9lbC5uYXRpdmVFbGVtZW50LnZhbHVlID0gdGhpcy5waWNrZXIuY2hvc2VuTGFiZWw7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucGlja2VyLmNsZWFyKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEV2ZW50IG9uIGlucHV0IGNoYW5nZVxuICAgKlxuICAgKiBAcGFyYW0gZVxuICAgKi9cbiAgaW5wdXRDaGFuZ2VkKGUpOiB2b2lkIHtcbiAgICBpZiAoZS50YXJnZXQudGFnTmFtZS50b0xvd2VyQ2FzZSgpICE9PSAnaW5wdXQnKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICghZS50YXJnZXQudmFsdWUubGVuZ3RoKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IGRhdGVTdHJpbmcgPSBlLnRhcmdldC52YWx1ZS5zcGxpdCh0aGlzLnBpY2tlci5sb2NhbGUuc2VwYXJhdG9yKTtcbiAgICBsZXQgc3RhcnQgPSBudWxsLCBlbmQgPSBudWxsO1xuICAgIGlmIChkYXRlU3RyaW5nLmxlbmd0aCA9PT0gMikge1xuICAgICAgc3RhcnQgPSBtb21lbnQoZGF0ZVN0cmluZ1swXSwgdGhpcy5waWNrZXIubG9jYWxlLmZvcm1hdCk7XG4gICAgICBlbmQgPSBtb21lbnQoZGF0ZVN0cmluZ1sxXSwgdGhpcy5waWNrZXIubG9jYWxlLmZvcm1hdCk7XG4gICAgfVxuICAgIGlmICh0aGlzLnNpbmdsZURhdGVQaWNrZXIgfHwgc3RhcnQgPT09IG51bGwgfHwgZW5kID09PSBudWxsKSB7XG4gICAgICBzdGFydCA9IG1vbWVudChlLnRhcmdldC52YWx1ZSwgdGhpcy5waWNrZXIubG9jYWxlLmZvcm1hdCk7XG4gICAgICBlbmQgPSBzdGFydDtcbiAgICB9XG4gICAgaWYgKCFzdGFydC5pc1ZhbGlkKCkgfHwgIWVuZC5pc1ZhbGlkKCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5waWNrZXIuc2V0U3RhcnREYXRlKHN0YXJ0KTtcbiAgICB0aGlzLnBpY2tlci5zZXRFbmREYXRlKGVuZCk7XG4gICAgdGhpcy5waWNrZXIudXBkYXRlVmlldygpO1xuICB9XG5cbiAgLyoqXG4gICAqIEZvciBjbGljayBvdXRzaWRlIG9mIHRoZSBjYWxlbmRhcidzIGNvbnRhaW5lclxuICAgKlxuICAgKiBAcGFyYW0gZXZlbnQgZXZlbnQgb2JqZWN0XG4gICAqL1xuICBASG9zdExpc3RlbmVyKCdkb2N1bWVudDpjbGljaycsIFsnJGV2ZW50J10pXG4gIG91dHNpZGVDbGljayhldmVudCk6IHZvaWQge1xuICAgIGlmICghZXZlbnQudGFyZ2V0KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ25neC1kYXRlcmFuZ2VwaWNrZXItYWN0aW9uJykgfHwgZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnY2RrLW92ZXJsYXktYmFja2Ryb3AnKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuY29udGFpbnMoZXZlbnQudGFyZ2V0KSkge1xuICAgICAgdGhpcy5oaWRlKCk7XG4gICAgfVxuICB9XG59XG4iXX0=