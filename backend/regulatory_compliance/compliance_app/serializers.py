from rest_framework import serializers
from .models import Module, Checkpoint, GeminiResponse

class ModuleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Module
        fields = '__all__'

class CheckpointSerializer(serializers.ModelSerializer):
    class Meta:
        model = Checkpoint
        fields = '__all__'

class GeminiResponseSerializer(serializers.ModelSerializer):
    class Meta:
        model = GeminiResponse
        fields = '__all__'
