'use strict'

const Person = use('App/Models/Person')

class PersonController {

  async store ({ request }) {

    const data = request.only([
      'name',
      'username',
      'email',
      'password',
      'cpf',
      'zipcode',
      'telephone',
      'mobile_phone',
      'hire_date',
      'active',
    ])

    const person = await Person.create(data)

    return person
  }

  async index ({ request, auth }) {

    const params = request.all()

    const people = await Person.query().where(function () {
      for (let [key, value] of Object.entries(params)) {
        console.log(typeof key, value)
        switch (key) {
          case 'name':
          case 'username':
          case 'email':
            this.where(key, 'LIKE', `%${value}%`)
            break
          default:
            console.log(key, value)
            this.where(key, value)
        }

      }
    }).fetch()

    return people
  }

  async show ({ params }) {

    const person = await Person.findOrFail(params.id)

    return person
  }

  async update ({ params, request }) {

    const person = await Person.findOrFail(params.id)

    const data = request.only([
      'name',
      'username',
      'email',
      'password',
      'cpf',
      'zipcode',
      'telephone',
      'mobile_phone',
      'hire_date',
      'active',
    ])

    person.merge(data)

    await person.save()

    return person
  }

  async destroy ({ params, request }) {

    const person = await Person.findOrFail(params.id)

    await person.delete()
  }
}

module.exports = PersonController
