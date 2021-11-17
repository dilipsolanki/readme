<?php
return
    [
        'lumiere' => [
            'neo4j_host' => env('NEO4J_HOST'),
            'neo4j_port' => env('NEO4J_PORT'),
            'neo4j_username' => env('NEO4J_USERNAME'),
            'neo4j_password' => env('NEO4J_PASSWORD')
        ],
        'synonyms_dictionary_api' => env('SYNONYMS_DICTIONARY_API'),
        'spell_checker' => [
            'api_url'    =>  'https://test1.spellcheck.cactuslabs.io/api/v1/spellcheck',
            'request_id' => 'a069ffe6-0e7a-11e9-a432-f48c503e1d7c--cccb23a4-b58f-404e-b309-73244708a40e',
            'oauth'      => 'c3BlbGxjaGVja0AxMjM='
        ],

        'auto_editing'         => [
            'api_url' => 'http://autoedit.cactuslabs.io/autocorrect'
        ],
        'nlp'                  => [
            'api_url' => 'http://3.227.192.182/api/v1',
            'api_key' => '2_5I8pXFt8IoFSoV37EzxBg4GJZYSM6spi8FDCcHgiL-',
        ],
        'document_structuring' => [
            'function_name' => 'idan-app-dev'
        ],
        'image_checker' => [
            'function_name' => 'nv-lambda-umbono-rndTools',
            'auth_key' => 'vMQMFOCy8qXrzkVN',
            'callback_url' => 'http://example.com',
            'request_id' => '123'
        ],
        'subject_area_detection'         => [
            //            'api_url' => 'http://sadetection.cactuslabs.io/detect'
            'api_url' => 'http://sadetection.cactuslabs.io/',
            'auth' => 'UlI6sv9OExnjuAceCVZKGlw4hrciuQOj8jMRFbNuXrY3'
        ],


        'scholarcy' => [
            'function_name' => 'nv-rnd-scholarcy-highlights-extract-by-url'
        ],

        'hubble_api_url' => env('HUBBLE_CONTENT_API_URL'),
        // 'https://4jbox72b61.execute-api.us-east-1.amazonaws.com/prod/api/v1/submit',
        'hubble_api_fetch_url' => env('HUBBLE_CONTENT_API_FETCH_URL'),
        // 'https://4jbox72b61.execute-api.us-east-1.amazonaws.com/prod/api/v1/fetch',


        'hubble_file_api_url' => env('HUBBLE_FILE_API_URL'),
        // 'https://hubble.cactuslabs.io/api/v1/submit',
        'hubble_file_api_fetch_url' => env('HUBBLE_FILE_API_FETCH_URL'),
        // 'https://hubble.cactuslabs.io/api/v1/fetch',
        'hubble_lynx_url' => env('HUBBLE_LYNX_URL'),
        'hubble_lynx_fetch_url' => env('HUBBLE_LYNX_FETCH_URL'),

        'hubble_cc_url' => env('HUBBLE_CC_URL'),
        'hubble_cc_fetch_url' => env('HUBBLE_CC_FETCH_URL'),

        'hubble_auth_token' => env('HUBBLE_AUTH_TOKEN'),
        'hubble_lynx_token' => env('HUBBLE_LYNX_TOKEN'),
        'hubble_cc_token' => env('HUBBLE_CC_TOKEN'),

        'FROM_EMAIL' => 'from@rndtoolkit.com',
        'FROM_NAME' => 'RnD ToolKit',

        'lang_version' => [
            'en-us' => 'American English',
            'en-gb' => 'British English'
        ],

        'error_category' => [
            [
                'name' => 'language',
                'href' => '#parent1',
                'text' => 'Language',
                'value' => 1,
                'tags' => ['2'],
                'nodes' => [
                    [
                        'name' => 'language:grammatical',
                        'href' => '#parent1-1',
                        'text' => 'Grammatical',
                        'value' => 3,
                        'tags' => ['2'],
                        'nodes' => [
                            [
                                'name' => 'language:grammatical:morphology',
                                'href' => '#parent1-1-1',
                                'text' => 'Morphology',
                                'value' => 4,
                                'tags' => ['5'],
                                'nodes' => [
                                    [
                                        'name' => 'language:grammatical:morphology:verb_main_conjugation',
                                        'href' => '#parent1-1-1-1',
                                        'text' => 'Verb main conjugation',
                                        'value' => 5,
                                        'tags' => ['6'],
                                        'nodes' => [
                                            [
                                                'name' => 'M:VERB:FORM',
                                                'href' => '#parent1-1-1-1-1',
                                                'text' => 'Missing verb form',
                                                'value' => 6,
                                                'tags' => ['0'],
                                            ], [
                                                'name' => 'E:VERB:FORM',
                                                'href' => '#parent1-1-1-1-2',
                                                'text' => 'Extra verb form',
                                                'value' => 7,
                                                'tags' => ['0'],
                                            ], [
                                                'name' => 'W:VERB:FORM',
                                                'href' => '#parent1-1-1-1-3',
                                                'text' => 'Wrong verb form',
                                                'value' => 8,
                                                'tags' => ['0'],
                                            ], [
                                                'name' => 'language:grammatical:morphology:tense',
                                                'href' => '#parent1-1-1-1-4',
                                                'text' => 'Tense',
                                                'value' => 9,
                                                'tags' => ['3'],
                                                'nodes' => [
                                                    [
                                                        'name' => 'M:VERB:TENSE',
                                                        'href' => '#parent1-1-1-1-4-1',
                                                        'text' => 'Missing verb tense',
                                                        'value' => 10,
                                                        'tags' => ['0'],
                                                    ], [
                                                        'name' => 'E:VERB:TENSE',
                                                        'href' => '#parent1-1-1-1-4-2',
                                                        'text' => 'Extra verb tense',
                                                        'value' => 11,
                                                        'tags' => ['0'],
                                                    ], [
                                                        'name' => 'W:VERB:TENSE',
                                                        'href' => '#parent1-1-1-1-4-3',
                                                        'text' => 'Wrong verb tense',
                                                        'value' => 12,
                                                        'tags' => ['0'],
                                                    ],
                                                ],
                                            ], [
                                                'name' => 'language:grammatical:morphology:aspect',
                                                'href' => '#parent1-1-1-1-5',
                                                'text' => 'Aspect',
                                                'value' => 13,
                                                'tags' => ['3'],
                                                'nodes' => [
                                                    [
                                                        'name' => 'M:VERB:ASPECT',
                                                        'href' => '#parent1-1-1-2-5-1',
                                                        'text' => 'Missing verb aspect',
                                                        'value' => 14,
                                                        'tags' => ['0'],
                                                    ], [
                                                        'name' => 'E:VERB:ASPECT',
                                                        'href' => '#parent1-1-1-2-5-2',
                                                        'text' => 'Extra verb aspect',
                                                        'value' => 15,
                                                        'tags' => ['0'],
                                                    ], [
                                                        'name' => 'W:VERB:ASPECT',
                                                        'href' => '#parent1-1-1-2-5-3',
                                                        'text' => 'Wrong verb aspect',
                                                        'value' => 16,
                                                        'tags' => ['0'],
                                                    ],
                                                ],
                                            ], [
                                                'name' => 'language:grammatical:morphology:number',
                                                'href' => '#parent1-1-1-1-6',
                                                'text' => 'Number',
                                                'value' => 17,
                                                'tags' => ['3'],
                                                'nodes' => [
                                                    [
                                                        'name' => 'M:VERB:NUMBER',
                                                        'href' => '#parent1-1-1-2-5-1',
                                                        'text' => 'Missing verb number',
                                                        'value' => 18,
                                                        'tags' => ['0'],
                                                    ], [
                                                        'name' => 'E:VERB:NUMBER',
                                                        'href' => '#parent1-1-1-2-5-2',
                                                        'text' => 'Extra verb number',
                                                        'value' => 19,
                                                        'tags' => ['0'],
                                                    ], [
                                                        'name' => 'W:VERB:NUMBER',
                                                        'href' => '#parent1-1-1-2-5-3',
                                                        'text' => 'Wrong verb number',
                                                        'value' => 20,
                                                        'tags' => ['0'],
                                                    ],
                                                ],
                                            ],
                                        ],
                                    ], [
                                        'name' => 'language:grammatical:morphology:verb_aux_conjugation',
                                        'href' => '#parent1-1-1-2',
                                        'text' => 'Verb aux conjugation',
                                        'value' => 21,
                                        'tags' => ['6'],
                                        'nodes' => [
                                            [
                                                'name' => 'M:VERB:FORM',
                                                'href' => '#parent1-1-1-2-1',
                                                'text' => 'Missing verb form',
                                                'value' => 22,
                                                'tags' => ['0'],
                                            ], [
                                                'name' => 'E:VERB:FORM',
                                                'href' => '#parent1-1-1-2-2',
                                                'text' => 'Extra verb form',
                                                'value' => 23,
                                                'tags' => ['0'],
                                            ], [
                                                'name' => 'W:VERB:FORM',
                                                'href' => '#parent1-1-1-2-3',
                                                'text' => 'Wrong verb form',
                                                'value' => 24,
                                                'tags' => ['0'],
                                            ], [
                                                'name' => 'language:grammatical:morphology:tense',
                                                'href' => '#parent1-1-1-2-4',
                                                'text' => 'Tense',
                                                'value' => 25,
                                                'tags' => ['3'],
                                                'nodes' => [
                                                    [
                                                        'name' => 'M:VERB:TENSE',
                                                        'href' => '#parent1-1-1-2-4-1',
                                                        'text' => 'Missing verb tense',
                                                        'value' => 26,
                                                        'tags' => ['0'],
                                                    ], [
                                                        'name' => 'E:VERB:TENSE',
                                                        'href' => '#parent1-1-1-2-4-2',
                                                        'text' => 'Extra verb tense',
                                                        'value' => 27,
                                                        'tags' => ['0'],
                                                    ], [
                                                        'name' => 'W:VERB:TENSE',
                                                        'href' => '#parent1-1-1-2-4-3',
                                                        'text' => 'Wrong verb tense',
                                                        'value' => 28,
                                                        'tags' => ['0'],
                                                    ],
                                                ],
                                            ],
                                            [
                                                'name' => 'language:grammatical:morphology:aspect',
                                                'href' => '#parent1-1-1-1-5',
                                                'text' => 'Aspect',
                                                'value' => 29,
                                                'tags' => ['3'],
                                                'nodes' => [
                                                    [
                                                        'name' => 'M:VERB:ASPECT',
                                                        'href' => '#parent1-1-1-2-5-1',
                                                        'text' => 'Missing verb aspect',
                                                        'value' => 30,
                                                        'tags' => ['0'],
                                                    ], [
                                                        'name' => 'E:VERB:ASPECT',
                                                        'href' => '#parent1-1-1-2-5-2',
                                                        'text' => 'Extra verb aspect',
                                                        'value' => 31,
                                                        'tags' => ['0'],
                                                    ], [
                                                        'name' => 'W:VERB:ASPECT',
                                                        'href' => '#parent1-1-1-2-5-3',
                                                        'text' => 'Wrong verb aspect',
                                                        'value' => 32,
                                                        'tags' => ['0'],
                                                    ],
                                                ],
                                            ], [
                                                'name' => 'language:grammatical:morphology:number',
                                                'href' => '#parent1-1-1-1-6',
                                                'text' => 'Number',
                                                'value' => 33,
                                                'tags' => ['3'],
                                                'nodes' => [
                                                    [
                                                        'name' => 'M:VERB:NUMBER',
                                                        'href' => '#parent1-1-1-2-5-1',
                                                        'text' => 'Missing verb number',
                                                        'value' => 34,
                                                        'tags' => ['0'],
                                                    ], [
                                                        'name' => 'E:VERB:NUMBER',
                                                        'href' => '#parent1-1-1-2-5-2',
                                                        'text' => 'Extra verb number',
                                                        'value' => 35,
                                                        'tags' => ['0'],
                                                    ], [
                                                        'name' => 'W:VERB:NUMBER',
                                                        'href' => '#parent1-1-1-2-5-3',
                                                        'text' => 'Wrong verb number',
                                                        'value' => 36,
                                                        'tags' => ['0'],
                                                    ],
                                                ],
                                            ],
                                        ],
                                    ], [
                                        'name' => 'language:grammatical:morphology:declension_(adj_form)',
                                        'href' => '#parent1-1-1-3',
                                        'text' => 'Declension (adj form)',
                                        'value' => 37,
                                        'tags' => ['1'],
                                        'nodes' => [
                                            [
                                                'name' => 'W:ADJ:FORM',
                                                'href' => '#parent1-1-1-3-1',
                                                'text' => 'Wrong adjective form',
                                                'value' => 38,
                                                'tags' => ['0'],
                                            ],
                                        ],
                                    ], [
                                        'name' => 'language:grammatical:morphology:inflection_(noun/pronoun_form)',
                                        'href' => '#parent1-1-1-4',
                                        'text' => 'Inflection (noun/pronoun form)',
                                        'value' => 39,
                                        'tags' => ['1'],
                                        'nodes' => [
                                            [
                                                'name' => 'W:NOUN:INFL',
                                                'href' => '#parent1-1-1-4-1',
                                                'text' => 'Wrong noun inflection',
                                                'value' => 40,
                                                'tags' => ['0'],
                                            ]

                                        ],
                                    ], [
                                        'name' => 'W:MORPH',
                                        'href' => '#parent1-1-1-5',
                                        'text' => 'Wrong morphology',
                                        'value' => 41,
                                        'tags' => ['0'],
                                    ],
                                ],
                            ], [
                                'name' => 'language:grammatical:syntax',
                                'href' => '#parent1-1-2',
                                'text' => 'Syntax',
                                'value' => 42,
                                'tags' => ['6'],
                                'nodes' => [
                                    [
                                        'name' => 'language:grammatical:syntax:case',
                                        'href' => '#parent1-1-2-1',
                                        'text' => 'Case',
                                        'value' => 43,
                                        'tags' => ['0'],
                                    ], [
                                        'name' => 'language:grammatical:syntax:word_order',
                                        'href' => '#parent1-1-2-2',
                                        'text' => 'Word order',
                                        'value' => 44,
                                        'tags' => ['0'],
                                    ], [
                                        'name' => 'language:grammatical:syntax:clause_order',
                                        'href' => '#parent1-1-2-4',
                                        'text' => 'Clause order',
                                        'value' => 45,
                                        'tags' => ['0'],
                                    ], [
                                        'name' => 'language:grammatical:syntax:subject-verb_disagreement-number',
                                        'href' => '#parent1-1-2-5',
                                        'text' => 'Subject-verb disagreement - number',
                                        'value' => 46,
                                        'tags' => ['1'],
                                        'nodes' => [
                                            [
                                                'name' => 'W:VERB:SVA',
                                                'href' => '#parent1-1-2-5',
                                                'text' => 'Wrong subject-verb agreement',
                                                'value' => 47,
                                                'tags' => ['0'],
                                            ],
                                        ]
                                    ], [
                                        'name' => 'language:grammatical:syntax:pronoun-antecedent_disagreement-number',
                                        'href' => '#parent1-1-2-6',
                                        'text' => 'Pronoun-antecedent disagreement - number',
                                        'value' => 48,
                                        'tags' => ['0'],
                                    ]
                                ],
                            ],

                        ],
                    ],
                    [
                        'name' => 'language:lexical',
                        'href' => '#parent1-2',
                        'text' => 'Lexical',
                        'value' => 49,
                        'tags' => ['3'],
                        'nodes' => [
                            [
                                'name'  => 'language:lexical:adjective',
                                'href'  => '#parent1-2-1',
                                'text'  => 'Adjective',
                                'value' => 50,
                                'tags'  => ['3'],
                                'nodes' => [
                                    [
                                        'name'  => 'M:ADJ',
                                        'href'  => '#parent1-2-1-1',
                                        'text'  => 'Missing adjective',
                                        'value' => 51,
                                        'tags'  => ['0'],
                                    ],
                                    [
                                        'name'  => 'E:ADJ',
                                        'href'  => '#parent1-2-1-2',
                                        'text'  => 'Extra adjective',
                                        'value' => 52,
                                        'tags'  => ['0'],
                                    ],
                                    [
                                        'name'  => 'W:ADJ',
                                        'href'  => '#parent1-2-1-3',
                                        'text'  => 'Wrong adjective',
                                        'value' => 53,
                                        'tags'  => ['0'],
                                    ],
                                ],
                            ],
                            [
                                'name' => 'language:lexical:adverb',
                                'href' => '#parent1-2-2',
                                'text' => 'Adverb',
                                'value' => 54,
                                'tags' => ['3'],
                                'nodes' => [
                                    [
                                        'name'  => 'M:ADV',
                                        'href'  => '#parent1-2-2-1',
                                        'text'  => 'Missing adverb',
                                        'value' => 55,
                                        'tags'  => ['0'],
                                    ],
                                    [
                                        'name'  => 'E:ADV',
                                        'href'  => '#parent1-2-2-2',
                                        'text'  => 'Extra adverb',
                                        'value' => 56,
                                        'tags'  => ['0'],
                                    ],
                                    [
                                        'name'  => 'W:ADV',
                                        'href'  => '#parent1-2-2-3',
                                        'text'  => 'Wrong adverb',
                                        'value' => 57,
                                        'tags'  => ['0'],
                                    ],
                                ],
                            ],
                            [
                                'name' => 'language:lexical:conjunction',
                                'href' => '#parent1-2-3',
                                'text' => 'Conjunction',
                                'value' => 58,
                                'tags' => ['6'],
                                'nodes' => [
                                    [
                                        'name'  => 'M:CONJ',
                                        'href'  => '#parent1-2-3-1',
                                        'text'  => 'Missing conjuction',
                                        'value' => 59,
                                        'tags'  => ['0'],
                                    ],
                                    [
                                        'name'  => 'E:CONJ',
                                        'href'  => '#parent1-2-3-2',
                                        'text'  => 'Extra conjuction',
                                        'value' => 60,
                                        'tags'  => ['0'],
                                    ],
                                    [
                                        'name'  => 'W:CONJ',
                                        'href'  => '#parent1-2-3-3',
                                        'text'  => 'Wrong conjunction',
                                        'value' => 61,
                                        'tags'  => ['0'],
                                    ],
                                    [
                                        'name'  => 'language:lexical:conjunction:coordinating',
                                        'href'  => '#parent1-2-3-4',
                                        'text'  => 'Coordinating',
                                        'value' => 62,
                                        'tags'  => ['3'],
                                        'nodes' => [
                                            [
                                                'name'  => 'M:Cord_Conj',
                                                'href'  => '#parent1-2-3-4-1',
                                                'text'  => 'Missing coordinating conjunction',
                                                'value' => 63,
                                                'tags'  => ['0'],
                                            ],
                                            [
                                                'name'  => 'E:Cord_Conj',
                                                'href'  => '#parent1-2-3-4-2',
                                                'text'  => 'Extra coordinating conjunction',
                                                'value' => 64,
                                                'tags'  => ['0'],
                                            ],
                                            [
                                                'name'  => 'W:W_Cord_Conj',
                                                'href'  => '#parent1-2-3-4-3',
                                                'text'  => 'Wrong coordinating conjunction',
                                                'value' => 65,
                                                'tags'  => ['0'],
                                            ],
                                        ]
                                    ],
                                    [
                                        'name'  => 'language:lexical:conjunction:subordinating',
                                        'href'  => '#parent1-2-3-3',
                                        'text'  => 'Subordinating',
                                        'value' => 66,
                                        'tags'  => ['0'],
                                    ],
                                    [
                                        'name'  => 'language:lexical:conjunction:correlative',
                                        'href'  => '#parent1-2-3-3',
                                        'text'  => 'Correlative',
                                        'value' => 67,
                                        'tags'  => ['0'],
                                    ],
                                ],
                            ],
                            [
                                'name' => 'language:lexical:determiner',
                                'href' => '#parent1-2-4',
                                'text' => 'Determiner',
                                'value' => 68,
                                'tags' => ['6'],
                                'nodes' => [
                                    [
                                        'name'  => 'M:DET',
                                        'href'  => '#parent1-2-4-1',
                                        'text'  => 'Missing determiner',
                                        'value' => 69,
                                        'tags'  => ['0']
                                    ],
                                    [
                                        'name'  => 'E:DET',
                                        'href'  => '#parent1-2-4-2',
                                        'text'  => 'Extra determiner',
                                        'value' => 70,
                                        'tags'  => ['0']
                                    ],
                                    [
                                        'name'  => 'W:DET',
                                        'href'  => '#parent1-2-4-3',
                                        'text'  => 'Wrong determiner',
                                        'value' => 71,
                                        'tags'  => ['0']
                                    ],
                                    [
                                        'name'  => 'language:lexical:determiner:article_indef',
                                        'href'  => '#parent1-2-4-4',
                                        'text'  => 'Article - indef',
                                        'value' => 72,
                                        'tags'  => ['3'],
                                        'nodes' => [
                                            [
                                                'name'  => 'M:Det_ArIn',
                                                'href'  => '#parent1-2-4-4-1',
                                                'text'  => 'Missing indefinite article',
                                                'value' => 73,
                                                'tags'  => ['0'],
                                            ],
                                            [
                                                'name'  => 'E:Det_ArIn',
                                                'href'  => '#parent1-2-4-4-2',
                                                'text'  => 'Extra indefinite article',
                                                'value' => 74,
                                                'tags'  => ['0'],
                                            ],
                                            [
                                                'name'  => 'W:W_Det_ArIn',
                                                'href'  => '#parent1-2-4-4-3',
                                                'text'  => 'Wrong indefinite article',
                                                'value' => 75,
                                                'tags'  => ['0'],
                                            ],
                                        ],
                                    ],

                                    [
                                        'name'  => 'language:lexical:determiner:article_def',
                                        'href'  => '#parent1-2-4-5',
                                        'text'  => 'Article - def',
                                        'value' => 76,
                                        'tags'  => ['3'],
                                        'nodes' => [
                                            [
                                                'name'  => 'M:Det_ArIn',
                                                'href'  => '#parent1-2-4-5-1',
                                                'text'  => 'Missing definite article',
                                                'value' => 77,
                                                'tags'  => ['0'],
                                            ],
                                            [
                                                'name'  => 'E:Det_ArDe',
                                                'href'  => '#parent1-2-4-5-2',
                                                'text'  => 'Extra definite article',
                                                'value' => 78,
                                                'tags'  => ['0'],
                                            ],
                                            [
                                                'name'  => 'W:W_Det_ArDe',
                                                'href'  => '#parent1-2-4-5-3',
                                                'text'  => 'Wrong definite article',
                                                'value' => 79,
                                                'tags'  => ['0'],
                                            ],
                                        ],
                                    ],
                                    [
                                        'name'  => 'language:lexical:determiner:demonstratives',
                                        'href'  => '#parent1-2-4-6',
                                        'text'  => 'Demonstratives',
                                        'value' => 80,
                                        'tags'  => ['3'],
                                        'nodes' => [
                                            [
                                                'name'  => 'M:Det_Demo',
                                                'href'  => '#parent1-2-4-6-1',
                                                'text'  => 'Missing demonstrative',
                                                'value' => 81,
                                                'tags'  => ['0'],
                                            ],
                                            [
                                                'name'  => 'E:Det_Demo',
                                                'href'  => '#parent1-2-4-6-2',
                                                'text'  => 'Extra demonstrative',
                                                'value' => 82,
                                                'tags'  => ['0'],
                                            ],
                                            [
                                                'name'  => 'W:W_Det_Demo',
                                                'href'  => '#parent1-2-4-6-3',
                                                'text'  => 'Wrong demonstrative',
                                                'value' => 83,
                                                'tags'  => ['0'],
                                            ],
                                        ],
                                    ],
                                    [
                                        'name'  => 'language:lexical:determiner:possessives',
                                        'href'  => '#parent1-2-4-7',
                                        'text'  => 'Possessives',
                                        'value' => 84,
                                        'tags'  => ['3'],
                                        'nodes' => [
                                            [
                                                'name'  => 'M:Det_Poss',
                                                'href'  => '#parent1-2-4-7-1',
                                                'text'  => 'Missing possessive',
                                                'value' => 85,
                                                'tags'  => ['0'],
                                            ],
                                            [
                                                'name'  => 'E:Det_Poss',
                                                'href'  => '#parent1-2-4-7-2',
                                                'text'  => 'Extra possessive',
                                                'value' => 86,
                                                'tags'  => ['0'],
                                            ],
                                            [
                                                'name'  => 'W:W_Det_Poss',
                                                'href'  => '#parent1-2-4-7-3',
                                                'text'  => 'Wrong possessive',
                                                'value' => 87,
                                                'tags'  => ['0'],
                                            ],
                                        ],
                                    ],
                                    [
                                        'name'  => 'language:lexical:determiner:quantifiers',
                                        'href'  => '#parent1-2-4-8',
                                        'text'  => 'Quantifiers',
                                        'value' => 88,
                                        'tags'  => ['1'],
                                        'nodes' => [
                                            [
                                                'name'  => 'W:W_Det_Quan',
                                                'href'  => '#parent1-2-4-8-1',
                                                'text'  => 'Wrong quantifier',
                                                'value' => 89,
                                                'tags'  => ['0'],
                                            ],
                                        ],
                                    ],
                                    [
                                        'name'  => 'language:lexical:determiner:numbers',
                                        'href'  => '#parent1-2-4-9',
                                        'text'  => 'Numbers',
                                        'value' => 90,
                                        'tags'  => ['0'],
                                    ],
                                    [
                                        'name'  => 'language:lexical:determiner:distributives',
                                        'href'  => '#parent1-2-4-10',
                                        'text'  => 'Distributives',
                                        'value' => 91,
                                        'tags'  => ['3'],
                                        'nodes' => [
                                            [
                                                'name'  => 'M:Det_Dist',
                                                'href'  => '#parent1-2-4-10-1',
                                                'text'  => 'Missing distributive',
                                                'value' => 92,
                                                'tags'  => ['0'],
                                            ],
                                            [
                                                'name'  => 'E:Det_Dist',
                                                'href'  => '#parent1-2-4-10-2',
                                                'text'  => 'Extra distributive',
                                                'value' => 93,
                                                'tags'  => ['0'],
                                            ],
                                            [
                                                'name'  => 'W:W_Det_Dist',
                                                'href'  => '#parent1-2-4-10-3',
                                                'text'  => 'Wrong distributive',
                                                'value' => 94,
                                                'tags'  => ['0'],
                                            ],
                                        ],
                                    ],
                                    [
                                        'name'  => 'language:lexical:determiner:difference_words',
                                        'href'  => '#parent1-2-4-11',
                                        'text'  => 'Difference words',
                                        'value' => 95,
                                        'tags'  => ['3'],
                                        'nodes' => [
                                            [
                                                'name'  => 'M:Det_Diff',
                                                'href'  => '#parent1-2-4-11-1',
                                                'text'  => 'Missing difference word',
                                                'value' => 96,
                                                'tags'  => ['0'],
                                            ],
                                            [
                                                'name'  => 'E:Det_Diff',
                                                'href'  => '#parent1-2-4-11-2',
                                                'text'  => 'Extra difference word',
                                                'value' => 97,
                                                'tags'  => ['0'],
                                            ],
                                            [
                                                'name'  => 'W:W_Det_Diff',
                                                'href'  => '#parent1-2-4-11-3',
                                                'text'  => 'Wrong difference word',
                                                'value' => 98,
                                                'tags'  => ['0'],
                                            ],
                                        ],
                                    ],
                                    [
                                        'name'  => 'language:lexical:determiner:pre_determiners',
                                        'href'  => '#parent1-2-4-12',
                                        'text'  => 'Pre-determiners',
                                        'value' => 99,
                                        'tags'  => ['3'],
                                        'nodes' => [
                                            [
                                                'name'  => 'M:Det_PrDe',
                                                'href'  => '#parent1-2-4-12-1',
                                                'text'  => 'Missing pre-determiner',
                                                'value' => 100,
                                                'tags'  => ['0'],
                                            ],
                                            [
                                                'name'  => 'E:Det_PrDe',
                                                'href'  => '#parent1-2-4-12-2',
                                                'text'  => 'Extra  pre-determiner',
                                                'value' => 101,
                                                'tags'  => ['0'],
                                            ],
                                            [
                                                'name'  => 'W:W_Det_PrDe',
                                                'href'  => '#parent1-2-4-12-3',
                                                'text'  => 'Wrong pre-determiner',
                                                'value' => 102,
                                                'tags'  => ['0'],
                                            ],
                                        ],
                                    ],
                                ],
                            ],
                            [
                                'name' => 'language:lexical:noun',
                                'href' => '#parent1-2-5',
                                'text' => 'Noun',
                                'value' => 103,
                                'tags' => ['3'],
                                'nodes' => [
                                    [
                                        'name'  => 'M:NOUN',
                                        'href'  => '#parent1-2-5-1',
                                        'text'  => 'Missing noun',
                                        'value' => 104,
                                        'tags'  => ['0'],
                                    ],
                                    [
                                        'name'  => 'E:NOUN',
                                        'href'  => '#parent1-2-5-2',
                                        'text'  => 'Extra noun',
                                        'value' => 105,
                                        'tags'  => ['0'],
                                    ],
                                    [
                                        'name'  => 'W:NOUN',
                                        'href'  => '#parent1-2-5-3',
                                        'text'  => 'Wrong noun',
                                        'value' => 106,
                                        'tags'  => ['0'],
                                    ],
                                ],
                            ],
                            [
                                'name' => 'language:lexical:particle',
                                'href' => '#parent1-2-6',
                                'text' => 'Particle',
                                'value' => 107,
                                'tags' => ['3'],
                                'nodes' => [
                                    [
                                        'name'  => 'M:PART',
                                        'href'  => '#parent1-2-6-1',
                                        'text'  => 'Missing particle',
                                        'value' => 108,
                                        'tags'  => ['0'],
                                    ],
                                    [
                                        'name'  => 'E:PART',
                                        'href'  => '#parent1-2-6-2',
                                        'text'  => 'Extra Particle',
                                        'value' => 109,
                                        'tags'  => ['0'],
                                    ],
                                    [
                                        'name'  => 'W:PART',
                                        'href'  => '#parent1-2-6-3',
                                        'text'  => 'Wrong Particle',
                                        'value' => 110,
                                        'tags'  => ['0'],
                                    ],
                                ],
                            ],
                            [
                                'name' => 'language:lexical:preposition',
                                'href' => '#parent1-2-7',
                                'text' => 'Preposition',
                                'value' => 111,
                                'tags' => ['3'],
                                'nodes' => [
                                    [
                                        'name'  => 'M:PREP',
                                        'href'  => '#parent1-2-7-1',
                                        'text'  => 'Missing preposition',
                                        'value' => 112,
                                        'tags'  => ['0'],
                                    ],
                                    [
                                        'name'  => 'E:PREP',
                                        'href'  => '#parent1-2-7-2',
                                        'text'  => 'Extra preposition',
                                        'value' => 113,
                                        'tags'  => ['0'],
                                    ],
                                    [
                                        'name'  => 'W:PREP',
                                        'href'  => '#parent1-2-7-3',
                                        'text'  => 'Wrong preposition',
                                        'value' => 114,
                                        'tags'  => ['0'],
                                    ],
                                ],
                            ],
                            [
                                'name' => 'language:lexical:pronoun',
                                'href' => '#parent1-2-8',
                                'text' => 'Pronoun',
                                'value' => 115,
                                'tags' => ['3'],
                                'nodes' => [
                                    [
                                        'name'  => 'M:PRON',
                                        'href'  => '#parent1-2-8-1',
                                        'text'  => 'Missing pronoun',
                                        'value' => 116,
                                        'tags'  => ['0'],
                                    ],
                                    [
                                        'name'  => 'E:PRON',
                                        'href'  => '#parent1-2-8-2',
                                        'text'  => 'Extra pronoun',
                                        'value' => 117,
                                        'tags'  => ['0'],
                                    ],
                                    [
                                        'name'  => 'W:PRON',
                                        'href'  => '#parent1-2-8-3',
                                        'text'  => 'Wrong pronoun',
                                        'value' => 118,
                                        'tags'  => ['0'],
                                    ],
                                ],
                            ],
                            [
                                'name' => 'language:lexical:verb_main',
                                'href' => '#parent1-2-9',
                                'text' => 'Verb Main',
                                'value' => 119,
                                'tags' => ['6'],
                                'nodes' => [
                                    [
                                        'name'  => 'M:VERB',
                                        'href'  => '#parent1-2-9-1',
                                        'text'  => 'Missing Verb',
                                        'value' => 120,
                                        'tags'  => ['0'],
                                    ],
                                    [
                                        'name'  => 'E:VERB',
                                        'href'  => '#parent1-2-9-2',
                                        'text'  => 'Extra Verb',
                                        'value' => 121,
                                        'tags'  => ['0'],
                                    ],
                                    [
                                        'name'  => 'W:VERB',
                                        'href'  => '#parent1-2-9-3',
                                        'text'  => 'Wrong Verb',
                                        'value' => 122,
                                        'tags'  => ['0'],
                                    ],
                                ],
                            ],
                            [
                                'name' => 'language:lexical:verb_aux',
                                'href' => '#parent1-2-10',
                                'text' => 'Verb Aux',
                                'value' => 123,
                                'tags' => ['6'],
                                'nodes' => [
                                    [
                                        'name'  => 'M:VERB',
                                        'href'  => '#parent1-2-10-1',
                                        'text'  => 'Missing verb',
                                        'value' => 124,
                                        'tags'  => ['0'],
                                    ],
                                    [
                                        'name'  => 'E:VERB',
                                        'href'  => '#parent1-2-10-2',
                                        'text'  => 'Extra verb',
                                        'value' => 125,
                                        'tags'  => ['0'],
                                    ],
                                    [
                                        'name'  => 'W:VERB',
                                        'href'  => '#parent1-2-10-3',
                                        'text'  => 'Wrong verb',
                                        'value' => 126,
                                        'tags'  => ['0'],
                                    ],
                                ],
                            ],
                        ],
                    ],
                ],
            ], [
                'name' => 'mechanics_&_style',
                'href' => '#parent2',
                'text' => 'Mechanics & Style',
                'value' => 2,
                'tags' => ['1'],
                'nodes' => [
                    [
                        'name' => 'mechanics_&_style:typography',
                        'href' => '#parent2-1',
                        'text' => 'Typography',
                        'value' => 127,
                        'tags' => ['7'],
                        'nodes' => [
                            [
                                'name' => 'mechanics_&_style:typography:spelling',
                                'href' => '#parent2-1-1',
                                'text' => 'Spelling',
                                'value' => 128,
                                'tags' => ['1'],
                                'nodes' => [
                                    [
                                        'name' => 'W:W_Typ_Spel',
                                        'href' => '#parent2-1-1-1',
                                        'text' => 'Wrong spelling',
                                        'value' => 129,
                                        'tags' => ['0'],
                                    ]
                                ],
                            ], [
                                'name' => 'mechanics_&_style:typography:capitalization',
                                'href' => '#parent2-1-2',
                                'text' => 'Capitalization',
                                'value' => 130,
                                'tags' => ['0'],
                                'nodes' => [
                                    [
                                        'name' => 'W:ORTH:W_Typ_Capi',
                                        'href' => '#parent2-1-2-1',
                                        'text' => 'Wrong capitalisation',
                                        'value' => 131,
                                        'tags' => ['0'],
                                    ],
                                ],
                            ], [
                                'name' => 'mechanics_&_style:typography:abbreviations',
                                'href' => '#parent2-1-3',
                                'text' => 'Abbreviations',
                                'value' => 132,
                                'tags' => ['0'],
                            ], [
                                'name' => 'mechanics_&_style:typography:si_units',
                                'href' => '#parent2-1-4',
                                'text' => 'SI units',
                                'value' => 133,
                                'tags' => ['0'],
                            ], [
                                'name' => 'mechanics_&_style:typography:spacing',
                                'href' => '#parent2-1-5',
                                'text' => 'Spacing',
                                'value' => 134,
                                'tags' => ['3'],
                                'nodes' => [
                                    [
                                        'name' => 'W:ORTH:M_Typ_Spac',
                                        'href' => '#parent2-1-5-1',
                                        'text' => 'Missing space',
                                        'value' => 135,
                                        'tags' => ['0'],
                                    ], [
                                        'name' => 'W:ORTH:E_Typ_Spac',
                                        'href' => '#parent2-1-5-2',
                                        'text' => 'Extra space',
                                        'value' => 136,
                                        'tags' => ['0'],
                                    ], [
                                        'name' => 'W:ORTH:W_Typ_Spac',
                                        'href' => '#parent2-1-5-3',
                                        'text' => 'Wrong spacing',
                                        'value' => 137,
                                        'tags' => ['0'],
                                    ],
                                ],
                            ], [
                                'name' => 'mechanics_&_style:typography:contractions',
                                'href' => '#parent2-1-6',
                                'text' => 'Contractions',
                                'value' => 138,
                                'tags' => ['3'],
                                'nodes' => [
                                    [
                                        'name' => 'M:W_Typ_Cont',
                                        'href' => '#parent2-1-6-1',
                                        'text' => 'Missing contraction',
                                        'value' => 139,
                                        'tags' => ['0'],
                                    ], [
                                        'name' => 'E:W_Typ_Cont',
                                        'href' => '#parent2-1-6-2',
                                        'text' => 'Extra contraction',
                                        'value' => 140,
                                        'tags' => ['0'],
                                    ], [
                                        'name' => 'W:W_Typ_Cont',
                                        'href' => '#parent2-1-6-3',
                                        'text' => 'Wrong contraction',
                                        'value' => 141,
                                        'tags' => ['0'],
                                    ],
                                ],
                            ], [
                                'name' => 'mechanics_&_style:typography:punctuation',
                                'href' => '#parent2-1-7',
                                'text' => 'Punctuation',
                                'value' => 142,
                                'tags' => ['8'],
                                'nodes' => [
                                    [
                                        'name' => 'mechanics_&_style:typography:punctuation:comma',
                                        'href' => '#parent2-1-7-1',
                                        'text' => 'Comma',
                                        'value' => 143,
                                        'tags' => ['3'],
                                        'nodes' => [
                                            [
                                                'name' => 'W:PUCT:M_Typ_Punc_Comm',
                                                'href' => '#parent2-1-7-1-1',
                                                'text' => 'Missing comma',
                                                'value' => 144,
                                                'tags' => ['0'],
                                            ], [
                                                'name' => 'W:PUCT:E_Typ_Punc_Comm',
                                                'href' => '#parent2-1-7-1-2',
                                                'text' => 'Extra comma',
                                                'value' => 145,
                                                'tags' => ['0'],
                                            ], [
                                                'name' => 'W:PUCT:W_Typ_Punc_Comm',
                                                'href' => '#parent2-1-7-1-3',
                                                'text' => 'Wrong comma',
                                                'value' => 146,
                                                'tags' => ['0'],
                                            ],
                                        ],
                                    ], [
                                        'name' => 'mechanics_&_style:typography:punctuation:hyphen',
                                        'href' => '#parent2-1-7-2',
                                        'text' => 'Hyphen',
                                        'value' => 147,
                                        'tags' => ['3'],
                                        'nodes' => [
                                            [
                                                'name' => 'W:PUCT:M_Typ_Punc_Hyph',
                                                'href' => '#parent2-1-7-2-1',
                                                'text' => 'Missing hyphen',
                                                'value' => 148,
                                                'tags' => ['0'],
                                            ], [
                                                'name' => 'W:PUCT:E_Typ_Punc_Hyph',
                                                'href' => '#parent2-1-7-2-2',
                                                'text' => 'Extra hyphen',
                                                'value' => 149,
                                                'tags' => ['0'],
                                            ], [
                                                'name' => 'W:PUCT:W_Typ_Punc_Hyph',
                                                'href' => '#parent2-1-7-2-3',
                                                'text' => 'Wrong hyphen',
                                                'value' => 150,
                                                'tags' => ['0'],
                                            ],
                                        ],
                                    ], [
                                        'name' => 'mechanics_&_style:typography:punctuation:semicolon',
                                        'href' => '#parent2-1-7-3',
                                        'text' => 'Semicolon',
                                        'value' => 151,
                                        'tags' => ['3'],
                                        'nodes' => [
                                            [
                                                'name' => 'W:PUCT:M_Typ_Punc_SeCo',
                                                'href' => '#parent2-1-7-3-1',
                                                'text' => 'Missing semicolon',
                                                'value' => 152,
                                                'tags' => ['0'],
                                            ], [
                                                'name' => 'W:PUCT:E_Typ_Punc_SeCo',
                                                'href' => '#parent2-1-7-3-2',
                                                'text' => 'Extra semicolon',
                                                'value' => 153,
                                                'tags' => ['0'],
                                            ], [
                                                'name' => 'W:PUCT:W_Typ_Punc_SeCo',
                                                'href' => '#parent2-1-7-3-3',
                                                'text' => 'Wrong semicolon',
                                                'value' => 154,
                                                'tags' => ['0'],
                                            ],
                                        ],
                                    ], [
                                        'name' => 'mechanics_&_style:typography:punctuation:colon',
                                        'href' => '#parent2-1-7-4',
                                        'text' => 'Colon',
                                        'value' => 155,
                                        'tags' => ['3'],
                                        'nodes' => [
                                            [
                                                'name' => 'W:PUCT:M_Typ_Punc_Coln',
                                                'href' => '#parent2-1-7-4-1',
                                                'text' => 'Missing colon',
                                                'value' => 156,
                                                'tags' => ['0'],
                                            ], [
                                                'name' => 'W:PUCT:E_Typ_Punc_Coln',
                                                'href' => '#parent2-1-7-4-2',
                                                'text' => 'Extra colon',
                                                'value' => 157,
                                                'tags' => ['0'],
                                            ], [
                                                'name' => 'W:PUCT:W_Typ_Punc_Coln',
                                                'href' => '#parent2-1-7-4-3',
                                                'text' => 'Wrong colon',
                                                'value' => 158,
                                                'tags' => ['0'],
                                            ],
                                        ],
                                    ], [
                                        'name' => 'mechanics_&_style:typography:punctuation:period',
                                        'href' => '#parent2-1-7-5',
                                        'text' => 'Period',
                                        'value' => 159,
                                        'tags' => ['3'],
                                        'nodes' => [
                                            [
                                                'name' => 'W:PUCT:M_Typ_Punc_Peri',
                                                'href' => '#parent2-1-7-5-1',
                                                'text' => 'Missing period',
                                                'value' => 160,
                                                'tags' => ['0'],
                                            ], [
                                                'name' => 'W:PUCT:E_Typ_Punc_Peri',
                                                'href' => '#parent2-1-7-5-2',
                                                'text' => 'Extra period',
                                                'value' => 161,
                                                'tags' => ['0'],
                                            ], [
                                                'name' => 'W:PUCT:W_Typ_Punc_Peri',
                                                'href' => '#parent2-1-7-5-3',
                                                'text' => 'Wrong period',
                                                'value' => 162,
                                                'tags' => ['0'],
                                            ],
                                        ],
                                    ], [
                                        'name' => 'M:PUNCT',
                                        'href' => '#parent2-1-7',
                                        'text' => 'Missing punctuation',
                                        'value' => 163,
                                        'tags' => ['0'],
                                    ], [
                                        'name' => 'E:PUNCT',
                                        'href' => '#parent2-1-7',
                                        'text' => 'Extra punctuation',
                                        'value' => 164,
                                        'tags' => ['0'],
                                    ], [
                                        'name' => 'W:PUNCT',
                                        'href' => '#parent2-1-7',
                                        'text' => 'Wrong punctuation',
                                        'value' => 165,
                                        'tags' => ['0'],
                                    ],
                                ],
                            ],
                        ],
                    ],
                ],
            ],
        ]
    ];
