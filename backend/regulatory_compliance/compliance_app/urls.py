from django.urls import path
from . import views

urlpatterns = [
    # path('', views.index, name='index'),
    # path('module/<int:module_id>/', views.process_module, name='process_module'),
    # path('checkpoint/<int:checkpoint_id>/', views.process_checkpoint, name='process_checkpoint'),
    path('api/upload-pdf/', views.upload_pdf, name='upload_pdf'), 
    path('api/download-pdf/', views.download_pdf, name='download_pdf'),
]
