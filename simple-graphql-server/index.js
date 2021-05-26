const { ApolloServer, gql } = require('apollo-server')
const fetch = require('node-fetch')
const axios = require('axios');

let entidades = []
let cuentas = []
let movimientos = []

const getEntidades = async() => {
    await axios.get('http://localhost:3000/entidades')
    .then(function async(response) {response.map((rest) => {
        let Restaurante = {
          name : rest.name,
          dniruc : rest.dniruc,
        }
        entidades = entidades.concat(Restaurante)
      })
    })
  }
  
  getEntidades() 

  const postEntidades = async(name,dniruc) => {
    await axios.post('http://localhost:3000/entidades', {
      name: name,
      dniruc: dniruc
    })
    .then(function async(response) {
      console.log(response.data)
    }).catch(function(error) {
      console.log(error)
    })
    }
  
  const getCuentas = async() => {
    await axios.get('http://localhost:3000/cuentas')
    .then(function async(response) {response.map((rest) => {
        let Cuenta = {
          id_entidad : rest.id_entidad,
          numero_cuenta : rest.numero_cuenta,
          tipo_cuenta : rest.tipo_cuenta,
          saldo : rest.saldo,
        }
        cuentas = cuentas.concat(Cuenta)
      })
    })
  }

  getCuentas() 

  const getMovimientos = async() => {
    await axios.get('http://localhost:3000/movimientos')
    .then(function async(response) {response.map((rest) => {
        let Movimiento = {
          id_entidad: rest.id_entidad,
          id_cuenta_emisor: rest.id_cuenta_emisor,
          id_cuenta_receptor: rest.id_cuenta_receptor,
          monto: rest.monto,
          moneda: rest.moneda
        }
        movimientos = movimientos.concat(Movimiento)
      })
    })
  }

  getMovimientos() 

  const typeDefs = gql`
  
  type Query {
    entidades: [entidad!]!
    entidad(_id: ID!): entidad
    cuentas: [cuenta!]!
    cuenta(_id: ID!): cuenta
    movimientos: [movimiento!]!
    movimiento(_id: ID!): movimiento

  }
  
  type Mutation {
    "Agregar Cuenta"
    agregarCuenta(
      id_entidad: String!
      numero_cuenta: String!
      tipo_cuenta: String!
    ): cuenta
    "Agregar Entidad"
    agregarEntidad(
      name: String!
      dniruc: String!
    ): entidad
  }
  
  type entidad {
    _id: ID!
    name: String!
    dniruc: String!
  }
  type cuenta {
    _id: ID!
    id_entidad: String!
    numero_cuenta: String!
    tipo_cuenta: String!
    saldo: String!
  }
  type movimiento {
    _id: ID!
    id_entidad: String!
    id_cuenta_emisor: String!
    id_cuenta_receptor: String!
    monto: String!
    moneda: String!
  }
  
  
  `
  
  const baseURL = `http://localhost:3000`
  
  const resolvers = {
    Query: {
      entidades: () => {
        return fetch(`${baseURL}/entidades`).then(res => res.json())
      },
      entidad: (parent, args) => {
        const { _id } = args
        return fetch(`${baseURL}/entidad/${_id}`).then(res => res.json())
      },
      cuentas: () => {
        return fetch(`${baseURL}/cuentas`).then(res => res.json())
      },
      cuenta: (parent, args) => {
        const { _id } = args
        return fetch(`${baseURL}/cuenta/${_id}`).then(res => res.json())
      },
      movimientos: () => {
        return fetch(`${baseURL}/movimientos`).then(res => res.json())
      },
      movimiento: (parent, args) => {
        const { _id } = args
        return fetch(`${baseURL}/movimiento/${_id}`).then(res => res.json())
      },
    },
    Mutation: {
      agregarCuenta: (root, args) => {
        const nuevaCuenta = {
          id_entidad: args.id_entidad,
          numero_cuenta: args.numero_cuenta,
          tipo_cuenta: args.tipo_cuenta
        }
        cuentas.push(nuevaCuenta)
  
        return nuevaCuenta
      },
      agregarEntidad: (root, args) => {
        const nuevaEntidad = {
          name: args.name,
          dniruc: args.dniruc
        }
        entidades.push(nuevaEntidad)
        postEntidades(args.name, args.dniruc)
  
        return nuevaEntidad
      },
    },
  }

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  })
  
  server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`)
  })
  