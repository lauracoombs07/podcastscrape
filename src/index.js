import { send, json } from 'micro'
import { router, get, post, put, del } from 'microrouter'
const cors = require('micro-cors')()

import Podcast from './database/podcast'



export default cors(router(
  get('/', async (req, res) => {
    const results = await Podcast.find({})
    await send(res, 200, results)
  }),
  get('/*', async (req, res) => {
    console.log(`Not Found`)
  }),
  post('/', async (req, res) => {
    console.log(`I'm called`)
    const podcast = await json(req)
    const result = await Podcast.insert(podcast)
    return send(res, 201, result)
  })))

  //all of this came straight from the test background**altered all people/person to podcast..wish me luck