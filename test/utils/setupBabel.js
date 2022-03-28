require('@babel/register')({
  extensions: ['.js', '.ts', '.tsx'],
  // We have to apply `babel-plugin-module-resolve` to the files in `@mui/x-date-pickers`
  // Otherwise we can import `@mui/material` from `@mui/x-date-pickers` in test env
  // TODO: Remove once the lab do not export the pickers
  ignore: [/node_modules(\/|\\)(?!.*(@mui(\/|\\)x-date-pickers(\/|\\)([a-zA-Z/])+)\.js)/],
});
