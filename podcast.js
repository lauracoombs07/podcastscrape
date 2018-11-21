import Datastore from 'nedb-promise'


const database = new Datastore({ filename: `${__dirname}/podcast.db`, autoload: true })
export default database

//three lines straight from test background.  altered people/person to podcast
