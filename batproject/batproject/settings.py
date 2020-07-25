import os

if os.getenv('DJANGO_SETTINGS'):
    print("PROD SERVER")
    from .settings_prod import *
else:
    print("DEV SERVER")
    from .settings_dev import *
