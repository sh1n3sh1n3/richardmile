import { NextApiRequest, NextApiResponse } from 'next';
import { getDatabase } from '../../../utils/mongodb';

// Logo configuration interface
interface LogoConfig {
  text: string;
  imageUrl: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const db = await getDatabase();
      const collection = db.collection('logo_config');

      const config = await collection.findOne({ _id: 'default' });

      if (config) {
        const { _id, ...logoConfig } = config;
        res.status(200).json(logoConfig);
      } else {
        // Return default configuration if none exists
        const defaultConfig: LogoConfig = {
          text: 'Alpine Creations',
          imageUrl: '/logo/logo.svg',
        };
        res.status(200).json(defaultConfig);
      }
    } catch (error) {
      console.error('Error fetching logo config:', error);
      // Return default configuration if database is unavailable
      const defaultConfig: LogoConfig = {
        text: 'Alpine Creations',
        imageUrl: '/logo/logo.svg',
      };
      res.status(200).json(defaultConfig);
    }
  } else if (req.method === 'POST') {
    try {
      const { text, imageUrl }: LogoConfig = req.body;

      // Validate required fields
      if (!text || !imageUrl) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const db = await getDatabase();
      const collection = db.collection('logo_config');

      // Upsert the configuration
      await collection.replaceOne(
        { _id: 'default' },
        {
          _id: 'default',
          text,
          imageUrl,
          updatedAt: new Date(),
        },
        { upsert: true }
      );

      res.status(200).json({ message: 'Logo configuration saved successfully' });
    } catch (error) {
      console.error('Error saving logo config:', error);
      // If database is unavailable, still return success since localStorage will handle persistence
      console.warn('Database unavailable, but localStorage will handle persistence');
      res.status(200).json({
        message: 'Logo configuration saved locally (database unavailable)',
        warning: 'Database connection failed, changes saved to browser storage only',
      });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
}
