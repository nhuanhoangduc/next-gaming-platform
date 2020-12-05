import PouchDB from 'pouchdb'
import PouchFind from 'pouchdb-find'
import PouchIdb from 'pouchdb-adapter-idb'
import PouchMemory from 'pouchdb-adapter-memory'

PouchDB.plugin(PouchFind)
PouchDB.plugin(PouchIdb)
PouchDB.plugin(PouchMemory)

export default PouchDB
