require("dotenv").config();

const Typesense = require("typesense");

module.exports = (async () => {
  const TYPESENSE_CONFIG = {
    nodes: [
      {
        host: process.env.TYPESENSE_HOST,
        port: process.env.TYPESENSE_PORT,
        protocol: process.env.TYPESENSE_PROTOCOL,
      },
    ],
    apiKey: process.env.TYPESENSE_ADMIN_API_KEY,
  };

  console.log("Config: ", TYPESENSE_CONFIG);

  const typesense = new Typesense.Client(TYPESENSE_CONFIG);

  const schema = {
    name: "savedLinks",
    num_documents: 0,
    fields: [
      {
        name: "links",
        type: "string[]",
        facet: true,
      },
      {
        name: "links.lvl0",
        type: "string[]",
        facet: true,
      },
      {
        name: "links.lvl1",
        type: "string[]",
        facet: true,
        optional: true
      },
      {
        name: "links.lvl2",
        type: "string[]",
        facet: true,
        optional: true
      },
      {
        name: "links.lvl3",
        type: "string[]",
        facet: true,
        optional: true
      }
    ]
  };

  const savedLinks = require("./data/saved_links.json");

  try {
    const collection = await typesense.collections("savedLinks").retrieve();
    console.log("Found existing collection of savedLinks");
    console.log(JSON.stringify(collection, null, 2));

    if (collection.num_documents !== savedLinks.length) {
      console.log("Collection has different number of documents than data");
      console.log("Deleting collection");
      await typesense.collections("savedLinks").delete();
    }
  } catch (err) {
    console.error(err);
  }

  console.log("Creating schema...");
  console.log(JSON.stringify(schema, null, 2));

  await typesense.collections().create(schema);

  console.log("Populating collection...");

  savedLinks.forEach(async (savedLink) => {

    savedLink.links.forEach((link, idx) => {
      savedLink[`links.lvl${idx}`] = [savedLink.links.slice(0, idx + 1).join(">")];
    });
});

  try {
    const returnData = await typesense
      .collections("savedLinks")
      .documents()
      .import(savedLinks);

    console.log("Return data: ", returnData);
  } catch (err) {
    console.error(err);
  }
})();