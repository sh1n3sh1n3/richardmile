import { NextApiRequest, NextApiResponse } from 'next';
import { getDatabase, closeMongoDBConnection } from '../../../utils/mongodb';

const seedFriends = [
  {
    name: 'Ester Ledecká',
    image:
      'https://media.richardmille.com/wp-content/uploads/2019/02/03173603/coveester-768x492.jpg?dpr=1&width=2000',
    description: 'Olympic champion alpine skier and snowboarder from Czech Republic',
    profession: 'Alpine Skier & Snowboarder',
    sport: 'Alpine Skiing',
    achievements: ['Olympic Gold Medalist', 'World Champion'],
    socialMedia: {
      instagram: 'https://www.instagram.com/esterledecky/',
      website: 'https://www.esterledecky.com/',
    },
    isActive: true,
    order: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Diana Luna',
    image:
      'https://media.richardmille.com/wp-content/uploads/2017/12/23171929/DianaLuna-opti-768x512.jpg?dpr=1&width=2000',
    description: 'Professional golfer from Mexico',
    profession: 'Professional Golfer',
    sport: 'Golf',
    achievements: ['LPGA Tour Winner', 'Olympic Competitor'],
    socialMedia: {
      instagram: 'https://www.instagram.com/dianalunagolf/',
      twitter: 'https://twitter.com/dianalunagolf',
    },
    isActive: true,
    order: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Cristie Kerr',
    image:
      'https://media.richardmille.com/wp-content/uploads/2014/12/23171117/5099094-768x512.jpg?dpr=1&width=2000',
    description: 'American professional golfer and LPGA Tour winner',
    profession: 'Professional Golfer',
    sport: 'Golf',
    achievements: ['20 LPGA Tour Wins', 'Major Championship Winner'],
    socialMedia: {
      instagram: 'https://www.instagram.com/cristiekerr/',
      twitter: 'https://twitter.com/cristiekerr',
    },
    isActive: true,
    order: 3,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Jessica Korda',
    image:
      'https://media.richardmille.com/wp-content/uploads/2023/04/17161159/koradJ23-couv-2-deskto-768x480.jpg?dpr=1&width=2000',
    description: 'American professional golfer and LPGA Tour winner',
    profession: 'Professional Golfer',
    sport: 'Golf',
    achievements: ['6 LPGA Tour Wins', 'Olympic Competitor'],
    socialMedia: {
      instagram: 'https://www.instagram.com/jessicakorda/',
      twitter: 'https://twitter.com/jessicakorda',
    },
    isActive: true,
    order: 4,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Pablo Mac Donough',
    image:
      'https://media.richardmille.com/wp-content/uploads/2011/12/11124659/couvBK-charles-R%C3%A9cup%C3%A9r%C3%A9-768x512.jpg?dpr=1&width=2000',
    description: 'Argentine polo player and multiple championship winner',
    profession: 'Professional Polo Player',
    sport: 'Polo',
    achievements: ['10-Goal Handicap Player', 'Multiple Championship Winner'],
    socialMedia: {
      instagram: 'https://www.instagram.com/pablomcdonough/',
    },
    isActive: true,
    order: 5,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Yusaku Miyazato',
    image:
      'https://media.richardmille.com/wp-content/uploads/2024/02/28153018/coveryuzu21-768x492.jpg?dpr=1&width=2000',
    description: 'Japanese professional golfer',
    profession: 'Professional Golfer',
    sport: 'Golf',
    achievements: ['PGA Tour Winner', 'Japan Tour Champion'],
    socialMedia: {
      instagram: 'https://www.instagram.com/yusaku_miyazato/',
    },
    isActive: true,
    order: 6,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const db = await getDatabase();
    const collection = db.collection('friends');

    // Clear existing friends
    await collection.deleteMany({});

    // Insert seed data
    const result = await collection.insertMany(seedFriends);

    return res.status(200).json({
      message: 'Friends seeded successfully',
      count: result.insertedCount,
      insertedIds: result.insertedIds,
    });
  } catch (error) {
    console.error('Friends seed error:', error);
    return res.status(500).json({
      message: 'Failed to seed friends',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  } finally {
    await closeMongoDBConnection();
  }
}
