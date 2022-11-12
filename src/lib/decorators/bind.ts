export function bind<T extends Function>(
  _target: object,
  propertyKey: string,
  descriptor: TypedPropertyDescriptor<T>
): TypedPropertyDescriptor<T> | void {
  if (descriptor && typeof descriptor.value == "function") {
    return {
      configurable: true,
      get(this: T): T {
        const bound: T = descriptor.value!.bind(this);
        Object.defineProperty(this, propertyKey, {
          value: bound,
          configurable: true,
          writable: true,
        });
        return bound;
      },
    };
  } else {
    return descriptor
  }
}
