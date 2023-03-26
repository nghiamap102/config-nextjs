import { useRef, useState, useCallback, useEffect } from 'react'

const DEFAULT_ROOT_MARGIN = '0px'
const DEFAULT_THRESHOLD = [0] // For more info:
// https://developers.google.com/web/updates/2016/04/intersectionobserver
// https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API

function useIntersectionObserver(args) {
    let _args$rootMargin, _args$threshold

    let rootMargin =
        (_args$rootMargin = args === null ? void 0 : args.rootMargin) !== null
            ? _args$rootMargin
            : DEFAULT_ROOT_MARGIN
    let threshold =
        (_args$threshold = args === null ? void 0 : args.threshold) !== null
            ? _args$threshold
            : DEFAULT_THRESHOLD
    const nodeRef = useRef(null)
    const rootRef = useRef(null)
    const observerRef = useRef(null)

    const _useState = useState()
    const entry = _useState[0]
    const setEntry = _useState[1]

    const unobserve = useCallback(function () {
        // Disconnect the current observer (if there is one)
        const currentObserver = observerRef.current
        currentObserver === null ? void 0 : currentObserver.disconnect()
        observerRef.current = null
    }, [])
    const observe = useCallback(
        function () {
            const node = nodeRef.current

            if (node) {
                const root = rootRef.current
                const options = {
                    root: root,
                    rootMargin: rootMargin,
                    threshold: threshold,
                } // Create a observer for current "node" with given options.

                const observer = new IntersectionObserver(function (_ref) {
                    const newEntry = _ref[0]
                    setEntry(newEntry)
                }, options)
                observer.observe(node)
                observerRef.current = observer
            }
        },
        [rootMargin, threshold],
    )

    const initializeObserver = useCallback(
        function () {
            unobserve()
            observe()
        },
        [observe, unobserve],
    )

    const refCallback = useCallback(
        function (node) {
            nodeRef.current = node
            initializeObserver()
        },
        [initializeObserver],
    )

    const rootRefCallback = useCallback(
        function (rootNode) {
            rootRef.current = rootNode
            initializeObserver()
        },
        [initializeObserver],
    )

    useEffect(
        function () {
            // After React 18, StrictMode unmounts and mounts components to be sure
            // if they are resilient effects being mounted and destroyed multiple times.
            // This a behavior to be sure nothing breaks when off-screen components
            // can preserve their state with future React versions.
            // So in StrictMode, React unmounts the component, clean-up of this useEffect gets triggered and
            // we stop observing the node. But we need to start observing after component re-mounts with its preserved state.
            // So to handle this case, we call initializeObserver here.
            // https://reactjs.org/blog/2022/03/08/react-18-upgrade-guide.html#updates-to-strict-mode
            initializeObserver()
            return function () {
                // We disconnect the observer on unmount to prevent memory leaks etc.
                unobserve()
            }
        },
        [initializeObserver, unobserve],
    )

    return [
        refCallback,
        {
            entry: entry,
            rootRef: rootRefCallback,
        },
    ]
}

function _extends() {
    _extends = Object.assign ||
        function (target) {
            for (let i = 1; i < arguments.length; i++) {
                const source = arguments[i]

                for (let key in source) {
                    if (Object.prototype.hasOwnProperty.call(source, key)) {
                        target[key] = source[key]
                    }
                }
            }

            return target
        }

    return _extends.apply(this, arguments)
}

function useTrackVisibility(args) {
    let _result$entry

    const _useIntersectionObser = useIntersectionObserver(args)
    const ref = _useIntersectionObser[0]
    const result = _useIntersectionObser[1]

    const isVisible = Boolean(
        (_result$entry = result.entry) == null
            ? void 0
            : _result$entry.isIntersecting,
    )

    const _useState = useState(isVisible)
    const wasEverVisible = _useState[0]
    const setWasEverVisible = _useState[1]

    if (isVisible && !wasEverVisible) {
        setWasEverVisible(true)
    }

    return [
        ref,
        _extends({}, result, {
            isVisible: isVisible,
            wasEverVisible: wasEverVisible,
        }),
    ]
}

export { useIntersectionObserver, useTrackVisibility }
