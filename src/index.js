import express from "express";
import compressionMiddleware from "compression";
import markoMiddleware from "@marko/express";
import indexTemplate from "./pages/index/template.marko";
import aboutTemplate from "./pages/about/template.marko";
import contactTemplate from "./pages/contact/template.marko";
import usersService from "./services/users";

const port = parseInt(process.env.PORT || 3000, 10);

express()
  .use(compressionMiddleware()) // Enable gzip compression for all HTTP responses.
  .use("/assets", express.static("dist/assets")) // Serve assets generated from webpack.
  .use(markoMiddleware()) // Enables res.marko.

  // * Start Router configurations
  .get("/", (req, res) => {
    res.marko(indexTemplate, {
      $global: { currentPath: req.path }
    });
  })
  .get("/about-us", (req, res) => {
    res.marko(aboutTemplate, {
      $global: { currentPath: req.path }
    });
  })
  .get("/contact-us", (req, res) => {
    res.marko(contactTemplate, {
      $global: { currentPath: req.path }
    });
  })
  // # End router configurations

  .get("/services/users", usersService)
  .listen(port, err => {
    if (err) {
      throw err;
    }

    if (port) {
      console.log(`Listening on port ${port}`);
    }
  });
