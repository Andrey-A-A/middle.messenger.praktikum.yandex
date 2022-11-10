import {PathRouter} from './PathRouter'
import '@testing-library/jest-dom'

describe('core/router', () => {
  it('должен перейти на страницу регистрации', () => {
    
    const router = new PathRouter()
    router
      .use('/login', () => {})
      .use('/sign-up', () => {})
    router.go('/sign-up')
    expect(window.location.href).toEqual('http://localhost/sign-up')
  })
})
