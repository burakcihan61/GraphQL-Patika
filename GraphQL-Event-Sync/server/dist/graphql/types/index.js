"use strict";// ./graphql/typeDefs.js
var path=require("path");var _require=require("@graphql-tools/load-files"),loadFilesSync=_require.loadFilesSync;var _require2=require("@graphql-tools/merge"),mergeTypeDefs=_require2.mergeTypeDefs;var typesArray=loadFilesSync(path.join(__dirname),{extensions:["graphql"]});module.exports=mergeTypeDefs(typesArray);