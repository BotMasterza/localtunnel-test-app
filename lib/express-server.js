/*
 * Copyright 2017 RPiOVN.org
 * Licensing Information: MIT License
 *
 * This library file handle communication with the P2P VPS server.
 */

"use strict";

// Libraries
const express = require("express");

// Globals

class ExpressServer {
  constructor(app, port) {
    this.app = app;
    this.port = port;
  }

  start() {
    // Use Handlebars for templating
    const exphbs = require("express3-handlebars");
    let hbs;

    // For gzip compression
    //app.use(express.compress());

    //Config for Production and Development
    this.app.engine(
      "handlebars",
      exphbs({
        // Default Layout and locate layouts and partials
        defaultLayout: "main",
        layoutsDir: "views/layouts/",
        partialsDir: "views/partials/",
      })
    );

    // Locate the views
    this.app.set("views", `${__dirname}/../views`);

    // Locate the assets
    this.app.use(express.static(`${__dirname}/../assets`));

    // Set Handlebars
    this.app.set("view engine", "handlebars");

    // Index Page
    this.app.get("/", function(request, response, next) {
      response.render("index");
    });

    // Start up the Express web server
    this.app.listen(process.env.PORT || this.port).on("error", this.expressErrorHandler);
    console.log('Your express web app has started on port ' + this.port);
  }

  // Handle generic errors thrown by the express application.
  expressErrorHandler(err) {
    if (err.code === "EADDRINUSE")
      console.error(`Port ${this.port} is already in use. Is this program already running?`);
    else console.error(JSON.stringify(err, null, 2));

    console.error("Express could not start!");
    process.exit(0);
  }
}

module.exports = ExpressServer;
