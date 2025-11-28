import {
  User1,
  User2,
  avatar1,
  avatar2,
  avatar3,
  half1,
  half2,
  landscape,
  oneThree,
  oneThree2,
  topleftHalf,
  toprightHalf,
  twoThree,
  twoThree2,
} from "assets";

const verificationInstructions = `
<p>Verifying your account is a quick and simple process that adds an extra layer of security to your account and helps ensure a smooth user experience. Follow these steps to verify your account:</p>

<ol class="listing">
  <li><strong>Login to Your Account:</strong> Visit our website and log in to your account using your username and password.</li>
  <li><strong>Navigate to Account Settings:</strong> Once logged in, navigate to the "Account Settings" or "Profile Settings" section. This is typically located in the top-right corner of the website or within a drop-down menu next to your profile picture.</li>
  <li><strong>Initiate Verification:</strong> Look for an option or tab labeled "Verification" or "Security." Click on it to begin the verification process.</li>
  <li><strong>Provide Required Information:</strong> You may be asked to provide certain information to verify your identity. This could include uploading a photo of your government-issued ID, providing a phone number for verification via SMS, or answering security questions.</li>
  <li><strong>Submit Verification Documents:</strong> If required, upload clear and legible copies of the requested documents. Ensure that the information provided matches the details on your account.</li>
  <li><strong>Wait for Approval:</strong> Once you've submitted the necessary information, our team will review your verification request. This process typically takes [insert estimated time frame]. You may receive an email confirmation once your account has been successfully verified.</li>
  <li><strong>Confirmation and Access:</strong> Upon successful verification, you'll receive confirmation that your account has been verified. You may now enjoy full access to all features and benefits available to verified users.</li>
</ol>

<p>Important Note: Please ensure that you provide accurate and up-to-date information during the verification process to avoid delays or issues with your account. If you encounter any difficulties or have questions about the verification process, don't hesitate to contact our customer support team for assistance.</p>
`;
const faqs = [
  {
    title: "1. How do i verify my account?",
    body: "  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem totam tempora facere officiis? Beatae officia voluptas blanditiis assumenda aliquam, repellendus sed deserunt placeat, nemo sapiente sint iure. Reiciendis enim omnis soluta odit aut alias illo, fugit laboriosam asperiores fuga mollitia! Sapiente fuga eveniet exercitationem reprehenderit excepturi. Assumenda, in aut.",
  },
  {
    title: "2. How does D’EventMatcha work for those seeking event services?",
    body: verificationInstructions,
  },
  {
    title: "3. How can I list my services on  D’EventMatcha?",
    body: "  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem totam tempora facere officiis? Beatae officia voluptas blanditiis assumenda aliquam, repellendus sed deserunt placeat, nemo sapiente sint iure. Reiciendis enim omnis soluta odit aut alias illo, fugit laboriosam asperiores fuga mollitia! Sapiente fuga eveniet exercitationem reprehenderit excepturi. Assumenda, in aut.",
  },
  {
    title: "4. What types of events can I find services for on D’EventMatcha?",
    body: "  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem totam tempora facere officiis? Beatae officia voluptas blanditiis assumenda aliquam, repellendus sed deserunt placeat, nemo sapiente sint iure. Reiciendis enim omnis soluta odit aut alias illo, fugit laboriosam asperiores fuga mollitia! Sapiente fuga eveniet exercitationem reprehenderit excepturi. Assumenda, in aut.",
  },

  {
    title:
      "5. Can I communicate directly with service providers through D’EventMatcha?",
    body: "  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem totam tempora facere officiis? Beatae officia voluptas blanditiis assumenda aliquam, repellendus sed deserunt placeat, nemo sapiente sint iure. Reiciendis enim omnis soluta odit aut alias illo, fugit laboriosam asperiores fuga mollitia! Sapiente fuga eveniet exercitationem reprehenderit excepturi. Assumenda, in aut.",
  },
  {
    title: "6. What happens after I make a booking through D’EventMatcha?",
    body: "  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem totam tempora facere officiis? Beatae officia voluptas blanditiis assumenda aliquam, repellendus sed deserunt placeat, nemo sapiente sint iure. Reiciendis enim omnis soluta odit aut alias illo, fugit laboriosam asperiores fuga mollitia! Sapiente fuga eveniet exercitationem reprehenderit excepturi. Assumenda, in aut.",
  },
  {
    title:
      "7. How do I contact customer support if I have a question or issue?",
    body: "  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem totam tempora facere officiis? Beatae officia voluptas blanditiis assumenda aliquam, repellendus sed deserunt placeat, nemo sapiente sint iure. Reiciendis enim omnis soluta odit aut alias illo, fugit laboriosam asperiores fuga mollitia! Sapiente fuga eveniet exercitationem reprehenderit excepturi. Assumenda, in aut.",
  },
];

