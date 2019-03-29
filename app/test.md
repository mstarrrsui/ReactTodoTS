# ESLint Plugin: proper-arrows

## Overview

The **proper-arrows** ESLint plugin provides rules that control the definitions of `=>` arrow functions, restricting them to a narrower and more proper/readable form.

The rules defined in this plugin:

* [`"params"`](#rule-params): controls definitions of `=>` arrow function parameters, such as forbidding unused parameters, forbidding short/unsemantic parameter names, etc.

* [`"name"`](#rule-name): requires `=>` arrow functions to only be used in positions where they receive an inferred name (i.e., assigned to a variable or property, etc), to avoid the poor readbility/debuggability of anonymous function expressions.

   **Note:** This rule is like the "as-needed" mode of the [built-in ESLint "func-names" rule](https://eslint.org/docs/rules/func-names), but applied to `=>` arrow functions; the built-in rule ignores them.

* [`"where"`](#rule-where): restricts where in program structure `=>` arrow functions can be used: forbidding them in the top-level/global scope, object properties, `export` statements, etc.

* [`"return"`](#rule-return): restricts the concise return value kind for `=>` arrow functions, such as forbidding object literal concise returns (`x => ({ x })`), forbidding concise returns of conditional/ternary expressions (`x => x ? y : z`), etc.

* [`"this"`](#rule-this): requires/disallows `=>` arrow functions using a `this` reference, in the `=>` arrow function itself or in a nested `=>` arrow function.

   This rule can optionally forbid `this`-containing `=>` arrow functions from the global scope.

### Trivial `=>` Arrow Functions

It's common for `=>` arrow functions to be used as a shorthand for simple/trivial function roles, such as:

```js
// no-op function
() => {};

// constant function
() => 42;

// closure function
() => v;

// identity function
v => v;
```
