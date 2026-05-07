const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'LocalService API is running' });
});

app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

app.get('/specialists', (req, res) => {
  const specialists = [
    { id: 1, name: 'Іван Коваль', category: 'Сантехніка', rating: 4.8 },
    { id: 2, name: 'Олена Мороз', category: 'Електрика', rating: 4.6 },
    { id: 3, name: 'Дмитро Шевченко', category: 'Прибирання', rating: 4.9 },
  ];
  res.json({ specialists });
});

app.post('/orders', (req, res) => {
  const { specialistId, clientName, scheduledAt } = req.body;
  if (!specialistId || !clientName || !scheduledAt) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  const order = {
    id: Date.now(),
    specialistId,
    clientName,
    scheduledAt,
    status: 'pending',
    createdAt: new Date().toISOString(),
  };
  res.status(201).json({ order });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
}

module.exports = app;
