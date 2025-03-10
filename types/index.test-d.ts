import fastify, { FastifyRequest } from 'fastify'
import { expectType } from 'tsd'
import fastifyCors, {
  FastifyCorsOptions,
  FastifyCorsOptionsDelegate,
  FastifyCorsOptionsDelegatePromise,
  FastifyPluginOptionsDelegate,
  OriginFunction
} from '..'

const app = fastify()

app.register(fastifyCors)

app.register(fastifyCors, {
  origin: true,
  allowedHeaders: 'authorization,content-type',
  methods: 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
  credentials: true,
  exposedHeaders: 'authorization',
  maxAge: 13000,
  cacheControl: 13000,
  preflightContinue: false,
  optionsSuccessStatus: 200,
  preflight: false,
  strictPreflight: false
})

app.register(fastifyCors, {
  origin: true,
  allowedHeaders: ['authorization', 'content-type'],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  credentials: true,
  exposedHeaders: ['authorization'],
  maxAge: 13000,
  cacheControl: 'public, max-age=3500',
  preflightContinue: false,
  optionsSuccessStatus: 200,
  preflight: false,
  strictPreflight: false
})

app.register(fastifyCors, {
  origin: '*',
  allowedHeaders: ['authorization', 'content-type'],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  credentials: true,
  exposedHeaders: ['authorization'],
  maxAge: 13000,
  cacheControl: 13000,
  preflightContinue: false,
  optionsSuccessStatus: 200,
  preflight: false,
  strictPreflight: false
})

app.register(fastifyCors, {
  origin: /\*/,
  allowedHeaders: ['authorization', 'content-type'],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  credentials: true,
  exposedHeaders: ['authorization'],
  maxAge: 13000,
  cacheControl: 13000,
  preflightContinue: false,
  optionsSuccessStatus: 200,
  preflight: false,
  strictPreflight: false
})

app.register(fastifyCors, {
  origin: ['*', 'something'],
  allowedHeaders: ['authorization', 'content-type'],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  credentials: true,
  exposedHeaders: ['authorization'],
  maxAge: 13000,
  cacheControl: 13000,
  preflightContinue: false,
  optionsSuccessStatus: 200,
  preflight: false,
  strictPreflight: false
})

app.register(fastifyCors, {
  origin: [/\*/, /something/],
  allowedHeaders: ['authorization', 'content-type'],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  credentials: true,
  exposedHeaders: ['authorization'],
  maxAge: 13000,
  cacheControl: 13000,
  preflightContinue: false,
  optionsSuccessStatus: 200,
  preflight: false,
  strictPreflight: false
})

const corsDelegate: OriginFunction = (origin, cb) => {
  if (typeof origin === 'undefined' || /localhost/.test(origin)) {
    cb(null, true)
    return
  }
  cb(new Error(), false)
}

app.register(fastifyCors, {
  origin: corsDelegate,
  allowedHeaders: ['authorization', 'content-type'],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  credentials: true,
  exposedHeaders: ['authorization'],
  maxAge: 13000,
  cacheControl: 13000,
  optionsSuccessStatus: 200,
  preflight: false,
  strictPreflight: false
})

app.register(fastifyCors, {
  origin: (origin, cb) => cb(null, true)
})

app.register(fastifyCors, {
  origin: (origin, cb) => cb(null, '*')
})

app.register(fastifyCors, {
  origin: (origin, cb) => cb(null, /\*/)
})

const appHttp2 = fastify({ http2: true })

appHttp2.register(fastifyCors)

appHttp2.register(fastifyCors, {
  origin: true,
  allowedHeaders: 'authorization,content-type',
  methods: 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
  credentials: true,
  exposedHeaders: 'authorization',
  maxAge: 13000,
  cacheControl: 13000,
  preflightContinue: false,
  optionsSuccessStatus: 200,
  preflight: false,
  strictPreflight: false
})

appHttp2.register(fastifyCors, {
  origin: true,
  allowedHeaders: ['authorization', 'content-type'],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  credentials: true,
  exposedHeaders: ['authorization'],
  maxAge: 13000,
  cacheControl: 13000,
  preflightContinue: false,
  optionsSuccessStatus: 200,
  preflight: false,
  strictPreflight: false
})

appHttp2.register(fastifyCors, {
  origin: '*',
  allowedHeaders: ['authorization', 'content-type'],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  credentials: true,
  exposedHeaders: ['authorization'],
  maxAge: 13000,
  cacheControl: 13000,
  preflightContinue: false,
  optionsSuccessStatus: 200,
  preflight: false,
  strictPreflight: false
})

