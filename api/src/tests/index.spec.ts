import request from 'supertest'
import app from '../app'

describe('API Routes', () => {
  it('Server works!', async () => {
    await request(app)
      .get('/')
      .expect(200)
      .expect('Content-Type', /html/)
      .expect((response) => {
        expect(response.text).toBe('Welcome to the Water Jug Challenge API')
      })
  })

  it('Found a correct solution', async () => {
    await request(app)
      .post('/api/has-solution')
      .expect("Content-Type", /html/)
      .send({ 'X': 2, 'Y': 10, 'Z': 4 })
      .expect(200)
      .expect((response) => {
        expect(response.text).toBe('It has a solution!')
      })
  })

  it('No solution found', async () => {
    await request(app)
      .post('/api/has-solution')
      .expect("Content-Type", /html/)
      .send({ 'X': 2, 'Y': 1, 'Z': 5 })
      .expect(200)
      .expect((response) => {
        expect(response.text).toBe('No solution this time.')
      })
  })
})