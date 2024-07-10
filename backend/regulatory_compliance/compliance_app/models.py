from django.db import models

class Module(models.Model):
    title = models.CharField(max_length=255)
    number = models.CharField(max_length=50)

class Checkpoint(models.Model):
    module = models.ForeignKey(Module, related_name='checkpoints', on_delete=models.CASCADE)
    rule_number = models.CharField(max_length=50)
    rule_description = models.TextField()

class GeminiResponse(models.Model):
    module = models.ForeignKey(Module, related_name='gemini_responses', on_delete=models.CASCADE)
    rule_number = models.CharField(max_length=50)
    rule_result = models.CharField(max_length=20)  # Yes/No/Partially
    rule_comments = models.TextField()
    rule_reason = models.TextField()
