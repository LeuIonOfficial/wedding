export interface TranslationContent {
  meta: {
    title: string;
    description: string;
  };
  hero: {
    scrollCta: string;
  };
  navigation: {
    story: string;
    event: string;
    rsvp: string;
    registry: string;
    faq: string;
  };
  story: {
    title: string;
    subtitle: string;
    timeline: {
      title: string;
      description: string;
    }[];
  };
  event: {
    title: string;
    subtitle: string;
    ceremony: {
      title: string;
      description: string;
    };
    reception: {
      title: string;
      description: string;
    };
  };
  rsvp: {
    title: string;
    subtitle: string;
    form: {
      name: {
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
  };
  registry: {
    title: string;
    subtitle: string;
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
    };
  };
  footer: {
    message: string;
  };
}

export type Lang = "en" | "ru" | "ro";
export type SectionId =
  | "hero"
  | "story"
  | "event"
  | "rsvp"
  | "registry"
  | "faq";
