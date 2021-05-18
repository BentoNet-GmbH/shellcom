export class BentoNet {
    constructor(allowedOrigins: any);
    allowedOrigins: any[];
    searchHandlers: any[];
    init(): void;
    showSearchField(show: any): void;
    autoEnableSearchField(): void;
    addSearchHandler(handler: any): void;
    removeSearchHandler(handler: any): void;
    showInfo(title: any, info: any): void;
    showWarning(title: any, warning: any): void;
    showError(title: any, error: any): void;
    showSuccess(title: any, message: any): void;
}
