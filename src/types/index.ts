export interface TranslationContent {
  meta: {
    title: string;
    description: string;
  };
  hero: {
    names: string;
    date: string;
    location: string;
    countdown: {
      days: string;
      hours: string;
      minutes: string;
      seconds: string;
    };
    scrollCta: string;
    backgroundColor: string;
  };
  navigation: {
    story: string;
    event: string;
    gallery: string;
    rsvp: string;
    registry: string;
    faq: string;
  };
  story: {
    title: string;
    subtitle: string;
    timeline: {
      year: string;
      title: string;
      description: string;
      image?: string;
      backgroundColor?: string;
    }[];
  };
  event: {
    title: string;
    subtitle: string;
    ceremony: {
      title: string;
      date: string;
      time: string;
      address: string;
      description: string;
      image?: string;
      backgroundColor?: string;
    };
    reception: {
      title: string;
      date: string;
      time: string;
      address: string;
      description: string;
      image?: string;
      backgroundColor?: string;
    };
    mapUrl: string;
  };
  gallery: {
    title: string;
    subtitle: string;
    photos: {
      src?: string;
      alt: string;
      caption: string;
      backgroundColor?: string;
    }[];
  };
  rsvp: {
    title: string;
    subtitle: string;
    deadline: string;
    form: {
      name: {
        label: string;
        placeholder: string;
      };
      email: {
        label: string;
        placeholder: string;
      };
      attending: {
        label: string;
        options: {
          yes: string;
          no: string;
        };
      };
      guests: {
        label: string;
        placeholder: string;
      };
      dietary: {
        label: string;
        placeholder: string;
      };
      message: {
        label: string;
        placeholder: string;
      };
      submit: string;
    };
    confirmation: {
      success: string;
      error: string;
    };
    backgroundColor: string;
  };
  registry: {
    title: string;
    subtitle: string;
    items: {
      name: string;
      description: string;
      url: string;
      image?: string;
      backgroundColor?: string;
    }[];
  };
  faq: {
    title: string;
    subtitle: string;
    questions: {
      question: string;
      answer: string;
    }[];
    contact: {
      title: string;
      message: string;
      email: string;
    };
    backgroundColor: string;
  };
  footer: {
    message: string;
    names: string;
    date: string;
    copyright: string;
    social: {
      instagram: string;
      facebook: string;
    };
  };
}

export type Lang = 'en' | 'ru' | 'ro';
export type SectionId = 'hero' | 'story' | 'event' | 'gallery' | 'rsvp' | 'registry' | 'faq';