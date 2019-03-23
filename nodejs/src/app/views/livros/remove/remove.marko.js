// Compiled using marko@4.13.4-1 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/nodejs$1.0.0/src/app/views/livros/remove/remove.marko",
    components_helpers = require("marko/src/components/helpers"),
    marko_renderer = components_helpers.r,
    marko_defineComponent = components_helpers.c,
    marko_helpers = require("marko/src/runtime/html/helpers"),
    marko_loadTag = marko_helpers.t,
    component_globals_tag = marko_loadTag(require("marko/src/components/taglib/component-globals-tag")),
    marko_forEach = marko_helpers.f,
    marko_escapeXml = marko_helpers.x,
    marko_escapeXmlAttr = marko_helpers.xa,
    init_components_tag = marko_loadTag(require("marko/src/components/taglib/init-components-tag")),
    await_reorderer_tag = marko_loadTag(require("marko/src/taglibs/async/await-reorderer-tag"));

function render(input, out, __component, component, state) {
  var data = input;

  out.w("<html><head><meta charset=\"UTF-8\"><title>Servidor NodeJS</title></head><body>");

  component_globals_tag({}, out);

  out.w("<h1>Remover livros</h1><form action=\"/livros/remove\" method=\"post\"><p>Selecione o livro que deseja remover:</p><select name=\"id\">");

  var for__9 = 0;

  marko_forEach(data.livros, function(livro) {
    var keyscope__10 = "[" + ((for__9++) + "]");

    out.w("<option value=\"" +
      marko_escapeXmlAttr(livro.id) +
      "\">" +
      marko_escapeXml(livro.titulo) +
      "</option>");
  });

  out.w("</select><input type=\"submit\" value=\"Remover\"></form>");

  init_components_tag({}, out);

  await_reorderer_tag({}, out, __component, "13");

  out.w("</body></html>");
}

marko_template._ = marko_renderer(render, {
    ___implicit: true,
    ___type: marko_componentType
  });

marko_template.Component = marko_defineComponent({}, marko_template._);

marko_template.meta = {
    id: "/nodejs$1.0.0/src/app/views/livros/remove/remove.marko",
    tags: [
      "marko/src/components/taglib/component-globals-tag",
      "marko/src/components/taglib/init-components-tag",
      "marko/src/taglibs/async/await-reorderer-tag"
    ]
  };
