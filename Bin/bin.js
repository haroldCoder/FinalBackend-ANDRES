const app = require('../app')
const Port = process.env.Port || 3001

app.listen(Port)
console.log('the service is running', Port)

