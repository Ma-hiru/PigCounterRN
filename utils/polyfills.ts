const globalAny: any = global;
if (typeof globalAny.FinalizationRegistry === 'undefined') {
    globalAny.FinalizationRegistry = class {
        register() {}
        unregister() {}
    };
}