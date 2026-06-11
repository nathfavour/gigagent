import HomeClient from '@/app/home/HomeClient';
import type { Metadata } from 'next';

// Types for lances (posts)
interface Media {
  type: 'image' | 'video' | 'code';
  fileId: string;
  thumbnailFileId?: string;
}

interface Lance {
  $id: string;
  userId: string;
  content: string;
  media?: Media[];
  likes: number;
  comments: number;
  reposts: number;
  bookmarks: number;
  views: number;
  createdAt: string;
  updatedAt?: string;
  visibility: 'public' | 'private' | 'followers' | 'following' | 'specific';
  tags?: string[];
  isLiked?: boolean;
  isBookmarked?: boolean;
}

interface VisibilityOption {
  value: Lance['visibility'];
  label: string;
  icon: React.ElementType;
}

export const generateMetadata = async (): Promise<Metadata> => {
  const title = 'GigAgent Home - Decentralized Freelancing Platform';
  const description = 'Your dashboard for projects, jobs, and collaboration in the GigAgent ecosystem.';
  const image = '/logo/gigagent.jpg';
  const url = 'https://www.gigagent.website/home';
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      images: [image],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  };
};

export default function DashboardPage() {
  // render the home client from ./HomeClient
  return <HomeClient />;
}