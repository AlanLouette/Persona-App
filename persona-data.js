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
                "placeholder": "Hier komt een korte biografische beschrijving van je persona.",
                "size": "small"
            },
            {
                "key": "behaviour",
                "label": "Tell us about his behaviour ? :",
                "type": "textarea",
                "placeholder": "Hier komen specifieke karaktertrekken of gewoontes van deze persona.",
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
                "placeholder": "Specificeer de rol in het besluitvormingsproces",
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
                "placeholder": "Wat is het probleem dat je persona graag wilt oplossen? Wat zijn hun frustraties? Wat houdt hun tegen hun maximale potentieel te bereiken?",
                "size": "big"
            },
            {
                "key": "goals",
                "label": "Motivation (goals) :",
                "type": "textarea",
                "placeholder": "Welk doel heeft jouw persona in zijn/haar job? Wat zijn de belangrijkste motivaties?",
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
                "placeholder": "Op basis van welke criteria beslist jouw persona om al dan niet met jouw in zee te gaan? Op basis van welke criteria gaat hij jou als voorkeurspartner naar voren schuiven bij z’n baas?",
                "size": "small"
            },
            {
                "key": "quotes",
                "label": "Real quotes :",
                "type": "textarea",
                "placeholder": "Wat zijn enkele echte citaten van jouw persona? Wat hebben bestaande klanten van jou al gezegd?",
                "size": "small"
            },
            {
                "key": "objections",
                "label": "Common objections :",
                "type": "textarea",
                "placeholder": "Welke bezwaren heeft deze persona waarom hij niet met jou in zee kan gaan? Wat kan hem potentieel tegenhouden?",
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
                "placeholder": "Hoe, waar en wanneer wordt je persona zich bewust van jou bedrijf, dienst of sector?",
                "size": "big"
            },
            {
                "key": "consideration",
                "label": "Consideration :",
                "type": "textarea",
                "placeholder": "Via welke kanalen hou je deze persona geïnformeerd? Hoe zorg je dat hij/zij aan jou denkt en niet aan je concurrenten?",
                "size": "big"
            },
            {
                "key": "action",
                "label": "Action :",
                "type": "textarea",
                "placeholder": "Op welke manieren kan je persona de stap zetten om met jou in zee te gaan of z’n gegevens achter te laten?",
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
                "placeholder": "Wat kan jij doen om deze persona te helpen met zijn frustraties weg te werken en zijn doelen te behalen?",
                "size": "big"
            },
            {
                "key": "marketing-message",
                "label": "Marketing message :",
                "type": "textarea",
                "placeholder": "Op basis van al het voorgaande: hoe pitch je jouw dienst of product aan deze persona? Wat zijn de belangrijkste USPs?",
                "size": "big"
            }
        ]
    }
];
