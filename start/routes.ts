import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.resource('news', 'ArticlesController').paramFor('news', 'slug')
}).middleware('auth')

Route.get('/', async ({ view }) => {
  return view.render('welcome')
})

Route.get('/login', async ({ view }) => {
  return view.render('auth/login')
}).as('auth.signin')

Route.post('login', async ({ auth, request, response }) => {
  const email = request.input('email')
  const password = request.input('password')

  await auth.use('web').attempt(email, password)
  return response.redirect('/')
}).as('auth.login')
