from google.generativeai.types import HarmCategory, HarmBlockThreshold

def safety_config():
    return {
        "harm_categories": [HarmCategory.SOCIAL, HarmCategory.VIOLENCE],
        "threshold": HarmBlockThreshold.MEDIUM
    }
