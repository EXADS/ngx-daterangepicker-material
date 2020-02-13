import { ViewContainerRef, ComponentFactoryResolver, ElementRef, ChangeDetectorRef, OnInit, OnChanges, SimpleChanges, DoCheck, KeyValueDiffers, EventEmitter, Renderer2 } from '@angular/core';
import { DaterangepickerComponent } from './daterangepicker.component';
import * as _moment from 'moment';
import { LocaleService } from './locale.service';
export declare class DaterangepickerDirective implements OnInit, OnChanges, DoCheck {
    viewContainerRef: ViewContainerRef;
    _changeDetectorRef: ChangeDetectorRef;
    private _componentFactoryResolver;
    private _el;
    private _renderer;
    private differs;
    private _localeService;
    private elementRef;
    picker: DaterangepickerComponent;
    private _onChange;
    private _onTouched;
    private _validatorChange;
    private _value;
    private localeDiffer;
    /** Flag to display only one datepicker */
    singleDatePicker: boolean;
    /** Flag to display month and year dropdowns */
    showDropdowns: boolean;
    /** Flag to display week numbers */
    showWeekNumbers: boolean;
    /** Flag to display ISO week numbers */
    showISOWeekNumbers: boolean;
    /** Position calendar vertically */
    drops: 'up' | 'down';
    /** Position calendar horizontally  */
    opens: 'right' | 'left' | 'center' | 'auto';
    /** Minimun selectable date */
    minDate: _moment.Moment;
    /** Maximum selectable date */
    maxDate: _moment.Moment;
    /** Start date of current selection */
    startDate: _moment.Moment;
    /** End date of current selection */
    endDate: _moment.Moment;
    /** Max number of dates a user can select */
    dateLimit: number;
    /** Flag to display custom range label on ranges */
    showCustomRangeLabel: boolean;
    /** Flag to display apply button */
    showCancelButton: boolean;
    /** Flag to display apply button */
    showApplyButton: boolean;
    /** Flag to display clear button */
    showClearButton: boolean;
    /** Flag to keep the calendar open after choosing a range */
    keepCalendarOpeningWithRange: boolean;
    /** Flag to display the range label on input */
    showRangeLabelOnInput: boolean;
    /** Flag to allow selection range from end date first */
    customRangeDirection: boolean;
    /** Flag to lock start date and change only the end date */
    lockStartDate: boolean;
    /** Flag to update input when selecting a date/range  */
    autoUpdateInput: boolean;
    /** Flag to display the ranges with the calendar*/
    alwaysShowCalendars: boolean;
    /** Flag to link both calendars */
    linkedCalendars: boolean;
    /** Close datepicker when auto apply */
    closeOnAutoApply: boolean;
    /** Flag to auto apply changes on select */
    autoApplyChanges: boolean;
    maxSpan: boolean;
    timePicker: Boolean;
    timePicker24Hour: Boolean;
    timePickerIncrement: number;
    timePickerSeconds: Boolean;
    /** Set calendar locale settings */
    private _locale;
    locale: any;
    /** Set custom ranges */
    ranges: any;
    /** Check if date is invalid */
    isInvalidDate: Function;
    /** Custom classes for a date */
    isCustomDate: Function;
    firstMonthDayClass: string;
    lastMonthDayClass: string;
    emptyWeekRowClass: string;
    firstDayOfNextMonthClass: string;
    lastDayOfPreviousMonthClass: string;
    private _endKey;
    private _startKey;
    startKey: any;
    endKey: any;
    notForChangesProperty: Array<string>;
    value: any;
    /** Event on change */
    onChange: EventEmitter<Object>;
    /** Event on range clicked */
    rangeClicked: EventEmitter<Object>;
    /** Event on dates updated */
    datesUpdated: EventEmitter<Object>;
    /** Event on start date changed */
    startDateChanged: EventEmitter<Object>;
    /** Event on end date changed */
    endDateChanged: EventEmitter<Object>;
    /** Event when datepicker is shown */
    showDaterangepicker: EventEmitter<void>;
    /** Event when datepicker is hidden */
    hideDaterangepicker: EventEmitter<void>;
    constructor(viewContainerRef: ViewContainerRef, _changeDetectorRef: ChangeDetectorRef, _componentFactoryResolver: ComponentFactoryResolver, _el: ElementRef, _renderer: Renderer2, differs: KeyValueDiffers, _localeService: LocaleService, elementRef: ElementRef);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngDoCheck(): void;
    /**
     * Event on blur
     */
    onBlur(): void;
    /**
     * Open picker
     *
     * @param event
     */
    open(event?: any): void;
    /**
     * Hide picker
     *
     * @param e
     */
    hide(e?: any): void;
    /**
     * Toggle picker
     *
     * @param e
     */
    toggle(e?: any): void;
    /**
     * Clear picker value
     */
    clear(): void;
    /**
     * Set input value
     */
    writeValue(value: any): void;
    /**
     * Register change
     */
    registerOnChange(fn: any): void;
    /**
     * Register on touch
     */
    registerOnTouched(fn: any): void;
    /**
     * Set input value
     */
    private setValue;
    /**
     * Event on input change
     *
     * @param e
     */
    inputChanged(e: any): void;
    /**
     * For click outside of the calendar's container
     *
     * @param event event object
     */
    outsideClick(event: any): void;
}
