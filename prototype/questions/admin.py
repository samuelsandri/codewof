from django.contrib import admin

from .models import *


admin.site.register(Question)
admin.site.register(TestCase)
admin.site.register(SkillArea)