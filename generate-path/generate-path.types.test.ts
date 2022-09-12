// TO DO: update tests

/* eslint-disable @typescript-eslint/no-unused-vars */
import { CompositeParam, PathParams, PathArgs } from "./generate-path.types";

/**
 * Type that checks if a type is `never`. Returns `true` or `false` accordingly.
 * @template Type the type that you want to check
 * @useful-resources https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types
 */
type AssertNever<Type> = [Type] extends [never] ? true : false;

/**
 * Type that checks if two types are equal. Returns `true` or `false` accordingly.
 * @template Type1
 * @template Type2
 * @inspired-by [**mattmccutchen**](https://github.com/Microsoft/TypeScript/issues/27024#issuecomment-421529650)
 */
type AssertEqual<Type1, Type2> = (<T>() => T extends Type1 ? 1 : 2) extends <T>() => T extends Type2
  ? 1
  : 2
  ? true
  : false;

/**
 * CompositeParam
 */

// @ts-expect-error (string must be provided)
type CompositeParam_1 = CompositeParam<>;

// check if empty string returns never
type CompositeParam_2 = AssertNever<CompositeParam<"">>;
const CompositeParam_2_1: CompositeParam_2 = true;

// check if multiple `:` in a row return never
type CompositeParam_3 = AssertNever<CompositeParam<":::::::">>;
const CompositeParam_3_1: CompositeParam_3 = true;

// check if singular param is correctly inferred
type CompositeParam_5 = CompositeParam<"param">;
const CompositeParam_5_1: AssertEqual<CompositeParam_5, "param"> = true;
const CompositeParam_5_2: AssertEqual<CompositeParam_5, "wrongParam"> = false;

// check if composed params are correctly inferred
type CompositeParam_6 = CompositeParam<"param:pam:parampam">;
const CompositeParam_6_1: AssertEqual<CompositeParam_6, "param" | "pam" | "parampam"> =
  true;
const CompositeParam_6_2: AssertEqual<
  CompositeParam_6,
  "wrongParam" | "pam" | "parampam"
> = false;

// check if empty string caused by multiple `:` in a row is removed
type CompositeParam_7 = CompositeParam<"pam:::param::::parampam">;
const CompositeParam_7_: AssertEqual<CompositeParam_7, ""> = false;

/**
 * PathParams
 */

// @ts-expect-error (string must be provided)
type PathParams_1 = PathParams<>;

// check if path without params returns never
type PathParams_2 = PathParams<"/home/profile">;
const PathParams_2_1: AssertNever<PathParams_2> = true;

// check if paths beginning with a param are inferred correctly
type PathParams_3 = PathParams<":host/profile">;
const PathParams_3_1: AssertEqual<PathParams_3, "host"> = true;

// check if paths beginning with a composed param are inferred correctly
type PathParams_4_1 = PathParams<":host:port/profile">;
const PathParams_4_1_1: AssertEqual<PathParams_4_1, "host" | "port"> = true;

type PathParams_4_2 = PathParams<"somedomain.com:port/profile">;
const PathParams_4_2_1: AssertEqual<PathParams_4_2, "port"> = true;

// check if paths ending with a param are inferred correctly
type PathParams_5_1 = PathParams<"host/:module">;
const PathParams_5_1_1: AssertEqual<PathParams_5_1, "module"> = true;

type PathParams_5_2 = PathParams<"host/:module:moduleID">;
const PathParams_5_2_1: AssertEqual<PathParams_5_2, "module" | "moduleID"> = true;

// check if params from the middle of the path are inferred correctly
type PathParams_6_1 = PathParams<"host/:module/friends">;
const PathParams_6_1_1: AssertEqual<PathParams_6_1, "module"> = true;

type PathParams_6_2 = PathParams<"host/:module:moduleID/friends">;
const PathParams_6_2_1: AssertEqual<PathParams_6_2, "module" | "moduleID"> = true;

// random test
type PathParams_7 =
  PathParams<":::host/:module/friends///friend:friendID/photo:photoID//:size:photoFormat:photoID">;
const PathParams_7_1: AssertEqual<
  PathParams_7,
  "host" | "module" | "friendID" | "photoID" | "size" | "photoFormat"
> = true;

/**
 * PathArgs
 */

// @ts-expect-error (string must be provided)
type PathArgs_1 = PathArgs<>;

// check if empty string returns never
type PathArgs_2 = AssertNever<PathArgs<"">>;
const PathArgs_2_1: PathArgs_1 = true;

// check if path without params returns never
type PathArgs_3 = AssertNever<PathArgs<"domain.com/profile/friends/friend3/photo12/500x500jpg12">>;
const PathArgs_3_1: PathArgs_1 = true;

// random test
type PathArgs_4 =
  PathArgs<"/host/:::module/friends///friend:friendID/photo:photoID/:size::photoFormat:photoID">;
const PathArgs_4_1: AssertEqual<
  PathArgs_4,
  {
    module?: string;
    friendID?: string;
    photoID?: string;
    size?: string;
    photoFormat?: string;
  }
> = true;
const PathArgs_4_2: AssertEqual<
  PathArgs_3,
  {
    notExistingParam?: string;
  }
> = false;