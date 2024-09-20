# Validate project market-monitor-client-side-solution

Date: 20/9/2024

## Findings

Following is the list of issues found in your project. [Summary](#Summary) of the recommended fixes is included at the end of the report.

### FN021001 @microsoft/sp-component-base doesn't match project version | Required

@microsoft/sp-component-base@1.18.2 doesn't match the project version 1.19.0

Execute the following command:

```sh
npm i -SE @microsoft/sp-component-base@1.19.0
```

File: [./package.json:19:5](./package.json)

### FN021001 @microsoft/sp-core-library doesn't match project version | Required

@microsoft/sp-core-library@1.18.2 doesn't match the project version 1.19.0

Execute the following command:

```sh
npm i -SE @microsoft/sp-core-library@1.19.0
```

File: [./package.json:20:5](./package.json)

### FN021001 @microsoft/sp-lodash-subset doesn't match project version | Required

@microsoft/sp-lodash-subset@1.18.2 doesn't match the project version 1.19.0

Execute the following command:

```sh
npm i -SE @microsoft/sp-lodash-subset@1.19.0
```

File: [./package.json:21:5](./package.json)

### FN021001 @microsoft/sp-office-ui-fabric-core doesn't match project version | Required

@microsoft/sp-office-ui-fabric-core@1.18.2 doesn't match the project version 1.19.0

Execute the following command:

```sh
npm i -SE @microsoft/sp-office-ui-fabric-core@1.19.0
```

File: [./package.json:22:5](./package.json)

### FN021001 @microsoft/sp-property-pane doesn't match project version | Required

@microsoft/sp-property-pane@1.18.2 doesn't match the project version 1.19.0

Execute the following command:

```sh
npm i -SE @microsoft/sp-property-pane@1.19.0
```

File: [./package.json:23:5](./package.json)

### FN021001 @microsoft/sp-webpart-base doesn't match project version | Required

@microsoft/sp-webpart-base@1.18.2 doesn't match the project version 1.19.0

Execute the following command:

```sh
npm i -SE @microsoft/sp-webpart-base@1.19.0
```

File: [./package.json:24:5](./package.json)

### FN021013 @microsoft/sp-module-interfaces doesn't match project version | Required

@microsoft/sp-module-interfaces@1.18.2 doesn't match the project version 1.19.0

Execute the following command:

```sh
npm i -DE @microsoft/sp-module-interfaces@1.19.0
```

File: [./package.json:30:3](./package.json)

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
npm i -SE @microsoft/sp-component-base@1.19.0 @microsoft/sp-core-library@1.19.0 @microsoft/sp-lodash-subset@1.19.0 @microsoft/sp-office-ui-fabric-core@1.19.0 @microsoft/sp-property-pane@1.19.0 @microsoft/sp-webpart-base@1.19.0
npm i -DE @microsoft/sp-module-interfaces@1.19.0
npm dedupe
```