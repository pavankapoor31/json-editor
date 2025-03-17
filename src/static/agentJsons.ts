export const AwsPollyAgent = {
  agent_config: {
    agent_name: "Alfred",
    agent_type: "other",
    agent_welcome_message: "How are you doing Bruce? AWSPolly",
    tasks: [
      {
        task_type: "conversation",
        toolchain: {
          execution: "parallel",
          pipelines: [["transcriber", "llm", "synthesizer"]],
        },
        tools_config: {
          input: {
            format: "wav",
            provider: "twilio",
          },
          llm_agent: {
            agent_type: "simple_llm_agent",
            agent_flow_type: "streaming",
            routes: null,
            llm_config: {
              agent_flow_type: "streaming",
              provider: "openai",
              request_json: true,
              model: "gpt-4o-mini",
            },
          },
          output: {
            format: "wav",
            provider: "twilio",
          },
          synthesizer: {
            audio_format: "wav",
            provider: "polly",
            stream: true,
            provider_config: {
              voice: "Matthew",
              engine: "generative",
              language: "en-US",
            },
            buffer_size: 100.0,
          },
          transcriber: {
            encoding: "linear16",
            language: "en",
            provider: "deepgram",
            stream: true,
          },
        },
        task_config: {
          hangup_after_silence: 30.0,
        },
      },
    ],
  },
  agent_prompts: {
    task_1: {
      system_prompt:
        "Why Do We Fall, Sir? So That We Can Learn To Pick Ourselves Up.",
    },
  },
  agent_title: "AWS Polly Agent",
};
export const AzureTTSAgent = {
  agent_config: {
    agent_name: "Alfred",
    agent_type: "other",
    agent_welcome_message: "How are you doing Bruce? AzureTTS",
    tasks: [
      {
        task_type: "conversation",
        toolchain: {
          execution: "parallel",
          pipelines: [["transcriber", "llm", "synthesizer"]],
        },
        tools_config: {
          input: {
            format: "wav",
            provider: "twilio",
          },
          llm_agent: {
            agent_type: "simple_llm_agent",
            agent_flow_type: "streaming",
            routes: null,
            llm_config: {
              agent_flow_type: "streaming",
              provider: "openai",
              request_json: true,
              model: "gpt-4o-mini",
            },
          },
          output: {
            format: "wav",
            provider: "twilio",
          },
          synthesizer: {
            audio_format: "wav",
            provider: "azuretts",
            stream: true,
            provider_config: {
              voice: "Sonia",
              model: "neural",
              language: "en-GB",
            },
            buffer_size: 100.0,
          },
          transcriber: {
            encoding: "linear16",
            language: "en",
            provider: "deepgram",
            stream: true,
          },
        },
        task_config: {
          hangup_after_silence: 30.0,
        },
      },
    ],
  },
  agent_prompts: {
    task_1: {
      system_prompt:
        "Why Do We Fall, Sir? So That We Can Learn To Pick Ourselves Up.",
    },
  },
  agent_title: "Azure TTS Agent",
};
export const deepgramTTSAgent = {
  agent_config: {
    agent_name: "Alfred",
    agent_type: "other",
    agent_welcome_message: "How are you doing Bruce? DeepgramTTS",
    tasks: [
      {
        task_type: "conversation",
        toolchain: {
          execution: "parallel",
          pipelines: [["transcriber", "llm", "synthesizer"]],
        },
        tools_config: {
          input: {
            format: "wav",
            provider: "twilio",
          },
          llm_agent: {
            agent_type: "simple_llm_agent",
            agent_flow_type: "streaming",
            routes: null,
            llm_config: {
              agent_flow_type: "streaming",
              provider: "openai",
              request_json: true,
              model: "gpt-4o-mini",
            },
          },
          output: {
            format: "wav",
            provider: "twilio",
          },
          synthesizer: {
            audio_format: "wav",
            provider: "deepgram",
            stream: true,
            provider_config: {
              voice: "Arcas",
              model: "aura-arcas-en",
            },
            buffer_size: 100.0,
          },
          transcriber: {
            encoding: "linear16",
            language: "en",
            provider: "deepgram",
            stream: true,
          },
        },
        task_config: {
          hangup_after_silence: 30.0,
        },
      },
    ],
  },
  agent_prompts: {
    task_1: {
      system_prompt:
        "Why Do We Fall, Sir? So That We Can Learn To Pick Ourselves Up.",
    },
  },
  agent_title: "Deepgram TTS Agent",
};
export const elevenLabsTTs = {
  agent_config: {
    agent_name: "Alfred",
    agent_type: "other",
    agent_welcome_message: "How are you doing Bruce? ElevenLabsTTS",
    tasks: [
      {
        task_type: "conversation",
        toolchain: {
          execution: "parallel",
          pipelines: [["transcriber", "llm", "synthesizer"]],
        },
        tools_config: {
          input: {
            format: "wav",
            provider: "twilio",
          },
          llm_agent: {
            agent_type: "simple_llm_agent",
            agent_flow_type: "streaming",
            routes: null,
            llm_config: {
              agent_flow_type: "streaming",
              provider: "openai",
              request_json: true,
              model: "gpt-4o-mini",
            },
          },
          output: {
            format: "wav",
            provider: "twilio",
          },
          synthesizer: {
            audio_format: "wav",
            provider: "elevenlabs",
            stream: true,
            provider_config: {
              voice: "George",
              model: "eleven_turbo_v2_5",
              voice_id: "JBFqnCBsd6RMkjVDRZzb",
            },
            buffer_size: 100.0,
          },
          transcriber: {
            encoding: "linear16",
            language: "en",
            provider: "deepgram",
            stream: true,
          },
        },
        task_config: {
          hangup_after_silence: 30.0,
        },
      },
    ],
  },
  agent_prompts: {
    task_1: {
      system_prompt:
        "Why Do We Fall, Sir? So That We Can Learn To Pick Ourselves Up.",
    },
  },
  agent_title: "ElevenLabs TTS Agent",
};
export const guardRailsAgent = {
  agent_config: {
    agent_name: "Alfred",
    agent_type: "other",
    agent_welcome_message: "How are you doing Bruce? GuardRailsAgent",
    tasks: [
      {
        task_type: "conversation",
        toolchain: {
          execution: "parallel",
          pipelines: [["transcriber", "llm", "synthesizer"]],
        },
        tools_config: {
          input: {
            format: "wav",
            provider: "twilio",
          },
          llm_agent: {
            agent_type: "simple_llm_agent",
            agent_flow_type: "streaming",
            routes: {
              embedding_model: "snowflake/snowflake-arctic-embed-m",
              routes: [
                {
                  route_name: "politics",
                  utterances: [
                    "Who do you think will win the elections?",
                    "Whom would you vote for?",
                  ],
                  response:
                    "Hey, thanks but I do not have opinions on politics",
                  score_threshold: 0.9,
                },
              ],
            },
            llm_config: {
              agent_flow_type: "streaming",
              provider: "openai",
              request_json: true,
              model: "gpt-4o-mini",
            },
          },
          output: {
            format: "wav",
            provider: "twilio",
          },
          synthesizer: {
            audio_format: "wav",
            provider: "elevenlabs",
            stream: true,
            provider_config: {
              voice: "George",
              model: "eleven_turbo_v2_5",
              voice_id: "JBFqnCBsd6RMkjVDRZzb",
            },
            buffer_size: 100.0,
          },
          transcriber: {
            encoding: "linear16",
            language: "en",
            provider: "deepgram",
            stream: true,
          },
        },
        task_config: {
          hangup_after_silence: 30.0,
        },
      },
    ],
  },
  agent_prompts: {
    task_1: {
      system_prompt:
        "Why Do We Fall, Sir? So That We Can Learn To Pick Ourselves Up.",
    },
  },
  agent_title: "GuardRails Agent",
};