export const faq = {
  headRexr: "Frequently Asked Questions",
  subText:
    "See answers to common questions from our users and intending users.",
  faqs,
};
const testimonies = [
  {
    content:
      "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatu. Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatu.",
    author: {
      avatar: User1,
      name: "Oresanwo A. Oluwatosin",
      role: "Event Planner",
    },
  },
  {
    content:
      "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatu. Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatu.",
    author: {
      avatar: User1,
      name: "Biodun Kiitan",
      role: "Event Host",
    },
  },
  {
    content:
      "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatu. Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatu.",
    author: {
      avatar: User2,
      name: "Oresanwo A. Oluwatosin",
      role: "Event Planner",
    },
  },
  {
    content:
      "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatu. Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatu.",
    author: {
      avatar: User1,
      name: "Oresanwo A. Oluwatosin",
      role: "Event Planner",
    },
  },
  {
    content:
      "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatu. Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatu.",
    author: {
      avatar: User2,
      name: "Oresanwo A. Oluwatosin",
      role: "Event Planner",
    },
  },
];
const settings = {
  dots: true,
  infinite: true,
  autoPlay: true,
  loop: true,
  speed: 500,
  slidesToShow: 2.4,
  slidesToScroll: 2,
  initialSlide: 0,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2.2,
        slidesToScroll: 3,
        dots: true,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

export const testimonials = {
  headText: "Testimonials",
  subText: "See what our users have to say.",
  testimonies,
  settings,
};

export const featured = {
  headText: "Featured Images",
  subText: "See images of facilities and services from our users.",
};

export const featuredImagess = [
  {
    img: half1,
    logo: avatar1,
    eventName: "EventsbyEva",
    titleNDate: "Weddings • Jan 10, 2023",
  },
  {
    img: twoThree,
    logo: avatar2,
    eventName: "EventsbyEva",
    titleNDate: "Venues • Jan 10, 2023",
  },
  {
    img: oneThree2,
    logo: avatar1,
    eventName: "EventsbyEva",
    titleNDate: "Weddings • Jan 10, 2023",
  },
  {
    img: topleftHalf,
    logo: avatar3,
    eventName: "EventsbyEva",
    titleNDate: "Weddings • Jan 10, 2023",
  },
  {
    img: toprightHalf,
    logo: avatar2,
    eventName: "EventsbyEva",
    titleNDate: "Venues • Jan 10, 2023",
  },

  {
    img: half2,
    logo: avatar1,
    eventName: "EventsbyEva",
    titleNDate: "Weddings • Jan 10, 2023",
  },

  {
    img: oneThree,
    logo: avatar2,
    eventName: "EventsbyEva",
    titleNDate: "Venues • Jan 10, 2023",
  },
  {
    img: twoThree2,
    logo: avatar3,
    eventName: "EventsbyEva",
    titleNDate: "Weddings • Jan 10, 2023",
  },
  {
    img: landscape,
    logo: avatar2,
    eventName: "EventsbyEva",
    titleNDate: "Venues • Jan 10, 2023",
  },
];
