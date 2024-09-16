# Validate project market-monitor-client-side-solution

Date: 16/9/2024

## Findings

Following is the list of issues found in your project. [Summary](#Summary) of the recommended fixes is included at the end of the report.

### FN021013 @microsoft/sp-module-interfaces doesn't match project version | Required

@microsoft/sp-module-interfaces@1.18.2 doesn't match the project version 1.19.0

Execute the following command:

```sh
npm i -DE @microsoft/sp-module-interfaces@1.19.0
```

File: [./package.json:29:3](./package.json)

### FN017001 Run npm dedupe | Optional

If, after upgrading npm packages, when building the project you have errors similar to: "error TS2345: Argument of type 'SPHttpClientConfiguration' is not assignable to parameter of type 'SPHttpClientConfiguration'", try running 'npm dedupe' to cleanup npm packages.

Execute the following command:

```sh
npm dedupe
```

File: [./package.json](./package.json)

## Summary

### Execute script

```sh
npm i -DE @microsoft/sp-module-interfaces@1.19.0
npm dedupe
```