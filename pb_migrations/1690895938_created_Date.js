/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "sp2o65pr8yx7mw5",
    "created": "2023-08-01 13:18:58.513Z",
    "updated": "2023-08-01 13:18:58.513Z",
    "name": "Date",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "78gms7nf",
        "name": "date",
        "type": "date",
        "required": false,
        "unique": false,
        "options": {
          "min": "",
          "max": ""
        }
      },
      {
        "system": false,
        "id": "zam46k2t",
        "name": "schedule_id",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "ud4ezd337wg340j",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": [
            "schedule_id"
          ]
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("sp2o65pr8yx7mw5");

  return dao.deleteCollection(collection);
})
