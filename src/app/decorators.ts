import { InjectorProvider } from "./injector-provider.service";

const PageLoaderDecorator = (target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) => {
  const original = descriptor.value;

  descriptor.value = async function(...args: unknown[]): Promise<unknown> {
    const injector = InjectorProvider.getInjector;
    
    //Show loader

    const ret = await original.call(this, ...args);

    //hide loader

    return ret;
  }

  return descriptor;
}

export {PageLoaderDecorator as PageLoader};