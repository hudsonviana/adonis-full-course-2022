import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CreateArticleValidator from 'App/Validators/CreateArticleValidator'
import Article from 'App/Models/Article'

export default class ArticlesController {
  public async index({ view }: HttpContextContract) {
    const articles = await Article.all()
    return view.render('article/view', { articles })
  }

  public async show({ view, params }: HttpContextContract) {
    const { slug } = params
    const article = await Article.findByOrFail('slug', slug)
    return view.render('article/show', { article })
  }

  public async create({ view }: HttpContextContract) {
    return view.render('article/create')
  }

  public async store({ request, response }: HttpContextContract) {
    const payload = await request.validate(CreateArticleValidator)
    await Article.create(payload)
    return response.redirect('/news')
  }

  public async edit({ view, params }: HttpContextContract) {
    const { slug } = params
    const article = await Article.findByOrFail('slug', slug)
    return view.render('article/edit', { article })
  }

  public async update({ request, response, params }: HttpContextContract) {
    const { slug } = params
    const article = await Article.findByOrFail('slug', slug)
    const payload = await request.validate(CreateArticleValidator)
    await article.merge(payload).save()
    return response.redirect('/news')
  }

  public async destroy({ response, params }: HttpContextContract) {
    const { slug } = params
    const article = await Article.findByOrFail('slug', slug)
    await article.delete()
    return response.redirect().back()
  }
}
