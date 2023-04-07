import Route from '@ioc:Adonis/Core/Route'
import moment from 'moment'

Route.resource('news', 'ArticlesController')
  .paramFor('news', 'slug')
  .middleware({
    edit: ['auth'],
    create: ['auth'],
    store: ['auth'],
    destroy: ['auth'],
  })

Route.get('/', async ({ view }) => {
  return view.render('welcome', { moment })
})

Route.get('/login', async ({ view }) => {
  return view.render('auth/login', { moment })
}).as('auth.signin')

Route.post('/login', async ({ auth, request, response }) => {
  const email = request.input('email')
  const password = request.input('password')

  try {
    await auth.use('web').attempt(email, password)
    return response.redirect('/')
  } catch {
    return response.badRequest('Invalid credentials')
  }
}).as('auth.login')

Route.post('/logout', async ({ auth, response }) => {
  await auth.use('web').logout()
  response.redirect('/login')
}).as('auth.logout')
