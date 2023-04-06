import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Database from '@ioc:Adonis/Lucid/Database'
import CreateArticleValidator from 'App/Validators/CreateArticleValidator'

export default class ArticlesController {
  public async view({ view }: HttpContextContract) {
    const articles = await Database.from('articles').select('*')
    return view.render('article/view', { articles })
  }

  public async create({ view }: HttpContextContract) {
    return view.render('article/create')
  }

  public async store({ request, response }: HttpContextContract) {
    const payload = await request.validate(CreateArticleValidator)
    await Database.table('articles').insert({ ...payload, slug: 'teste' })
    response.redirect().back()
  }

  public async edit({ view, params }: HttpContextContract) {
    const { slug } = params
    const article = await Database.from('articles').where('slug', slug).first()
    return view.render('article/edit', { article })
  }

  public async update({ request, response, params }: HttpContextContract) {
    const { slug } = params
    const payload = await request.validate(CreateArticleValidator)
    await Database.from('articles').where('slug', slug).update(payload)
    return response.redirect().back()
  }

  public async destroy({ response, params }: HttpContextContract) {
    const { slug } = params
    await Database.from('articles').where('slug', slug).delete()
    return response.redirect().back()
  }
}