appHttp2.register(fastifyCors, {
  origin: /\*/,
  allowedHeaders: ['authorization', 'content-type'],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  credentials: true,
  exposedHeaders: ['authorization'],
  maxAge: 13000,
  cacheControl: 13000,
  preflightContinue: false,
  optionsSuccessStatus: 200,
  preflight: false,
  strictPreflight: false
})

appHttp2.register(fastifyCors, {
  origin: ['*', 'something'],
  allowedHeaders: ['authorization', 'content-type'],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  credentials: true,
  exposedHeaders: ['authorization'],
  maxAge: 13000,
  cacheControl: 13000,
  preflightContinue: false,
  optionsSuccessStatus: 200,
  preflight: false,
  strictPreflight: false
})

appHttp2.register(fastifyCors, {
  origin: [/\*/, /something/],
  allowedHeaders: ['authorization', 'content-type'],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  credentials: true,
  exposedHeaders: ['authorization'],
  maxAge: 13000,
  cacheControl: 13000,
  preflightContinue: false,
  optionsSuccessStatus: 200,
  preflight: false,
  strictPreflight: false
})

appHttp2.register(fastifyCors, {
  origin: (origin: string | undefined, cb: (err: Error | null, allow: boolean) => void) => {
    if (typeof origin === 'undefined' || /localhost/.test(origin)) {
      cb(null, true)
      return
    }
    cb(new Error(), false)
  },
  allowedHeaders: ['authorization', 'content-type'],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  credentials: true,
  exposedHeaders: ['authorization'],
  maxAge: 13000,
  cacheControl: 13000,
  preflightContinue: false,
  optionsSuccessStatus: 200,
  preflight: false,
  strictPreflight: false
})

appHttp2.register(fastifyCors, (): FastifyCorsOptionsDelegate => (req, cb) => {
  cb(null, {
    origin: [/\*/, /something/],
    allowedHeaders: ['authorization', 'content-type'],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true,
    exposedHeaders: ['authorization'],
    maxAge: 13000,
    cacheControl: 13000,
    preflightContinue: false,
    optionsSuccessStatus: 200,
    preflight: false,
    strictPreflight: false
  })
})

appHttp2.register(fastifyCors, (): FastifyCorsOptionsDelegatePromise => (req) => {
  return Promise.resolve({
    origin: [/\*/, /something/],
    allowedHeaders: ['authorization', 'content-type'],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true,
    exposedHeaders: ['authorization'],
    maxAge: 13000,
    cacheControl: 13000,
    preflightContinue: false,
    optionsSuccessStatus: 200,
    preflight: false,
    strictPreflight: false
  })
})

const delegate: FastifyPluginOptionsDelegate<FastifyCorsOptionsDelegatePromise> = () => async (req) => {
  return {
    origin: [/\*/, /something/],
    allowedHeaders: ['authorization', 'content-type'],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true,
    exposedHeaders: ['authorization'],
    maxAge: 13000,
    cacheControl: 13000,
    preflightContinue: false,
    optionsSuccessStatus: 200,
    preflight: false,
    strictPreflight: false
  }
}

appHttp2.register(fastifyCors, {
  hook: 'onRequest'
})
appHttp2.register(fastifyCors, {
  hook: 'preParsing'
})
appHttp2.register(fastifyCors, {
  hook: 'preValidation'
})
appHttp2.register(fastifyCors, {
  hook: 'preHandler'
})
appHttp2.register(fastifyCors, {
  hook: 'preSerialization'
})
appHttp2.register(fastifyCors, {
  hook: 'onSend'
})

appHttp2.register(fastifyCors, {
  hook: 'preParsing',
  delegator: (req, cb) => {
    if (req.url.startsWith('/some-value')) {
      cb(new Error())
    }
    cb(null, {
      origin: [/\*/, /something/],
      allowedHeaders: ['authorization', 'content-type'],
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      credentials: true,
      exposedHeaders: ['authorization'],
      maxAge: 13000,
      cacheControl: 12000,
      preflightContinue: false,
      optionsSuccessStatus: 200,
      preflight: false,
      strictPreflight: false
    })
  }
})

appHttp2.register(fastifyCors, {
  hook: 'preParsing',
  delegator: async (req: FastifyRequest): Promise<FastifyCorsOptions> => {
    return {
      origin: [/\*/, /something/],
      allowedHeaders: ['authorization', 'content-type'],
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      credentials: true,
      exposedHeaders: ['authorization'],
      maxAge: 13000,
      cacheControl: 'public, max-age=3500',
      preflightContinue: false,
      optionsSuccessStatus: 200,
      preflight: false,
      strictPreflight: false
    }
  }
})

appHttp2.register(fastifyCors, delegate)

appHttp2.register(fastifyCors, {
  hook: 'preParsing',
  origin: function (origin) {
    expectType<string|undefined>(origin)
  },
})
