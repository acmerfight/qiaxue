type Updater<T> = (current: T) => T;
type StateArg<T> = T | Updater<T>;
interface Setter {
    <T>(state: State<T>, val: StateArg<T>): void;
    <T, Args extends unknown[]>(command: Command<T, Args>, ...args: Args): T;
}
type Getter = <T>(readable: Signal<T>) => T;
interface GetterOptions {
    signal: AbortSignal;
}
type Read<T> = (get: Getter, options: GetterOptions) => T;
type Write<T, Args extends unknown[]> = (visitor: {
    get: Getter;
    set: Setter;
}, ...args: Args) => T;
type Watch = Read<void>;
interface State<T> {
    id: number;
    init: T;
    debugLabel?: string;
    toString: () => string;
}
interface Computed<T> {
    id: number;
    read: Read<T>;
    debugLabel?: string;
    toString: () => string;
}
interface Command<T, Args extends unknown[]> {
    id: number;
    write: Write<T, Args>;
    debugLabel?: string;
    toString: () => string;
}
type Signal<T> = State<T> | Computed<T>;

interface Store {
    get: Getter;
    set: Setter;
    watch: Watcher;
}
interface WatchOptions {
    signal?: AbortSignal;
    debugLabel?: string;
}
type Watcher = (watch: Watch, options?: WatchOptions) => void;
type StoreEventType = 'set' | 'get' | 'mount' | 'unmount' | 'computed';

type NestedAtom = (State<unknown> | Computed<unknown> | Command<unknown, unknown[]> | NestedAtom)[];
interface DAGNode<T> {
    signal: Signal<T>;
    val: T;
    epoch: number;
}
type Edge = [DAGNode<unknown>, DAGNode<unknown>, number];
interface DebugStore extends Store {
    getReadDependencies: (atom: Computed<unknown>) => NestedAtom;
    getDependenciesGraph: (atom: Computed<unknown>) => Edge[];
    getReadDependents: (atom: State<unknown> | Computed<unknown>) => NestedAtom;
    isMounted: (atom: State<unknown> | Computed<unknown>) => boolean;
}

interface AtomWatch {
    target: State<unknown> | Computed<unknown> | Command<unknown, unknown[]> | string | RegExp;
    actions?: Set<StoreEventType>;
}
declare function createDebugStore(watches?: (AtomWatch | string | RegExp | State<unknown> | Computed<unknown> | Command<unknown, unknown[]>)[], defaultActions?: StoreEventType[]): DebugStore;

export { type DAGNode, type DebugStore, type Edge, createDebugStore };
//# sourceMappingURL=index.d.ts.map
