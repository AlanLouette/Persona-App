/* Single source for questions and walkthrough copy. Keep the original wording. */
const personaSteps = [
    {
        "title": "Create your avatar",
        "description": "Give this persona a name you can recognise. Use an age range or approximate income if exact figures are not useful.",
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
        "title": "Characteristics",
        "description": "Describe their situation and habits. Keep the details that help explain how they choose or use your product.",
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
        "description": "For a business customer, company size and sector can affect the budget and buying process. For a consumer, focus on the purchase and what they can spend.",
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
                "key": "purchase-budget",
                "label": "Budget for this purchase :",
                "type": "input"
            },
            {
                "key": "purchase-context",
                "label": "What are they buying, and for whom?",
                "type": "textarea",
                "placeholder": "Describe the purchase and who will use it.",
                "size": "small"
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
        "description": "Who decides, who pays, and who else has a say? These may be different people.",
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
        "description": "Write down the problem they want to solve and the result they expect. Use examples from customers when you can.",
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
        "description": "What matters when they compare options? Note their own words and the reasons they might say no.",
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
        "description": "Think about the steps before a purchase: where they hear about you, how they compare options, and what helps them take the next step.",
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
        "description": "Connect your offer to their needs. Explain what you can help with and which promises you can back up.",
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
