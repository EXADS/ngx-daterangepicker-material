import { __decorate, __param, __metadata } from 'tslib';
import { CommonModule } from '@angular/common';
import { InjectionToken, Injectable, Inject, EventEmitter, Input, Output, ViewChild, ElementRef, Component, ViewEncapsulation, forwardRef, ChangeDetectorRef, HostListener, Directive, ViewContainerRef, ComponentFactoryResolver, Renderer2, KeyValueDiffers, NgModule } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import * as _moment from 'moment';

const moment = _moment;
const LOCALE_CONFIG = new InjectionToken('daterangepicker.config');
/**
 *  DefaultLocaleConfig
 */
const DefaultLocaleConfig = {
    direction: 'ltr',
    separator: ' - ',
    weekLabel: 'W',
    applyLabel: 'Apply',
    cancelLabel: 'Cancel',
    clearLabel: 'Clear',
    customRangeLabel: 'Custom range',
    daysOfWeek: moment.weekdaysMin(),
    monthNames: moment.monthsShort(),
    firstDay: moment.localeData().firstDayOfWeek()
};

let LocaleService = class LocaleService {
    constructor(_config) {
        this._config = _config;
    }
    get config() {
        if (!this._config) {
            return DefaultLocaleConfig;
        }
        return Object.assign({}, DefaultLocaleConfig, this._config);
    }
};
LocaleService = __decorate([
    Injectable(),
    __param(0, Inject(LOCALE_CONFIG)),
    __metadata("design:paramtypes", [Object])
], LocaleService);

