/**
 * Helper type that extracts (composite) params into a union of strings.
 * @template PathParam
 */
 export type CompositeParam<PathParam extends string> = Exclude<
 PathParam extends `${infer Param}:${infer Rest}`
   ? Param | CompositeParam<Rest>
   : PathParam extends ""
   ? never
   : PathParam,
 "" // exclude empty string since it may occur if `:` appears more than once in a row
>;

/**
* Type that extracts path params into a union of strings.
* @inspired-by [**captain-yossarian-from-ukraine**](https://stackoverflow.com/a/70899862)
* @useful-resources https://blog.logrocket.com/understanding-infer-typescript/
*  */
export type PathParams<Path extends string> = Exclude<
 Path extends `:${infer Param}/${infer Rest}`
   ? CompositeParam<Param> | PathParams<Rest>
   : Path extends `:${infer Param}`
   ? CompositeParam<Param>
   : Path extends `${infer _Prefix}:${infer Rest}`
   ? PathParams<`:${Rest}`>
   : never,
 "" // exclude empty string since it may occur if `:` appears more than once in a row
>;

/**
* TO DO: docs
* @template Path
*/
export type PathArgs<Path extends string> = PathParams<Path> extends never
 ? never
 : { [K in PathParams<Path>]?: string };