/* eslint-disable @typescript-eslint/no-explicit-any */
export type HasRenderProp<T> = T extends { render: any } ? T : never;
export type HasChildrenProp<T> = T extends { children: any } ? T : never;
export type IsFunction<T> = T extends (...args: any[]) => any ? T : never;

export const isFunction = <T extends {}>(value: T): value is IsFunction<T> =>
  typeof value === 'function';

export const hasRender = <T extends {}>(value: T): value is HasRenderProp<T> =>
  'render' in value && isFunction((value as HasRenderProp<T>).render);

export const hasChildren = <T extends {}>(value: T): value is HasChildrenProp<T> =>
  'children' in value && isFunction((value as HasChildrenProp<T>).children);
