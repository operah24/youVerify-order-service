import amqp from 'amqplib';
import elasticClient from './elasticSearch';

const url = process.env.RABBITMQ_URI as string;

export const connectRabbitMQ = async () => {
  let attempts = 5;
  while (attempts > 0) {
    try {
      console.log('Attempting to connect to RabbitMQ...');
      const connection = await amqp.connect(url);
      const channel = await connection.createChannel();
      const queue = 'stock_update';

      await channel.assertQueue(queue, { durable: true });
      channel.consume(queue, async (message: any) => {
        const { itemName, quantity, eventType, updatedDate } = JSON.parse(message.content.toString());
        console.log('Received==>', itemName, quantity, eventType, updatedDate )
        
        await elasticClient.index({
          index: 'stock_updates',
          body: { itemName, quantity, eventType, updatedDate },
        });
        console.log(`Stock updated for item ${itemName}: ${quantity} logged in Elasticsearch`);

        channel.ack(message);
      });
      console.log("RabbitMQ connected successfully.");
      break;
    } catch (error) {
      console.error('Failed to connect to RabbitMQ, retrying...', error);
      attempts--;
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  }
  if (attempts === 0) {
    console.error('Failed to connect to RabbitMQ after multiple attempts');
  }
};