var DaterangepickerComponent_1;
const moment$1 = _moment;
var SideEnum;
(function (SideEnum) {
    SideEnum["left"] = "left";
    SideEnum["right"] = "right";
})(SideEnum || (SideEnum = {}));
let DaterangepickerComponent = DaterangepickerComponent_1 = class DaterangepickerComponent {
    constructor(el, _ref, _localeService) {
        this.el = el;
        this._ref = _ref;
        this._localeService = _localeService;
        this._old = { start: null, end: null };
        this.calendarVariables = { left: {}, right: {} };
        this.timepickerVariables = { left: {}, right: {} };
        this.daterangepicker = { start: new FormControl(), end: new FormControl() };
        this.applyBtn = { disabled: false };
        // used in template for compile time support of enum values.
        this.sideEnum = SideEnum;
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
        this.startDate = moment$1().startOf('day');
        /** End date of current selection */
        this.endDate = moment$1().endOf('day');
        /** Max number of dates a user can select */
        this.dateLimit = null;
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
        /** Set custom ranges */
        this._ranges = {};
        // CUSTOM CSS
        this.firstMonthDayClass = null;
        this.lastMonthDayClass = null;
        this.emptyWeekRowClass = null;
        this.firstDayOfNextMonthClass = null;
        this.lastDayOfPreviousMonthClass = null;
        this.rangesArray = [];
        /** Calendar state */
        this.isShown = false;
        this.inline = true;
        this.leftCalendar = {};
        this.rightCalendar = {};
        this.showCalendarInRanges = false;
        this.options = {}; // should get some opt from user
        this.choosedDate = new EventEmitter();
        this.rangeClicked = new EventEmitter();
        this.datesUpdated = new EventEmitter();
        this.startDateChanged = new EventEmitter();
        this.endDateChanged = new EventEmitter();
        this.showDaterangepicker = new EventEmitter();
        this.hideDaterangepicker = new EventEmitter();
    }
    set locale(value) {
        this._locale = Object.assign({}, this._localeService.config, value);
    }
    get locale() {
        return this._locale;
    }
    set ranges(value) {
        this._ranges = value;
        this.renderRanges();
    }
    get ranges() {
        return this._ranges;
    }
    ngOnInit() {
        this._buildLocale();
        const daysOfWeek = [...this.locale.daysOfWeek];
        if (this.locale.firstDay !== 0) {
            let iterator = this.locale.firstDay;
            while (iterator > 0) {
                daysOfWeek.push(daysOfWeek.shift());
                iterator--;
            }
        }
        this.locale.daysOfWeek = daysOfWeek;
        if (this.inline) {
            this._old.start = this.startDate.clone();
            this._old.end = this.endDate.clone();
        }
        if (this.startDate && this.timePicker) {
            this.setStartDate(this.startDate);
            this.renderTimePicker(SideEnum.left);
        }
        if (this.endDate && this.timePicker) {
            this.setEndDate(this.endDate);
            this.renderTimePicker(SideEnum.right);
        }
        this.updateMonthsInView();
        this.renderCalendar(SideEnum.left);
        this.renderCalendar(SideEnum.right);
        this.renderRanges();
    }
    /**
     * Render datepicker ranges
     */
    renderRanges() {
        this.rangesArray = [];
        let start, end;
        if (typeof this.ranges === 'object') {
            for (const range in this.ranges) {
                if (this.ranges[range]) {
                    if (typeof this.ranges[range][0] === 'string') {
                        start = moment$1(this.ranges[range][0], this.locale.format);
                    }
                    else {
                        start = moment$1(this.ranges[range][0]);
                    }
                    if (typeof this.ranges[range][1] === 'string') {
                        end = moment$1(this.ranges[range][1], this.locale.format);
                    }
                    else {
                        end = moment$1(this.ranges[range][1]);
                    }
                    // If the start or end date exceed those allowed by the minDate or maxSpan
                    // options, shorten the range to the allowable period.
                    if (this.minDate && start.isBefore(this.minDate)) {
                        start = this.minDate.clone();
                    }
                    let maxDate = this.maxDate;
                    if (this.maxSpan && maxDate && start.clone().add(this.maxSpan).isAfter(maxDate)) {
                        maxDate = start.clone().add(this.maxSpan);
                    }
                    if (maxDate && end.isAfter(maxDate)) {
                        end = maxDate.clone();
                    }
                    // If the end of the range is before the minimum or the start of the range is
                    // after the maximum, don't display this range option at all.
                    if ((this.minDate && end.isBefore(this.minDate, this.timePicker ? 'minute' : 'day'))
                        || (maxDate && start.isAfter(maxDate, this.timePicker ? 'minute' : 'day'))) {
                        continue;
                    }
                    // Support unicode chars in the range names.
                    const elem = document.createElement('textarea');
                    elem.innerHTML = range;
                    const rangeHtml = elem.value;
                    this.ranges[rangeHtml] = [start, end];
                }
            }
            for (const range in this.ranges) {
                if (this.ranges[range]) {
                    this.rangesArray.push(range);
                }
            }
            if (this.showCustomRangeLabel) {
                this.rangesArray.push(this.locale.customRangeLabel);
            }
            this.showCalendarInRanges = (!this.rangesArray.length) || this.alwaysShowCalendars;
            if (!this.timePicker) {
                this.startDate = this.startDate.startOf('day');
                this.endDate = this.endDate.endOf('day');
            }
        }
    }
    /**
     * Render timepicker ranges
     *
     * @param side
     */
    renderTimePicker(side) {
        if (side === SideEnum.right && !this.endDate) {
            return;
        }
        let selected, minDate;
        const maxDate = this.maxDate;
        if (side === SideEnum.left) {
            selected = this.startDate.clone(),
                minDate = this.minDate;
        }
        else if (side === SideEnum.right) {
            selected = this.endDate.clone(),
                minDate = this.startDate;
        }
        const start = this.timePicker24Hour ? 0 : 1;
        const end = this.timePicker24Hour ? 23 : 12;
        this.timepickerVariables[side] = {
            hours: [],
            minutes: [],
            minutesLabel: [],
            seconds: [],
            secondsLabel: [],
            disabledHours: [],
            disabledMinutes: [],
            disabledSeconds: [],
            selectedHour: 0,
            selectedMinute: 0,
            selectedSecond: 0,
        };
        // generate hours
        for (let i = start; i <= end; i++) {
            let i_in_24 = i;
            if (!this.timePicker24Hour) {
                i_in_24 = selected.hour() >= 12 ? (i === 12 ? 12 : i + 12) : (i === 12 ? 0 : i);
            }
            const time = selected.clone().hour(i_in_24);
            let disabled = false;
            if (minDate && time.minute(59).isBefore(minDate)) {
                disabled = true;
            }
            if (maxDate && time.minute(0).isAfter(maxDate)) {
                disabled = true;
            }
            this.timepickerVariables[side].hours.push(i);
            if (i_in_24 === selected.hour() && !disabled) {
                this.timepickerVariables[side].selectedHour = i;
            }
            else if (disabled) {
                this.timepickerVariables[side].disabledHours.push(i);
            }
        }
        // generate minutes
        for (let i = 0; i < 60; i += this.timePickerIncrement) {
            const padded = i < 10 ? '0' + i : i;
            const time = selected.clone().minute(i);
            let disabled = false;
            if (minDate && time.second(59).isBefore(minDate)) {
                disabled = true;
            }
            if (maxDate && time.second(0).isAfter(maxDate)) {
                disabled = true;
            }
            this.timepickerVariables[side].minutes.push(i);
            this.timepickerVariables[side].minutesLabel.push(padded);
            if (selected.minute() === i && !disabled) {
                this.timepickerVariables[side].selectedMinute = i;
            }
            else if (disabled) {
                this.timepickerVariables[side].disabledMinutes.push(i);
            }
        }
        // generate seconds
        if (this.timePickerSeconds) {
            for (let i = 0; i < 60; i++) {
                const padded = i < 10 ? '0' + i : i;
                const time = selected.clone().second(i);
                let disabled = false;
                if (minDate && time.isBefore(minDate)) {
                    disabled = true;
                }
                if (maxDate && time.isAfter(maxDate)) {
                    disabled = true;
                }
                this.timepickerVariables[side].seconds.push(i);
                this.timepickerVariables[side].secondsLabel.push(padded);
                if (selected.second() === i && !disabled) {
                    this.timepickerVariables[side].selectedSecond = i;
                }
                else if (disabled) {
                    this.timepickerVariables[side].disabledSeconds.push(i);
                }
            }
        }
        // generate AM/PM
        if (!this.timePicker24Hour) {
            if (minDate && selected.clone().hour(12).minute(0).second(0).isBefore(minDate)) {
                this.timepickerVariables[side].amDisabled = true;
            }
            if (maxDate && selected.clone().hour(0).minute(0).second(0).isAfter(maxDate)) {
                this.timepickerVariables[side].pmDisabled = true;
            }
            if (selected.hour() >= 12) {
                this.timepickerVariables[side].ampmModel = 'PM';
            }
            else {
                this.timepickerVariables[side].ampmModel = 'AM';
            }
        }
        this.timepickerVariables[side].selected = selected;
    }
    /**
     * Render calendar
     *
     * @param side
     */
    renderCalendar(side) {
        const mainCalendar = (side === SideEnum.left) ? this.leftCalendar : this.rightCalendar;
        const month = mainCalendar.month.month();
        const year = mainCalendar.month.year();
        const hour = mainCalendar.month.hour();
        const minute = mainCalendar.month.minute();
        const second = mainCalendar.month.second();
        const daysInMonth = moment$1([year, month]).daysInMonth();
        const firstDay = moment$1([year, month, 1]);
        const lastDay = moment$1([year, month, daysInMonth]);
        const lastMonth = moment$1(firstDay).subtract(1, 'month').month();
        const lastYear = moment$1(firstDay).subtract(1, 'month').year();
        const daysInLastMonth = moment$1([lastYear, lastMonth]).daysInMonth();
        const dayOfWeek = firstDay.day();
        // initialize a 6 rows x 7 columns array for the calendar
        const calendar = [];
        calendar.firstDay = firstDay;
        calendar.lastDay = lastDay;
        for (let i = 0; i < 6; i++) {
            calendar[i] = [];
        }
        // populate the calendar with date objects
        let startDay = daysInLastMonth - dayOfWeek + this.locale.firstDay + 1;
        if (startDay > daysInLastMonth) {
            startDay -= 7;
        }
        if (dayOfWeek === this.locale.firstDay) {
            startDay = daysInLastMonth - 6;
        }
        let curDate = moment$1([lastYear, lastMonth, startDay, 12, minute, second]);
        for (let i = 0, col = 0, row = 0; i < 42; i++, col++, curDate = moment$1(curDate).add(24, 'hour')) {
            if (i > 0 && col % 7 === 0) {
                col = 0;
                row++;
            }
            calendar[row][col] = curDate.clone().hour(hour).minute(minute).second(second);
            curDate.hour(12);
            if (this.minDate && calendar[row][col].format('YYYY-MM-DD') === this.minDate.format('YYYY-MM-DD') &&
                calendar[row][col].isBefore(this.minDate) && side === this.sideEnum.left) {
                calendar[row][col] = this.minDate.clone();
            }
            if (this.maxDate && calendar[row][col].format('YYYY-MM-DD') === this.maxDate.format('YYYY-MM-DD') &&
                calendar[row][col].isAfter(this.maxDate) && side === this.sideEnum.right) {
                calendar[row][col] = this.maxDate.clone();
            }
        }
        // make the calendar object available to hoverDate/clickDate
        if (side === SideEnum.left) {
            this.leftCalendar.calendar = calendar;
        }
        else {
            this.rightCalendar.calendar = calendar;
        }
        // Display the calendar
        const minDate = side === this.sideEnum.left ? this.minDate : this.startDate;
        let maxDate = this.maxDate;
        // adjust maxDate to reflect the dateLimit setting in order to
        // grey out end dates beyond the dateLimit
        if (this.endDate === null && this.dateLimit) {
            const maxLimit = this.startDate.clone().add(this.dateLimit, 'day').endOf('day');
            if (!maxDate || maxLimit.isBefore(maxDate)) {
                maxDate = maxLimit;
            }
        }
        this.calendarVariables[side] = {
            month: month,
            year: year,
            hour: hour,
            minute: minute,
            second: second,
            daysInMonth: daysInMonth,
            firstDay: firstDay,
            lastDay: lastDay,
            lastMonth: lastMonth,
            lastYear: lastYear,
            daysInLastMonth: daysInLastMonth,
            dayOfWeek: dayOfWeek,
            // other vars
            calRows: Array.from(Array(6).keys()),
            calCols: Array.from(Array(7).keys()),
            classes: {},
            minDate: minDate,
            maxDate: maxDate,
            calendar: calendar
        };
        if (this.showDropdowns) {
            const currentMonth = calendar[1][1].month();
            const currentYear = calendar[1][1].year();
            const realCurrentYear = moment$1().year();
            const maxYear = (maxDate && maxDate.year()) || (realCurrentYear + 5);
            const minYear = (minDate && minDate.year()) || (realCurrentYear - 50);
            const inMinYear = currentYear === minYear;
            const inMaxYear = currentYear === maxYear;
            const years = [];
            for (let y = minYear; y <= maxYear; y++) {
                years.push(y);
            }
            this.calendarVariables[side].dropdowns = {
                currentMonth: currentMonth,
                currentYear: currentYear,
                maxYear: maxYear,
                minYear: minYear,
                inMinYear: inMinYear,
                inMaxYear: inMaxYear,
                monthArrays: Array.from(Array(12).keys()),
                yearArrays: years
            };
        }
        this._buildCells(calendar, side);
    }
    /**
     * Set selected start date
     *
     * @param startDate
     */
    setStartDate(startDate) {
        if (typeof startDate === 'string') {
            this.startDate = moment$1(startDate, this.locale.format);
        }
        if (typeof startDate === 'object') {
            this.startDate = moment$1(startDate);
        }
        if (!this.timePicker) {
            this.startDate = this.startDate.startOf('day');
        }
        if (this.timePicker && this.timePickerIncrement) {
            this.startDate.minute(Math.round(this.startDate.minute() / this.timePickerIncrement) * this.timePickerIncrement);
        }
        if (this.minDate && this.startDate.isBefore(this.minDate)) {
            this.startDate = this.minDate.clone();
            if (this.timePicker && this.timePickerIncrement) {
                this.startDate.minute(Math.round(this.startDate.minute() / this.timePickerIncrement) * this.timePickerIncrement);
            }
        }
        if (this.maxDate && this.startDate.isAfter(this.maxDate)) {
            this.startDate = this.maxDate.clone();
            if (this.timePicker && this.timePickerIncrement) {
                this.startDate.minute(Math.floor(this.startDate.minute() / this.timePickerIncrement) * this.timePickerIncrement);
            }
        }
        if (!this.isShown) {
            this.updateElement();
        }
        this.startDateChanged.emit({ startDate: this.startDate });
        this.updateMonthsInView();
    }
    /**
     * Set selected end date
     *
     * @param endDate
     */
    setEndDate(endDate) {
        if (typeof endDate === 'string') {
            this.endDate = moment$1(endDate, this.locale.format);
        }
        if (typeof endDate === 'object') {
            this.endDate = moment$1(endDate);
        }
        if (!this.timePicker) {
            this.endDate = this.endDate.add(1, 'd').startOf('day').subtract(1, 'second');
        }
        if (this.timePicker && this.timePickerIncrement) {
            this.endDate.minute(Math.round(this.endDate.minute() / this.timePickerIncrement) * this.timePickerIncrement);
        }
        if (this.endDate.isBefore(this.startDate)) {
            this.endDate = this.startDate.clone();
        }
        if (this.maxDate && this.endDate.isAfter(this.maxDate)) {
            this.endDate = this.maxDate.clone();
        }
        if (this.dateLimit && this.startDate.clone().add(this.dateLimit, 'day').isBefore(this.endDate)) {
            this.endDate = this.startDate.clone().add(this.dateLimit, 'day');
        }
        if (!this.isShown) {
            this.updateElement();
        }
        this.endDateChanged.emit({ endDate: this.endDate });
        this.updateMonthsInView();
    }
    /** Check if date is invalid */
    isInvalidDate(date) {
        return false;
    }
    /** Custom classes for a date */
    isCustomDate(date) {
        return false;
    }
    updateView() {
        if (this.timePicker) {
            this.renderTimePicker(SideEnum.left);
            this.renderTimePicker(SideEnum.right);
        }
        this.updateMonthsInView();
        this.updateCalendars();
    }
    /**
     *  Update months in view
     */
    updateMonthsInView() {
        if (this.endDate) {
            // if both dates are visible already, do nothing
            if (!this.singleDatePicker && this.leftCalendar.month && this.rightCalendar.month &&
                ((this.startDate && this.leftCalendar && this.startDate.format('YYYY-MM') === this.leftCalendar.month.format('YYYY-MM')) ||
                    (this.startDate && this.rightCalendar && this.startDate.format('YYYY-MM') === this.rightCalendar.month.format('YYYY-MM')))
                && (this.endDate.format('YYYY-MM') === this.leftCalendar.month.format('YYYY-MM') ||
                    this.endDate.format('YYYY-MM') === this.rightCalendar.month.format('YYYY-MM'))) {
                return;
            }
            if (this.startDate) {
                this.leftCalendar.month = this.startDate.clone().date(2);
                if (!this.linkedCalendars && (this.endDate.month() !== this.startDate.month() ||
                    this.endDate.year() !== this.startDate.year())) {
                    this.rightCalendar.month = this.endDate.clone().date(2);
                }
                else {
                    this.rightCalendar.month = this.startDate.clone().date(2).add(1, 'month');
                }
            }
        }
        else {
            if (this.leftCalendar.month.format('YYYY-MM') !== this.startDate.format('YYYY-MM') &&
                this.rightCalendar.month.format('YYYY-MM') !== this.startDate.format('YYYY-MM')) {
                this.leftCalendar.month = this.startDate.clone().date(2);
                this.rightCalendar.month = this.startDate.clone().date(2).add(1, 'month');
            }
        }
        if (this.maxDate && this.linkedCalendars && !this.singleDatePicker && this.rightCalendar.month > this.maxDate) {
            this.rightCalendar.month = this.maxDate.clone().date(2);
            this.leftCalendar.month = this.maxDate.clone().date(2).subtract(1, 'month');
        }
    }
    /**
     *  Update calendars
     */
    updateCalendars() {
        this.renderCalendar(SideEnum.left);
        this.renderCalendar(SideEnum.right);
        if (this.endDate === null) {
            return;
        }
        this.calculateChosenLabel();
    }
    /**
     * Update input value with calendar selection
     */
    updateElement() {
        const format = this.locale.displayFormat ? this.locale.displayFormat : this.locale.format;
        if (!this.singleDatePicker && this.autoUpdateInput) {
            if (this.startDate && this.endDate) {
                // if we use ranges and should show range label on input
                if (this.rangesArray.length && this.showRangeLabelOnInput === true && this.chosenRange &&
                    this.locale.customRangeLabel !== this.chosenRange) {
                    this.chosenLabel = this.chosenRange;
                }
                else {
                    this.chosenLabel = this.startDate.format(format) +
                        this.locale.separator + this.endDate.format(format);
                }
            }
        }
        else if (this.autoUpdateInput) {
            this.chosenLabel = this.startDate.format(format);
        }
    }
    remove() {
        this.isShown = false;
    }
    /**
     * Calculate label to be displayed
     */
    calculateChosenLabel() {
        if (!this.locale || !this.locale.separator) {
            this._buildLocale();
        }
        let customRange = true;
        let i = 0;
        if (this.rangesArray.length > 0) {
            for (const range in this.ranges) {
                if (this.ranges[range]) {
                    if (this.timePicker) {
                        const format = this.timePickerSeconds ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD HH:mm';
                        // ignore times when comparing dates if time picker seconds is not enabled
                        if (this.startDate.format(format) === this.ranges[range][0].format(format)
                            && this.endDate.format(format) === this.ranges[range][1].format(format)) {
                            customRange = false;
                            this.chosenRange = this.rangesArray[i];
                            break;
                        }
                    }
                    else {
                        // ignore times when comparing dates if time picker is not enabled
                        if (this.startDate.format('YYYY-MM-DD') === this.ranges[range][0].format('YYYY-MM-DD')
                            && this.endDate.format('YYYY-MM-DD') === this.ranges[range][1].format('YYYY-MM-DD')) {
                            customRange = false;
                            this.chosenRange = this.rangesArray[i];
                            break;
                        }
                    }
                    i++;
                }
            }
            if (customRange) {
                if (this.showCustomRangeLabel) {
                    this.chosenRange = this.locale.customRangeLabel;
                }
                else {
                    this.chosenRange = null;
                }
                // if custom label: show calendar
                this.showCalendarInRanges = true;
            }
        }
        this.updateElement();
    }
    /**
     * Event when apply button is clicked
     *
     * @param e
     */
    onClickApply(e) {
        if (!this.singleDatePicker && this.startDate && !this.endDate) {
            this.endDate = this.startDate.clone();
            this.calculateChosenLabel();
        }
        if (this.isInvalidDate && this.startDate && this.endDate) {
            // get if there are invalid date between range
            const d = this.startDate.clone();
            while (d.isBefore(this.endDate)) {
                if (this.isInvalidDate(d)) {
                    this.endDate = d.subtract(1, 'days');
                    this.calculateChosenLabel();
                    break;
                }
                d.add(1, 'days');
            }
        }
        if (this.chosenLabel) {
            this.choosedDate.emit({ chosenLabel: this.chosenLabel, startDate: this.startDate, endDate: this.endDate });
        }
        this.datesUpdated.emit({ startDate: this.startDate, endDate: this.endDate });
        if (e || (this.closeOnAutoApply && !e)) {
            this.hide();
        }
    }
    /**
     * Event when cancel button is clicked
     *
     * @param e
     */
    onClickCancel(e) {
        this.startDate = this._old.start;
        this.endDate = this._old.end;
        if (this.inline) {
            this.updateView();
        }
        this.hide();
    }
    /**
     * called when month is changed
     *
     * @param monthEvent get value in event.target.value
     *
     * @param side left or right
     */
    onMonthChanged(monthEvent, side) {
        const year = this.calendarVariables[side].dropdowns.currentYear;
        this.onMonthOrYearChanged(monthEvent.value, year, side);
    }
    /**
     * called when year is changed
     *
     * @param yearEvent get value in event.target.value
     *
     * @param side left or right
     */
    onYearChanged(yearEvent, side) {
        const month = this.calendarVariables[side].dropdowns.currentMonth;
        this.onMonthOrYearChanged(month, yearEvent.value, side);
    }
    /**
     * called when time is changed
     *
     * @param timeEvent  an event
     *
     * @param side left or right
     */
    timeChanged(timeEvent, side) {
        let hour = parseInt(this.timepickerVariables[side].selectedHour, 10);
        const minute = parseInt(this.timepickerVariables[side].selectedMinute, 10);
        const second = this.timePickerSeconds ? parseInt(this.timepickerVariables[side].selectedSecond, 10) : 0;
        if (!this.timePicker24Hour) {
            const ampm = this.timepickerVariables[side].ampmModel;
            if (ampm === 'PM' && hour < 12) {
                hour += 12;
            }
            if (ampm === 'AM' && hour === 12) {
                hour = 0;
            }
        }
        if (side === SideEnum.left) {
            const start = this.startDate.clone();
            start.hour(hour);
            start.minute(minute);
            start.second(second);
            this.setStartDate(start);
            if (this.singleDatePicker) {
                this.endDate = this.startDate.clone();
            }
            else if (this.endDate && this.endDate.format('YYYY-MM-DD') === start.format('YYYY-MM-DD') && this.endDate.isBefore(start)) {
                this.setEndDate(start.clone());
            }
        }
        else if (this.endDate) {
            const end = this.endDate.clone();
            end.hour(hour);
            end.minute(minute);
            end.second(second);
            this.setEndDate(end);
        }
        // update the calendars so all clickable dates reflect the new time component
        this.updateCalendars();
        // re-render the time pickers because changing one selection can affect what's enabled in another
        this.renderTimePicker(SideEnum.left);
        this.renderTimePicker(SideEnum.right);
        if (this.autoApplyChanges) {
            this.onClickApply();
        }
    }
    /**
     *  Event when month or year change
     *
     * @param month month number 0 -11
     *
     * @param year year eg: 1995
     *
     * @param side left or right
     */
    onMonthOrYearChanged(month, year, side) {
        const isLeft = side === SideEnum.left;
        if (!isLeft) {
            if (year < this.startDate.year() || (year === this.startDate.year() && month < this.startDate.month())) {
                month = this.startDate.month();
                year = this.startDate.year();
            }
        }
        if (this.minDate) {
            if (year < this.minDate.year() || (year === this.minDate.year() && month < this.minDate.month())) {
                month = this.minDate.month();
                year = this.minDate.year();
            }
        }
        if (this.maxDate) {
            if (year > this.maxDate.year() || (year === this.maxDate.year() && month > this.maxDate.month())) {
                month = this.maxDate.month();
                year = this.maxDate.year();
            }
        }
        this.calendarVariables[side].dropdowns.currentYear = year;
        this.calendarVariables[side].dropdowns.currentMonth = month;
        if (isLeft) {
            this.leftCalendar.month.month(month).year(year);
            if (this.linkedCalendars) {
                this.rightCalendar.month = this.leftCalendar.month.clone().add(1, 'month');
            }
        }
        else {
            this.rightCalendar.month.month(month).year(year);
            if (this.linkedCalendars) {
                this.leftCalendar.month = this.rightCalendar.month.clone().subtract(1, 'month');
            }
        }
        this.updateCalendars();
    }
    /**
     * Click on previous month
     *
     * @param side left or right calendar
     */
    onClickPrev(side) {
        if (side === SideEnum.left) {
            this.leftCalendar.month.subtract(1, 'month');
            if (this.linkedCalendars) {
                this.rightCalendar.month.subtract(1, 'month');
            }
        }
        else {
            this.rightCalendar.month.subtract(1, 'month');
        }
        this.updateCalendars();
    }
    /**
     * Click on next month
     *
     * @param side left or right calendar
     */
    onClickNext(side) {
        if (side === SideEnum.left) {
            this.leftCalendar.month.add(1, 'month');
        }
        else {
            this.rightCalendar.month.add(1, 'month');
            if (this.linkedCalendars) {
                this.leftCalendar.month.add(1, 'month');
            }
        }
        this.updateCalendars();
    }
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
    onClickDate(e, side, row, col) {
        if (e.target.tagName === 'TD') {
            if (!e.target.classList.contains('available')) {
                return;
            }
        }
        else if (e.target.tagName === 'SPAN') {
            if (!e.target.parentElement.classList.contains('available')) {
                return;
            }
        }
        if (this.rangesArray.length) {
            this.chosenRange = this.locale.customRangeLabel;
        }
        let date = side === SideEnum.left ? this.leftCalendar.calendar[row][col] : this.rightCalendar.calendar[row][col];
        if ((this.endDate || (date.isBefore(this.startDate, 'day')
            && this.customRangeDirection === false)) && this.lockStartDate === false) { // picking start
            if (this.timePicker) {
                date = this._getDateWithTime(date, SideEnum.left);
            }
            this.endDate = null;
            this.setStartDate(date.clone());
        }
        else if (!this.endDate && date.isBefore(this.startDate) && this.customRangeDirection === false) {
            // special case: clicking the same date for start/end,
            // but the time of the end date is before the start date
            this.setEndDate(this.startDate.clone());
        }
        else { // picking end
            if (this.timePicker) {
                date = this._getDateWithTime(date, SideEnum.right);
            }
            if (date.isBefore(this.startDate, 'day') === true && this.customRangeDirection === true) {
                this.setEndDate(this.startDate);
                this.setStartDate(date.clone());
            }
            else {
                this.setEndDate(date.clone());
            }
            if (this.autoApplyChanges) {
                this.calculateChosenLabel();
                this.onClickApply();
            }
        }
        if (this.singleDatePicker) {
            this.setEndDate(this.startDate);
            this.updateElement();
            if (this.autoApplyChanges) {
                this.onClickApply();
            }
        }
        this.updateView();
        if (this.autoApplyChanges && this.startDate && this.endDate) {
            this.onClickApply();
        }
        // This is to cancel the blur event handler if the mouse was in one of the inputs
        e.stopPropagation();
    }
    /**
     *  Click on the custom range
     *
     * @param e
     *
     * @param label
     */
    onClickRange(e, label) {
        e.stopPropagation();
        this.chosenRange = label;
        if (label === this.locale.customRangeLabel) {
            this.isShown = true; // show calendars
            this.showDaterangepicker.emit();
            this.showCalendarInRanges = true;
        }
        else {
            const dates = this.ranges[label];
            this.startDate = dates[0].clone();
            this.endDate = dates[1].clone();
            if (this.showRangeLabelOnInput && label !== this.locale.customRangeLabel) {
                this.chosenLabel = label;
            }
            else {
                this.calculateChosenLabel();
            }
            this.showCalendarInRanges = (!this.rangesArray.length) || this.alwaysShowCalendars;
            if (!this.timePicker) {
                this.startDate.startOf('day');
                this.endDate.endOf('day');
            }
            if (!this.alwaysShowCalendars) {
                this.isShown = false; // hide calendars
            }
            this.rangeClicked.emit({ label: label, dates: dates });
            if (!this.keepCalendarOpeningWithRange) {
                this.onClickApply();
            }
            else {
                if (!this.alwaysShowCalendars) {
                    return this.onClickApply();
                }
                if (this.maxDate && this.maxDate.isSame(dates[0], 'month')) {
                    this.rightCalendar.month.month(dates[0].month());
                    this.rightCalendar.month.year(dates[0].year());
                    this.leftCalendar.month.month(dates[0].month() - 1);
                    this.leftCalendar.month.year(dates[1].year());
                }
                else {
                    this.leftCalendar.month.month(dates[0].month());
                    this.leftCalendar.month.year(dates[0].year());
                    // get the next year
                    const nextMonth = dates[0].clone().add(1, 'month');
                    this.rightCalendar.month.month(nextMonth.month());
                    this.rightCalendar.month.year(nextMonth.year());
                }
                this.updateCalendars();
                if (this.timePicker) {
                    this.renderTimePicker(SideEnum.left);
                    this.renderTimePicker(SideEnum.right);
                }
            }
        }
    }
    show(e) {
        if (this.isShown) {
            return;
        }
        this._old.start = this.startDate.clone();
        this._old.end = this.endDate.clone();
        this.isShown = true;
        this.showDaterangepicker.emit();
        this.updateView();
    }
    hide(e) {
        if (!this.isShown) {
            return;
        }
        // incomplete date selection, revert to last values
        if (!this.endDate) {
            if (this._old.start) {
                this.startDate = this._old.start.clone();
            }
            if (this._old.end) {
                this.endDate = this._old.end.clone();
            }
        }
        // if a new date range was selected, invoke the user callback function
        if (!this.startDate.isSame(this._old.start) || !this.endDate.isSame(this._old.end)) ;
        // if picker is attached to a text input, update it
        this.updateElement();
        this.isShown = false;
        this.hideDaterangepicker.emit();
        this._ref.detectChanges();
    }
    /**
     * Update the locale options
     *
     * @param locale
     */
    updateLocale(locale) {
        for (const key in locale) {
            if (locale.hasOwnProperty(key)) {
                this.locale[key] = locale[key];
                if (key === 'customRangeLabel') {
                    this.renderRanges();
                }
            }
        }
    }
    /**
     *  Clear the daterange picker
     */
    clear() {
        this.startDate = moment$1().startOf('day');
        this.endDate = moment$1().endOf('day');
        this.choosedDate.emit({ chosenLabel: '', startDate: null, endDate: null });
        this.datesUpdated.emit({ startDate: null, endDate: null });
        this.hide();
    }
    /**
     * Find out if the selected range should be disabled if it doesn't
     * fit into minDate and maxDate limitations.
     *
     * @param range
     */
    disableRange(range) {
        if (range === this.locale.customRangeLabel) {
            return false;
        }
        const rangeMarkers = this.ranges[range];
        const areBothBefore = rangeMarkers.every(date => {
            if (!this.minDate) {
                return false;
            }
            return date.isBefore(this.minDate);
        });
        const areBothAfter = rangeMarkers.every(date => {
            if (!this.maxDate) {
                return false;
            }
            return date.isAfter(this.maxDate);
        });
        return (areBothBefore || areBothAfter);
    }
    /**
     * Get date and time
     *
     * @param date the date to add time
     *
     * @param side left or right
     */
    _getDateWithTime(date, side) {
        let hour = parseInt(this.timepickerVariables[side].selectedHour, 10);
        if (!this.timePicker24Hour) {
            const ampm = this.timepickerVariables[side].ampmModel;
            if (ampm === 'PM' && hour < 12) {
                hour += 12;
            }
            if (ampm === 'AM' && hour === 12) {
                hour = 0;
            }
        }
        const minute = parseInt(this.timepickerVariables[side].selectedMinute, 10);
        const second = this.timePickerSeconds ? parseInt(this.timepickerVariables[side].selectedSecond, 10) : 0;
        return date.clone().hour(hour).minute(minute).second(second);
    }
    /**
     *  Build the locale config
     */
    _buildLocale() {
        this.locale = Object.assign({}, this._localeService.config, this.locale);
        if (!this.locale.format) {
            if (this.timePicker) {
                this.locale.format = moment$1.localeData().longDateFormat('lll');
            }
            else {
                this.locale.format = moment$1.localeData().longDateFormat('L');
            }
        }
    }
    /**
     *  Build calendar cells
     */
    _buildCells(calendar, side) {
        for (let row = 0; row < 6; row++) {
            this.calendarVariables[side].classes[row] = {};
            const rowClasses = [];
            if (this.emptyWeekRowClass && !this.hasCurrentMonthDays(this.calendarVariables[side].month, calendar[row])) {
                rowClasses.push(this.emptyWeekRowClass);
            }
            for (let col = 0; col < 7; col++) {
                const classes = [];
                // highlight today's date
                if (calendar[row][col].isSame(new Date(), 'day')) {
                    classes.push('today');
                }
                // highlight weekends
                if (calendar[row][col].isoWeekday() > 5) {
                    classes.push('weekend');
                }
                // grey out the dates in other months displayed at beginning and end of this calendar
                if (calendar[row][col].month() !== calendar[1][1].month()) {
                    classes.push('off');
                    // mark the last day of the previous month in this calendar
                    if (this.lastDayOfPreviousMonthClass && (calendar[row][col].month() < calendar[1][1].month() ||
                        calendar[1][1].month() === 0) && calendar[row][col].date() === this.calendarVariables[side].daysInLastMonth) {
                        classes.push(this.lastDayOfPreviousMonthClass);
                    }
                    // mark the first day of the next month in this calendar
                    if (this.firstDayOfNextMonthClass && (calendar[row][col].month() > calendar[1][1].month() ||
                        calendar[row][col].month() === 0) && calendar[row][col].date() === 1) {
                        classes.push(this.firstDayOfNextMonthClass);
                    }
                }
                // mark the first day of the current month with a custom class
                if (this.firstMonthDayClass && calendar[row][col].month() === calendar[1][1].month() &&
                    calendar[row][col].date() === calendar.firstDay.date()) {
                    classes.push(this.firstMonthDayClass);
                }
                // mark the last day of the current month with a custom class
                if (this.lastMonthDayClass && calendar[row][col].month() === calendar[1][1].month() &&
                    calendar[row][col].date() === calendar.lastDay.date()) {
                    classes.push(this.lastMonthDayClass);
                }
                // don't allow selection of dates before the minimum date
                if (this.minDate && calendar[row][col].isBefore(this.minDate, 'day')) {
                    classes.push('off', 'disabled');
                }
                // don't allow selection of dates after the maximum date
                if (this.calendarVariables[side].maxDate && calendar[row][col].isAfter(this.calendarVariables[side].maxDate, 'day')) {
                    classes.push('off', 'disabled');
                }
                // don't allow selection of date if a custom function decides it's invalid
                if (this.isInvalidDate(calendar[row][col])) {
                    classes.push('off', 'disabled', 'invalid');
                }
                // highlight the currently selected start date
                if (this.startDate && calendar[row][col].format('YYYY-MM-DD') === this.startDate.format('YYYY-MM-DD')) {
                    classes.push('active', 'start-date');
                }
                // highlight the currently selected end date
                if (this.endDate != null && calendar[row][col].format('YYYY-MM-DD') === this.endDate.format('YYYY-MM-DD')) {
                    classes.push('active', 'end-date');
                }
                // highlight dates in-between the selected dates
                if (this.endDate != null && calendar[row][col] > this.startDate && calendar[row][col] < this.endDate) {
                    classes.push('in-range');
                }
                // apply custom classes for this date
                const isCustom = this.isCustomDate(calendar[row][col]);
                if (isCustom !== false) {
                    if (typeof isCustom === 'string') {
                        classes.push(isCustom);
                    }
                    else {
                        Array.prototype.push.apply(classes, isCustom);
                    }
                }
                // store classes var
                let cname = '', disabled = false;
                for (let i = 0; i < classes.length; i++) {
                    cname += classes[i] + ' ';
                    if (classes[i] === 'disabled') {
                        disabled = true;
                    }
                }
                if (!disabled) {
                    cname += 'available';
                }
                this.calendarVariables[side].classes[row][col] = cname.replace(/^\s+|\s+$/g, '');
            }
            this.calendarVariables[side].classes[row].classList = rowClasses.join(' ');
        }
    }
    /**
     * Find out if the current calendar row has current month days
     * (as opposed to consisting of only previous/next month days)
     */
    hasCurrentMonthDays(currentMonth, row) {
        for (let day = 0; day < 7; day++) {
            if (row[day].month() === currentMonth) {
                return true;
            }
        }
        return false;
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], DaterangepickerComponent.prototype, "singleDatePicker", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DaterangepickerComponent.prototype, "showDropdowns", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DaterangepickerComponent.prototype, "showWeekNumbers", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DaterangepickerComponent.prototype, "showISOWeekNumbers", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], DaterangepickerComponent.prototype, "drops", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], DaterangepickerComponent.prototype, "opens", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DaterangepickerComponent.prototype, "minDate", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DaterangepickerComponent.prototype, "maxDate", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DaterangepickerComponent.prototype, "startDate", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DaterangepickerComponent.prototype, "endDate", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number)
], DaterangepickerComponent.prototype, "dateLimit", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], DaterangepickerComponent.prototype, "showCustomRangeLabel", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DaterangepickerComponent.prototype, "showCancelButton", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DaterangepickerComponent.prototype, "showApplyButton", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DaterangepickerComponent.prototype, "showClearButton", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DaterangepickerComponent.prototype, "keepCalendarOpeningWithRange", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DaterangepickerComponent.prototype, "showRangeLabelOnInput", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DaterangepickerComponent.prototype, "customRangeDirection", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DaterangepickerComponent.prototype, "lockStartDate", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DaterangepickerComponent.prototype, "autoUpdateInput", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DaterangepickerComponent.prototype, "alwaysShowCalendars", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DaterangepickerComponent.prototype, "linkedCalendars", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DaterangepickerComponent.prototype, "closeOnAutoApply", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DaterangepickerComponent.prototype, "autoApplyChanges", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DaterangepickerComponent.prototype, "maxSpan", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], DaterangepickerComponent.prototype, "timePicker", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], DaterangepickerComponent.prototype, "timePicker24Hour", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DaterangepickerComponent.prototype, "timePickerIncrement", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], DaterangepickerComponent.prototype, "timePickerSeconds", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], DaterangepickerComponent.prototype, "locale", null);
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], DaterangepickerComponent.prototype, "ranges", null);
__decorate([
    Input(),
    __metadata("design:type", String)
], DaterangepickerComponent.prototype, "firstMonthDayClass", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], DaterangepickerComponent.prototype, "lastMonthDayClass", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], DaterangepickerComponent.prototype, "emptyWeekRowClass", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], DaterangepickerComponent.prototype, "firstDayOfNextMonthClass", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], DaterangepickerComponent.prototype, "lastDayOfPreviousMonthClass", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], DaterangepickerComponent.prototype, "choosedDate", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], DaterangepickerComponent.prototype, "rangeClicked", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], DaterangepickerComponent.prototype, "datesUpdated", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], DaterangepickerComponent.prototype, "startDateChanged", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], DaterangepickerComponent.prototype, "endDateChanged", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], DaterangepickerComponent.prototype, "showDaterangepicker", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], DaterangepickerComponent.prototype, "hideDaterangepicker", void 0);
__decorate([
    ViewChild('pickerContainer'),
    __metadata("design:type", ElementRef)
], DaterangepickerComponent.prototype, "pickerContainer", void 0);
__decorate([
    Input(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DaterangepickerComponent.prototype, "isInvalidDate", null);
__decorate([
    Input(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DaterangepickerComponent.prototype, "isCustomDate", null);
DaterangepickerComponent = DaterangepickerComponent_1 = __decorate([
    Component({
        selector: 'ngx-daterangepicker-material',
        template: "<div class=\"md-drppicker\" #pickerContainer\n[ngClass]=\"{\n    ltr: locale.direction === 'ltr',\n    rtl: this.locale.direction === 'rtl',\n    'shown': isShown || inline,\n    'hidden': !isShown && !inline,\n    'inline': inline,\n    'double': !singleDatePicker && showCalendarInRanges,\n    'show-ranges': rangesArray.length\n}\" [class]=\"'drops-' + drops + '-' + opens\"\nstopClickPropagation>\n  <div class=\"ranges\">\n    <ul>\n      <li *ngFor=\"let range of rangesArray\" stopClickPropagation>\n        <button type=\"button\"\n                (click)=\"onClickRange($event, range)\"\n                [disabled]=\"disableRange(range)\"\n                [ngClass]=\"{'active': range === chosenRange}\"\n                stopClickPropagation>{{range}}</button>\n      </li>\n    </ul>\n  </div>\n  <div class=\"calendar\" [ngClass]=\"{'right': singleDatePicker, 'left': !singleDatePicker}\" *ngIf=\"showCalendarInRanges\">\n    <div class=\"calendar-table\">\n      <table class=\"table-condensed\" *ngIf=\"calendarVariables\">\n        <thead>\n          <tr>\n            <th *ngIf=\"showWeekNumbers || showISOWeekNumbers\"></th>\n            <ng-container *ngIf=\"!calendarVariables.left.minDate || calendarVariables.left.minDate.isBefore(calendarVariables.left.calendar.firstDay) && !this.linkedCalendars\">\n                <th (click)=\"onClickPrev(sideEnum.left)\" class=\"prev available\" stopClickPropagation>\n                </th>\n            </ng-container>\n            <ng-container *ngIf=\"!(!calendarVariables.left.minDate || calendarVariables.left.minDate.isBefore(calendarVariables.left.calendar.firstDay) && !this.linkedCalendars)\">\n                <th></th>\n            </ng-container>\n            <th colspan=\"5\" class=\"month drp-animate\">\n                <ng-container *ngIf=\"showDropdowns && calendarVariables.left.dropdowns\">\n                    <div class=\"dropdowns\">\n                      <mat-select class=\"monthSelect\"\n                                  [(value)]=\"calendarVariables.left.dropdowns.currentMonth\"\n                                  (selectionChange)=\"onMonthChanged($event, sideEnum.left)\"\n                                  stopClickPropagation>\n                        <mat-option [disabled]=\"(calendarVariables.left.dropdowns.inMinYear && m < calendarVariables.left.minDate.month()) ||\n                                    (calendarVariables.left.dropdowns.inMaxYear && m > calendarVariables.left.maxDate.month())\"\n                                    *ngFor=\"let m of calendarVariables.left.dropdowns.monthArrays\"\n                                    [value]=\"m\"\n                                    stopClickPropagation>\n                          {{ locale.monthNames[m] }}\n                        </mat-option>\n                      </mat-select>\n                    </div>\n                    <div class=\"dropdowns\">\n                      <mat-select class=\"yearSelect\"\n                                [(value)]=\"calendarVariables.left.dropdowns.currentYear\"\n                                (selectionChange)=\"onYearChanged($event, sideEnum.left);\"\n                                stopClickPropagation>\n                        <mat-option *ngFor=\"let y of calendarVariables.left.dropdowns.yearArrays\"\n                                    [value]=\"y\"\n                                    stopClickPropagation>\n                          {{ y }}\n                        </mat-option>\n                      </mat-select>\n                    </div>\n                </ng-container>\n                <ng-container *ngIf=\"!showDropdowns || !calendarVariables.left.dropdowns\">\n                        {{this.locale.monthNames[calendarVariables?.left?.calendar[1][1].month()]}}  {{ calendarVariables?.left?.calendar[1][1].format(\" YYYY\")}}\n                </ng-container>\n            </th>\n            <ng-container *ngIf=\"(!calendarVariables.left.maxDate || calendarVariables.left.maxDate.isAfter(calendarVariables.left.calendar.lastDay)) && (!linkedCalendars || singleDatePicker )\">\n                <th class=\"next available\" (click)=\"onClickNext(sideEnum.left)\" stopClickPropagation>\n                </th>\n            </ng-container>\n            <ng-container *ngIf=\"!((!calendarVariables.left.maxDate || calendarVariables.left.maxDate.isAfter(calendarVariables.left.calendar.lastDay)) && (!linkedCalendars || singleDatePicker ))\">\n                <th></th>\n            </ng-container>\n          </tr>\n          <tr class=\"week-days\">\n            <th *ngIf=\"showWeekNumbers || showISOWeekNumbers\" class=\"week\"><span>{{this.locale.weekLabel}}</span></th>\n            <th *ngFor=\"let dayofweek of locale.daysOfWeek\"><span>{{dayofweek}}</span></th>\n          </tr>\n        </thead>\n        <tbody class=\"drp-animate\">\n          <tr *ngFor=\"let row of calendarVariables.left.calRows\" [class]=\"calendarVariables.left.classes[row].classList\">\n            <!-- add week number -->\n            <td  class=\"week\" *ngIf=\"showWeekNumbers\">\n                <span>{{calendarVariables.left.calendar[row][0].week()}}</span>\n            </td>\n            <td class=\"week\" *ngIf=\"showISOWeekNumbers\">\n                <span>{{calendarVariables.left.calendar[row][0].isoWeek()}}</span>\n            </td>\n            <!-- cal -->\n            <td *ngFor=\"let col of calendarVariables.left.calCols\" [class]=\"calendarVariables.left.classes[row][col]\" (click)=\"onClickDate($event, sideEnum.left, row, col)\">\n                <span>{{calendarVariables.left.calendar[row][col].date()}}</span>\n            </td>\n          </tr>\n        </tbody>\n      </table>\n    </div>\n    <div class=\"calendar-time\" *ngIf=\"timePicker\">\n        <div class=\"select\">\n          <mat-select class=\"hourselect select-item\"\n                      [disabled]=\"!endDate\"\n                      [(ngModel)]=\"timepickerVariables.left.selectedHour\"\n                      (selectionChange)=\"timeChanged($event, sideEnum.left)\">\n            <mat-option *ngFor=\"let i of timepickerVariables.left.hours\"\n                        [value]=\"i\"\n                        [disabled]=\"timepickerVariables.left.disabledHours.indexOf(i) > -1\"\n                        stopClickPropagation>\n              {{ i }}\n            </mat-option>\n          </mat-select>\n          <span matSuffix>:</span>\n        </div>\n        <div class=\"select\">\n          <mat-select class=\"select-item minuteselect\"\n          [disabled]=\"!endDate\"\n          [(ngModel)]=\"timepickerVariables.left.selectedMinute\"\n          (selectionChange)=\"timeChanged($event, sideEnum.left)\">\n            <mat-option *ngFor=\"let i of timepickerVariables.left.minutes; let index = index;\"\n                        [value]=\"i\"\n                        [disabled]=\"timepickerVariables.left.disabledMinutes.indexOf(i) > -1\"\n                        stopClickPropagation>\n              {{ timepickerVariables.left.minutesLabel[index] }}\n            </mat-option>\n          </mat-select>\n          <span matSuffix *ngIf=\"timePickerSeconds\">:</span>\n        </div>\n        <div class=\"select\" *ngIf=\"timePickerSeconds\">\n            <mat-select class=\"select-item secondselect\"\n                        [disabled]=\"!endDate\"\n                        [(ngModel)]=\"timepickerVariables.left.selectedSecond\"\n                        (selectionChange)=\"timeChanged($event, sideEnum.left)\">\n              <mat-option *ngFor=\"let i of timepickerVariables.left.seconds; let index = index;\"\n                          [value]=\"i\"\n                          [disabled]=\"timepickerVariables.left.disabledSeconds.indexOf(i) > -1\"\n                          stopClickPropagation>\n                {{ timepickerVariables.left.secondsLabel[index] }}\n              </mat-option>\n            </mat-select>\n        </div>\n        <div class=\"select\">\n          <mat-select class=\"select-item ampmselect\"\n                      [(ngModel)]=\"timepickerVariables.left.ampmModel\"\n                      (selectionChange)=\"timeChanged($event, sideEnum.left)\">\n            <mat-option value=\"AM\" [disabled]=\"timepickerVariables.left.amDisabled\" stopClickPropagation>AM</mat-option>\n            <mat-option value=\"PM\" [disabled]=\"timepickerVariables.left.pmDisabled\" stopClickPropagation>PM</mat-option>\n          </mat-select>\n        </div>\n    </div>\n  </div>\n  <div class=\"calendar right\" *ngIf=\"showCalendarInRanges && !singleDatePicker\">\n    <div class=\"calendar-table\">\n      <table class=\"table-condensed\" *ngIf=\"calendarVariables\">\n        <thead>\n          <tr>\n            <th *ngIf=\"showWeekNumbers || showISOWeekNumbers\"></th>\n            <ng-container *ngIf=\"(!calendarVariables.right.minDate || calendarVariables.right.minDate.isBefore(calendarVariables.right.calendar.firstDay)) && !this.linkedCalendars\">\n                <th (click)=\"onClickPrev(sideEnum.right)\" class=\"prev available\" stopClickPropagation>\n                </th>\n            </ng-container>\n            <ng-container *ngIf=\"!((!calendarVariables.right.minDate || calendarVariables.right.minDate.isBefore(calendarVariables.right.calendar.firstDay)) && !this.linkedCalendars)\">\n                <th></th>\n            </ng-container>\n            <th colspan=\"5\" class=\"month\">\n                <ng-container *ngIf=\"showDropdowns && calendarVariables.right.dropdowns\">\n                    <div class=\"dropdowns\">\n                      <mat-select class=\"monthSelect\"\n                                [(value)]=\"calendarVariables.right.dropdowns.currentMonth\"\n                                (selectionChange)=\"onMonthChanged($event, sideEnum.right)\"\n                                stopClickPropagation>\n                        <mat-option [disabled]=\"(calendarVariables.right.dropdowns.inMinYear &&\n                                    m < calendarVariables.right.minDate.month()) ||\n                                    (calendarVariables.right.dropdowns.inMaxYear &&\n                                    m > calendarVariables.right.maxDate.month())\"\n                                    *ngFor=\"let m of calendarVariables.right.dropdowns.monthArrays\"\n                                    [value]=\"m\"\n                                    stopClickPropagation>\n                          {{ locale.monthNames[m] }}\n                        </mat-option>\n                      </mat-select>\n                    </div>\n                    <div class=\"dropdowns\">\n                        <mat-select class=\"yearSelect\"\n                                    [(value)]=\"calendarVariables.right.dropdowns.currentYear\"\n                                    (selectionChange)=\"onYearChanged($event, sideEnum.right)\"\n                                    stopClickPropagation>\n                          <mat-option *ngFor=\"let y of calendarVariables.right.dropdowns.yearArrays\"\n                                      [value]=\"y\"\n                                      stopClickPropagation>\n                            {{ y }}\n                          </mat-option>\n                        </mat-select>\n                    </div>\n                </ng-container>\n                <ng-container *ngIf=\"!showDropdowns || !calendarVariables.right.dropdowns\">\n                        {{this.locale.monthNames[calendarVariables?.right?.calendar[1][1].month()]}}  {{ calendarVariables?.right?.calendar[1][1].format(\" YYYY\")}}\n                </ng-container>\n            </th>\n            <ng-container *ngIf=\"!calendarVariables.right.maxDate || calendarVariables.right.maxDate.isAfter(calendarVariables.right.calendar.lastDay) && (!linkedCalendars || singleDatePicker)\">\n                <th class=\"next available\" (click)=\"onClickNext(sideEnum.right)\" stopClickPropagation>\n                </th>\n            </ng-container>\n            <ng-container *ngIf=\"!(!calendarVariables.right.maxDate || calendarVariables.right.maxDate.isAfter(calendarVariables.right.calendar.lastDay) && (!linkedCalendars || singleDatePicker))\">\n                <th></th>\n            </ng-container>\n          </tr>\n          <tr>\n            <th *ngIf=\"showWeekNumbers || showISOWeekNumbers\" class=\"week\"><span>{{this.locale.weekLabel}}</span></th>\n            <th *ngFor=\"let dayofweek of locale.daysOfWeek\"><span>{{dayofweek}}</span></th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr *ngFor=\"let row of calendarVariables.right.calRows\" [class]=\"calendarVariables.right.classes[row].classList\">\n            <td class=\"week\" *ngIf=\"showWeekNumbers\">\n              <span>{{calendarVariables.right.calendar[row][0].week()}}</span>\n            </td>\n            <td class=\"week\" *ngIf=\"showISOWeekNumbers\">\n              <span>{{calendarVariables.right.calendar[row][0].isoWeek()}}</span>\n            </td>\n            <td *ngFor=\"let col of calendarVariables.right.calCols\" [class]=\"calendarVariables.right.classes[row][col]\" (click)=\"onClickDate($event, sideEnum.right, row, col)\">\n              <span>{{calendarVariables.right.calendar[row][col].date()}}</span>\n            </td>\n          </tr>\n        </tbody>\n      </table>\n    </div>\n    <div class=\"calendar-time\" *ngIf=\"timePicker\">\n      <div class=\"select\">\n        <mat-select class=\"select-item hourselect\"\n                    [(ngModel)]=\"timepickerVariables.right.selectedHour\"\n                    (selectionChange)=\"timeChanged($event, sideEnum.right)\"\n                    [disabled]=\"!endDate\">\n          <mat-option *ngFor=\"let i of timepickerVariables.right.hours\"\n                      [value]=\"i\"\n                      stopClickPropagation\n                      [disabled]=\"timepickerVariables.right.disabledHours.indexOf(i) > -1\">\n            {{ i }}\n          </mat-option>\n        </mat-select>\n        <span matSuffix>:</span>\n      </div>\n      <div class=\"select\">\n        <mat-select class=\"select-item minuteselect\"\n                    [disabled]=\"!endDate\"\n                    [(ngModel)]=\"timepickerVariables.right.selectedMinute\"\n                    (selectionChange)=\"timeChanged($event, sideEnum.right)\">\n          <mat-option *ngFor=\"let i of timepickerVariables.right.minutes; let index = index;\"\n                      [value]=\"i\"\n                      stopClickPropagation\n                      [disabled]=\"timepickerVariables.right.disabledMinutes.indexOf(i) > -1\">\n            {{ timepickerVariables.right.minutesLabel[index] }}\n          </mat-option>\n        </mat-select>\n        <span matSuffix *ngIf=\"timePickerSeconds\">:</span>\n      </div>\n      <div class=\"select\" *ngIf=\"timePickerSeconds\">\n        <mat-select class=\"select-item secondselect\"\n                    [disabled]=\"!endDate\"\n                    [(ngModel)]=\"timepickerVariables.right.selectedSecond\"\n                    (selectionChange)=\"timeChanged($event, sideEnum.right)\">\n          <mat-option *ngFor=\"let i of timepickerVariables.right.seconds; let index = index;\"\n                      [value]=\"i\"\n                      stopClickPropagation\n                      [disabled]=\"timepickerVariables.right.disabledSeconds.indexOf(i) > -1\">\n            {{ timepickerVariables.right.secondsLabel[index] }}\n          </mat-option>\n        </mat-select>\n      </div>\n      <div class=\"select\" *ngIf=\"!timePicker24Hour\">\n        <mat-select class=\"select-item ampmselect\"\n                    [(ngModel)]=\"timepickerVariables.right.ampmModel\"\n                    (selectionChange)=\"timeChanged($event, sideEnum.right)\">\n          <mat-option value=\"AM\" [disabled]=\"timepickerVariables.right.amDisabled\" stopClickPropagation>AM</mat-option>\n          <mat-option value=\"PM\" [disabled]=\"timepickerVariables.right.pmDisabled\" stopClickPropagation>PM</mat-option>\n        </mat-select>\n      </div>\n    </div>\n  </div>\n  <div class=\"buttons\" *ngIf=\"!rangesArray.length || (showCalendarInRanges && !singleDatePicker)\">\n      <div class=\"buttons_input\">\n          <button  *ngIf=\"showClearButton\" class=\"btn btn-default clear\" type=\"button\" (click)=\"clear()\" [title]=\"locale.clearLabel\">\n              {{locale.clearLabel}}\n              <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"30\" height=\"30\" viewBox=\"0 -5 24 24\"><path d=\"M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z\"/></svg>\n          </button>\n          <button class=\"btn btn-cancel\" *ngIf=\"showCancelButton\" type=\"button\" (click)=\"onClickCancel($event)\">{{ locale.cancelLabel }}</button>\n          <button class=\"btn btn-apply\" *ngIf=\"showApplyButton\" [disabled]=\"applyBtn.disabled\" type=\"button\" (click)=\"onClickApply($event)\">{{ locale.applyLabel }}</button>\n      </div>\n  </div>\n</div>\n",
        encapsulation: ViewEncapsulation.None,
        providers: [{
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => DaterangepickerComponent_1),
                multi: true
            }],
        styles: [".md-drppicker{position:absolute;font-family:Roboto,sans-serif!important;color:inherit;border-radius:4px;width:278px;padding:4px;margin-top:-10px;overflow:hidden;z-index:1000;font-size:14px;background-color:#fff;box-shadow:0 2px 4px 0 rgba(0,0,0,.16),0 2px 8px 0 rgba(0,0,0,.12)}.md-drppicker.inline{position:relative;display:inline-block}.md-drppicker:after,.md-drppicker:before{position:absolute;display:inline-block;border-bottom-color:rgba(0,0,0,.2);content:''}.md-drppicker.openscenter:after,.md-drppicker.openscenter:before{left:0;right:0;width:0;margin-left:auto;margin-right:auto}.md-drppicker.single .calendar,.md-drppicker.single .ranges{float:none}.md-drppicker.shown{transform:scale(1);transition:.1s ease-in-out;transform-origin:0 0;-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.md-drppicker.shown.drops-up-left{transform-origin:100% 100%}.md-drppicker.shown.drops-up-right{transform-origin:0 100%}.md-drppicker.shown.drops-down-left{transform-origin:100% 0}.md-drppicker.shown.drops-down-right{transform-origin:0 0}.md-drppicker.shown.drops-down-center{transform-origin:NaN}.md-drppicker.shown.drops-up-center{transform-origin:50%}.md-drppicker.shown .calendar{display:block}.md-drppicker.hidden{transition:.1s;transform:scale(0);transform-origin:0 0;cursor:default;-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.md-drppicker.hidden.drops-up-left{transform-origin:100% 100%}.md-drppicker.hidden.drops-up-right{transform-origin:0 100%}.md-drppicker.hidden.drops-down-left{transform-origin:100% 0}.md-drppicker.hidden.drops-down-right{transform-origin:0 0}.md-drppicker.hidden.drops-down-center{transform-origin:NaN}.md-drppicker.hidden.drops-up-center{transform-origin:50%}.md-drppicker.hidden .calendar{display:none}.md-drppicker .calendar{max-width:270px;margin:4px}.md-drppicker .calendar.single .calendar-table{border:none}.md-drppicker .calendar td,.md-drppicker .calendar th{padding:0;white-space:nowrap;text-align:center;min-width:32px}.md-drppicker .calendar td span,.md-drppicker .calendar th span{pointer-events:none}.md-drppicker .calendar-table{border:1px solid #fff;padding:4px;border-radius:4px;background-color:#fff}.md-drppicker table{width:100%;margin:0}.md-drppicker th{color:#111}.md-drppicker td,.md-drppicker th{text-align:center;border-radius:4px;border:1px solid transparent;white-space:nowrap;cursor:pointer;height:2em;width:2em}.md-drppicker td.available.prev,.md-drppicker th.available.prev{display:block;background-image:url(data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgMy43IDYiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDMuNyA2IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxnPg0KCTxwYXRoIGQ9Ik0zLjcsMC43TDEuNCwzbDIuMywyLjNMMyw2TDAsM2wzLTNMMy43LDAuN3oiLz4NCjwvZz4NCjwvc3ZnPg0K);background-repeat:no-repeat;background-size:.5em;background-position:center;opacity:.8;transition:background-color .2s;border-radius:2em}.md-drppicker td.available.prev:hover,.md-drppicker th.available.prev:hover{margin:0}.md-drppicker td.available.next,.md-drppicker th.available.next{transform:rotate(180deg);display:block;background-image:url(data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgMy43IDYiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDMuNyA2IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxnPg0KCTxwYXRoIGQ9Ik0zLjcsMC43TDEuNCwzbDIuMywyLjNMMyw2TDAsM2wzLTNMMy43LDAuN3oiLz4NCjwvZz4NCjwvc3ZnPg0K);background-repeat:no-repeat;background-size:.5em;background-position:center;opacity:.8;transition:background-color .2s;border-radius:2em}.md-drppicker td.available.next:hover,.md-drppicker th.available.next:hover{margin:0;transform:rotate(180deg)}.md-drppicker td.available:hover,.md-drppicker th.available:hover{background-color:#eee;border-color:transparent;color:inherit;background-repeat:no-repeat;background-size:.5em;background-position:center;margin:.25em 0;opacity:.8;border-radius:2em;transform:scale(1);transition:450ms cubic-bezier(.23,1,.32,1)}.md-drppicker td.week,.md-drppicker th.week{font-size:80%;color:#ccc}.md-drppicker td{margin:.25em 0;opacity:.8;transition:450ms cubic-bezier(.23,1,.32,1);border-radius:2em;transform:scale(1)}.md-drppicker td.off,.md-drppicker td.off.end-date,.md-drppicker td.off.in-range,.md-drppicker td.off.start-date{background-color:#fff;border-color:transparent;color:#999}.md-drppicker td.in-range{background-color:#dde2e4;border-color:transparent;color:#000;border-radius:0}.md-drppicker td.start-date{border-radius:2em 0 0 2em}.md-drppicker td.end-date{border-radius:0 2em 2em 0}.md-drppicker td.start-date.end-date{border-radius:4px}.md-drppicker td.active{transition:background .3s ease-out;background:rgba(0,0,0,.1)}.md-drppicker td.active,.md-drppicker td.active:hover{background-color:#0072ba;border-color:transparent;color:#fff}.md-drppicker th.month{width:auto}.md-drppicker option.disabled,.md-drppicker td.disabled{color:#999;cursor:not-allowed;text-decoration:line-through}.md-drppicker .dropdowns{width:55px}.md-drppicker .dropdowns select{display:inline-block;background-color:rgba(255,255,255,.9);width:100%;padding:5px;border:none;height:auto;font-family:Roboto,sans-serif!important}.md-drppicker .dropdowns select.ampmselect,.md-drppicker .dropdowns select.hourselect,.md-drppicker .dropdowns select.minuteselect,.md-drppicker .dropdowns select.secondselect{width:55px;margin:0 auto;background:#eee;border:1px solid #eee;padding:2px;outline:0;font-size:12px}.md-drppicker .dropdowns select.monthselect,.md-drppicker .dropdowns select.yearselect{cursor:pointer;opacity:0;position:absolute;top:0;left:0;margin:0;padding:0}.md-drppicker th.month>div{position:relative;display:inline-block}.md-drppicker .calendar-time{text-align:center;margin:4px auto 0;line-height:30px;position:relative}.md-drppicker .calendar-time .select{display:inline-block;width:60px}.md-drppicker .calendar-time .select .select-item{display:inline-block;width:auto;position:relative;font-family:inherit;background-color:transparent;padding:0 7px;font-size:14px;border:none;border-bottom:1px solid rgba(0,0,0,.12);border-radius:6px}.md-drppicker .calendar-time .select .select-item:focus{outline:0}.md-drppicker .calendar-time .select .select-item .select-label{color:rgba(0,0,0,.26);font-size:16px;font-weight:400;position:absolute;pointer-events:none;left:0;top:10px;transition:.2s}.md-drppicker .calendar-time select.disabled{color:#ccc;cursor:not-allowed}.md-drppicker .label-input{border:1px solid #ccc;border-radius:4px;color:#555;height:30px;line-height:30px;display:block;vertical-align:middle;margin:0 auto 5px;padding:0 0 0 28px;width:100%}.md-drppicker .label-input.active{border:1px solid #08c;border-radius:4px}.md-drppicker .md-drppicker_input{position:relative;padding:0 30px 0 0}.md-drppicker .md-drppicker_input i,.md-drppicker .md-drppicker_input svg{position:absolute;left:8px;top:8px}.md-drppicker.rtl .label-input{padding-right:28px;padding-left:6px}.md-drppicker.rtl .md-drppicker_input i,.md-drppicker.rtl .md-drppicker_input svg{left:auto;right:8px}.md-drppicker .show-ranges .drp-calendar.left{border-left:1px solid #ddd}.md-drppicker .ranges{float:none;text-align:left;margin:0;display:block}.md-drppicker .ranges ul{list-style:none;margin:0 auto;padding:0;width:100%}.md-drppicker .ranges ul li{font-size:12px;display:inline-block}.md-drppicker .ranges ul li button{padding:8px 12px;width:100%;background:0 0;border:none;text-align:left;cursor:pointer;color:rgba(0,0,0,.34)}.md-drppicker .ranges ul li button.active{color:#0072ba}.md-drppicker .ranges ul li button[disabled]{opacity:.3}.md-drppicker .ranges ul li button:active{background:0 0}.md-drppicker .ranges ul li:hover{background-color:#eee}.md-drppicker .show-calendar .ranges{margin-top:8px}.md-drppicker [hidden]{display:none}.md-drppicker .buttons{text-align:right;margin:0 5px 5px 0}.md-drppicker .buttons .buttons_input{width:100%;display:inline-block;padding-top:12px}.md-drppicker .btn{position:relative;overflow:hidden;border-width:0;outline:0;cursor:pointer;border-radius:4px;font-size:14px;font-weight:500;box-shadow:none;text-decoration:none;line-height:30px!important;padding:0 13px!important;color:rgba(0,0,0,.87)}.md-drppicker .btn:focus,.md-drppicker .btn:hover{background-color:#0072ba}.md-drppicker .btn>*{position:relative}.md-drppicker .btn span{display:block;padding:12px 24px}.md-drppicker .btn:before{content:\"\";position:absolute;top:50%;left:50%;display:block;width:0;padding-top:0;border-radius:100%;background-color:rgba(236,240,241,.3);transform:translate(-50%,-50%)}.md-drppicker .btn:active:before{width:120%;padding-top:120%;transition:width .2s ease-out,padding-top .2s ease-out}.md-drppicker .btn:disabled{opacity:.5}.md-drppicker .btn.btn-default{color:#000;background-color:#dcdcdc}.md-drppicker .btn.btn-apply{background-color:#0072ba;color:#fff;float:right}.md-drppicker .btn.btn-cancel{background-color:rgba(0,0,0,.06);float:left}.md-drppicker .clear{box-shadow:none;background-color:#fff!important}.md-drppicker .clear svg{color:#eb3232;fill:currentColor}@media (min-width:564px){.md-drppicker{width:auto;padding:20px 30px}.md-drppicker.single .calendar.left{clear:none}.md-drppicker.ltr{direction:ltr;text-align:left}.md-drppicker.ltr .calendar.left{clear:left}.md-drppicker.ltr .calendar.left .calendar-table{border-right:none;border-top-right-radius:0;border-bottom-right-radius:0;padding-right:12px}.md-drppicker.ltr .calendar.right{margin-left:0}.md-drppicker.ltr .calendar.right .calendar-table{border-left:none;border-top-left-radius:0;border-bottom-left-radius:0}.md-drppicker.ltr .left .md-drppicker_input,.md-drppicker.ltr .right .md-drppicker_input{padding-right:35px}.md-drppicker.ltr .calendar{float:left}.md-drppicker.rtl{direction:rtl;text-align:right}.md-drppicker.rtl .calendar.left{clear:right;margin-left:0}.md-drppicker.rtl .calendar.left .calendar-table{border-left:none;border-top-left-radius:0;border-bottom-left-radius:0}.md-drppicker.rtl .calendar.right{margin-right:0}.md-drppicker.rtl .calendar.right .calendar-table{border-right:none;border-top-right-radius:0;border-bottom-right-radius:0}.md-drppicker.rtl .calendar.left .calendar-table,.md-drppicker.rtl .left .md-drppicker_input{padding-left:12px}.md-drppicker.rtl .calendar{text-align:right;float:right}.drp-animate{transform:translate(0);transition:transform .2s,opacity .2s}.drp-animate.drp-picker-site-this{transition-timing-function:linear}.drp-animate.drp-animate-right{transform:translateX(10%);opacity:0}.drp-animate.drp-animate-left{transform:translateX(-10%);opacity:0}}@media (min-width:730px){.md-drppicker .ranges{width:auto}.md-drppicker .calendar.left{clear:none!important}}"]
    }),
    __metadata("design:paramtypes", [ElementRef,
        ChangeDetectorRef,
        LocaleService])
], DaterangepickerComponent);

var DaterangepickerDirective_1;
const moment$2 = _moment;
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
        this.startDate = moment$2().startOf('day');
        /** End date of current selection */
        this.endDate = moment$2().endOf('day');
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
            start = moment$2(dateString[0], this.picker.locale.format);
            end = moment$2(dateString[1], this.picker.locale.format);
        }
        if (this.singleDatePicker || start === null || end === null) {
            start = moment$2(e.target.value, this.picker.locale.format);
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
__decorate([
    Input(),
    __metadata("design:type", Object)
], DaterangepickerDirective.prototype, "singleDatePicker", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DaterangepickerDirective.prototype, "showDropdowns", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DaterangepickerDirective.prototype, "showWeekNumbers", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DaterangepickerDirective.prototype, "showISOWeekNumbers", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], DaterangepickerDirective.prototype, "drops", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], DaterangepickerDirective.prototype, "opens", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DaterangepickerDirective.prototype, "minDate", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DaterangepickerDirective.prototype, "maxDate", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DaterangepickerDirective.prototype, "startDate", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DaterangepickerDirective.prototype, "endDate", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number)
], DaterangepickerDirective.prototype, "dateLimit", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DaterangepickerDirective.prototype, "showCustomRangeLabel", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DaterangepickerDirective.prototype, "showCancelButton", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DaterangepickerDirective.prototype, "showApplyButton", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DaterangepickerDirective.prototype, "showClearButton", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DaterangepickerDirective.prototype, "keepCalendarOpeningWithRange", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DaterangepickerDirective.prototype, "showRangeLabelOnInput", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DaterangepickerDirective.prototype, "customRangeDirection", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DaterangepickerDirective.prototype, "lockStartDate", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DaterangepickerDirective.prototype, "autoUpdateInput", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DaterangepickerDirective.prototype, "alwaysShowCalendars", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DaterangepickerDirective.prototype, "linkedCalendars", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DaterangepickerDirective.prototype, "closeOnAutoApply", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DaterangepickerDirective.prototype, "autoApplyChanges", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DaterangepickerDirective.prototype, "maxSpan", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], DaterangepickerDirective.prototype, "timePicker", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], DaterangepickerDirective.prototype, "timePicker24Hour", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DaterangepickerDirective.prototype, "timePickerIncrement", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], DaterangepickerDirective.prototype, "timePickerSeconds", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], DaterangepickerDirective.prototype, "locale", null);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DaterangepickerDirective.prototype, "ranges", void 0);
__decorate([
    Input(),
    __metadata("design:type", Function)
], DaterangepickerDirective.prototype, "isInvalidDate", void 0);
__decorate([
    Input(),
    __metadata("design:type", Function)
], DaterangepickerDirective.prototype, "isCustomDate", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], DaterangepickerDirective.prototype, "firstMonthDayClass", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], DaterangepickerDirective.prototype, "lastMonthDayClass", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], DaterangepickerDirective.prototype, "emptyWeekRowClass", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], DaterangepickerDirective.prototype, "firstDayOfNextMonthClass", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], DaterangepickerDirective.prototype, "lastDayOfPreviousMonthClass", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DaterangepickerDirective.prototype, "_endKey", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], DaterangepickerDirective.prototype, "startKey", null);
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], DaterangepickerDirective.prototype, "endKey", null);
__decorate([
    Output('change'),
    __metadata("design:type", EventEmitter)
], DaterangepickerDirective.prototype, "onChange", void 0);
__decorate([
    Output('rangeClicked'),
    __metadata("design:type", EventEmitter)
], DaterangepickerDirective.prototype, "rangeClicked", void 0);
__decorate([
    Output('datesUpdated'),
    __metadata("design:type", EventEmitter)
], DaterangepickerDirective.prototype, "datesUpdated", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], DaterangepickerDirective.prototype, "startDateChanged", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], DaterangepickerDirective.prototype, "endDateChanged", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], DaterangepickerDirective.prototype, "showDaterangepicker", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], DaterangepickerDirective.prototype, "hideDaterangepicker", void 0);
__decorate([
    HostListener('document:click', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DaterangepickerDirective.prototype, "outsideClick", null);
DaterangepickerDirective = DaterangepickerDirective_1 = __decorate([
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
    __metadata("design:paramtypes", [ViewContainerRef,
        ChangeDetectorRef,
        ComponentFactoryResolver,
        ElementRef,
        Renderer2,
        KeyValueDiffers,
        LocaleService,
        ElementRef])
], DaterangepickerDirective);

let StopPropagationDirective = class StopPropagationDirective {
    stopClick(event) {
        event.preventDefault();
        event.stopPropagation();
    }
};
__decorate([
    HostListener('click', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Event]),
    __metadata("design:returntype", void 0)
], StopPropagationDirective.prototype, "stopClick", null);
StopPropagationDirective = __decorate([
    Directive({
        selector: '[stopClickPropagation]'
    })
], StopPropagationDirective);

var NgxDaterangepickerMd_1;
let NgxDaterangepickerMd = NgxDaterangepickerMd_1 = class NgxDaterangepickerMd {
    constructor() {
    }
    static forRoot(config = {}) {
        return {
            ngModule: NgxDaterangepickerMd_1,
            providers: [
                { provide: LOCALE_CONFIG, useValue: config },
                { provide: LocaleService, useClass: LocaleService, deps: [LOCALE_CONFIG] }
            ]
        };
    }
};
NgxDaterangepickerMd = NgxDaterangepickerMd_1 = __decorate([
    NgModule({
        declarations: [
            DaterangepickerComponent,
            DaterangepickerDirective,
            StopPropagationDirective
        ],
        imports: [
            CommonModule,
            FormsModule,
            ReactiveFormsModule,
            MatSelectModule
        ],
        providers: [],
        exports: [
            DaterangepickerComponent,
            DaterangepickerDirective,
            StopPropagationDirective
        ],
        entryComponents: [
            DaterangepickerComponent
        ]
    }),
    __metadata("design:paramtypes", [])
], NgxDaterangepickerMd);

export { DaterangepickerComponent, DaterangepickerDirective, DefaultLocaleConfig, LOCALE_CONFIG, LocaleService, NgxDaterangepickerMd, StopPropagationDirective };
//# sourceMappingURL=ngx-daterangepicker-material.js.map
