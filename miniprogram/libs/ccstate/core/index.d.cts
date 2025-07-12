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

interface Options {
    debugLabel?: string;
}
declare function state<T>(init: T, options?: Options): State<T>;
declare function computed<T>(read: Read<T>, options?: Options): Computed<T>;
declare function command<T, Args extends unknown[]>(write: Write<T, Args>, options?: Options): Command<T, Args>;

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
type SetArgs<T, CommandArgs extends unknown[]> = [StateArg<T>] | CommandArgs;

declare function createStore(): Store;

export { type Command, type Computed, type Getter, type Read, type SetArgs, type Setter, type State, type StateArg, type Store, type Updater, type Watch as Watcher, type Write, command, computed, createStore, state };
//# sourceMappingURL=index.d.cts.map
