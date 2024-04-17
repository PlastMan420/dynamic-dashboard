import { InjectorProvider } from "./injector-provider.service";
import { PageLoaderService } from "./services/pageLoader.service";

/**
 * 
 * @param target 
 * @param propertyKey 
 * @param descriptor 
 * @returns 
 * 
 * Page loader decorator.
 * Any function decorated with this will cause page loader to show until it returns.
 */
const PageLoaderDecorator = (target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) => {
  const original = descriptor.value;

  descriptor.value = async function(...args: unknown[]): Promise<unknown> {
    const injector = InjectorProvider.getInjector;
    const pageLoaderService = injector.get(PageLoaderService)
    //Show loader
    pageLoaderService.showPageLoader();
    const ret = await original.call(this, ...args);
    pageLoaderService.hidePageLoader();

    //hide loader

    return ret;
  }

  return descriptor;
}

export {PageLoaderDecorator as PageLoader};