from django.db import models
from django.utils.timezone import now

from django_extensions.db.fields.json import JSONField

from bedrock.contentful.api import contentful_preview_page


class ContentfulEntry(models.Model):
    contentful_id = models.CharField(max_length=20, unique=True)
    content_type = models.CharField(max_length=20)
    language = models.CharField(max_length=5)
    last_modified = models.DateTimeField(default=now)
    data_hash = models.CharField(max_length=64)
    data = JSONField()

    class Meta:
        unique_together = ('content_type', 'language')