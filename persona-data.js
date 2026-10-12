/* Single source for questions and walkthrough copy. Keep the original wording. */
const COMPANY_CONTEXT = "Want more qualified leads? Knowing details about your buyer persona's business will come in handy when you're building fields for your landing page forms. Factors like industry and company size also help you understand how many hats this person might be wearing on a daily basis or how competitive their market is.";

const personaSteps = [
    {
        "title": "Create your avatar",
        "description": "Start by choosing a name to humanize your buyer persona. Both the name and the avatar you select will help you start thinking about this persona like a real person. Pro tip: Consider naming your buyer persona with their industry in mind to make it easier to remember, like Marketing Mary or Finance Fred",
        "fields": [
            {
                "key": "name",
                "label": "Name your persona :",
                "type": "input"
            },
            {
                "key": "age",
                "label": "How old are they ? :",
                "type": "input"
            },
            {
                "key": "income",
                "label": "Income ? :",
                "type": "input"
            },
            {
                "key": "function",
                "label": "What is your function ? :",
                "type": "input"
            },
            {
                "key": "gender",
                "label": "Gender ? :",
                "type": "input"
            }
        ]
    },
    {
        "title": "Caracteristics",
        "description": "Collecting demographic information about your buyer persona allows you to paint a clearer, more personal picture of your customer. More specifically, factors such as age and education can help you better position your marketing messaging to ensure it resonates.",
        "fields": [
            {
                "key": "biography",
                "label": "His biography :",
                "type": "textarea",
                "placeholder": "Write a short biography of your persona.",
                "size": "small"
            },
            {
                "key": "behaviour",
                "label": "Tell us about his behaviour ? :",
                "type": "textarea",
                "placeholder": "Describe the specific personality traits or habits of this persona.",
                "size": "small"
            }
        ]
    },
    {
        "title": "Company",
        "description": COMPANY_CONTEXT,
        "fields": [
            {
                "key": "company-name",
                "label": "Name of the company :",
                "type": "input"
            },
            {
                "key": "sector",
                "label": "Sector :",
                "type": "input"
            },
            {
                "key": "company-size",
                "label": "Company size :",
                "type": "input"
            },
            {
                "key": "turnover",
                "label": "Turnover :",
                "type": "input"
            },
            {
                "key": "marketing",
                "label": "Type of Marketing :",
                "type": "select",
                "options": [
                    "B2B",
                    "B2C",
                    "B2B2C"
                ]
            }
        ]
    },
    {
        "title": "Position within company",
        "description": COMPANY_CONTEXT,
        "fields": [
            {
                "key": "responsabilities",
                "label": "Responsabilities :",
                "type": "input"
            },
            {
                "key": "report-to",
                "label": "Report to :",
                "type": "input"
            },
            {
                "key": "manager-of",
                "label": "Manager of :",
                "type": "input"
            },
            {
                "key": "role",
                "label": "Role in decision making process :",
                "type": "textarea",
                "placeholder": "Describe their role in the decision-making process.",
                "size": "big"
            }
        ]
    },
    {
        "title": "Objectives",
        "description": COMPANY_CONTEXT,
        "fields": [
            {
                "key": "pain",
                "label": "Frustrations (pain points) :",
                "type": "textarea",
                "placeholder": "What problem does your persona want to solve? What frustrates them? What prevents them from reaching their full potential?",
                "size": "big"
            },
            {
                "key": "goals",
                "label": "Motivation (goals) :",
                "type": "textarea",
                "placeholder": "What does your persona want to achieve in their job? What are their main motivations?",
                "size": "big"
            }
        ]
    },
    {
        "title": "People's thoughts",
        "description": COMPANY_CONTEXT,
        "fields": [
            {
                "key": "criteria",
                "label": "Decision criteria :",
                "type": "textarea",
                "placeholder": "What criteria does your persona use to decide whether to work with you? What would make them recommend you to their manager?",
                "size": "small"
            },
            {
                "key": "quotes",
                "label": "Real quotes :",
                "type": "textarea",
                "placeholder": "What are some real quotes from your persona? What have your existing customers said?",
                "size": "small"
            },
            {
                "key": "objections",
                "label": "Common objections :",
                "type": "textarea",
                "placeholder": "What objections could prevent this persona from working with you? What might hold them back?",
                "size": "small"
            }
        ]
    },
    {
        "title": "Buyer Journey",
        "description": COMPANY_CONTEXT,
        "fields": [
            {
                "key": "awarness",
                "label": "Awarness :",
                "type": "textarea",
                "placeholder": "How, where and when does your persona become aware of your company, service or industry?",
                "size": "big"
            },
            {
                "key": "consideration",
                "label": "Consideration :",
                "type": "textarea",
                "placeholder": "Which channels do you use to keep this persona informed? How do you make sure they think of you rather than your competitors?",
                "size": "big"
            },
            {
                "key": "action",
                "label": "Action :",
                "type": "textarea",
                "placeholder": "How can your persona take the next step to work with you or share their contact details?",
                "size": "big"
            }
        ]
    },
    {
        "title": "What does he want ?",
        "description": COMPANY_CONTEXT,
        "fields": [
            {
                "key": "help",
                "label": "How can you help your persona ?",
                "type": "textarea",
                "placeholder": "How can you help this persona overcome their frustrations and achieve their goals?",
                "size": "big"
            },
            {
                "key": "marketing-message",
                "label": "Marketing message :",
                "type": "textarea",
                "placeholder": "Based on the information above, how would you pitch your service or product to this persona? What are the main unique selling points?",
                "size": "big"
            }
        ]
    }
];
