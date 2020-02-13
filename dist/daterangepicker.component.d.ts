import { OnInit, ElementRef, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import * as _moment from 'moment';
import { LocaleService } from './locale.service';
export declare enum SideEnum {
    left = "left",
    right = "right"
}
export declare class DaterangepickerComponent implements OnInit {
    private el;
    private _ref;
    private _localeService;
    private _old;
    chosenLabel: string;
    calendarVariables: {
        left: any;
        right: any;
    };
    timepickerVariables: {
        left: any;
        right: any;
    };
    daterangepicker: {
        start: FormControl;
        end: FormControl;
    };
    applyBtn: {
        disabled: boolean;
    };
    sideEnum: typeof SideEnum;
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
    private _ranges;
    ranges: any;
    firstMonthDayClass: string;
    lastMonthDayClass: string;
    emptyWeekRowClass: string;
    firstDayOfNextMonthClass: string;
    lastDayOfPreviousMonthClass: string;
    chosenRange: string;
    rangesArray: Array<any>;
    /** Calendar state */
    isShown: boolean;
    inline: boolean;
    leftCalendar: any;
    rightCalendar: any;
    showCalendarInRanges: boolean;
    options: any;
    /** Event on date selected */
    choosedDate: EventEmitter<Object>;
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
    pickerContainer: ElementRef;
    constructor(el: ElementRef, _ref: ChangeDetectorRef, _localeService: LocaleService);
    ngOnInit(): void;
    /**
     * Render datepicker ranges
     */
    renderRanges(): void;
    /**
     * Render timepicker ranges
     *
     * @param side
     */
    renderTimePicker(side: SideEnum): void;
    /**
     * Render calendar
     *
     * @param side
     */
    renderCalendar(side: SideEnum): void;
    /**
     * Set selected start date
     *
     * @param startDate
     */
    setStartDate(startDate: string | object): void;
    /**
     * Set selected end date
     *
     * @param endDate
     */
    setEndDate(endDate: string | object): void;
    /** Check if date is invalid */
    isInvalidDate(date: any): boolean;
    /** Custom classes for a date */
    isCustomDate(date: any): boolean;
    updateView(): void;
    /**
     *  Update months in view
     */
    updateMonthsInView(): void;
    /**
     *  Update calendars
     */
    updateCalendars(): void;
    /**
     * Update input value with calendar selection
     */
    updateElement(): void;
    remove(): void;
    /**
     * Calculate label to be displayed
     */
    calculateChosenLabel(): void;
    /**
     * Event when apply button is clicked
     *
     * @param e
     */
    onClickApply(e?: Event): void;
    /**
     * Event when cancel button is clicked
     *
     * @param e
     */
    onClickCancel(e: Event): void;
    /**
     * called when month is changed
     *
     * @param monthEvent get value in event.target.value
     *
     * @param side left or right
     */
    onMonthChanged(monthEvent: MatSelectChange, side: SideEnum): void;
    /**
     * called when year is changed
     *
     * @param yearEvent get value in event.target.value
     *
     * @param side left or right
     */
    onYearChanged(yearEvent: MatSelectChange, side: SideEnum): void;
    /**
     * called when time is changed
     *
     * @param timeEvent  an event
     *
     * @param side left or right
     */
    timeChanged(timeEvent: MatSelectChange, side: SideEnum): void;
    /**
     *  Event when month or year change
     *
     * @param month month number 0 -11
     *
     * @param year year eg: 1995
     *
     * @param side left or right
     */
    onMonthOrYearChanged(month: number, year: number, side: SideEnum): void;
    /**
     * Click on previous month
     *
     * @param side left or right calendar
     */
    onClickPrev(side: SideEnum): void;
    /**
     * Click on next month
     *
     * @param side left or right calendar
     */
    onClickNext(side: SideEnum): void;
    /**
     * When selecting a date
     *
     * @param e event: get value by e.target.value
     *
     * @param side left or right
     *
     * @param row row position of the current date clicked
     *
     * @param col col position of the current date clicked
     */
    onClickDate(e: any, side: SideEnum, row: number, col: number): void;
    /**
     *  Click on the custom range
     *
     * @param e
     *
     * @param label
     */
    onClickRange(e: Event, label: any): void;
    show(e?: Event): void;
    hide(e?: Event): void;
    /**
     * Update the locale options
     *
     * @param locale
     */
    updateLocale(locale: any): void;
    /**
     *  Clear the daterange picker
     */
    clear(): void;
    /**
     * Find out if the selected range should be disabled if it doesn't
     * fit into minDate and maxDate limitations.
     *
     * @param range
     */
    disableRange(range: any): boolean;
    /**
     * Get date and time
     *
     * @param date the date to add time
     *
     * @param side left or right
     */
    private _getDateWithTime;
    /**
     *  Build the locale config
     */
    private _buildLocale;
    /**
     *  Build calendar cells
     */
    private _buildCells;
    /**
     * Find out if the current calendar row has current month days
     * (as opposed to consisting of only previous/next month days)
     */
    hasCurrentMonthDays(currentMonth: any, row: any): boolean;
}
