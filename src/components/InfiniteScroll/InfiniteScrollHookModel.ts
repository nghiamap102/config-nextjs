
export declare type IntersectionObserverHookRefCallbackNode = Element | null;
export declare type UseInfiniteScrollHookRefCallback = (node: IntersectionObserverHookRefCallbackNode) => void;

export declare type IntersectionObserverHookRootRefCallbackNode = IntersectionObserverInit['root'];
export declare type IntersectionObserverHookRootRefCallback = (node: IntersectionObserverHookRootRefCallbackNode) => void;

export declare type IntersectionObserverHookArgs = Omit<IntersectionObserverInit, 'root'>;
