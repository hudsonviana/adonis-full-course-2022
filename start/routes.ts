import Route from '@ioc:Adonis/Core/Route'
import Database from '@ioc:Adonis/Lucid/Database'

Route.get('/', async ({ view }) => {
  return view.render('welcome')
})

Route.get('/news', async ({ view }) => {
  const articles = await Database.from('articles').select('*')

  return view.render('news/view', { articles })
}).as('news.view')

Route.post('/news', ({ request, response }) => {
  // const { email, password } = request.body();
  return response.redirect('/news')
}).as('news.post')

Route.patch('news/:id', ({ params }) => {
  return { params }
})
  .where('id', { match: /^[0-9]+$/, cast: (id) => Number(id) })
  .as('news.patch')
