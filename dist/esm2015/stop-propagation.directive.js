import * as tslib_1 from "tslib";
import { Directive, HostListener } from '@angular/core';
let StopPropagationDirective = class StopPropagationDirective {
    stopClick(event) {
        event.preventDefault();
        event.stopPropagation();
    }
};
tslib_1.__decorate([
    HostListener('click', ['$event']),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Event]),
    tslib_1.__metadata("design:returntype", void 0)
], StopPropagationDirective.prototype, "stopClick", null);
StopPropagationDirective = tslib_1.__decorate([
    Directive({
        selector: '[stopClickPropagation]'
    })
], StopPropagationDirective);
export { StopPropagationDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcC1wcm9wYWdhdGlvbi5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtZGF0ZXJhbmdlcGlja2VyLW1hdGVyaWFsLyIsInNvdXJjZXMiOlsic3RvcC1wcm9wYWdhdGlvbi5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBS3hELElBQWEsd0JBQXdCLEdBQXJDLE1BQWEsd0JBQXdCO0lBR25DLFNBQVMsQ0FBQyxLQUFZO1FBQ3BCLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN2QixLQUFLLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDMUIsQ0FBQztDQUNGLENBQUE7QUFKQztJQURDLFlBQVksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQzs7NkNBQ2pCLEtBQUs7O3lEQUdyQjtBQU5VLHdCQUF3QjtJQUhwQyxTQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsd0JBQXdCO0tBQ25DLENBQUM7R0FDVyx3QkFBd0IsQ0FPcEM7U0FQWSx3QkFBd0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEhvc3RMaXN0ZW5lciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbc3RvcENsaWNrUHJvcGFnYXRpb25dJ1xufSlcbmV4cG9ydCBjbGFzcyBTdG9wUHJvcGFnYXRpb25EaXJlY3RpdmUge1xuXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJywgWyckZXZlbnQnXSlcbiAgc3RvcENsaWNrKGV2ZW50OiBFdmVudCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gIH1cbn1cbiJdfQ==