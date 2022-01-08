export class BentoNet {
    constructor(startupObserver: any, allowedOrigins: any);
    allowedOrigins: string[];
    searchHandlers: any[];
    startupObservers: any[];
    observers: any[];
    init(): void;
    checkAllowedOrigins(origin: any): boolean;
    showSearchField(show: any): void;
    autoEnableSearchField(): void;
    addSearchHandler(handler: any): void;
    removeSearchHandler(handler: any): void;
    addObserver(handler: any): void;
    removeObserver(handler: any): void;
    showInfo(title: any, info: any): void;
    showWarning(title: any, warning: any): void;
    showError(title: any, error: any): void;
    showSuccess(title: any, message: any): void;
}
