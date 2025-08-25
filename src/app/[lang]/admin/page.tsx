import { Metadata } from 'next';
import InvitationLinkGenerator from '@/components/ui/InvitationLinkGenerator';
import { getTranslation } from '@/lib/getTranslations';
import { Lang } from '@/types';

export const metadata: Metadata = {
  title: 'Wedding Admin - Invitation Links',
  description: 'Admin panel for generating personalized wedding invitation links',
};

interface AdminPageProps {
  params: {
    lang: string;
  };
}

export default async function AdminPage({ params }: AdminPageProps) {
  const lang = params.lang as Lang;
  const content = await getTranslation(lang);
  
  return (
    <div className="container-custom py-16">
      <h1 className="text-3xl font-serif text-center mb-8">Wedding Admin</h1>
      
      <div className="max-w-4xl mx-auto">
        <div className="bg-card rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-serif mb-4">Admin Instructions</h2>
          <p className="mb-4">
            Use this page to generate personalized invitation links for your wedding guests.
            Each link will include the guest's name in the wedding website.
          </p>
          <p className="mb-4">
            When guests visit their personalized link, they'll see their name displayed
            on the hero section of the wedding website.
          </p>
          <p>
            <strong>Example URL:</strong> <code>/en?guests=John%20Smith</code> will display "Welcome, John Smith!" on the hero section.
          </p>
        </div>
        
        <InvitationLinkGenerator 
          title={`Create Invitation Links for Ion & Tatiana`}
          buttonText="Generate Guest Links"
        />
      </div>
    </div>
  );
}